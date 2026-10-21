# Environment setup and production configuration

Updated: 19 October 2026

## Current configuration

Phase 1.1 requires **APP_ENV**, with no default. The public shell still needs no provider credentials or network connections. Phase 1.2 adds lazy PostgreSQL composition; live Supabase PostgreSQL/Auth, Cloudinary and Vercel integration remains unverified. Development Ready v1.0: YES; Production Ready: NO. [OPERATIONS_ARCHITECTURE](OPERATIONS_ARCHITECTURE.md#deployment-and-environment-isolation) owns resource/credential isolation; this page owns the application configuration contract.

After `npm ci`, copy `apps/web/.env.example` to `apps/web/.env.local` only if it does not already exist. Keep `APP_ENV=development` and leave provider examples commented out; run `npm run dev`. Alternatively use `APP_ENV=development npm run dev` without an env file. Next loads app-local environment files, not a root monorepo env file. Preserve existing local files; never inspect/paste secret values unnecessarily. Mobile remains reserved; its template is comment-only.

Actual `.env` and `.env.*` files are ignored at every depth; only exact `.env.example` templates are allowed. Templates contain names/safe placeholders, never credentials. The ignore exception is not a secret scanner; never force-add real env files.

## Explicit environment model

| APP_ENV | Intended target |
|---|---|
| development | Dedicated local/development resources, synthetic data |
| preview | Dedicated nonproduction preview resources |
| staging | Dedicated nonproduction staging resources; same security requirements as preview |
| production | Dedicated production resources, only after separate operational approval |
| test | Isolated synthetic tests, never production credentials/data |

NODE_ENV is a compilation/runtime mode, not a resource selector: development, preview, staging and test builds may use NODE_ENV=production. Next commands set NODE_ENV; do not set it manually. APP_ENV=production is rejected when NODE_ENV is development/test. If Vercel supplies VERCEL_ENV, it must agree: development → development, preview → preview or staging, production → production. Missing/unknown APP_ENV or contradictory host scope fails; neither host scope nor NODE_ENV supplies a fallback.

## Variable contract

| Names | Classification / requirement |
|---|---|
| APP_ENV | Required server-only selector from the enum above |
| SUPABASE_ENV, SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY | Optional server-only group; all four required if any is supplied. ENV equals APP_ENV exactly. URL is an absolute HTTPS origin without credentials/path/query/fragment. Development/test also allow HTTP on localhost, 127.0.0.1 or ::1; preview/staging/production reject these local hosts |
| CLOUDINARY_ENV, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET | Optional server-only group; all four required if any is supplied. ENV equals APP_ENV exactly |
| NEXT_PUBLIC_*, EXPO_PUBLIC_* | No browser-safe variables consumed; every name with either prefix is rejected, even when blank |
| Migration/backup DB roles, R2/monitoring/signing secrets, decryption identities | Operations-only; no application getter/template exports. Separate reviewed operations custody |

Omitting an entire provider group yields `null`; it neither enables nor initializes that provider. Supplying even an empty group fails. Future consumers must require their provider contract before constructing a client; there are no fallback credentials/URLs. Supabase service-role configuration is reserved for future reviewed administration, never ordinary PostgreSQL runtime access. DB runtime credentials/TLS/pools use the Phase 1.2 contract below. Public Supabase URL/publishable identifiers are only potentially browser-safe; exposing them later requires an explicit allowlist and tests. Cloudinary identifiers remain server-side because the browser does not need them.

Unknown SUPABASE_*/CLOUDINARY_*/DATABASE_* names fail rather than being silently consumed; this includes CLOUDINARY_URL and operations SUPABASE_ACCESS_TOKEN. Anon/secret-key variants require a deliberate future contract change. Missing/blank values, padded values, obvious placeholders and invalid URL/environment combinations report variable names, never received values or underlying URL-parser exceptions. Key authenticity/authorization is not verified.

## Server and client boundaries

`apps/web/config/environment.mjs` is the pure Node parser reused by `next.config.ts` for fail-fast bootstrap validation and by `apps/web/src/server/config/index.ts` for runtime access. Its adjacent declaration defines readonly TypeScript contracts; the implementation is typechecked. Tests supply explicit input objects without global environment mutation. The bootstrap validator returns no configuration object.

Future application/server code normally calls `getServerConfig()` from `@/server/config`; direct process.env reads belong in the configuration layer and framework bootstrap. Existing NODE_ENV-only showcase gates are unchanged. UI/mobile/shared modules must never import the bootstrap parser. The runtime entry imports `server-only`, resolved by installed Next.js compiler aliases without another package. Direct/transitive Client Component imports fail compilation. The getter returns a fresh frozen snapshot with frozen provider objects, no ambient environment passthrough and no cache.

Never serialize configuration into props/API responses or log it. Server Components do not make secret props safe: return only deliberately selected non-secret data. Do not use Next's `env` option to expose secrets. No public module is created because none is needed. No SDK/client, endpoint or connection is initialized in Phase 1.1; Phase 1.2 adds lazy server-only PostgreSQL composition without import-time connections. Pure shared/domain code stays provider-independent under [ARCHITECTURE](ARCHITECTURE.md).

Environment labels are operator assertions, not proof of credential ownership. A production key falsely labelled development cannot be identified offline. Before provider use, validate approved project/product identifiers, least privilege and host secret scopes under OPERATIONS; fork/untrusted builds receive no privileged keys. These remain unverified integration/deployment gates, not established resource-isolation guarantees.

## Verification and production limits

Run `npm run lint`, `APP_ENV=test npm run typecheck`, `node --test scripts/environment.test.mjs`, `node --test scripts/config-boundary.test.mjs` and `APP_ENV=test npm run build`. The boundary test creates/removes its own isolated source fixture, uses synthetic provider sentinels and existing installed dependencies, proves a Server Component can use the getter, scans browser JavaScript and requires the corresponding Client Component build to fail. It never reads local env files or connects to providers. Its safe preview-scope probe supplies APP_ENV/VERCEL_ENV=preview while Next compiles in production mode.

For local production-mode smoke testing, use the same safe APP_ENV for build and `npm start`. Actual hosts must explicitly configure APP_ENV and reviewed values at build/runtime with separate credentials/scopes. No production credentials/deployment are required or authorized by these checks. Validate compatible rebuild/restart/rotation procedures when integrating providers; no new deployment path is adopted here.

The shell remains a public preview: no private records, authentication or protected operations. `/dev/components` remains unavailable outside Next development mode. Before protected operations exist, establish verified identity/membership, scoped permission/resource checks and direct-request/revocation/isolation tests under [SECURITY](SECURITY.md). Never load private data into this shell.

Before real use, PostgreSQL runtime/migration/backup roles require least privilege, verified TLS, bounded pools/timeouts and transaction-local tenant context. Server Components invoke authorized services, never bypass them through repositories. Recovery implementation and measured restoration remain production gates; recovery-runner credentials stay in protected private operations custody, decryption identities in independent vault/offline custody.

Phase 1.1 evidence/limitations: [feature trace](features/phase-1-1-environment.md). Historical 6 October scanning covered 89 tracked index files, excluding Git history/every possible secret format; later dated evidence remains in FINAL_ARCHITECTURE_AUDIT.md. No scan establishes comprehensive secret assurance.

## Phase 1.2 PostgreSQL runtime contract

The optional database group is independent of the Supabase Auth/API-key group. An entirely absent group keeps the shell/build working; invoking DB access without it fails. Required together: `DATABASE_ENV` (equals APP_ENV), `DATABASE_PROJECT_REF` (approved target reference), `DATABASE_URL` (server-only PostgreSQL URI). Optional `DATABASE_CA_CERT` is a PEM certificate for the reviewed remote CA, never a private key. Unknown DATABASE_* names fail. Blank/partial groups and public-prefix aliases fail without printing values.

Remote runtime uses the **dashboard-provided shared transaction pooler**: `*.pooler.supabase.com:6543/postgres`, with dedicated login `tm_runtime.<project-ref>`, and a 20-character lowercase alphanumeric project ref matching DATABASE_PROJECT_REF. Passwords must be percent-encoded. URL query/fragment options are rejected to prevent TLS/driver overrides. Remote TLS verifies certificates and hostname; use system roots or the reviewed CA. No `rejectUnauthorized:false`, privileged `postgres`/service-role identity, direct/session-mode remote runtime fallback or implicit production fallback. These syntactic checks catch misconfiguration; an approved project/host inventory and real role/grant verification are still necessary. Matching labels/ref/usernames cannot prove resource environment or least privilege.

Development/test alone may use explicit localhost/127.0.0.1/::1, port, database `postgres`, role `tm_runtime`, ref `local`, with TLS off. This is an explicit local choice, never a failed-remote fallback. Preview/staging/production reject loopback. Before any real connection, verify target/project ownership, nonproduction isolation, runtime NO SUPERUSER/NO BYPASSRLS/nonownership, minimal grants and schema/Data API restrictions under OPERATIONS/SECURITY. This task does not create roles or prove privileges. Do not provide DB secrets to fork/untrusted builds.

The [database module conventions](../apps/web/src/server/db/README.md) own pool/transaction/query/decimal/error behavior. Future DB routes require Node.js runtime. Pool bounds multiply across Vercel instances and remain workload assumptions; no live load/capacity acceptance is claimed. Configuration drift after pool creation requires runtime restart rather than silent reuse. Never serialize/log the getter, pool/config or errors/stacks.

Migrations use [reviewed SQL files and an offline planner](../db/migrations/README.md), separate direct/session connection and operations-only credentials. No application template/getter exports migration credentials, no application build/start applies migrations, and the planner never connects. Production migration execution still requires explicit human authorization. No physical business schema or SQL migration is included yet.

Additional checks: `npm run test:db --workspace=@transport-manager/web`, `node --test scripts/db-migrations.test.mjs`; the existing configuration/boundary suites now cover the DB group, lazy server import and real Client Component denial. Live connectivity/TLS, database enforcement, migration replay and host credential/resource identity remain **UNVERIFIED**.
