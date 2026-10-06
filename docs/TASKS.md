# Implementation Tasks

Updated: 7 October 2026

Use this checklist in build order. [x] means the stated deliverable is completed; unchecked means not completed. Implementation and verification are separate tasks. The setup shell is implemented and verified as recorded below; operational functionality remains unimplemented.

## 0. Documentation and repository foundation

- [x] Draft PRD, architecture, design, security, test plan, decision log and project memory.
- [x] Define apps/web, apps/mobile, packages/shared and docs folder structure.
- [x] Add implementation checklist and credential/data exclusions.
- [x] Document multiple fuel suppliers, their branches and both payment methods.
- [x] Add the [client overview](CLIENT_OVERVIEW.md) as the main editable source, with shareable [PDF](client/CLIENT_OVERVIEW.pdf) and [PowerPoint](client/Transport_Manager_Client_Presentation.pptx) snapshots linked from README.md. Documentation only; no application functionality is marked implemented.
- [ ] Review open business and technical decisions with the owner.

## 1. Project setup

- [ ] Resolve database, authentication, storage and free hosting choices (O01/O09).
- [x] Choose package manager and workspace configuration (npm workspaces).
- [x] Scaffold Next.js in apps/web and configure shared package.
- [x] Configure TypeScript, ESLint and Prettier. No application environment variables are required; actual environment files remain ignored, with safe `.env.example` templates allowed.
- [x] Add comment-only web/mobile environment templates matching the current zero-variable implementation and document local/production setup in ENVIRONMENT.md.
- [x] Add Node-only web configuration validation, reject unapproved public-prefix variables, and verify value-free required-variable errors and recursive Git ignore rules.
- [x] Inspect existing server operations and scan current tracked files for environment files/common credential patterns; scope and limitations recorded in SECURITY.md and ENVIRONMENT.md.
- [ ] Add provider-specific required names, format validation and safe template placeholders when providers and their integrations are implemented.
- [x] Configure and verify lint, type-check and production build commands.
- [ ] Configure a local domain/workflow test runner when those features begin.
- [x] Verify `npm ci`, lint, type checking and build in an isolated clean source copy with no dependencies or build caches.
- [ ] Repeat verification from a fresh Git checkout after these setup changes are committed.
- [x] Build sidebar, header and placeholders for the original 16 navigation sections, plus five fuel subsections (5 October scope; new Activity Log/Roles designs are not implemented).
- [x] Verify production HTTP responses for all 21 placeholder pages and 404 handling.
- [ ] Complete browser visual and keyboard interaction review (browser connector unavailable during setup).

## 2. Authentication

- [ ] Configure provider and protected Owner/Super Admin provisioning.
- [ ] Implement login, logout, session expiry and account recovery.
- [ ] Protect routes and backend operations.
- [ ] Verify expired/revoked sessions and unauthorized direct requests.

## 3. Roles and permissions

- [x] Finalize dynamic custom RBAC, protected Owner/Super Admin, granular catalog and frontend/server enforcement requirements (D18–D21).
- [x] Document Roles & Permissions UI, reusable permission matrix, company isolation and safe role lifecycle.
- [ ] Confirm actual staff assignments, financial correction grants and Owner provisioning/transfer workflow.
- [ ] Implement the centralized permission catalog, custom role CRUD, assignment and protected Owner/delegation safeguards.
- [ ] Implement permission checks for reads, writes, exports and financial actions.
- [ ] Apply database access policies appropriate to the selected provider.
- [ ] Verify each role through direct API/data requests, including restricted files.

## 4. User management

- [ ] List and provision staff accounts using the agreed flow.
- [ ] Assign/change roles and activate/deactivate users.
- [ ] Audit access changes and enforce them on active sessions.
- [ ] Verify disabled users cannot continue accessing records.

## 5. Business settings

- [ ] Confirm business identity, currency, timezone, languages and rounding.
- [ ] Configure numbering, categories and print branding.
- [ ] Verify setting changes preserve historical invoices.

## 6. Companies, factories, customers and consignees

- [ ] Implement profiles, contacts, locations and company roles.
- [ ] Link consignees to customers and filter selections.
- [ ] Add search, edit and archive flows.
- [ ] Verify historical relationships survive archival.

## 7. Vehicles and drivers

- [ ] Implement registrations, ownership, capacities and driver profiles.
- [ ] Add licence expiry, availability and assignment history.
- [ ] Verify registration normalization and historical ownership.

## 8. Orders and deliveries

- [ ] Confirm multiple-vehicle/consignee rules (O05).
- [ ] Build order entry, filters, pagination and detail view.
- [ ] Add assignments, unlimited ordered stops, status history and delivery proof.
- [ ] Verify six-stop orders, reassignment, conflicts and delivery/payment independence.

## 9. Outsourced orders

- [ ] Add partner assignment and filtered outsourced view of the same orders.
- [ ] Confirm fare, commission, advance and deduction rules (O03/O04).
- [ ] Add agreed partner obligations and settlement breakdown.
- [ ] Verify no duplicate jobs or double-counted advances.

## 10. Fuel suppliers, branches and transactions

- [ ] Create multiple supplier profiles and branch records with contacts/locations.
- [ ] Filter branch selection by supplier and validate ownership server-side.
- [ ] Add vehicle fuel purchases, litres, rates, receipts and totals.
- [ ] Support branch payments and supplier-wide payments across branches.
- [ ] Allocate payments to purchases; track unallocated supplier credit explicitly.
- [ ] Add branch statements, consolidated supplier statements and vehicle rankings.
- [ ] Verify cross-supplier rejection, partial payments, reversals and reconciliation.

## 11. Maintenance and expenses

- [ ] Add workshop, parts/labour/other costs and legacy total-only mode.
- [ ] Add service date/mileage reminders and expense categories.
- [ ] Verify calculations, payment balances and unknown odometer behaviour.

## 12. Billing and invoices

- [ ] Confirm billing account, fare basis, tax/discount and rounding rules (O02/O06).
- [ ] Add draft invoices and eligible order selection.
- [ ] Implement atomic, idempotent finalization and correction workflow.
- [ ] Implement A4 printing and browser PDF output.
- [ ] Verify concurrent finalization and 1/14/15/35-line printing, including Urdu.

## 13. Payments and settlements

- [ ] Implement customer receipts and partner/supplier/workshop payments.
- [ ] Implement allocations, advances, credits and auditable reversals.
- [ ] Verify retry/concurrency safety and independent customer/partner balances.

## 14. Reports and overview

- [ ] Add metrics, date bases, filters and underlying-record drill-down.
- [ ] Add customer/partner statements, branch/supplier fuel statements and cost reports.
- [ ] Verify every total reconciles and no unvalidated net-profit claim appears.

## 15. Import and export

- [ ] Implement mapping, validation, preview and reviewed commit.
- [ ] Handle mixed dates, registrations, missing amounts and Paid in legacy Party.
- [ ] Add provenance and duplicate/retry protection.
- [ ] Verify exports and spreadsheet-formula injection protection.

## 16. Release verification and deployment

- [ ] Execute TEST_PLAN.md and record actual results.
- [ ] Complete access, accessibility, print and representative performance checks.
- [ ] Define backup owner/schedule and demonstrate restoration.
- [ ] Confirm free-plan compatibility, quotas and absence of paid add-ons.
- [ ] Deploy dashboard and perform smoke checks.

## 17. Later mobile phase

- [ ] Confirm mobile users and offline requirements.
- [ ] Scaffold Expo in apps/mobile and reuse domain contracts.
- [ ] Define and implement the approved mobile workflows.

## Update rules

Record implementation commit and test evidence when completing a feature. A written plan is not implementation. Keep decision blockers in DECISIONS.md and current state in MEMORY.md.

## Setup verification — 5 October 2026

Evidence applies to the current working tree; no implementation commit was created in this task. Node.js 20.19.5, npm 10.8.2, Next.js 16.3.8.

- `npm ci` in an isolated copy without node_modules or .next: passed.
- `npm run lint`: passed for web/shared with zero warnings.
- `npm run typecheck`: passed for web/shared, including route type generation before the clean build.
- `npm run build`: passed using Webpack; 21 application placeholder pages plus framework error output prerendered.
- `npm run format:check` and `git diff --check`: passed.
- Generated HTML inspection: all 21 pages contain explicit placeholder/no-data text; internal navigation targets exist. Production HTTP checks: 21/21 return 200; two unknown routes return 404.
- `git check-ignore`: confirmed .refact, root/nested environment files, credentials.json and .aws/credentials excluded.
- `npm audit --omit=dev`: zero findings. Full audit reports five high-severity findings in the development-only eslint-config-next → fast-glob → micromatch → braces chain (GHSA-vfj7-8cjw-p6xm). Suggested automatic remediation downgrades eslint-config-next to 14.x and was not applied. ESLint 9 also emits an upstream deprecation notice; tooling upgrade remains follow-up work.

Turbopack failed because its CSS worker could not bind a local port in this execution environment, including the escalated attempt. Development/build scripts explicitly use Webpack. Production start and HTTP smoke checks succeeded with local server permission. Browser visual/keyboard review could not run because the browser connector failed to launch its app-server. No PRD business acceptance tests, authentication tests or deployment checks are claimed. Stop here after setup; database/auth/storage/hosting and open business rules remain unresolved.

## Environment/security verification — 6 October 2026

Evidence was collected before commit `d0c714f`; the environment/security work was subsequently committed locally. Push was blocked by automatic approval review and remains unverified.

- `node --test scripts/environment.test.mjs`: 4/4 passed, covering empty configuration, required-value errors, both public prefixes and nested ignore/template rules.
- A Next production build with a synthetic `NEXT_PUBLIC_SECURITY_PROBE` variable failed at configuration loading with its name, without its value, as intended.
- Targeted current-index scan: 89 tracked files, no environment files or common credential-pattern findings. See ENVIRONMENT.md for exclusions; no complete secret audit is claimed.
- Inspection found only public placeholders and UI demos, no protected business operations. Authentication, permissions and company-access enforcement remain unchecked above.
- Full lint failed on existing UI hook issues; type checking and production build failed on existing `@tanstack/react-table` API/type mismatches in `src/components/common/data-table.tsx` and `src/app/dev/components/showcase.tsx`. The previous setup verification does not establish a passing build for this current tree. Fix the UI compatibility issues and rerun full checks before release.

- Targeted lint for the changed web configuration, targeted Prettier checks and `git diff --check`: passed.

## 18. Activity Log / Audit Trail foundation

- [x] Finalize core audit requirements, immutable history, company context and credential exclusion (D22–D25).
- [x] Document event fields/action coverage, global screen, reusable record Activity and planned tests T23–T36.
- [ ] Implement trusted redacted event capture and atomic/durable integration with each sensitive operation.
- [ ] Implement provider-level append-only policies and restricted audit reader/writer capabilities.
- [ ] Implement global filters, sorting, pagination, permission-controlled export and record history.
- [ ] Resolve O12 retention/archival/security-event policy with O10 backup responsibilities.
- [ ] Execute RBAC, isolation, audit redaction/tampering and UI tests with evidence.

Sequence: implement authorization and audit foundations alongside authentication before adding protected business mutations; integrate coverage into every module, not only at the end of this numbered checklist.

## Documentation review — 6 October 2026

Reviewed all 15 existing repository Markdown files and added PERMISSIONS.md and AUDIT.md as canonical contracts. Replaced the fixed-role proposal, reconciled operating-company versus external-company terminology, added FR-13/14, AC-23–26 and planned T23–36, and corrected stale current-build claims. Requirements/design decisions are completed; all RBAC/audit implementation and acceptance execution remain unchecked. Only Markdown changed in this task. Historical client PDF/PPT snapshots still reflect 5 October scope and require regeneration before sharing as current requirements.

Verification: reviewed searches for obsolete fixed-role assumptions, audit mutation allowances, tenant scope and provider finalization; remaining fixed-role mentions are explicitly superseded history. All local Markdown links resolve across 17 documents, and `git diff --check` passes. Only Markdown files are modified/added; no runtime tests or feature implementation are claimed.

## Requirements re-verification — 7 October 2026

The repeated RBAC/audit request is already incorporated in commit `3d3150a`. Reviewed all 17 repository Markdown files before changes; retained the established requirements instead of duplicating them. Corrected stale commit/deployment wording in MEMORY.md and ENVIRONMENT.md.

| Requirement group | Canonical coverage | Planned verification |
|---|---|---|
| Custom roles, protected Owner, extensible granular permissions | PERMISSIONS.md; PRD FR-13; DECISIONS D18–D21 | T23–T28, T36 |
| Company-aware server checks and frontend permission behavior | ARCHITECTURE.md authorization flow; SECURITY.md; DESIGN.md | T24–T27, T34 |
| Immutable audit contract, action coverage and credential redaction | AUDIT.md; PRD FR-14; DECISIONS D22–D25 | T29–T32, T35 |
| Roles dashboard, permission matrix, global log and record Activity | DESIGN.md; COMPONENTS.md | T23, T28, T33–T34, T36 |
| Completed requirements versus pending implementation | MEMORY.md; checklist sections 3 and 18 | Implementation/test execution remains unchecked |

Verification: all 56 requested permission keys match the master catalog; no audit edit/delete keys are present. Local Markdown links resolve. Searches and contextual review found no active fixed-business-role requirement or normal application audit mutation allowance. Database/provider choices remain open. Existing one-operating-business/multiple-counterparty scope and explicit denial of implicit Owner cross-tenant access remain consistent. `git diff --check` passed; this follow-up changes Markdown only and does not execute or certify application tests.

Ready for the next requirements review. Outstanding decisions remain provider/hosting selection, financial/order rules, locale/print details, staff grants, Owner provisioning/transfer and backup/audit retention operations. Client PDF/PPT snapshots still need regeneration before being shared as current scope.
