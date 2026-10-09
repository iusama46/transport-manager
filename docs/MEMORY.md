# Project Memory
Updated: 9 October 2026
Purpose: Project continuity only; no personal biography or credentials.

## Current state
Setup phase completed locally. npm workspaces contain the Next.js dashboard shell and a shared TypeScript/Zod package. All business screens are clearly labelled placeholders with no operational data. Historical setup checks passed; the latest 6 October checks found existing UI hook lint and table-library type/build failures (TASKS.md). Nothing has been deployed; database/provider selection and migration remain open.

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
- Do not infer payer, an actual tax configuration, commission type, vehicle owner or missing payment amount from ambiguous source cells.

## Data references
Existing business sources: Drivers List - Drivers.csv; Fleet Operations Tracker - Vehicle Tracking.csv; Orders 2026 - August.csv; Petroleum_2026 (2).xlsx; Munir_Orders.xlsx.
Prior review found the driver file header-only, 77 populated fleet body rows and 811 populated order body rows. Counts are not validated import totals. Order dates extend beyond the filename’s August label.
Known cleanup: mixed dates, registration case variations, text quantities, inconsistent payment labels and Paid values in Party. Source spreadsheets remain unchanged.
Munir sample: fare 100,000, commission 3,000, net 97,000, advance 30,000 and balance 67,000. Source-row direction is not verified evidence. Finalized policy uses explicit Bill To, partner obligation and payment direction; the fare-minus-retained-commission example is a configured illustrative agreement, not a global rule.

## Work completed
- Earlier PRD v0.2 retrieved as the baseline.
- Created seven sibling Markdown documents with requested filenames.
- Retained PRD requirement and acceptance IDs for traceability.
- Added proposed technical/UX/security design and test cases, clearly distinguished from implemented features.

## Next work
Business Requirements and Business Policies are Finalized (D26–D69); no material business-policy gaps remain. Next: FINAL CONCEPTUAL DATA MODEL REVIEW → DATABASE/BACKEND SELECTION → AUTH/STORAGE/HOSTING/BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → DEVELOPMENT READY V1.0 → IMPLEMENTATION. Confirm company configuration and actual staff grants before launch; validate $0 feasibility and required secure multiple-daily backups/tested restore. No providers or physical model are finalized.
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
- Existing documentation retained; child README reservation notes preserved with dated updates. Root README now documents installation, development, formatting, linting, type checking and production commands. No environment configuration is needed. Actual environment files, .refact and common credential paths are ignored; the later environment foundation permits safe `.env.example` templates.
- Verified with Node 20.19.5/npm 10.8.2: clean-copy npm ci, web/shared lint and type checks, Webpack production build, formatting, diff whitespace and Git exclusions. All 21 application routes returned 200 with placeholder labels; two invalid routes returned 404. Generated links resolve. Evidence is for this working tree, not a committed fresh checkout.
- Turbopack CSS-worker port binding was blocked locally; dev/build scripts use Webpack. Production server smoke tests passed with permission. Browser connector could not start, so no visual/keyboard QA claim.
- Production dependency audit: zero findings. Full audit: five high findings in the development lint dependency chain, rooted in braces advisory GHSA-vfj7-8cjw-p6xm; automatic major downgrade not applied. ESLint 9 emitted an upstream deprecation notice. Revisit compatible lint-tool updates separately.

No domain test runner or PRD acceptance workflows were implemented. Do not treat the shell as authenticated or production-ready. The setup task stopped there; subsequent authorized work added environment foundations and documentation, not business workflows. See TASKS.md for completed checks and outstanding work.

## Client overview documents — 5 October 2026

Added the supplied [client overview Markdown](CLIENT_OVERVIEW.md), [PDF overview](client/CLIENT_OVERVIEW.pdf) and [PowerPoint presentation](client/Transport_Manager_Client_Presentation.pptx). Markdown is the main editable source; PDF and PowerPoint are shareable snapshots to refresh when the source changes. README.md links to all three files. Verified that the files exist and the relative links resolve. This milestone adds documentation of planned scope only; it does not implement application functionality or complete any business acceptance tests.

## RBAC and audit requirements milestone — 6 October 2026

Dynamic custom roles, protected Owner/Super Admin, extensible `module.action` permissions, frontend/server checks, core Activity Log, immutable company-aware events and credential redaction are finalized requirements (D18–D25). They are no longer open architectural questions. PERMISSIONS.md owns the catalog/lifecycle/company scope; AUDIT.md owns event fields, coverage and security. PRD, architecture, design, components, security, test plan, client overview and task tracker reference those contracts. No application code was implemented in this milestone.

Preserve one operating business with multiple external company records. Customer (Client) is the direct customer; Consignee remains their receiver. Independent tenant onboarding is outside current scope. Authorization includes company context and rejects foreign records; Owner has no implicit cross-tenant access. At this historical milestone, staff-specific grants, correction rules, Owner provisioning and audit retention/archival needed decisions; final business-policy D63/D67/D68 below supersede the policy gaps, leaving configuration/provider mechanics open. Database/auth/storage/hosting remain open; offline synchronization remains outside initial scope.

Environment work is locally committed as `d0c714f`; push was rejected by automatic approval review pending explicit destination approval. Do not treat it as published. The RBAC/audit documentation was subsequently committed as `3d3150a`, verified locally on 7 October 2026; remote publication was not checked. Client PDF/PowerPoint snapshots have not been refreshed and must not be represented as the updated scope. Next step is requirements review of remaining operational/business/provider choices, followed by authorized implementation and actual test execution.

## Business reconciliation milestone — 9 October 2026

Supplied decisions D26–D50: Requirements Finalized; Design specification Updated; Business implementation Not Started. Earlier open-capability summaries are historical and superseded where explicitly resolved; existing shell/environment foundations remain implemented.

Preserve flexible Order → 1..N Trips (including separate movement Orders), optional planned quantity, loaded/delivered/custom billable snapshots, versioned rates with agreement-specific effective date, full/authorized partial Trip invoices and three separate allocation/advance ledgers. V1 includes financial corrections/notes/refunds, company accounts/transfers, full historical multi-currency/tax, custom expenses/documents/expiry reminders, ownership/affiliation/assignment history, controlled lifecycle/locks, dynamic RBAC and immutable redacted audit.

V1 AUTO APPROVAL is default; routine transactions do not wait for manual review. Multiple automated backups per day and full authorized PDF/XLSX/CSV export are required. Bulk Excel/CSV import and configurable/manual approvals are V2; preserve mobile and other future scope. Company boundary and Factory → Customer (Client) → Consignee remain unchanged.

The earlier capability review’s remaining material policy gates are now closed by the final policy milestone below (D51–D69). No database/backend/auth/storage/hosting was selected. Company-specific settings/staff grants/branding, provider-specific Owner provisioning and backup operations/compliance periods remain work. Proceed through final conceptual review and architecture stages before implementation; no Development Ready v1.0 claim. No runtime tests were executed; historical build blockers and stale client PDF/PPT remain. Current report: DOCUMENTATION_REVIEW.md.

## Final business-policy milestone — 9 October 2026

Business Requirements: Finalized. Business Policies: Finalized. Conceptual Data Model: Next. Technical Architecture Providers: Open. Business Implementation: Not Started / existing shell only. No material business-policy gaps remain, and requirements are internally consistent. Earlier dated open-policy statements describe historical review state; DECISIONS.md dispositions and D51–D69 supersede them.

Preserve explicit selectable Bill To separate from Factory/Client/Consignee; fixed/percentage extensible commissions/deductions and discounts/rounding with gross/net history; flexible receiver Orders and actual Trip receiver snapshots; same-currency V1 invoice settlement; compatible original/normalized quantities, configurable shortage and Loaded/Delivered remaining basis; most-specific valid recommended rate, authorized valid alternative and exact-condition interval overlap rejection. Trips support calculated-rate and manual-total snapshots; manual totals never fabricate unit rates. Manual Order completion warns without changing unfinished Trips.

Post-invoice corrections/reissues when permitted or original-linked Credit/Debit Notes retain reason/grants/history and effective ledger/billing consistency. Management revenue follows Invoice Date, later payment affects receivable/cash only. Shared expenses support equal/quantity/manual amount/manual percentage allocation, exact reconciliation/history/audit and exclusion of unallocated general costs. Expiry is warning only in V1. Protected Owner setup/transfer always retains one active Owner, audits lifecycle and prevents ordinary custom-role bypass. Historical records are retained with no automatic V1 purge; permitted explicit document removal respects legal/business/integrity rules. Multiple backups/day, restricted access and documented restore tested before production remain mandatory.

V2/Future adds configurable document-expiry blocking and cross-currency invoice settlement/allocation if pursued; bulk import/manual approvals/mobile/dark mode/other deferred items persist. Permissions and immutable redacted audit cover all finalized actions. Tests T61–T81 are added as planned/unexecuted and T13/T38–T60 policy dependencies are reconciled. This milestone changed Markdown only, selected no providers and executed no runtime tests. See DOCUMENTATION_REVIEW.md for reviewed/modified files, checks and readiness. Historical build failures and client PDF/PPT snapshots remain unchanged.
