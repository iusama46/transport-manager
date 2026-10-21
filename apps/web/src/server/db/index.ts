import "server-only";
import { getPool } from "./client";
import { createDatabase } from "./database";

export type { Database, DatabaseContext } from "./database";
export { DatabaseError } from "./errors";
export type { DatabaseErrorCode } from "./errors";

export const database = createDatabase(getPool);

/** Internal capability only; deliberately no public diagnostics endpoint. */
export async function checkDatabaseConnection(): Promise<void> {
  const rows = await database.query<{ ok: number }>("SELECT 1 AS ok");
  if (rows[0]?.ok !== 1) throw new Error("Database connectivity check failed");
}
