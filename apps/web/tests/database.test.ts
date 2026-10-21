import { describe, it, expect, vi } from "vitest";
import { types, type Pool, type PoolConfig } from "pg";
import {
  createDatabase,
  type DatabaseContext,
} from "../src/server/db/database";
import { DatabaseError, normalizeDatabaseError } from "../src/server/db/errors";
import { poolOptions } from "../src/server/db/client";
import type { ServerConfig, DatabaseConfig } from "../src/server/config";

const { config, attach } = vi.hoisted(() => ({
  config: vi.fn(),
  attach: vi.fn(),
}));
vi.mock("../src/server/config", () => ({ getServerConfig: config }));
vi.mock("@vercel/functions/db-connections", () => ({
  attachDatabasePool: attach,
}));

const remote: DatabaseConfig = {
  environment: "test",
  projectRef: "abcdefghijklmnopqrst",
  local: false,
  ca: undefined,
  connectionString:
    "postgresql://tm_runtime.abcdefghijklmnopqrst:synthetic-db-sentinel@aws-0-test.pooler.supabase.com:6543/postgres",
};

function harness(failure?: string, rollbackFails = false) {
  const calls: string[] = [];
  const raw = Object.assign(new Error("synthetic-private-sql-password"), {
    code: "23505",
    detail: "private",
  });
  const client = {
    query: vi.fn(
      async (query: string | { text: string; values: unknown[] }) => {
        const text = typeof query === "string" ? query : query.text;
        calls.push(text);
        if (text === failure || (rollbackFails && text === "ROLLBACK"))
          throw raw;
        return {
          rows: [{ value: "9007199254740993.01" }],
          command: text === "COMMIT" ? "COMMIT" : "SELECT",
        };
      },
    ),
    release: vi.fn(),
  };
  const pool = {
    connect: vi.fn(async () => client),
    query: vi.fn((...args: Parameters<typeof client.query>) =>
      client.query(...args),
    ),
  };
  const db = createDatabase(() => pool as unknown as Pool);
  return { db, calls, client, pool, raw };
}

const begin = [
  "BEGIN",
  "SET LOCAL statement_timeout = '10s'",
  "SET LOCAL lock_timeout = '3s'",
  "SET LOCAL idle_in_transaction_session_timeout = '15s'",
];

describe("repository and transaction boundary", () => {
  it("is lazy and forwards parameterized values without modifying SQL", async () => {
    const { db, pool } = harness();
    expect(pool.connect).not.toHaveBeenCalled();
    const input = "'); DROP TABLE example; --";
    await db.query("SELECT $1::text", [input]);
    expect(pool.query).toHaveBeenCalledWith({
      text: "SELECT $1::text",
      values: [input],
    });
  });

  it("commits on the same client and passes context to repository code", async () => {
    const { db, calls, client, pool } = harness();
    const repository = async (ctx: DatabaseContext) =>
      ctx.query("SELECT $1::numeric AS value", ["9007199254740993.01"]);
    const rows = await db.withTransaction(repository);
    expect(rows[0].value).toBe("9007199254740993.01");
    expect(calls).toEqual([...begin, "SELECT $1::numeric AS value", "COMMIT"]);
    expect(pool.query).not.toHaveBeenCalled();
    expect(client.release).toHaveBeenCalledWith(false);
  });

  it("rolls back application failure, retaining domain error identity", async () => {
    const { db, calls, client } = harness();
    const domain = new Error("Domain validation failed");
    await expect(
      db.withTransaction(async (tx) => {
        await tx.query("SELECT 1");
        throw domain;
      }),
    ).rejects.toBe(domain);
    expect(calls).toEqual([...begin, "SELECT 1", "ROLLBACK"]);
    expect(client.release).toHaveBeenCalledWith(false);
  });

  it.each(["BEGIN", "SET LOCAL lock_timeout = '3s'", "SELECT 1", "COMMIT"])(
    "normalizes %s failure, rolls back and releases",
    async (failure) => {
      const { db, calls, client } = harness(failure);
      await expect(
        db.withTransaction(async (tx) => tx.query("SELECT 1")),
      ).rejects.toMatchObject({
        code: "unique",
        message: "Database operation failed",
      });
      expect(calls.at(-1)).toBe("ROLLBACK");
      expect(client.release).toHaveBeenCalledWith(failure === "COMMIT");
    },
  );

  it("discards a client when rollback fails and preserves original error", async () => {
    const { db, client } = harness(undefined, true);
    const domain = new Error("Original failure");
    await expect(
      db.withTransaction(async () => {
        throw domain;
      }),
    ).rejects.toBe(domain);
    expect(client.release).toHaveBeenCalledWith(true);
  });

  it("does not commit a swallowed statement failure", async () => {
    const { db, calls } = harness("SELECT 1");
    await expect(
      db.withTransaction(async (tx) => {
        try {
          await tx.query("SELECT 1");
        } catch {
          /* exercise swallowed failure */
        }
      }),
    ).rejects.toBeInstanceOf(DatabaseError);
    expect(calls).not.toContain("COMMIT");
    expect(calls.at(-1)).toBe("ROLLBACK");
  });

  it("rejects expired transaction contexts", async () => {
    const { db } = harness();
    let escaped: DatabaseContext | undefined;
    await db.withTransaction(async (tx) => {
      escaped = tx;
    });
    await expect(escaped!.query("SELECT 1")).rejects.toThrow("expired");
  });

  it("rejects implicit nested transactions and pool bypass inside a transaction", async () => {
    const { db, pool } = harness();
    await db.withTransaction(async (tx) => {
      await expect(db.withTransaction(async () => undefined)).rejects.toThrow(
        "existing transaction",
      );
      await expect(db.query("SELECT 1")).rejects.toThrow(
        "existing transaction",
      );
      await tx.query("SELECT 1");
    });
    expect(pool.connect).toHaveBeenCalledTimes(1);
  });

  it("permits independent concurrent transactions", async () => {
    const { db, pool } = harness();
    await Promise.all([
      db.withTransaction(async (tx) => tx.query("SELECT 1")),
      db.withTransaction(async (tx) => tx.query("SELECT 2")),
    ]);
    expect(pool.connect).toHaveBeenCalledTimes(2);
  });

  it("normalizes acquisition and standalone query errors", async () => {
    const { db, pool, raw } = harness("SELECT 1");
    await expect(db.query("SELECT 1")).rejects.toMatchObject({
      code: "unique",
    });
    pool.connect.mockRejectedValueOnce(raw);
    await expect(
      db.withTransaction(async () => undefined),
    ).rejects.toMatchObject({ code: "unique" });
  });
});

describe("safe database errors", () => {
  it.each([
    ["23505", "unique"],
    ["23503", "foreign_key"],
    ["23514", "check"],
    ["40001", "conflict"],
    ["40P01", "conflict"],
    ["55P03", "conflict"],
    ["08006", "unavailable"],
    ["53300", "unavailable"],
    ["57P01", "unavailable"],
    ["ECONNRESET", "unavailable"],
    ["ENOTFOUND", "unavailable"],
    ["XX000", "unknown"],
  ])("maps %s to %s without retaining provider detail", (code, expected) => {
    const raw = Object.assign(new Error("secret SQL"), {
      code,
      detail: "secret detail",
      connectionString: remote.connectionString,
    });
    const safe = normalizeDatabaseError(raw);
    expect(safe.code).toBe(expected);
    expect(safe.message).toBe("Database operation failed");
    expect(safe.cause).toBeUndefined();
    expect(JSON.stringify(safe)).not.toMatch(/secret|postgresql/);
    expect(normalizeDatabaseError(safe)).toBe(safe);
  });
  it.each([null, undefined, "private error", {}])(
    "handles unknown thrown values",
    (value) => {
      expect(normalizeDatabaseError(value).code).toBe("unknown");
    },
  );
});

describe("connection composition", () => {
  it("bounds the pool and verifies TLS without accepting URL SSL overrides", () => {
    const options = poolOptions(remote);
    expect(options.max).toBe(2);
    expect(options.connectionTimeoutMillis).toBe(5000);
    expect(options.query_timeout).toBe(15000);
    expect(options.ssl).toEqual({ rejectUnauthorized: true });
    expect(poolOptions({ ...remote, ca: "synthetic-ca" }).ssl).toEqual({
      rejectUnauthorized: true,
      ca: "synthetic-ca",
    });
    expect(poolOptions({ ...remote, local: true }).ssl).toBe(false);
  });

  it("preserves NUMERIC, BIGINT, numeric arrays and date-only strings without global parser mutation", () => {
    const options: PoolConfig = poolOptions(remote);
    // pg-types' TypeId union omits PostgreSQL array OIDs, supported by its runtime parser.
    const parse = options.types!.getTypeParser as (
      oid: number,
      format: "text",
    ) => (value: string) => unknown;
    const numeric = "90071992547409931234567890.123456789";
    expect(parse(1700, "text")(numeric)).toBe(numeric);
    expect(parse(20, "text")("9007199254740993")).toBe("9007199254740993");
    expect(parse(1082, "text")("2026-10-19")).toBe("2026-10-19");
    expect(parse(1231, "text")(`{${numeric}}`)).toEqual([numeric]);
    expect(parse(1231, "text")(`{{${numeric},NULL},{1.23,4.56}}`)).toEqual([
      [numeric, null],
      ["1.23", "4.56"],
    ]);
    expect(parse(1182, "text")("{2026-10-19,NULL}")).toEqual([
      "2026-10-19",
      null,
    ]);
    expect(types.getTypeParser(1700, "text")(numeric)).toBe(numeric);
  });

  it("requires validated configuration on use, reuses a lazy pool and rejects config drift", async () => {
    const { database, checkDatabaseConnection } =
      await import("../src/server/db");
    const { getPool } = await import("../src/server/db/client");
    config.mockImplementationOnce(() => {
      throw new Error("Invalid server configuration: APP_ENV");
    });
    await expect(database.query("SELECT 1")).rejects.toThrow("APP_ENV");
    config.mockReturnValue({ database: null } as Partial<ServerConfig>);
    await expect(checkDatabaseConnection()).rejects.toThrow("DATABASE_URL");
    config.mockReturnValue({ database: remote });
    const pool = getPool();
    expect(getPool()).toBe(pool);
    expect(pool.totalCount).toBe(0); // No sockets were opened.
    expect(attach).toHaveBeenCalledWith(pool);
    config.mockReturnValue({
      database: { ...remote, connectionString: "synthetic-changed-secret" },
    });
    expect(() => getPool()).toThrow("restart");
    await pool.end();
  });
});
