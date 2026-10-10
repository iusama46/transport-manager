# Project Memory
Updated: 9 October 2026
Purpose: Project continuity only; no personal biography or credentials.

## Current state
Setup phase completed locally. npm workspaces contain the Next.js dashboard shell and a shared TypeScript/Zod package. All business screens are clearly labelled placeholders with no operational data. Historical setup checks passed. The 6 October UI hook/table-library lint/type/build failures are resolved by the 9 October component repair: current lint/type checks, isolated production build and targeted Chrome table interactions pass (TASKS.md). Nothing has been deployed; database/provider selection and migration remain open.

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

## Component table compatibility repair — 9 October 2026

The user reported missing useReactTable/getCoreRowModel exports and a /dev/components runtime crash. Installed @tanstack/react-table 9.2.6 exposes the v9 useTable API; migrated DataTable to explicit visibility/pagination/selection/sorting features, automatic core row model, feature-aware DataTableColumn<T extends RowData> and ColumnVisibilityState. Controlled sorting/pagination remain owned by callers. Corrected the v9 “some selected” semantics so the header is mixed only for partial selection. Showcase failure simulation updates its ref in the switch event handler, not during render. Dependency versions/lockfile are unchanged.

Verified web/shared lint and type checking, targeted formatting and git diff --check. Production build passed in an isolated tracked-source copy using existing installed dependencies, preserving the running development server’s cache; this was not a fresh npm ci. Chrome loaded the showcase and verified sorting, filter/pagination reset, full/partial row selection, column visibility, loading/empty/stale-error states; captured console had no errors/warnings. This is component-shell verification only, not business acceptance or a Development Ready v1.0 claim. The user subsequently authorized committing and pushing the repair to the configured GitHub branch; commit and remote-verification evidence is recorded in the delivery response.

## SearchableSelect specification milestone — 9 October 2026

SearchableSelect is the canonical planned public name for the existing web Combobox foundation, not a second control or new UI library. COMPONENTS.md owns its extended contract; DESIGN.md maps existing light-mode tokens/states and intended screens. Current Combobox has async single selection, page loading/cancellation/stale guards and basic keyboard/ARIA; the full rich-option/multi/validation/accessibility contract remains implementation work. Existing MultiSelect is a small-set checkbox group, Select handles tiny fixed choices and PermissionMatrix retains grouped grants. No component code or dependencies changed.

Features own local search for small loaded sets versus bounded server query/debounce/minimum-character/page strategies for large sets. Preserve IDs/selected labels outside result pages and archived history; invalidate only incompatible dependent children and ignore old-scope responses. Trusted services still enforce identity/company/grants/relationships/lifecycle. Bill To stays independent, vehicle ownership separate from partner execution, V1 expiry warning only, same-currency invoice settlement and initial single Role assignment unchanged. TEST_PLAN.md T82–T101 are planned/unexecuted; TASKS.md separates specification, component normalization and feature/server integration. PRD/ARCHITECTURE were inspected and require no scope/provider changes. No business decision was reopened; feature loader/search configuration and implementation verification remain.

Documentation checks passed: five Markdown-only files, local links/anchors, table column consistency, unique test IDs and git diff --check. Runtime acceptance remains unexecuted.

## React Select implementation — 10 October 2026

SearchableSelect now wraps React Select 5.10.2; Combobox is a compatibility export of the same implementation. The component exposes rich options, explicit multi selection, local/external/loader search, debounce/minimum characters, scope resets/cancellation, retry/paging, bounded rendered results, required/error associations, disabled/read-only display and stable selected IDs. The synthetic showcase includes vehicle, invoice-Trip, validation, archived-history and dependent supplier/branch fixtures. Existing testing-library/Vitest/jsdom dependencies are present, but no component test suite is configured or claimed executed.

Web/shared lint and type checks, targeted Prettier checks, git diff --check and all four existing environment tests passed. Production build passed in an isolated source copy using the current installed node_modules; this was not a fresh npm ci. T82–T101 browser/screen-reader and trusted-service acceptance remains unexecuted, and business integration remains pending. User authorized committing and pushing these changes to the configured GitHub branch.
