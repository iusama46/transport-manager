# Environment setup and production configuration

Updated: 18 October 2026

## Current configuration

Phase 1.1 requires **APP_ENV**, with no default. The public shell still needs no provider credentials or network connections. Supabase PostgreSQL/Auth, Cloudinary and Vercel remain selected but unintegrated. Development Ready v1.0: YES; Production Ready: NO. [OPERATIONS_ARCHITECTURE](OPERATIONS_ARCHITECTURE.md#deployment-and-environment-isolation) owns resource/credential isolation; this page owns the application configuration contract.

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

Omitting an entire provider group yields `null`; it neither enables nor initializes that provider. Supplying even an empty group fails. Future consumers must require their provider contract before constructing a client; there are no fallback credentials/URLs. Supabase service-role configuration is reserved for future reviewed administration, never ordinary PostgreSQL runtime access. DB runtime credentials/TLS/pools belong to Phase 1.2. Public Supabase URL/publishable identifiers are only potentially browser-safe; exposing them later requires an explicit allowlist and tests. Cloudinary identifiers remain server-side because the browser does not need them.

Unknown SUPABASE_*/CLOUDINARY_* names fail rather than being silently consumed; this includes CLOUDINARY_URL and operations SUPABASE_ACCESS_TOKEN. Anon/secret-key variants require a deliberate future contract change. Missing/blank values, padded values, obvious placeholders and invalid URL/environment combinations report variable names, never received values or underlying URL-parser exceptions. Key authenticity/authorization is not verified.

## Server and client boundaries

`apps/web/config/environment.mjs` is the pure Node parser reused by `next.config.ts` for fail-fast bootstrap validation and by `apps/web/src/server/config/index.ts` for runtime access. Its adjacent declaration defines readonly TypeScript contracts; the implementation is typechecked. Tests supply explicit input objects without global environment mutation. The bootstrap validator returns no configuration object.

Future application/server code normally calls `getServerConfig()` from `@/server/config`; direct process.env reads belong in the configuration layer and framework bootstrap. Existing NODE_ENV-only showcase gates are unchanged. UI/mobile/shared modules must never import the bootstrap parser. The runtime entry imports `server-only`, resolved by installed Next.js compiler aliases without another package. Direct/transitive Client Component imports fail compilation. The getter returns a fresh frozen snapshot with frozen provider objects, no ambient environment passthrough and no cache.

Never serialize configuration into props/API responses or log it. Server Components do not make secret props safe: return only deliberately selected non-secret data. Do not use Next's `env` option to expose secrets. No public module is created because none is needed. No SDK/client, endpoint or connection is initialized in Phase 1.1. Pure shared/domain code stays provider-independent under [ARCHITECTURE](ARCHITECTURE.md).

Environment labels are operator assertions, not proof of credential ownership. A production key falsely labelled development cannot be identified offline. Before provider use, validate approved project/product identifiers, least privilege and host secret scopes under OPERATIONS; fork/untrusted builds receive no privileged keys. These remain unverified integration/deployment gates, not established resource-isolation guarantees.

## Verification and production limits

Run `npm run lint`, `APP_ENV=test npm run typecheck`, `node --test scripts/environment.test.mjs`, `node --test scripts/config-boundary.test.mjs` and `APP_ENV=test npm run build`. The boundary test creates/removes its own isolated source fixture, uses synthetic provider sentinels and existing installed dependencies, proves a Server Component can use the getter, scans browser JavaScript and requires the corresponding Client Component build to fail. It never reads local env files or connects to providers. Its safe preview-scope probe supplies APP_ENV/VERCEL_ENV=preview while Next compiles in production mode.

For local production-mode smoke testing, use the same safe APP_ENV for build and `npm start`. Actual hosts must explicitly configure APP_ENV and reviewed values at build/runtime with separate credentials/scopes. No production credentials/deployment are required or authorized by these checks. Validate compatible rebuild/restart/rotation procedures when integrating providers; no new deployment path is adopted here.

The shell remains a public preview: no private records, authentication or protected operations. `/dev/components` remains unavailable outside Next development mode. Before protected operations exist, establish verified identity/membership, scoped permission/resource checks and direct-request/revocation/isolation tests under [SECURITY](SECURITY.md). Never load private data into this shell.

Future PostgreSQL runtime/migration/backup roles require least privilege, verified TLS, bounded pools/timeouts and transaction-local tenant context. Server Components invoke authorized services, never bypass them through repositories. Recovery implementation and measured restoration remain production gates; recovery-runner credentials stay in protected private operations custody, decryption identities in independent vault/offline custody.

Phase 1.1 evidence/limitations: [feature trace](features/phase-1-1-environment.md). Historical 6 October scanning covered 89 tracked index files, excluding Git history/every possible secret format; later dated evidence remains in FINAL_ARCHITECTURE_AUDIT.md. No scan establishes comprehensive secret assurance.
