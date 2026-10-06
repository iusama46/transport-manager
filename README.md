# Transport Manager

Transport management system for orders, fleet operations, fuel, maintenance, billing and partner settlements.

## Project status

Setup phase: npm workspaces and a Next.js App Router dashboard shell with TypeScript, Tailwind CSS and ESLint. All 16 navigation sections and five Fuel Management subsections are clearly labelled placeholders. No operational records, authentication, persistence or financial functionality is implemented. Database and hosting selections remain open. Initial recurring service budget: $0.

## Structure

| Directory | Purpose |
|---|---|
| apps/web | Next.js dashboard shell |
| apps/mobile | Reserved for the later Expo app; no package or scaffold yet |
| packages/shared | Provider-independent TypeScript types and Zod validation |
| docs | Requirements, design, architecture and implementation checklist |

Start with [PRD](docs/PRD.md), [Decisions](docs/DECISIONS.md) and [Tasks](docs/TASKS.md). Other references: [Architecture](docs/ARCHITECTURE.md), [Design](docs/DESIGN.md), [Security](docs/SECURITY.md), [Test Plan](docs/TEST_PLAN.md) and [Memory](docs/MEMORY.md).

## Client overview

The [client overview Markdown](docs/CLIENT_OVERVIEW.md) is the main editable source. The [PDF overview](docs/client/CLIENT_OVERVIEW.pdf) and [PowerPoint presentation](docs/client/Transport_Manager_Client_Presentation.pptx) are shareable snapshots; refresh them when the source changes. The Markdown includes the 6 October custom-RBAC/audit requirements; the PDF and PowerPoint remain historical 5 October snapshots pending regeneration. These documents describe planned scope, not implemented application functionality.

## Local setup

Use Node.js 20.9 or newer and npm 10 or newer. Verified with Node.js 20.19.5 and npm 10.8.2. Run all commands from the repository root:

```sh
npm ci
npm run dev
```

Open http://localhost:3000. No environment file, API key or external service is required. Stop the server with Ctrl+C.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

`npm start` serves the production build at http://localhost:3000. Stop the development server before starting production on the same port. Linting runs separately from the production build, as required by [Next.js 16](https://nextjs.org/docs/app/getting-started/installation). Type checking includes the web and shared workspaces; `next typegen` generates route types first, so it works before a build.

```sh
npm run format:check
npm run format
```

Prettier formats implementation and configuration files; existing Markdown documentation is excluded from automatic formatting. The root lockfile pins the installed dependency tree. Use `npm install` when deliberately changing dependencies, and commit the resulting lockfile.

The shared workspace exports TypeScript source and is transpiled by Next.js. It currently contains a UI placeholder contract only. Expo, domain test runners and business workflows remain future work.

## Data and secrets

Do not commit `.refact`, credentials, environment files, private customer spreadsheets or identity documents. Actual `.env` and `.env.*` files are ignored at every directory level; reviewed `.env.example` templates are allowed. No application environment variables are needed in this phase. See [environment setup and production configuration](docs/ENVIRONMENT.md). Private data belongs outside Git, for example in the ignored `private-data/` directory.

## Verification notes

The 5 October clean source copy passed installation, linting, type checking and the production build. Latest 6 October checks fail on existing UI hook lint errors and table-library API/type incompatibilities; do not infer a passing current build from the historical result. All 21 placeholder routes passed HTTP smoke checks. Scripts use Webpack because Turbopack's CSS worker could not bind a port in the setup environment. Browser visual/keyboard review remains pending due to an unavailable browser connector. See [Tasks](docs/TASKS.md) for full evidence.

Production dependency audit reported no vulnerabilities. The full audit reported five high-severity findings in the development lint dependency chain; automatic remediation would downgrade the Next.js lint configuration to 14.x and was not applied. ESLint 9 also emits a deprecation notice. These tooling limitations are recorded for follow-up.

## Finalized access and audit requirements

Dynamic custom roles with a protected Owner/Super Admin and company-scoped granular permissions are specified in the [master permission catalog](docs/PERMISSIONS.md). The [Activity Log contract](docs/AUDIT.md) defines immutable, redacted global and record history. These requirements are finalized; implementation remains pending. Existing navigation is the original 16-section shell, while the updated design adds Activity Log and Roles & Permissions workflows.
