# Project Memory
Updated: 5 October 2026  
Purpose: Project continuity only; no personal biography or credentials.

## Current state
Setup phase completed locally. npm workspaces contain the Next.js dashboard shell and a shared TypeScript/Zod package. All business screens are clearly labelled placeholders with no operational data. Lint, type checks and the production build passed. Nothing has been deployed; database/provider selection and migration remain open.

## Read order
1. [PRD.md](PRD.md): business scope, requirements and acceptance criteria.
2. [DECISIONS.md](DECISIONS.md): confirmed/proposed/open choices.
3. [ARCHITECTURE.md](ARCHITECTURE.md): implementation boundaries and logical data model.
4. [DESIGN.md](DESIGN.md): navigation and interaction specifications.
5. [SECURITY.md](SECURITY.md): access and integrity requirements.
6. [TEST_PLAN.md](TEST_PLAN.md): planned validation and release gates.

## Facts to preserve
- One transport business; track vehicles owned by other companies.
- Dashboard first using planned Next.js/TypeScript; Expo later.
- Customer is the direct customer; Consignee (Receiver) is their customer receiving goods, formerly Party.
- Orders can be outsourced to a transport partner. Ownership and subcontracting are separate.
- Customer receipts and partner payments have independent balances.
- Outsourcing is a view of the same orders, not duplicated jobs.
- Bills must support more than 14 rows and multipage printing.
- $0 recurring service budget; no paid plan or add-on approval.
- Database choice remains open. MongoDB was raised later; no migration is authorized.
- Do not infer payer, tax, commission type, vehicle owner or missing payment amount from ambiguous source cells.

## Data references
Existing business sources: Drivers List - Drivers.csv; Fleet Operations Tracker - Vehicle Tracking.csv; Orders 2026 - August.csv; Petroleum_2026 (2).xlsx; Munir_Orders.xlsx.
Prior review found the driver file header-only, 77 populated fleet body rows and 811 populated order body rows. Counts are not validated import totals. Order dates extend beyond the filename’s August label.
Known cleanup: mixed dates, registration case variations, text quantities, inconsistent payment labels and Paid values in Party. Source spreadsheets remain unchanged.
Munir sample: fare 100,000, commission 3,000, net 97,000, advance 30,000 and balance 67,000. Direction/meaning of settlement must be confirmed.

## Work completed
- Earlier PRD v0.2 retrieved as the baseline.
- Created seven sibling Markdown documents with requested filenames.
- Retained PRD requirement and acceptance IDs for traceability.
- Added proposed technical/UX/security design and test cases, clearly distinguished from implemented features.

## Next work
Resolve O01 database/provider choice before persistence code. Resolve O02–O06 before their financial/order rules. Confirm identity/locale and users. Validate a no-cost deployable vertical slice and backup plan. Then implement master records, orders/outsourcing, costs, billing/settlements and reports in phases.
Offline sync, GPS, external portals, payroll and full accounting remain outside the initial PRD unless explicitly added.

## Maintenance rules
Treat PRD as scope authority and DECISIONS as decision history. Update this file after completed milestones, recording actual validation and limitations. Never report planned tests as passing. Keep secrets, production data dumps and private document contents out of these documents. New user requirements supersede prior proposals when explicitly stated.

## Repository foundation — 5 October 2026

Repository: https://github.com/iusama46/transport-manager. User authorized adding documents despite public visibility. No business source spreadsheets or credentials are included. Monorepo folders: apps/web, apps/mobile, packages/shared, docs. TASKS.md is the ordered implementation checklist, beginning with setup, authentication, roles/permissions and user management. Application implementation remains not started.

Fuel scope now includes multiple suppliers and their branches, branch payments and central payments allocated across branches of one supplier. PRD FR-12 and AC-19–22 capture this extension; companion documents include model, UX, security and test requirements.

## Setup milestone — 5 October 2026

This supersedes the historical “implementation not started” foundation note above. User explicitly requested npm workspaces, Next.js App Router with TypeScript/Tailwind/ESLint, a shared types/validation package, and dashboard navigation only.

- Root private npm workspace and lockfile added. Web uses Next.js 16.3.8, React 19 and Tailwind 4; shared exports a provider-independent Zod UI placeholder contract and inferred type, consumed by web.
- Sidebar, header, overview and 15 other section placeholders match DESIGN.md; Fuel Management also links Suppliers, Branches, Purchases, Payments and Statements. Includes responsive navigation, active links, focus styles, skip link and unknown-route page. Browser interaction review remains pending.
- apps/mobile remains reserved and unchanged; no Expo dependencies. No database SDK, connection, schema, auth provider or financial logic was added.
- Existing documentation retained; child README reservation notes preserved with dated updates. Root README now documents installation, development, formatting, linting, type checking and production commands. No environment configuration is needed. All environment files, .refact and common credential paths are ignored.
- Verified with Node 20.19.5/npm 10.8.2: clean-copy npm ci, web/shared lint and type checks, Webpack production build, formatting, diff whitespace and Git exclusions. All 21 application routes returned 200 with placeholder labels; two invalid routes returned 404. Generated links resolve. Evidence is for this working tree, not a committed fresh checkout.
- Turbopack CSS-worker port binding was blocked locally; dev/build scripts use Webpack. Production server smoke tests passed with permission. Browser connector could not start, so no visual/keyboard QA claim.
- Production dependency audit: zero findings. Full audit: five high findings in the development lint dependency chain, rooted in braces advisory GHSA-vfj7-8cjw-p6xm; automatic major downgrade not applied. ESLint 9 emitted an upstream deprecation notice. Revisit compatible lint-tool updates separately.

No domain test runner or PRD acceptance workflows were implemented. Do not treat the shell as authenticated or production-ready. Stop after setup as requested; next phase requires explicit direction and resolution of the relevant open decisions. See TASKS.md for completed checks and outstanding work.

## Client overview documents — 5 October 2026

Added the supplied [client overview Markdown](CLIENT_OVERVIEW.md), [PDF overview](client/CLIENT_OVERVIEW.pdf) and [PowerPoint presentation](client/Transport_Manager_Client_Presentation.pptx). Markdown is the main editable source; PDF and PowerPoint are shareable snapshots to refresh when the source changes. README.md links to all three files. Verified that the files exist and the relative links resolve. This milestone adds documentation of planned scope only; it does not implement application functionality or complete any business acceptance tests.
