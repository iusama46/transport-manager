# Transport Manager

Transport management system for orders, fleet operations, fuel, maintenance, billing and partner settlements.

## Project status

Final V1 selections: Next.js/TypeScript full-stack REST `/api/v1/*`, modular authorized services/repositories, Supabase PostgreSQL, Supabase Auth and Cloudinary for development/production, hosted on Vercel with an appropriate paid production plan permitted. Business requirements/policies and conceptual model remain finalized. **Development Ready v1.0: YES. B1: CLOSED** — the recovery architecture is selected in OPERATIONS_ARCHITECTURE.md. Production Ready: NO; infrastructure, runtime security/operational checks and measured full restore remain unimplemented/unverified. Implementation remains the public UI/environment shell only. See [final audit](docs/FINAL_ARCHITECTURE_AUDIT.md) and [operations architecture](docs/OPERATIONS_ARCHITECTURE.md).

Recovery selection: Supabase Pro + seven-day PITR on eligible compute, GitHub Actions every three hours to a separate private Cloudflare R2 recovery account, independent database/Auth/Cloudinary generations with tiered retention, client-side encryption and external freshness alerts. RPO <= 6 hours and RTO <= 4 hours are objectives pending measured testing. The three-hour cadence provides headroom for the proposed six-hour RPO. No infrastructure, backup job or restore was executed. Next phase, only when authorized: isolated development infrastructure and trusted access/Owner/RBAC/audit foundation.

## AI and developer entry point

Start with [AGENTS.md](AGENTS.md), the AI operating manual, then read **[HANDOVER](docs/HANDOVER.md) → [CONSTRAINTS](docs/CONSTRAINTS.md) → [ARCHITECTURE](docs/ARCHITECTURE.md) → task-relevant authorities**. HANDOVER answers where we are now; MEMORY holds durable context; Git owns detailed history. Package manifests/lockfile are the dependency inventory.

Normal work is one coherent change, actual diff review and applicable [TEST_PLAN](docs/TEST_PLAN.md#ai-change-verification-gate) checks. Update HANDOVER if state changed and DECISIONS only for a meaningful decision; use [feature/bug traces](AGENTS.md#featurebug-trace-rule) only when warranted. Before shipping a meaningful customer-facing subsystem, require its [Defense](docs/defense/TEMPLATE.md) and [pre-ship checklist](docs/PRE_SHIP_CHECKLIST.md). Specialized [flow](docs/FLOW.md), [threat](docs/THREAT.md), [failure](docs/FAILURE.md) and [rollback](docs/ROLLBACK.md) maps remain separate. Development Ready v1.0: YES; Production Ready: NO. Phase 1.1 implements the environment/server configuration boundary; subsequent trusted-access work remains pending.

## Structure

| Directory | Purpose |
|---|---|
| apps/web | Next.js dashboard shell |
| apps/mobile | Reserved for the later Expo app; no package or scaffold yet |
| packages/shared | Provider-independent TypeScript types and Zod validation |
| docs | Requirements, design, architecture and implementation checklist |

After the entry reading above, use [PRD](docs/PRD.md), [Decisions](docs/DECISIONS.md) and [Tasks](docs/TASKS.md) for scope/decision/delivery detail. Other references: [Data Model](docs/DATA_MODEL.md), [Database/Backend Selection](docs/DATABASE_BACKEND_SELECTION.md), [Architecture](docs/ARCHITECTURE.md), [Design](docs/DESIGN.md), [Security](docs/SECURITY.md), [Test Plan](docs/TEST_PLAN.md) and [Memory](docs/MEMORY.md).

## Client overview

The [client overview Markdown](docs/CLIENT_OVERVIEW.md) is the main editable source. The [PDF overview](docs/client/CLIENT_OVERVIEW.pdf) and [PowerPoint presentation](docs/client/Transport_Manager_Client_Presentation.pptx) are shareable snapshots; refresh them when the source changes. The Markdown includes the finalized 9 October business capabilities and earlier custom-RBAC/audit requirements; the PDF and PowerPoint remain historical 5 October snapshots pending regeneration. These documents describe planned scope, not implemented application functionality.

## Local setup

Use Node.js 20.9 or newer and npm 10 or newer. Verified with Node.js 20.19.5 and npm 10.8.2. Run all commands from the repository root:

```sh
npm ci
cp -n apps/web/.env.example apps/web/.env.local
npm run dev
```

Open http://localhost:3000. The web template sets required `APP_ENV=development`; leave provider groups commented out. No API key or external service is required. Stop the server with Ctrl+C. If `.env.local` already exists, preserve it and set only the documented variable.

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

Prettier formats implementation/configuration files and root AGENTS.md; existing docs/README Markdown is excluded from automatic formatting. Check the agent entry with `./node_modules/.bin/prettier --check AGENTS.md`. The root lockfile pins the installed dependency tree. Use `npm install` when deliberately changing dependencies, and commit the resulting lockfile.

The shared workspace exports TypeScript source and is transpiled by Next.js. It currently contains a UI placeholder contract only. Expo, domain test runners and business workflows remain future work.

## Data and secrets

Do not commit `.refact`, credentials, environment files, private customer spreadsheets or identity documents. Actual `.env` and `.env.*` files are ignored at every directory level; reviewed `.env.example` templates are allowed. `APP_ENV` is required; provider credentials remain optional inactive contracts and all public-prefix variables are rejected. See [environment setup and production configuration](docs/ENVIRONMENT.md). Private data belongs outside Git, for example in the ignored `private-data/` directory.

## Verification notes

The 5 October clean source copy passed installation, linting, type checking and the production build. The 6 October UI hook lint and table-library API/type failures were fixed on 9 October: the recorded lint/type checks and isolated production build passed. Chrome verification covers the component showcase table; see Tasks for scope and evidence. All 21 placeholder routes passed HTTP smoke checks. Scripts use Webpack because Turbopack's CSS worker could not bind a port in the setup environment. Broader browser/accessibility acceptance remains pending; the later table interactions do not complete it. See [Tasks](docs/TASKS.md) for full evidence.

The historical 5 October production dependency audit reported no vulnerabilities. The full audit reported five high-severity findings in the development lint dependency chain; automatic remediation would downgrade the Next.js lint configuration to 14.x and was not applied. ESLint 9 also emits a deprecation notice. These tooling limitations are recorded for follow-up.

## Finalized access and audit requirements

Dynamic custom roles with a protected Owner/Super Admin and company-scoped granular permissions are specified in the [master permission catalog](docs/PERMISSIONS.md). The [Activity Log contract](docs/AUDIT.md) defines immutable, redacted global and record history. These requirements are finalized; implementation remains pending. Existing navigation is the original 16-section shell, while the updated design adds Activity Log and Roles & Permissions workflows.

## Historical milestones — superseded by the 16 October final audit

The following dated notes preserve prior decisions/evidence. Their next-phase, budget, readiness and unresolved-provider statements describe their dates, not current selections. Current readiness is the final audit above.

### Business scope reconciliation — 9 October 2026

[PRD](docs/PRD.md) and [Decisions](docs/DECISIONS.md) now specify finalized V1 capabilities, including flexible Orders/Trips, historical rates and currencies, three ledgers, controlled financial corrections, custom expenses/documents, accounts, auto-approval, full export and multiple daily automatic backups. Bulk import and configurable/manual approvals are V2. Business implementation remains not started; the existing shell/environment foundations are unchanged. Business Requirements and Business Policies are Finalized; no material business-policy gaps remain. Final Conceptual Data Model Review is next. Unselected technical providers and current readiness are recorded in the [documentation review](docs/DOCUMENTATION_REVIEW.md). Client PDF/PPT snapshots remain historical.

### Final business-policy review status — 9 October 2026

V1 now explicitly covers configurable Bill To, commissions/deductions, multi-consignee Orders, discounts/rounding, same-currency invoice settlement, quantity conversion, configurable shortage/remaining basis, rate specificity/overlap validation, calculated-rate/manual-total pricing, manual Order completion, controlled correction/rebilling, invoice-date management revenue, shared expense allocation, expiry warnings, Owner safeguards and retention-by-default. Multiple daily automatic backups and a documented restore tested before production remain mandatory.

V2/Future defers configurable document-expiry assignment blocking and cross-currency invoice settlement/allocation if pursued, alongside controlled bulk import/manual approvals and existing deferred items. Next: Final Conceptual Data Model Review → Database/Backend Selection → Auth/Storage/Hosting/Backup Architecture → Final Architecture Audit → Development Ready v1.0 → Implementation. The project has not reached Development Ready v1.0; no code/providers/runtime tests were changed by this review.

### Conceptual model review — 10 October 2026

Conceptual Data Model: FINALIZED. [DATA_MODEL.md](docs/DATA_MODEL.md) now owns the provider-independent entities, relationships/cardinalities, historical snapshots, financial/tenant invariants, atomic boundaries and database-selection requirements. This supersedes the dated “conceptual review next” milestones above. Next: DATABASE / BACKEND SELECTION, then auth/storage/hosting/backup architecture and final architecture audit before assessing Development Ready v1.0. No database/provider, physical schema or business implementation was selected/added by this documentation review.

### Development database/backend selection — 12 October 2026

Current clarified V1 stack: Next.js Web Dashboard + thin /api/v1/* Route Handlers → modular authorized server services/repositories → Supabase PostgreSQL. Future Expo calls the same REST APIs. Separate NestJS is deferred; services remain portable for later extraction. Server-only services own authorization/business/financial workflows; client/mobile cannot access repositories or protected Supabase endpoints directly. Drizzle ORM/node-postgres is a recommendation, not an approved dependency/schema. The current repository still has no business backend/database project/API or credentials; existing setup commands remain unchanged.

[DATABASE_BACKEND_SELECTION.md](docs/DATABASE_BACKEND_SELECTION.md) evaluates PostgreSQL/model atomicity, current official Free limits, growth assumptions, Prisma/Drizzle, RLS/least privilege, recovery and portability. Supabase Free is development/testing only: no managed automatic backups/PITR and no compliant $0 production recovery demonstrated. Mandatory multiple-daily automated backups and a documented successful full restore—including audit/private files—remain production gates.

This supersedes the earlier dated “database selection next/no provider selected” phase wording for development only. Next: AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE in a separate task; auth/private files/production DB plan/backups remain unselected; Vercel hosting direction is selected, with plan/eligibility/configuration unresolved. Development Ready v1.0 is not declared and no production deployment was performed.

### V1 framework re-evaluation — later 12 October 2026

Next.js full-stack supersedes the earlier separate NestJS choice. Keep handlers thin, server-only composition/auth/database boundaries explicit, and domain/service/repository contracts free of HTTP/framework objects so extraction later does not duplicate rules. Vercel is the selected deployment direction; $0 testing remains a target subject to its personal/non-commercial Hobby restrictions and quotas, not a business-hosting guarantee. Database pooling, short durable transactions and private file/job delivery must be evaluated under function limits. No endpoint/deployment or plan is created; the conceptual model and mandatory complete backup/restore gates remain unchanged.
