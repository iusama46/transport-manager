# Environment setup and production configuration

Updated: 6 October 2026

## Current configuration

The web shell requires **zero application environment variables**. `apps/web/.env.example` and `apps/mobile/.env.example` intentionally contain comments only. Mobile is reserved, not an executable Expo app. Database, authentication, storage and hosting remain unresolved; no credentials or provider-specific configuration should be invented.

From the repository root, run `npm ci` and `npm run dev`. No environment file is needed. If local configuration is added later, copy `apps/web/.env.example` to `apps/web/.env.local` and fill only documented variables. Next.js reads environment files from the web app directory; do not rely on a root monorepo environment file. Do not manually set `NODE_ENV`; the Next commands set their execution mode.

Git ignores `.env` and `.env.*` at every depth except the exact name `.env.example`. Templates must contain only reviewed names and safe placeholders; the exception is not a secret scanner. Never force-add actual environment files.

## Server and client boundaries

`apps/web/config/environment.mjs` runs from `next.config.ts` for development, build and production start. It accepts the current empty required-variable list and rejects all `NEXT_PUBLIC_` and `EXPO_PUBLIC_` names because neither app currently needs public configuration. Errors list names, never values. Host/runtime variables such as `PATH`, `PORT` and `NODE_ENV` are not application secrets and are not required by this validator.

When a service is implemented, add its actual required names to the validator call, add format validation appropriate to that service, test missing/invalid cases, and update the relevant template and this document in the same change. The existing required-name helper rejects absent, empty and whitespace-only values. It does not currently validate any provider configuration because none exists.

Keep secret consumption in server-only modules, with a framework server-only import boundary for future runtime service code. Never import server configuration into client components, mobile, or shared packages; never serialize secrets into props, API responses or logs. Do not use Next's `env` configuration to expose secrets. Both public prefixes designate bundled client data, not secret storage. Any future public configuration must use an explicit reviewed allowlist and contain only values safe for anyone to read. The current Node-only validator returns no ambient configuration object.

## Production

Run `npm ci`, `npm run lint`, `npm run typecheck`, `node --test scripts/environment.test.mjs`, `npm run build`, then `npm start`. Current deployment serves a public UI preview only: no business records, authentication or protected operations exist. Do not load private data into this shell or describe it as an authenticated production system. `/dev/components` already rejects non-development requests on the server.

No application secrets are currently needed in production. Once providers are approved, inject required secrets through the host's protected server environment, separately for each environment, and supply any variables required during both build and runtime. Do not copy local env files into source, static assets or deployment artifacts. Public bundled values require rebuilding when changed. Document rotation and validate runtime configuration for any standalone/container deployment path before adopting it; the current supported command is `npm start`.

Before implementing protected operations, establish verified server identity and active membership, enforce approved action permissions and operating-company/record scope in every read and mutation, and test direct requests, guessed IDs, revoked sessions and cross-company access. Client role flags and navigation visibility are never authorization. Authentication/provider selection and the role matrix remain release gates.

## Verification scope

On 6 October 2026, a targeted scan of all 89 tracked index files found no actual environment files or recognized credential patterns (private keys, common provider tokens, credential-bearing database URLs and quoted secret assignments). Office XML members were also inspected. Findings, if any, must be reported as file/line locations without values. This is a heuristic current-index review, not a complete secret audit, PDF content extraction, Git-history scan or assurance that every possible credential format is absent. Rotate/revoke any subsequently discovered credential; deleting it from a file is insufficient.
