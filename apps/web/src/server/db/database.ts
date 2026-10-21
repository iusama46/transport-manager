import "server-only";
import { AsyncLocalStorage } from "node:async_hooks";
import type { Pool, PoolClient, QueryResultRow } from "pg";
import { DatabaseError, normalizeDatabaseError } from "./errors";

/** Trusted SQL text only; values use $1... parameters. No HTTP/auth/UI concerns. */
export interface DatabaseContext {
  query<Row extends QueryResultRow = QueryResultRow>(
    text: string,
    values?: readonly unknown[],
  ): Promise<Row[]>;
}
export interface Database extends DatabaseContext {
  withTransaction<T>(work: (tx: DatabaseContext) => Promise<T>): Promise<T>;
}

/** Injectable pool acquisition keeps tests synthetic and module import network-free. */
export function createDatabase(
  getPool: () => Pick<Pool, "query" | "connect">,
): Database {
  const transaction = new AsyncLocalStorage<boolean>();
  const noNestedPoolUse = () => {
    if (transaction.getStore()) {
      throw new Error(
        "Pass the existing transaction context; nested database access is unsupported",
      );
    }
  };
  return Object.freeze({
    async query<Row extends QueryResultRow>(
      text: string,
      values: readonly unknown[] = [],
    ) {
      noNestedPoolUse();
      const pool = getPool();
      try {
        return (await pool.query<Row>({ text, values: [...values] })).rows;
      } catch (error) {
        throw normalizeDatabaseError(error);
      }
    },
    async withTransaction<T>(work: (tx: DatabaseContext) => Promise<T>) {
      noNestedPoolUse();
      const pool = getPool();
      let client: PoolClient;
      try {
        client = await pool.connect();
      } catch (error) {
        throw normalizeDatabaseError(error);
      }
      let active = true;
      let failed: DatabaseError | undefined;
      let discard = false;
      const tx: DatabaseContext = Object.freeze({
        async query<Row extends QueryResultRow>(
          text: string,
          values: readonly unknown[] = [],
        ) {
          if (!active) throw new Error("Transaction context has expired");
          if (failed) throw failed;
          try {
            return (await client.query<Row>({ text, values: [...values] }))
              .rows;
          } catch (error) {
            failed = normalizeDatabaseError(error);
            throw failed;
          }
        },
      });
      try {
        try {
          await client.query("BEGIN");
          await client.query("SET LOCAL statement_timeout = '10s'");
          await client.query("SET LOCAL lock_timeout = '3s'");
          await client.query(
            "SET LOCAL idle_in_transaction_session_timeout = '15s'",
          );
        } catch (error) {
          throw normalizeDatabaseError(error);
        }
        // Service/domain errors retain their identity; driver errors are normalized at query/control boundaries.
        const result = await transaction.run(true, () => work(tx));
        if (failed) throw failed; // A swallowed query error must never produce false commit success.
        active = false;
        try {
          const committed = await client.query("COMMIT");
          if (committed.command !== "COMMIT")
            throw new DatabaseError("unknown");
        } catch (error) {
          discard = true; // A lost commit acknowledgement has an UNKNOWN outcome; never retry automatically.
          throw normalizeDatabaseError(error);
        }
        return result;
      } catch (error) {
        active = false;
        try {
          await client.query("ROLLBACK");
        } catch {
          discard = true;
        }
        throw error;
      } finally {
        active = false;
        client.release(discard);
      }
    },
  });
}
