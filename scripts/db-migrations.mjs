import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const directory = fileURLToPath(new URL("../db/migrations/", import.meta.url));
const literal = (text) => `'${text.replaceAll("'", "''")}'`;

/** Offline only: no driver, environment reads, subprocesses or database access. */
export function migrationPlan(path = directory) {
  const files = readdirSync(path)
    .filter((name) => name.endsWith(".sql"))
    .sort();
  const versions = new Set();
  return files.map((name) => {
    if (!/^\d{14}_[a-z][a-z0-9_]*\.sql$/.test(name))
      throw new Error("Invalid migration filename");
    const version = name.slice(0, 14);
    if (versions.has(version)) throw new Error("Duplicate migration version");
    versions.add(version);
    const sql = readFileSync(resolve(path, name), "utf8");
    if (!sql.trim()) throw new Error("Empty migration");
    // psql meta-commands could bypass the generated ledger/transaction envelope.
    if (/^\s*\\/m.test(sql)) throw new Error("Migration must contain SQL only");
    return {
      name,
      sql,
      checksum: createHash("sha256").update(sql).digest("hex"),
    };
  });
}

export function renderMigrationBundle(plan) {
  if (!plan.length) return "-- No migrations; no database changes.\n";
  const known = plan
    .map(({ name, checksum }) => `(${literal(name)}, ${literal(checksum)})`)
    .join(",\n");
  return `-- REVIEW BEFORE EXECUTION. psql input, transactional migrations only.
\\set ON_ERROR_STOP on
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';
SELECT pg_advisory_xact_lock(7412012);
CREATE SCHEMA IF NOT EXISTS tm_migrations;
REVOKE ALL ON SCHEMA tm_migrations FROM PUBLIC;
CREATE TABLE IF NOT EXISTS tm_migrations.applied (
  name text PRIMARY KEY, checksum text NOT NULL, applied_at timestamptz NOT NULL DEFAULT now()
);
REVOKE ALL ON tm_migrations.applied FROM PUBLIC;
DO $history$
BEGIN
  IF EXISTS (
    SELECT 1 FROM tm_migrations.applied AS applied
    WHERE NOT EXISTS (
      SELECT 1 FROM (VALUES ${known}) AS expected(name, checksum)
      WHERE expected.name = applied.name AND expected.checksum = applied.checksum
    )
  ) THEN RAISE EXCEPTION 'Migration history differs from reviewed files'; END IF;
END;
$history$;
${plan
  .map(
    ({ name, sql, checksum }) => `
SELECT NOT EXISTS(SELECT 1 FROM tm_migrations.applied WHERE name = ${literal(name)}) AS apply_migration \\gset
\\if :apply_migration
DO $order$
BEGIN
  IF EXISTS(SELECT 1 FROM tm_migrations.applied WHERE name > ${literal(name)}) THEN
    RAISE EXCEPTION 'Out-of-order migration';
  END IF;
END;
$order$;
${sql}
INSERT INTO tm_migrations.applied(name, checksum) VALUES (${literal(name)}, ${literal(checksum)});
\\endif
`,
  )
  .join("")}
COMMIT;
`;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const args = process.argv.slice(2);
    if (args.length && !(args.length === 1 && args[0] === "--sql")) {
      throw new Error("Usage: node scripts/db-migrations.mjs [--sql]");
    }
    const plan = migrationPlan();
    process.stdout.write(
      args[0] === "--sql"
        ? renderMigrationBundle(plan)
        : JSON.stringify(
            plan.map(({ name, checksum }) => ({ name, checksum })),
            null,
            2,
          ) + "\n",
    );
  } catch {
    // No filesystem/SQL/provider exception details in CLI errors.
    process.stderr.write(
      "Migration planning failed; inspect filenames and SQL-only contents.\n",
    );
    process.exitCode = 1;
  }
}
