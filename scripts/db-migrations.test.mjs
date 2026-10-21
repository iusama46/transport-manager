import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { migrationPlan, renderMigrationBundle } from "./db-migrations.mjs";

function fixture(t) {
  const dir = mkdtempSync(join(tmpdir(), "transport-migrations-"));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  return dir;
}
test("empty migration foundation generates no schema or database effects", (t) => {
  assert.deepEqual(migrationPlan(fixture(t)), []);
  assert.equal(
    renderMigrationBundle([]),
    "-- No migrations; no database changes.\n",
  );
});
test("plans ordered immutable SQL checksums and a deliberate transactional psql bundle", (t) => {
  const dir = fixture(t);
  writeFileSync(join(dir, "20261019000002_second.sql"), "SELECT 2;");
  writeFileSync(join(dir, "20261019000001_first.sql"), "SELECT 1;");
  const plan = migrationPlan(dir);
  assert.equal(plan[0].name, "20261019000001_first.sql");
  assert.match(plan[0].checksum, /^[a-f0-9]{64}$/);
  assert.deepEqual(plan, migrationPlan(dir));
  const bundle = renderMigrationBundle(plan);
  for (const marker of [
    "BEGIN;",
    "COMMIT;",
    "pg_advisory_xact_lock",
    "Migration history differs",
    "Out-of-order migration",
    "\\if :apply_migration",
    "REVOKE ALL",
    "INSERT INTO tm_migrations.applied",
  ])
    assert.ok(bundle.includes(marker));
  assert.match(bundle, /END;\n\$history\$;/);
  assert.match(bundle, /END;\n\$order\$;/);
  writeFileSync(join(dir, plan[0].name), "SELECT 3;");
  assert.notEqual(migrationPlan(dir)[0].checksum, plan[0].checksum);
});
test("rejects malformed/duplicate filenames, empty files and psql commands", (t) => {
  for (const names of [
    ["bad.sql"],
    ["20261019000001_a.sql", "20261019000001_b.sql"],
  ]) {
    const dir = fixture(t);
    for (const name of names) writeFileSync(join(dir, name), "SELECT 1;");
    assert.throws(() => migrationPlan(dir));
  }
  for (const sql of ["", " ", "\\! unsafe", "SELECT 1;\n  \\i other.sql"]) {
    const dir = fixture(t);
    writeFileSync(join(dir, "20261019000001_test.sql"), sql);
    assert.throws(() => migrationPlan(dir));
  }
});
