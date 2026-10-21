# FEATURE: Phase 1.1 — Environment + Server Configuration Foundation

## Goal and scope

Implement the user's 18 October 2026 configuration-only request on `feat/trusted-access-foundations`, from merged baseline `0b66667`. Explicit environment selection, typed immutable server configuration, value-free validation and a compiler-enforced client boundary. No provider SDK, network connection, database/model/migration, Auth/RBAC/audit, infrastructure, deployment or Phase 1.2 work. No commit/push requested.

## Design and risks

Reuse the existing Node parser/test suite and Next bootstrap call. Require `APP_ENV`; accept development, preview, staging, production and test without a NODE_ENV fallback. Optional provider contracts are all-or-nothing and require matching explicit environment labels; no credentials are invented. Next's existing `server-only` compiler alias protects the runtime getter. No dependency changes. [ENVIRONMENT](../ENVIRONMENT.md) owns the variable contract; [SECURITY](../SECURITY.md) and [OPERATIONS](../OPERATIONS_ARCHITECTURE.md#deployment-and-environment-isolation) retain security/isolation requirements.

Labels cannot prove credential ownership or independently identify production resources. Real resource identity, host secret scopes and untrusted-build isolation require reviewed integration evidence before provider use. No configuration object may be serialized/logged. Rollback is a scoped code/configuration revert under [ROLLBACK](../ROLLBACK.md), with no provider/data effects; the new APP_ENV requirement must be accounted for by future hosts/operators.

## Steps and status

- Inspection and implementation proposal completed; clean initial tree, foundation branch fast-forwarded to merged main.
- Configuration/parser/typed server entry and web template implemented; local verification completed.
- Updated ENVIRONMENT/HANDOVER/TASKS and corrected materially stale setup/security/template descriptions in README/SECURITY/OPERATIONS. Final human diff review remains pending; no release acceptance, commit/push or Phase 1.2 execution.

## Verification

Executed on 18 October 2026, Node 20.19.5/npm 10.8.2, merged baseline `0b66667` plus this working diff; existing installed Next.js 16.3.8 dependencies, synthetic configuration only:

- `node --test scripts/environment.test.mjs scripts/config-boundary.test.mjs` — PASS: 20 reported tests, 0 failures/skips (15 parser/ignore tests plus four boundary scenarios and their parent). Explicit-input parsing, missing/invalid values, URL rules, provider/host environment conflicts, placeholders/redaction, immutability and recursive ignores covered.
- The boundary test executes `npm run build` four times in its own isolated tracked/untracked nonignored source fixture without local env files: missing APP_ENV must fail; APP_ENV=test with no provider group must build; a Server Component using the getter with APP_ENV/VERCEL_ENV=preview and synthetic provider groups must build; the corresponding transitive Client Component import must fail specifically at the `server-only` boundary with the expected import chain. Browser JavaScript contains neither privileged variable names/parser marker nor synthetic secret sentinels. No provider SDK/network call exists. Generated fixture cleanup does not touch live caches.
- Initial boundary run: missing-environment and positive/bundle checks passed, but the negative test assertion failed on Next's diagnostic wording. Actual compiler denial already occurred. Corrected the assertion to require the actual server-only diagnostic and each import-chain module; final full suite passed. No protection/test was disabled.
- `npm run lint` — PASS, web/shared, zero warnings. `APP_ENV=test npm run typecheck` — PASS, web/shared with route generation. Final review found the declaration originally shadowed the JavaScript implementation during checking; explicitly included config/environment.mjs in web tsconfig and reran typecheck, builds and tests successfully. `./node_modules/.bin/tsc --project apps/web/tsconfig.json --listFilesOnly` confirmed both implementation/declaration are in the program. Restored only Next's generated next-env.d.ts route-path churn afterward.
- `./node_modules/.bin/prettier --check apps/web/config/environment.mjs apps/web/config/environment.d.mts apps/web/src/server/config/index.ts apps/web/tsconfig.json scripts/environment.test.mjs scripts/config-boundary.test.mjs` — PASS. `npm run format:check` — FAIL on the same 51 pre-existing UI source files recorded in setup closeout; none are modified. Docs/README/template are ignored by Prettier; documentation/link/whitespace checks apply separately.
- `node --check scripts/environment.test.mjs` and `node --check scripts/config-boundary.test.mjs` — PASS. `git diff --check` — PASS. Full tracked diff and all three new files inspected; 14 affected files, no deletions, dependency/lockfile/ignore changes or unrelated source edits.
- Local Python Markdown validation — PASS: 34 files, 229 local links/anchors, 86 tables, no errors. Changed/new-file heuristic secret scan — 14 files, zero unexpected private-key/provider-token/JWT/credential-URL candidates; one explicit synthetic negative URL fixture. Zero tracked/nonignored actual env paths. No configuration logging, public allowlist/exposure, fallback provider/production credentials, client/shared/mobile config imports or external connections found. Heuristic scanning excludes ignored files/history/compressed binary contents/external accounts and is not comprehensive secret assurance.

Not run: fresh npm ci/current advisory audit (no dependency change, existing installation reused), browser/keyboard/screen-reader tests (configuration-only, no customer UI change), real PostgreSQL/Auth/Cloudinary integration/concurrency/recovery/deployment acceptance (not implemented/authorized). Synthetic label/bundle tests do not establish real provider identity, credential isolation, T106 deployment acceptance or production readiness. No actual credentials were requested, printed or needed; isolated fixtures exclude local env files and ambient secret values.

## Open assumptions and decisions

**VERIFIED:** clean initial working tree; foundation branch fast-forwarded to merged main; required APP_ENV without credentials is enough to build the shell; installed Next compiler aliases enforce server-only imports without a new dependency; parser emits value-free errors and immutable snapshots. **UNVERIFIED:** real provider identity/credential scopes, fork isolation and recovery controls, tracked in [HANDOVER](../HANDOVER.md#openunverified-assumptions). **DISPROVEN:** initial assumptions about the exact client-import diagnostic wording and automatic implementation coverage despite the adjacent declaration; corrected and rerun with actual compiler/file-list evidence. No architecture/provider/business decision changes.

Remaining risks: environment labels can be misdeclared, configuration objects could still be explicitly serialized by future server code, and actual host/credential/rotation/deployment controls remain unverified. Existing formatting debt, current advisory review and stale client PDF/PPT are unchanged. No external infrastructure/provider was accessed or modified. Exact next task: **Phase 1.2 — Supabase Database + Data-Access Foundation**, only after separate authorization; not started.
