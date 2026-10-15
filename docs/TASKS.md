# Implementation Tasks

Updated: 16 October 2026

**Development Ready v1.0: YES. B1: CLOSED. Production Ready: NO.** Final recovery architecture is selected; pipeline/control implementation and measured full restore remain pending. [Final audit](FINAL_ARCHITECTURE_AUDIT.md) is current authority; dated milestones below retain their historical evidence.

Use this checklist in build order. [x] means the stated deliverable is completed; unchecked means not completed. Implementation and verification are separate tasks. The setup shell is implemented and verified as recorded below; operational functionality remains unimplemented.

## 0. Documentation and repository foundation

- [x] Draft PRD, architecture, design, security, test plan, decision log and project memory.
- [x] Define apps/web, apps/mobile, packages/shared and docs folder structure.
- [x] Add implementation checklist and credential/data exclusions.
- [x] Document multiple fuel suppliers, their branches and both payment methods.
- [x] Add the [client overview](CLIENT_OVERVIEW.md) as the main editable source, with shareable [PDF](client/CLIENT_OVERVIEW.pdf) and [PowerPoint](client/Transport_Manager_Client_Presentation.pptx) snapshots linked from README.md. Documentation only; no application functionality is marked implemented.
- [x] Close final business-policy review gates through D51–D69; business requirements/policies finalized, no material policy gaps remain.
- [x] Complete final conceptual data model review; DATA_MODEL.md is the authoritative provider-independent model (D70–D78).
- [x] Select PostgreSQL on Supabase Free for development/testing and clarified Next.js full-stack Route Handlers/services (D79/D84).
- [x] Record finalized Supabase Auth, Cloudinary development/production and Vercel paid-production direction (D87–D90).
- [x] Complete final architecture/security/documentation audit; requirements/model remain finalized.
- [x] Close recovery architecture B1: select runner/store, schedule/retention/encryption/custody, RPO/RTO, operator/monitoring, DB/Auth/Cloudinary consistency, approved restore and drills; reassess Development Ready v1.0: YES.
- [ ] Production integration/capacity/company configuration and later runtime security/restore acceptance; keep separate from architecture readiness.

## AI engineering governance — 16 October 2026

- [x] Consolidate action/dependency/secret and working rules in root AGENTS; keep HANDOVER lightweight and CONSTRAINTS focused on hard rules.
- [x] Reuse DECISIONS for alternatives, DATA_MODEL as DATA.md equivalent, TEST_PLAN for actual verification and SECURITY/OPERATIONS for detailed controls.
- [x] Retain specialized flow/threat/failure/rollback/pre-ship maps and lightweight optional feature/bug traces; keep one Defense template for meaningful subsystems before release. Package manifests/lockfile own dependency inventory; no completed runtime defenses invented.
- [x] Keep only live material assumptions/current state in HANDOVER; normal work needs no fixed set of documentation edits. Verification/consolidation evidence is in DOCUMENTATION_REVIEW.
- [ ] **Phase 1 — Trusted Access Foundations**, after authorization: first implement nonproduction server-only configuration/composition and environment isolation as one coherent reviewed slice, then separately scope provisioning/Owner/Auth/authorization/audit and a protected-read proof.

Writing these rules does not complete runtime controls or authorize Phase 1, commit/push, deployment or production access. Pre-ship checks apply before release, not before development begins.

## 1. Project setup

- [x] Resolve development database/backend (O01; D79/D84); ORM remains recommendation only.
- [x] Select Supabase Auth, Cloudinary and Vercel; paid production is acceptable.
- [x] Resolve recovery design B1/O10 and declare Development Ready v1.0: YES (D92–D96).
- [ ] Implement/test selected recovery and provider integrations in an authorized implementation phase; full measured restore before launch.
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
- [x] Map finalized relationships/snapshots and lifecycle/correction responsibilities in DATA_MODEL.md.
- [ ] Implement warning-preserving manual completion/reopen under the finalized model.
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
- [ ] Implement the selected recovery schedule/retention/operator/runbook from OPERATIONS_ARCHITECTURE.md and pass restricted secure full restore/objective testing before production launch.
- [ ] Confirm appropriate production plans, workload/cost limits and isolation; paid production is acceptable.
- [ ] Deploy dashboard and perform smoke checks.

## 17. Later mobile phase

- [ ] Confirm mobile users and offline requirements.
- [ ] Scaffold Expo in apps/mobile and reuse domain contracts.
- [ ] Define and implement the approved mobile workflows.

## Update rules

Record implementation commit and test evidence when completing a feature. A written plan is not implementation. Keep decision blockers in DECISIONS.md and current state in MEMORY.md.

## Historical implementation and review evidence

The dated milestones below preserve previous outcomes and task state. Provider/budget/readiness assumptions are superseded by the 16 October audit and current checklist above.

### Setup verification — 5 October 2026

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
- [x] Perform FINAL CONCEPTUAL DATA MODEL REVIEW before database/backend selection; policy/model/workflow mapping and conceptual invariants are recorded in DATA_MODEL.md.
- [x] Select development database/backend; official Free-limit/financial-model evaluation is in DATABASE_BACKEND_SELECTION.md.
- [ ] Select auth/storage/production deployment/recovery architecture and prove feasibility, keeping multiple-daily secure backups/tested restore mandatory.
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
- [x] Complete final conceptual model review (10 October; D70–D78).
- [x] Complete development database/backend selection (12 October; D79–D83).
- [ ] Complete auth/storage/hosting/backup architecture → final architecture audit. Only then assess Development Ready v1.0 and begin authorized implementation.
- [ ] Execute production-gate recovery evidence: multiple automatic backups/day, restricted access, documented restore tested with records/ledgers/audit/files.

V2/Future additions: configurable document-type expiry assignment blocking and cross-currency invoice settlement/allocation if pursued. Existing controlled bulk import/manual approvals/mobile/dark mode and other future scope stay deferred. Earlier dated open-policy reviews are historical and superseded by D51–D69. Current documentation status does not complete implementation or certify providers/runtime tests.

## Component compatibility verification — 9 October 2026

- [x] Repair DataTable/showcase v8 API usage against installed TanStack Table 9.2.6; native useTable and explicit features/types, no version changes or legacy adapter.
- [x] Move showcase failure-ref update out of render; retain failure simulation behavior.
- [x] Correct header checkbox full/partial selection under v9 “some selected” semantics.
- [x] Run npm run lint and npm run typecheck for web/shared; both passed.
- [x] Run targeted Prettier checks and git diff --check; passed.
- [x] Run npm run build in an isolated tracked-source copy with existing node_modules linked; passed. Not a clean dependency installation; live development build cache preserved.
- [x] Verify /dev/components in Chrome: table renders, ascending/descending sorting, filtering and pagination, selection reset/full/partial header state, hiding/restoring columns, loading/empty/stale-error display; captured console errors/warnings absent.

This supersedes the 6 October hook/table-library blockers. It does not complete broader shell/accessibility/browser review, business tests, authentication, provider architecture, recovery or deployment. The user subsequently requested commit/push of this repair; see the delivery response for commit and remote-verification evidence. Earlier documentation commits were already pushed separately.

## SearchableSelect design-system contract — 9 October 2026

- [x] Inspect COMPONENTS, DESIGN, PRD, ARCHITECTURE, frontend/package structure, existing Combobox/MultiSelect/Select/FormField, CSS tokens and synthetic selector fixtures.
- [x] Extend the existing Combobox specification under canonical SearchableSelect naming; document controlled identity/options, local/server search, explicit multi mode, dependencies, archives, permission boundaries, visual states and accessibility, with screen mapping.
- [x] Add planned T82–T101 component/browser and future trusted-service acceptance scenarios; writing them does not execute them.
- [x] Check the five-file Markdown-only diff, local links/anchors, table column consistency, unique test IDs (20 new scenarios) and git diff --check; passed. No runtime component/service tests executed.
- [x] Normalize the existing Combobox foundation and showcase imports into SearchableSelect; Combobox is a compatibility export of the React Select implementation.
- [x] Implement rich options/multi/state contracts and synthetic fixtures (10 October milestone below); acceptance execution remains open.
- [ ] Execute interaction/accessibility cases and correct demonstrated gaps before feature rollout.
- [ ] Integrate thin feature pickers as modules are built; configure bounded loaders/thresholds/filters and execute server tenant/permission/relationship/lifecycle cases when trusted services exist.

This milestone is Markdown only: no component/form refactor, backend/schema logic, dependency/provider choice or runtime test execution. Business policies, initial single Role assignment, independent Bill To/ownership roles and architecture gates remain unchanged. COMPONENTS.md owns the contract; DESIGN.md maps presentation/screens; TEST_PLAN.md owns acceptance evidence.

## React Select implementation — 10 October 2026

- [x] Implement SearchableSelect using React Select, keeping Combobox as compatibility exports of one implementation.
- [x] Extend synthetic showcase fixtures for local/rich single selection, explicit multi selection, disabled/read-only/archive display, required/error/clear policy and dependent async loading.
- [x] Pass web/shared lint and type checking, targeted source formatting, git diff --check and four existing environment tests.
- [x] Pass an isolated production build using existing installed dependencies; no fresh npm ci was performed.
- [ ] Execute T82–T101 component/browser/screen-reader acceptance and feature/trusted-service integration as applicable. Added test dependencies alone are not acceptance evidence.

This supersedes the implementation status of the earlier documentation-only milestone. It does not mark business pickers, backend authorization or full accessibility acceptance complete.

## Final conceptual data model review — 10 October 2026

- [x] Inspect the 13 required repository documents and relevant existing UI/shared contracts on feat/project-setup; cross-check finalized V1 policies rather than accepting the old model inventory unchanged.
- [x] Create DATA_MODEL.md: 63 named concepts (44 entity/association/history, 15 values/configuration/catalogs, 4 derived views), relationships/cardinalities, responsibilities/tenant ownership, snapshot matrix and domain-specific lifecycle/retention.
- [x] Review parties/Bill To, flexible receivers, quantities/rates/pricing, adjustments/coverage/corrections, three ledgers/payments/accounts/FX, fuel/expenses/history/documents, protected Owner and immutable audit.
- [x] Record 44 invariants, 17 logical strong-consistency/atomic boundaries, reporting/query pressure, simplification decisions and provider-selection requirements.
- [x] Finalize conceptual model with no remaining material conceptual/business-policy question; synchronize architecture/decisions/current phase references and preserve historical milestone evidence.
- [x] Evaluate DATABASE / BACKEND SELECTION against DATA_MODEL.md section 24; user-selected PostgreSQL/Supabase Free development and Next.js full-stack are D79/D84, distinct from unselected production providers.
- [ ] Prove provider-specific constraints/atomicity/authorization/audit/backup restore and execute application acceptance after architecture/implementation; documentation walkthroughs are not runtime tests.

No physical schema, provider selection, repository/API or business feature was added. Development Ready v1.0 remains unassessed. Documentation validation evidence is recorded in DOCUMENTATION_REVIEW.md.

## Database/backend selection — 12 October 2026

- [x] Read prioritized repository/model/security/environment documentation and user-selected stack; preserve conceptual model and business/V1-V2 invariants.
- [x] Create DATABASE_BACKEND_SELECTION.md with native/application/infrastructure mapping P01–P20 and A01–A17, current official Supabase limits, growth estimates, ORM comparison, security/recovery/portability risks and next-phase inputs.
- [x] Finalize PostgreSQL on Supabase Free development/testing + clarified Next.js full-stack versioned Route Handlers/services/runtime DTO validation (D84 supersedes initial NestJS D80); no client protected-business bypass.
- [x] Recommend Drizzle/node-postgres only; retain Prisma comparison and explicit exact-decimal/native-integrity/version review requirements.
- [x] Retain production blocker: no compliant $0 backup/hosting/storage architecture demonstrated; Free lacks managed backups/PITR; multiple automatic daily backups and full tested restore remain required.
- [ ] Resolve AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE in a separate authorized task; no automatic start.
- [ ] Approve ORM/version/decimal implementation, design physical constraints/RLS/migrations and execute concurrency/security/recovery tests only after architecture/readiness gates.

This is Markdown selection/evaluation only. No database project, schema, NestJS module, API, credential, package/lockfile, workflow or production deployment is created. Documentation checks are recorded in DOCUMENTATION_REVIEW.md; no runtime/load/backup/restore acceptance executed.

## V1 backend-framework re-evaluation — later 12 October 2026

- [x] Replace separate NestJS service with Next.js full-stack /api/v1/* Route Handlers plus modular authorized services/repositories; Vercel is hosting direction, $0 testing target subject to plan/eligibility.
- [x] Record thin HTTP adapters, framework-independent core contracts, server-only composition/secrets, shared Expo API and direct authorized Server Component read path; NestJS extraction deferred.
- [x] Re-evaluate Node/serverless pools/context/deadlines/caching/private-file/job constraints and current Vercel Hobby terms; preserve all DB/domain/security/recovery requirements.
- [ ] Resolve Vercel eligible testing/production plan/configuration with auth/storage/backup architecture separately; no deployment or paid upgrade authorized here.
- [ ] Implement/API-test services/repositories/auth/validation/transaction/audit only after remaining architecture/readiness gates; no handler scaffold/business feature added in this task.

## Final audit — 16 October 2026

- [x] Review every repository Markdown document and relevant shell/configuration/selector source.
- [x] Reconcile Supabase Auth, Cloudinary, Vercel paid production and stale phase/budget wording; preserve finalized business/model invariants.
- [x] Define authentication/document/API/environment/deployment security contracts and identify recovery blocker B1.
- [x] Scan current files/reachable Git-history blobs for recognizable credentials; record scope/limitations and documentation verification in FINAL_ARCHITECTURE_AUDIT.md.
- [ ] Close B1 and rerun readiness assessment. Development Ready v1.0 remains NO.
- [ ] After readiness and authorization, implement isolated development infrastructure + trusted access/Owner/RBAC/audit foundation; then master records → Orders/Trips → rates/costs → billing/payments/reports.

No business implementation, schema, endpoint, provider provisioning, deployment or runtime acceptance test is part of this audit.

## B1 closure — later 16 October 2026

This milestone supersedes the initial same-day blocked audit and its unchecked B1 item above.

- [x] Validate current official Supabase managed/PITR/logical/Auth, Cloudinary version/download and R2 encryption/permissions/locks capabilities plus GitHub scheduling limitations.
- [x] Select complete recovery architecture in OPERATIONS_ARCHITECTURE.md, including three-hour capture for six-hour RPO headroom, retention/custody, independent monitoring and approved restore/testing process.
- [x] Close B1 and reassess Development Ready v1.0: YES; no new material architecture blocker.
- [ ] In authorized implementation: build private operations capture/verification/prune automation, bucket locks, configuration/custody and monitoring without exposing production secrets to application CI.
- [ ] Before production: prove generation completeness, Auth/private-file/tenant/finance/audit integrity, failure alerts, retained keys and full RPO/RTO in the selected restore exercises.
- [ ] Next phase after user authorization: isolated development infrastructure and trusted access/Owner/RBAC/audit foundation. Do not start it in this documentation task.

No feature, workflow, schema, secret, infrastructure or restore was created/executed here. Restore tests remain planned, unexecuted.
