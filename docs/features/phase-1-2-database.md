# FEATURE: Phase 1.2 — Supabase Database + Data-Access Foundation

## Goal and scope

Implement the user's 19 October 2026 Phase 1.2 request on `feat/trusted-access-foundations`, baseline committed Phase 1.1 `4a7b960`. Local persistence foundation only: server-only lazy PostgreSQL composition, repository/transaction context, safe errors, decimal boundary, configuration isolation assertions, internal connectivity capability and reviewed migration mechanism. No business schema/SQL migration, domain repository, Auth/RBAC/Owner/audit, Phase 1.3, provider/database access, deployment, commit or push.

Starting worktree already modified apps/web/package.json and package-lock.json with exact pg 8.23.1, @types/pg 8.23.1 and @vercel/functions 3.10.1; installed packages were present. Preserved those edits; no installs, updates, downgrades or lockfile rewrite performed. Added only a web test script to that manifest. The explicit Phase 1.2 request supersedes stale documentation-task-only wording in AGENTS for this defined implementation scope; production/migration execution prohibitions remain.

## Design and risks

Decisions/alternatives: [D99–D102](../DECISIONS.md#phase-12-persistence-implementation--19-october-2026). Direct pg is the smallest currently suitable dependency: SQL/constraints/row locks/reporting and multi-table transactions remain explicit. Drizzle's schema/query generation adds tooling without current entities; Prisma adds generation/schema/migration machinery; neither is adopted. No Supabase Auth SDK needed. Type parameters do not validate returned records; future repositories must map/validate domain results.

[Database README](../../apps/web/src/server/db/README.md) owns service/repository/query/transaction/decimal/error conventions; [ENVIRONMENT](../ENVIRONMENT.md#phase-12-postgresql-runtime-contract) owns variables and isolation limits. Lazy Node pool, shared Supabase transaction pooler, max 2 per instance, verified remote TLS, Vercel lifecycle adapter; no named prepares, session context or sockets at import. Same-client transactions commit/rollback/release, reject nesting/expired contexts and swallowed statement failures, discard after failed rollback/commit acknowledgement. No automatic retries or claim that a lost commit acknowledgement means rollback. SELECT 1 helper has no public endpoint.

NUMERIC/DECIMAL scalar/arrays and BIGINT remain strings; date-only values also remain text. Per-pool parser overrides the driver's unsafe numeric-array default without global mutation. JSON numbers remain a hazard: cast exact SQL values to text before constructing JSON; future domain calculations need exact decimal arithmetic, precision/rounding decisions and runtime validation. No financial logic or Money type implemented.

[Migration procedure](../../db/migrations/README.md): ordered immutable SQL files, offline SHA-256 planner and generated psql transaction/advisory-lock/checksum/private-ledger envelope. Empty history emits no schema/SQL effects. Human reviews actual SQL, roles, target and recovery before authorized operator execution with separate operations credentials. No runtime/build/apply hook, automatic down/push or nontransactional DDL support. SQL-only/transactional-content restrictions still require human review; this is not a security SQL parser. No migration file created or applied.

Dependency review: installed manifests identify pg/Brian Carlson/node-postgres, @types/pg/DefinitelyTyped and @vercel/functions/Vercel, with MIT/Apache-2.0 primary licenses. Lock diff adds 34 package nodes, all registry.npmjs.org URLs with integrity metadata, MIT/ISC/Apache-2.0 licenses, no new install-script flags and no existing-package version changes. This is manifest/source inspection, not tarball provenance attestation. Used the exported Vercel db-connections subpath rather than unrelated OIDC/CLI APIs. Current audit findings are recorded below; no blanket fix/downgrade.

Rollback: revert only this scoped code/config/documentation diff while preserving starting dependency edits unless separately reviewed. No DB/provider effects occurred; code rollback cannot reverse future applied migrations. Runtime/migration ownership/grants, tenant/RLS/audit controls and production recovery remain future gates under SECURITY/OPERATIONS/ROLLBACK.

## Steps and status

- Required docs, Phase 1.1 trace/source, workspace/configuration, initial dependency diff and branch/baseline inspected; implementation approach explained before edits.
- Implemented one persistence foundation with synthetic unit/config/planner/compiler tests and materially affected documentation.
- Local checks and full diff review completed. Human diff review remains before acceptance/shipping. No live integration or production readiness claim. Phase 1.3 not started.

## Verification

Executed 19 October 2026, Node v20.19.5/npm 10.8.2, existing installed Next.js 16.3.8, baseline `4a7b960` plus working diff, synthetic inputs only:

| Command / check | Actual result |
|---|---|
| `npm run test:db --workspace=@transport-manager/web` | PASS: 32 tests, zero failures/skips. Lazy composition/config required on use, parameter forwarding, same-client commit/context, callback/BEGIN/setup/query/COMMIT failures, rollback failure/discard, swallowed errors, expired/nested contexts, independent transaction calls, safe errors and exact scalar/array/date parsing |
| `node --test scripts/environment.test.mjs scripts/db-migrations.test.mjs` | PASS: 22 tests, zero failures/skips (19 configuration/ignore tests + 3 planner tests). Added independent complete DB group, env/ref/mode/user matching, TLS override/public alias rejection, local restrictions and CA shape checks; migration ordering/checksums/invalid files/empty history/bundle structure |
| `node --test scripts/config-boundary.test.mjs` | PASS: 7 reported tests including parent, six scenarios. Runs `npm run build` six times in an isolated copied nonignored source fixture without real env files/ambient secrets: missing APP_ENV fails, APP_ENV=test shell builds, synthetic preview config import builds, client config import fails, lazy DB server import builds, transitive client DB import fails specifically at server-only. Scans browser JS for config/DB variable names/code and secret sentinels. Also executes isolated `APP_ENV=test npm run typecheck` successfully across web/shared |
| `./node_modules/.bin/tsc --project apps/web/tsconfig.json --noEmit` | PASS after type corrections; additional direct TypeScript check, no source/env mutation |
| `npm run lint` | PASS, web/shared, zero warnings; final lint completed successfully |
| Scoped `./node_modules/.bin/prettier --write ...` then `--check` for changed supported code/JSON | PASS; formatter paths are configuration declarations/implementation, server/config entry, server/db TS, tests TS, vitest config, web manifest and changed/new scripts. Docs/READMEs/templates/lockfile ignored per existing policy; separate Markdown checks apply |
| `npm run format:check` | FAIL: same 51 existing UI source files as Phase 1.1; no warned file modified here |
| `node scripts/db-migrations.mjs`; `node scripts/db-migrations.mjs --sql` | PASS: `[]`; comment-only no-migration output. Planner only; no psql/DB execution |
| `npm audit --json --ignore-scripts` | First sandbox attempt failed DNS (ENOTFOUND registry.npmjs.org); permitted network retry returned audit exit 1: five HIGH findings through existing braces → micromatch → fast-glob → @next/eslint-plugin-next → eslint-config-next. All five node versions equal baseline; no added dependency flagged. No fix/downgrade applied |
| Syntax, Markdown/link/anchor/table/whitespace checks, changed-file heuristic credential scan, full tracked/new-file review and `git diff --check` | PASS; 28 changed files scanned, four expected synthetic/template credential-URL files, zero unexpected credential patterns/actual env paths; 11 Markdown files, 84 local links/anchors and 29 tables checked with zero errors |

Initial failures/corrections: first DB suite had 30/32 passing; a mock reused the same spy for pool/client, and default numeric[] conversion lost precision. Corrected the mock and implemented exact array parsing, including multidimensional/null/date-array cases. Early build/typecheck attempts then exposed pg-types' incomplete TypeId enum for PostgreSQL array OIDs 1231/1009; narrowly adapted those known OID types without suppressions and reran successfully. Diff review corrected missing PL/pgSQL END terminators in the offline bundle and added structural coverage; final three planner tests passed. No SQL was executed. Synthetic planner tests are not PostgreSQL syntax/replay/locking acceptance.

Not run: fresh npm ci (starting packages installed; no new install needed), live Supabase/PostgreSQL connectivity/TLS/transaction/concurrency/role/RLS/migration replay/capacity tests (no clearly approved isolated target supplied or inspected), Auth/financial/Owner/audit/recovery/deployment acceptance (outside scope), browser/keyboard/customer workflow checks (no UI or customer-facing feature). No protected feature or T-ID acceptance is claimed by mocked transactions/builds. No credential files read or values requested.

## Open assumptions and decisions

**VERIFIED:** branch/baseline and initial dependency edits; no DB credentials needed to build/import the shell; actual Next compiler denies DB/client imports and browser scripts exclude sentinels; transaction orchestration/error redaction and explicit exact array parsing pass synthetic tests; changed code is formatted and lint/typecheck/build pass. Existing advisories/formatter failures are preserved and reported.

**UNVERIFIED:** real target ownership/environment and runtime role privileges, TLS trust, actual PostgreSQL commit/rollback/error behavior, migration replay/checksum/advisory-lock behavior, Vercel/Supavisor lifecycle and aggregate capacity. [HANDOVER ENV-01/DB-01](../HANDOVER.md#openunverified-assumptions) tracks these; GOV-04 retains subsystem/recovery gates. Synthetic CA shape validation does not establish certificate authenticity. Workload limits require measurement.

**DISPROVEN:** driver numeric-array defaults are precision safe; installed pg-types' OID enum includes array identifiers. Both corrected with regression coverage. Initial shared-spy assumption also corrected; no remaining impact.

Security review: no credentials, environment fallback, public DB code/endpoint, raw provider logging/cause, interpolated request SQL, domain schema/Auth, unrelated UI refactor or external provider effect found. Internal SQL remains a trusted capability requiring parameterized values and allowlisted identifiers. Role naming/ref/environment checks cannot attest grants or production ownership. No external/provider modifications, connections, migrations, commits or pushes performed; only public documentation/advisory metadata read. Human review of concrete configuration/dependency/migration foundation remains before acceptance/shipping. Production Ready: NO.

Done: Phase 1.2 — Supabase Database + Data-Access Foundation.
Next: **Phase 1.3 — Company/User/Membership/Protected Owner Foundation**. Not started automatically.


## Changed-file manifest

Created (12):

- `apps/web/src/server/db/`: `client.ts`, `database.ts`, `errors.ts`, `index.ts`, `README.md`.
- `apps/web/tests/`: `database.test.ts`, `server-only.ts`; `apps/web/vitest.config.mts`.
- `scripts/db-migrations.mjs`, `scripts/db-migrations.test.mjs`, `db/migrations/README.md`, this trace.

Modified (16, including two starting dependency edits):

- `apps/web/.env.example`, `apps/web/config/environment.mjs`, `apps/web/config/environment.d.mts`, `apps/web/src/server/config/index.ts`, `apps/web/package.json`, `package-lock.json`.
- `scripts/environment.test.mjs`, `scripts/config-boundary.test.mjs`.
- `docs/ARCHITECTURE.md`, `docs/DATABASE_BACKEND_SELECTION.md`, `docs/DECISIONS.md`, `docs/ENVIRONMENT.md`, `docs/FLOW.md`, `docs/HANDOVER.md`, `docs/SECURITY.md`, `docs/TASKS.md`.

No deletions, unrelated staging, commits or pushes.

Exact final scoped formatter command:

```sh
./node_modules/.bin/prettier --check apps/web/config/environment.mjs apps/web/config/environment.d.mts apps/web/src/server/config/index.ts apps/web/src/server/db/*.ts apps/web/tests/*.ts apps/web/vitest.config.mts apps/web/package.json scripts/environment.test.mjs scripts/config-boundary.test.mjs scripts/db-migrations.mjs scripts/db-migrations.test.mjs
```

Exact final syntax/whitespace command:

```sh
node --check scripts/db-migrations.mjs && node --check scripts/db-migrations.test.mjs && node --check scripts/config-boundary.test.mjs && node --check scripts/environment.test.mjs && node --check apps/web/config/environment.mjs && git diff --check
```

The local Python checks enumerated Git changed/nonignored new paths, validated relative Markdown links/anchors and table widths, checked trailing whitespace, scanned private-key/provider-token/JWT/credential-URL patterns with only explicit synthetic/template URL candidates allowed, and confirmed zero actual env paths. Coverage excludes ignored files, Git history, binary contents and external systems; it is not comprehensive secret assurance.

## Commit/push verification — 21 October 2026

User explicitly requested committing and pushing the pending code to the existing `feat/trusted-access-foundations` branch. Earlier no-commit/no-push statements above describe the implementation session. This request does not establish acceptance/shipping review or authorize live database operations.

Rechecked baseline `4a7b960` plus the pending 28-file diff with installed dependencies and synthetic inputs:

- `npm run test:db --workspace=@transport-manager/web`: PASS, 32 tests.
- `node --test scripts/environment.test.mjs scripts/db-migrations.test.mjs`: PASS, 22 tests.
- `node --test scripts/config-boundary.test.mjs`: PASS, six scenarios/seven reported tests, including isolated `npm run build` and `APP_ENV=test npm run typecheck`, client-import denial and browser-bundle checks.
- `npm run lint`: PASS, web/shared, zero warnings.
- Exact scoped Prettier command above: PASS. Full formatting check not repeated; prior 51-file failure remains recorded above and those UI files remain unchanged.
- `git diff --check` and changed Markdown local link/anchor/table checks: PASS, 84 links and 29 tables. Targeted credential-pattern scan found no matched private keys/GitHub tokens/AWS access-key IDs or actual env paths; limited heuristic coverage, not comprehensive assurance.
- Lockfile inspection: 34 added nodes with npm registry URLs/integrity metadata, no added install-script flags and no existing package version changes. Fresh install/audit not repeated; prior advisory evidence remains dated above.

**Assumptions made:** VERIFIED that the pending files form the Phase 1.2 change and local synthetic/compiler checks pass. UNVERIFIED live target identity, privileges, TLS, migration replay and host lifecycle/capacity remain ENV-01/DB-01. No live integration/customer-path/recovery checks run because this request is source commit/push only; no customer-facing feature was added. Production Ready remains NO.
