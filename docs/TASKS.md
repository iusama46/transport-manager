# Implementation Tasks

Updated: 9 October 2026

Use this checklist in build order. [x] means the stated deliverable is completed; unchecked means not completed. Implementation and verification are separate tasks. The setup shell is implemented and verified as recorded below; operational functionality remains unimplemented.

## 0. Documentation and repository foundation

- [x] Draft PRD, architecture, design, security, test plan, decision log and project memory.
- [x] Define apps/web, apps/mobile, packages/shared and docs folder structure.
- [x] Add implementation checklist and credential/data exclusions.
- [x] Document multiple fuel suppliers, their branches and both payment methods.
- [x] Add the [client overview](CLIENT_OVERVIEW.md) as the main editable source, with shareable [PDF](client/CLIENT_OVERVIEW.pdf) and [PowerPoint](client/Transport_Manager_Client_Presentation.pptx) snapshots linked from README.md. Documentation only; no application functionality is marked implemented.
- [x] Close final business-policy review gates through D51–D69; business requirements/policies finalized, no material policy gaps remain.
- [ ] Complete final conceptual data model review, then resolve open technical decisions and company/launch configuration.

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
- [ ] Configure actual staff grants and provider-specific first-Owner provisioning; implement finalized protected transfer/last-active-Owner workflow and correction grants.
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

- [ ] Configure business identity/base currency/timezone/languages and finalized configurable rounding rules without rewriting historical values.
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

- [x] Finalize Order → 1..N Trips and separate movement Orders (D26).
- [x] Finalize multi-consignee, quantity/shortage/remaining and manual Order completion policies (D53/D56–D58/D62).
- [ ] Map finalized relationships/snapshots and lifecycle/correction fields in final conceptual model review; implement warning-preserving manual completion/reopen.
- [ ] Build order entry, filters, pagination and detail view.
- [ ] Add assignments, unlimited ordered stops, status history and delivery proof.
- [ ] Verify six-stop orders, reassignment, conflicts and delivery/payment independence.

## 9. Outsourced orders

- [ ] Add partner assignment and filtered outsourced view of the same orders.
- [x] Finalize configurable fixed/percentage multiple commission/deduction rules with explicit debtor and payment direction (D51/D52).
- [ ] Implement snapshotted agreement charges/deductions and advances without double-counting.
- [ ] Add agreed partner obligations and settlement breakdown.
- [ ] Verify no duplicate jobs or double-counted advances.

## 10. Fuel suppliers, branches and transactions

- [ ] Create multiple supplier profiles and branch records with contacts/locations.
- [ ] Filter branch selection by supplier and validate ownership server-side.
- [ ] Add vehicle fuel purchases, liters, rates, receipts and totals.
- [ ] Support branch payments and supplier-wide payments across branches.
- [ ] Allocate payments to purchases; track unallocated supplier credit explicitly.
- [ ] Add branch statements, consolidated supplier statements and vehicle rankings.
- [ ] Verify cross-supplier rejection, partial payments, reversals and reconciliation.

## 11. Maintenance and expenses

- [ ] Add workshop, parts/labour/other costs and legacy total-only mode.
- [ ] Add service date/mileage reminders and expense categories.
- [ ] Verify calculations, payment balances and unknown odometer behaviour.

## 12. Billing and invoices

- [x] Finalize explicit Bill To, both Trip pricing methods, preserved gross, discounts/rounding and same-currency invoice settlement (D51/D54/D55/D61).
- [ ] Implement finalized billing rules, controlled correction/reissue or linked notes with effective balance reconciliation.
- [ ] Add draft invoices and eligible Trip selection with default full/authorized partial billing.
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

## 15. V1 export; V2 import

- [ ] Implement full authorized PDF/XLSX/CSV exports of relevant records/reports.
- [ ] Verify resource/field/RBAC/company scope, export audit and spreadsheet-formula injection protection.
- [ ] Verify bulk-import UI/API is absent from V1.

V2 backlog (not V1):
- [ ] Excel/CSV upload/mapping, preview, validation, duplicate detection, errors and confirmed commit.
- [ ] Resolve mixed dates/registrations, missing money and Paid in legacy Party with provenance/retry protection.
- [ ] Add configurable/manual approval rules beyond V1 auto-approval.

## 16. Release verification and deployment

- [ ] Execute TEST_PLAN.md and record actual results.
- [ ] Complete access, accessibility, print and representative performance checks.
- [ ] Define provider-dependent multiple-daily automatic backup schedule/mechanism/retention and owner; document restore procedure and test restricted secure restoration before production launch.
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

Historical 7 October status: ready for the next requirements review; provider/hosting, financial/order, locale/print, staff, Owner and retention/recovery decisions were outstanding. D51–D69 below now close the business-policy questions; technical/configuration/compliance work remains. Client PDF/PPT snapshots still need regeneration before being shared as current scope.

## 19. Finalized business-capability reconciliation — 9 October 2026

| Deliverable | Status |
|---|---|
| Supplied finalized capability decisions D26–D50 | Requirements: Finalized |
| Conceptual model, screens, security, permission/audit catalogs and planned tests | Design specification: Updated |
| New business capabilities | Implementation: Not Started |
| Full business-policy completion | Finalized by D51–D69; no material business-policy gaps; no Development Ready v1.0 claim |

- [x] Reconcile V1 flexible Orders/Trips/rates/quantities, three ledgers, billing/corrections, accounts/tax/multi-currency, ownership/documents/expiry and lifecycle rules.
- [x] Move bulk import to V2; record V1 auto-approval, full export and multiple-daily automatic backup requirements.
- [x] Close O02–O06/O13–O18 business-policy gates and finalize Owner/retention/recovery minimums; retain unrelated technical/configuration/compliance entries.
- [ ] Perform FINAL CONCEPTUAL DATA MODEL REVIEW before database/backend selection; verify final policy-to-model and workflow mapping.
- [ ] Select database/backend/auth/storage, then deployment, verifying $0 feasibility and financial/audit/backup capabilities.
- [ ] Implement effective-dated transport rates/date configuration/Trip snapshots and permissioned overrides.
- [ ] Implement optional planned, loaded/delivered/custom billable quantity and shortage handling.
- [ ] Implement partial Trip invoicing, credit/debit notes and locked-record correction rules.
- [ ] Implement receipt/partner/supplier ledgers, advance allocation, unallocation/reallocation/reversal/bounce/refund/partial refund.
- [ ] Implement company accounts/methods/transfers, tax/FX snapshots and historical multi-currency reporting.
- [ ] Implement ownership/affiliation/assignment histories and actual Trip snapshots.
- [ ] Implement fuel price history, calculated/final overrides, custom expense categories and attributable Trip margin.
- [ ] Implement reusable documents/types/multi-file history, expiry and configurable dashboard reminders.
- [ ] Implement cancellation/reopening, dependency-aware delete/archive/reactivation and granular audit coverage.
- [ ] Execute T37–T81 plus existing applicable V1 tests; preserve unexecuted/provider-dependent status until actual evidence exists.
- [ ] Refresh historical client PDF/PPT before sharing them as current scope (outside this Markdown-only task).

Earlier dated reviews/test evidence above are historical. Their references to unresolved capability cardinality, V1 import or unspecified backup frequency are superseded by D26–D50. Setup/UI foundations already exist; no business feature completion is implied. See DOCUMENTATION_REVIEW.md for the current readiness report.

## 20. Final business-policy documentation — 9 October 2026

- [x] Finalize Business Requirements and Business Policies across PRD/decisions/model/UX/security/permission/audit/test/readiness documentation; no material business-policy gaps remain.
- [x] Add planned T61–T81 and reconcile earlier policy-blocked scenarios; no runtime tests executed.
- [ ] Implement explicit Bill To, multi-consignee Trip destinations and both calculated-rate/manual-total pricing with immutable snapshots.
- [ ] Implement extensible fixed/percentage commission/deductions, discounts/rounding, original/normalized quantity conversion, configurable shortage/remaining basis and specific-rate/exact-condition overlap validation.
- [ ] Enforce same-currency invoice settlement, controlled correction/reissue/notes, invoice-date revenue and shared expense allocation with exact reconciliation.
- [ ] Implement warning-only document expiry, manual Order completion with unchanged unfinished Trips, protected Owner setup/transfer/last-active safeguards and retention-by-default.
- [ ] Complete final conceptual model review → database/backend selection → auth/storage/hosting/backup architecture → final architecture audit. Only then assess Development Ready v1.0 and begin implementation.
- [ ] Execute production-gate recovery evidence: multiple automatic backups/day, restricted access, documented restore tested with records/ledgers/audit/files.

V2/Future additions: configurable document-type expiry assignment blocking and cross-currency invoice settlement/allocation if pursued. Existing controlled bulk import/manual approvals/mobile/dark mode and other future scope stay deferred. Earlier dated open-policy reviews are historical and superseded by D51–D69. Current documentation status does not complete implementation or certify providers/runtime tests.
