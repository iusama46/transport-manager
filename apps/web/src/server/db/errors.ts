import "server-only";

export type DatabaseErrorCode =
  "unique" | "foreign_key" | "check" | "conflict" | "unavailable" | "unknown";

/** No provider message, SQL, constraint detail, stack cause or credentials attached. */
export class DatabaseError extends Error {
  constructor(readonly code: DatabaseErrorCode) {
    super("Database operation failed");
    this.name = "DatabaseError";
  }
}

export function normalizeDatabaseError(error: unknown): DatabaseError {
  if (error instanceof DatabaseError) return error;
  const code =
    error && typeof error === "object" && "code" in error
      ? error.code
      : undefined;
  const category =
    code === "23505"
      ? "unique"
      : code === "23503"
        ? "foreign_key"
        : code === "23514"
          ? "check"
          : ["40001", "40P01", "55P03"].includes(String(code))
            ? "conflict"
            : /^(08|53|57P0)/.test(String(code)) ||
                [
                  "ECONNREFUSED",
                  "ECONNRESET",
                  "ETIMEDOUT",
                  "ENOTFOUND",
                  "EPIPE",
                ].includes(String(code))
              ? "unavailable"
              : "unknown";
  return new DatabaseError(category);
}
