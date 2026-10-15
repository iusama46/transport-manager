# Environment setup and production configuration

Updated: 16 October 2026

## Current configuration

The web shell requires **zero application environment variables**. `apps/web/.env.example` and `apps/mobile/.env.example` intentionally contain comments only. Mobile is reserved, not an executable Expo app. PostgreSQL on Supabase Free and Next.js full-stack/TypeScript Route Handlers/services are selected for V1 testing (DATABASE_BACKEND_SELECTION.md); no database project/backend/schema/credential exists. Supabase Auth, Cloudinary for development/production and Vercel are selected; paid production hosting is acceptable. Integrations are unimplemented; recovery architecture B1 is CLOSED and Development Ready v1.0: YES, Production Ready: NO. [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md) specifies the Development / Preview-Staging / Production isolation matrix, public versus secret classification and deployment runbook requirements.

From the repository root, run `npm ci` and `npm run dev`. No environment file is needed. If local configuration is added later, copy `apps/web/.env.example` to `apps/web/.env.local` and fill only documented variables. Next.js reads environment files from the web app directory; do not rely on a root monorepo environment file. Do not manually set `NODE_ENV`; the Next commands set their execution mode.

Git ignores `.env` and `.env.*` at every depth except the exact name `.env.example`. Templates must contain only reviewed names and safe placeholders; the exception is not a secret scanner. Never force-add actual environment files.

## Server and client boundaries

`apps/web/config/environment.mjs` runs from `next.config.ts` for development, build and production start. It accepts the current empty required-variable list and rejects all `NEXT_PUBLIC_` and `EXPO_PUBLIC_` names because neither app currently needs public configuration. Errors list names, never values. Host/runtime variables such as `PATH`, `PORT` and `NODE_ENV` are not application secrets and are not required by this validator.

When a service is implemented, add its actual required names to the validator call, add format validation appropriate to that service, test missing/invalid cases, and update the relevant template and this document in the same change. The existing required-name helper rejects absent, empty and whitespace-only values. It does not currently validate any provider configuration because none exists.

Keep secret consumption in server-only modules, with a framework server-only import boundary for future runtime service code. Never import server configuration into client components, mobile, or shared packages; never serialize secrets into props, API responses or logs. Do not use Next's `env` configuration to expose secrets. Both public prefixes designate bundled client data, not secret storage. Any future public configuration must use an explicit reviewed allowlist and contain only values safe for anyone to read. The current Node-only validator returns no ambient configuration object.

## Production

Run `npm ci`, `npm run lint`, `npm run typecheck`, `node --test scripts/environment.test.mjs`, `npm run build`, then `npm start`. The current application is a public UI preview only; no deployment is claimed: no business records, authentication or protected operations exist. Do not load private data into this shell or describe it as an authenticated production system. `/dev/components` already rejects non-development requests on the server.

No application secrets are currently needed in production. Once providers are approved, inject required secrets through the host's protected server environment, separately for each environment, and supply any variables required during both build and runtime. Do not copy local env files into source, static assets or deployment artifacts. Public bundled values require rebuilding when changed. Document rotation and validate runtime configuration for any standalone/container deployment path before adopting it; the current supported command is `npm start`.

Before implementing protected operations, establish verified server identity and active membership, enforce approved action permissions and operating-company/record scope in every read and mutation, and test direct requests, guessed IDs, revoked sessions and cross-company access. Client role flags and navigation visibility are never authorization. Supabase Auth is selected; its implementation and staff-specific permission assignments remain release gates. Dynamic custom RBAC and immutable company-aware audit requirements are finalized in [PERMISSIONS.md](PERMISSIONS.md) and [AUDIT.md](AUDIT.md), but are not implemented. Never pass credentials into audit payloads.

## Verification scope

On 6 October 2026, a targeted scan of all 89 tracked index files found no actual environment files or recognized credential patterns (private keys, common provider tokens, credential-bearing database URLs and quoted secret assignments). Office XML members were also inspected. Findings, if any, must be reported as file/line locations without values. This is a heuristic current-index review, not a complete secret audit, PDF content extraction, Git-history scan or assurance that every possible credential format is absent. Rotate/revoke any subsequently discovered credential; deleting it from a file is insufficient.

## Selected full-stack server boundary — clarified 12 October 2026

[DATABASE_BACKEND_SELECTION.md](DATABASE_BACKEND_SELECTION.md) selects Next.js Route Handlers plus modular authorized server services/repositories, replacing separate NestJS. Future DB URL/runtime credentials belong only to server-only Next.js composition/repository modules and restricted migration/backup runners. Browser/Expo and client/shared UI imports never receive them; Next environment bundling/public prefixes must not expose them. Server Components can call authorized read services, not bypass them through database adapters. No environment variable/template/validator code is added by this documentation revision.

Future server configuration validates required values with value-free errors, TLS/pool/timeouts and separate runtime/migration/backup roles per environment. On Vercel, use protected environment scopes and isolate preview/test from production DB credentials/data; do not connect or query protected data during builds/prerendering. The required isolation matrix and preview policies are defined in OPERATIONS_ARCHITECTURE.md; configure and test them during integration. Rotation updates pools/runners and revokes old access with tested connectivity/revocation. Secret-bearing module entry points use server-only import protection; pure domain/service contracts contain no Next/React/Nest/provider dependencies.

Current shell still requires zero variables and has no business API/database schema/credential. Selected Supabase Auth/Cloudinary/Vercel integrations remain unimplemented; production paid plans are acceptable. Independent database/Auth/file recovery design is selected in OPERATIONS_ARCHITECTURE.md (B1 CLOSED); its successful implemented restore remains a production gate. Recovery-runner credentials live in a protected private operations repository, with decryption identities in independent vault/offline custody, never application/preview secrets. No provisioning/deployment occurred. The 16 October secret scan/evidence and limitations are in FINAL_ARCHITECTURE_AUDIT.md.
