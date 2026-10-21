import "server-only";
import { Pool, types, type PoolConfig } from "pg";
import { attachDatabasePool } from "@vercel/functions/db-connections";
import { getServerConfig, type DatabaseConfig } from "../config";
import { normalizeDatabaseError } from "./errors";

export function poolOptions(config: DatabaseConfig): PoolConfig {
  return {
    connectionString: config.connectionString,
    ssl: config.local
      ? false
      : {
          rejectUnauthorized: true,
          ...(config.ca ? { ca: config.ca } : {}),
        },
    max: 2,
    min: 0,
    connectionTimeoutMillis: 5_000,
    idleTimeoutMillis: 5_000,
    query_timeout: 15_000,
    maxLifetimeSeconds: 300,
    // Per-pool parsers, never a global mutation. Binary queries are not exposed.
    types: {
      getTypeParser(oid, format) {
        if (format !== "binary") {
          if ([1700, 20, 1082].includes(oid)) return (value: string) => value;
          // pg-types parses numeric[] with parseFloat by default. Use its text-array
          // parser to retain exact elements, dimensions and nulls without a new dependency.
          if ([1231, 1182].includes(oid))
            // Upstream TypeId omits array OIDs; 1009 is PostgreSQL text[].
            return types.getTypeParser(
              1009 as Parameters<typeof types.getTypeParser>[0],
              "text",
            );
        }
        return types.getTypeParser(oid, format);
      },
    },
  };
}

// One pool per loaded Node module/instance, not per request. No sockets until first query.
let state: { key: string; pool: Pool } | undefined;
export function getPool(): Pool {
  const { database } = getServerConfig();
  if (!database)
    throw new Error("Missing required server configuration: DATABASE_URL");
  const key = JSON.stringify(database);
  if (state) {
    // Do not silently reuse a credential/environment snapshot after runtime reconfiguration.
    if (state.key !== key)
      throw new Error("Database configuration changed; restart the runtime");
    return state.pool;
  }
  try {
    const pool = new Pool(poolOptions(database));
    // pg emits idle-client errors outside query promises. Never log provider details.
    pool.on("error", () => {
      /* pg removes the failed idle client; next use reconnects. */
    });
    attachDatabasePool(pool);
    state = { key, pool };
    return pool;
  } catch (error) {
    throw normalizeDatabaseError(error);
  }
}
