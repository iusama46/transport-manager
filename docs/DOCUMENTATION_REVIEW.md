# Final conceptual data model review

Reviewed: 10 October 2026 on `feat/project-setup`, starting from commit `dda79c4`. This report's current outcome supersedes the 9 October pre-model phase status; the earlier report is preserved below as historical evidence. Documentation only: no provider/schema/API/business implementation, deployment or runtime acceptance test.

## 1. Files reviewed

Required documents read: README.md and docs/PRD.md, ARCHITECTURE.md, DECISIONS.md, PERMISSIONS.md, AUDIT.md, SECURITY.md, TEST_PLAN.md, DESIGN.md, COMPONENTS.md, TASKS.md, MEMORY.md and DOCUMENTATION_REVIEW.md (13). Also reviewed the new DATA_MODEL.md and contextual client-overview/remaining Markdown contradiction searches. Relevant code inspected: packages/shared/src/index.ts; web placeholder/navigation/routes; quantity/money/number/form contracts; SearchableSelect types/loader/showcase. Existing code is UI/synthetic shell, with no business entity schema to preserve. No applicable repository/ancestor AGENTS.md was found in the checked locations.

## 2. Files created

[DATA_MODEL.md](DATA_MODEL.md), the authoritative provider-independent V1 model, including scope/authority, exact inventory, entity ownership/lifecycles, cardinalities, snapshot matrix, invariants, atomic boundaries, query pressure, simplification, requirement traceability and Database Selection Requirements.

## 3. Files modified

Eight existing Markdown files: ARCHITECTURE.md, DECISIONS.md, TASKS.md, MEMORY.md, DOCUMENTATION_REVIEW.md, plus README.md, PRD.md and CLIENT_OVERVIEW.md. The last three receive minimal current phase/status/link corrections because “conceptual review next” would now contradict the completed review. Historical dated milestones are preserved. No other Markdown, application/package/lockfile, binary snapshot or configuration changes are made by this task.

## 4. Final entity/concept count

63 named V1 responsibilities: **44 entities/associations/owned-history concepts, 15 values/configuration/catalog concepts, 4 derived views**. E01–E44/V01–V15/R01–R04 are unique catalog definitions. These are not 63 planned tables/collections. Aliases (ContactEntity/BusinessParty, Assignment/DriverVehicleAssignmentHistory, MaintenanceExpense/Expense-owned detail), diagram shorthand and V2 imports are not counted twice.

## 5. Major relationships

Company owns business resources; User connects through Membership with one active assigned same-company Role. Role grants known catalog Permissions. Tenant-local BusinessParty reuses narrow role profiles; Factory/Client eligibility is nonexclusive and ConsigneeRelationship is Client-specific. Order has potential receivers via OrderConsignee and 0..N recorded Trips; resolved Trip has one actual eligible receiver. Trip preserves sequential assignments and can have several partial InvoiceLines over time. Invoice owns retained versions/lines and original-linked notes. Payment owns multiple compatible allocations; direct Expense disbursement can explicitly retain an unrecorded payee without creating a fake supplier/receivable ledger; Expense owns reconciling Trip shares. FuelSupplier owns branches; accounts own posted movements. Precise lifecycle-qualified cardinalities are in DATA_MODEL section 18.

## 6. Historical snapshots required

DATA_MODEL section 17 covers 15 snapshot groups: Order commercial context; Trip assignment/receiver/owner/affiliation; original/normalized measurements/conversion/shortage; calculated or Manual Total pricing; adjustments and partner obligations; invoice debtor/line/coverage/tax/FX; note/replacement changes; payment/account/allocation context; fuel prices/totals; expense/maintenance/share history; private document evidence; safe actor/resource audit display. Live stable references remain for traceability and permission checks, never today's mutable historical values.

## 7. Financial invariants

Separate gross/adjusted receivable, covered Trip charges, partner cost, supplier/workshop obligation and cash effects. Concurrent billing/allocation cannot exceed remaining entitlement/credit/outstanding. Invoice-only discounts do not reopen covered charges. Issued history retains versions/notes and one effective economic change; refunds alone do not cancel revenue/coverage. V1 invoice allocations—including later advances/reallocation—require identical invoice/payment currency. Payment allocation moves no cash; own-account transfer is neither revenue nor expense. Shared shares reconcile exactly; invoice-date revenue and payment-date cash remain distinct.

## 8. Tenant/security invariants

Exactly one verified Company per business resource/history; all typed links validate same-company ownership. External parties never imply membership. Server-side User/Membership/Role/Permission/Resource checks apply to lookup/counts/history/files/export as well as writes. Owner is immutable system Role classification with protected active Membership lifecycle, not custom grants/name; one active Owner always remains. Delegation/reassignment/revocation guards remain. Audit is redacted before persistence, snapshots safe actor/resource display, and is not editable by normal users/Owner. No new permission keys or auth policy changes.

## 9. Atomic operations identified

17 logical groups A01–A17: Order eligibility/Trip contribution; Trip snapshot/financial lock; rate interval conflict; invoice lines/coverage/number/audit; Trip correction/reissue/notes/allocations; payment/allocation/account post/correction; credit reallocation; partner settlement; supplier/branch settlement; immediate expense/fuel cash settlement; shared-expense version; paired transfer; Owner lifecycle; custom-role/reassignment/revocation; numbering; durable mutation/audit; staged document manifest/object integrity. Provider mechanisms remain open.

## 10. High-pressure query patterns

Orders/progress, Trip assignment/date/receiver, billable coverage, party receivable/aging/credit, partner/supplier/branch/workshop payable, invoice-date Trip/vehicle profitability, fuel quantity/cost rankings, expense/context/maintenance shares, effective-date rate specificity, account reconciliation, expiry reminders, Activity Log and bounded dashboard/export/recovery queries. Scope/counts/pagination and original/base currencies must stay coherent.

## 11. Over-modeling removed

Avoid separate duplicate party identity per role, permanent driver/vehicle history duplicates, separately posted MaintenanceExpense cost, editable ledger totals, independent full-accounting engine, universal arbitrary party/document/context framework, freely editable parallel Owner flag and premature V2 import/workflow/notification entities. Rates/adjustments/stops/tax/FX/maintenance details are owned configuration/values where appropriate. “Removed” means rejected conceptual duplication, not code/schema deletion.

## 12. Under-modeling corrected

Explicit role/eligibility associations, potential versus actual receiver, four quantity meanings and conversion evidence, two pricing modes, rate candidate/interval semantics, charge coverage versus receivable, owned invoice versions/effective correction lineage, typed payment targets and one source per movement, reconciling expense versions, assignment/owner/affiliation history, document parent/file ownership, protected Owner membership and safe audit resource snapshots.

## 13. Contradictions found and fixed

Architecture's inventory lacked enough cardinality/history/ownership detail to serve as a finalized model; replaced it with authoritative DATA_MODEL references. The active current phase/status references said conceptual review was next; corrected them to completed/FINALIZED and database/backend selection next. ContactEntity/party naming and Assignment/DriverVehicleAssignmentHistory/MaintenanceExpense counts are clarified without duplicate concepts. No finalized business policy was changed. Searches verify forbidden patterns are prohibitions, rejected alternatives, UI-only examples or preserved dated history, not active contradictory rules.

## 14. Remaining conceptual-model questions

None material identified. Nonexclusive Factory/Client links avoid an unstated restriction; receiver identity remains reusable with Client-specific eligibility. Unknown outsourced/draft details remain explicit. Exact rule values/state-field enforcement, physical representation, non-invoice transfer enablement and legal eligibility are later configuration/technical review under fixed invariants, not guessed new policies.

## 15. Remaining business-policy questions

None material identified. Business identity/base currency/timezone/language, actual grants/agreement values, branding/numbering/compliance applicability, operator/recovery targets and formal legal retention remain launch configuration/compliance work. Ambiguous legacy source facts require data verification rather than a new global policy.

## 16. Finalization status

**Conceptual Data Model: FINALIZED.** Business Requirements/Policies remain Finalized. Technical Architecture Providers remain Open. Business implementation remains not started beyond existing UI/environment shell. Development Ready v1.0 is not declared.

## 17. Potential physical-schema impact

No unresolved conceptual issue currently requires changing entity ownership, cardinality, financial relationships, snapshots, authorization or core workflows. Physical embedding/splitting/decimal/index/transaction strategies are still open and must preserve the logical model. This does not promise a migration-free future or approve physical schema; new model-changing requirements require explicit review.

## 18. Database-selection requirements

Prove atomic operations/concurrent bounds, typed tenant relationships, rate intervals/specificity, exact quantities/money/FX, unique numbering/idempotency, revocation/Owner protection, immutable/durable redacted history, effective financial reporting, scoped pagination/export, private file/manifest lifecycle and secure multiple-daily backups with tested full restore. Later verify current commercial $0 tier limits/runtime fit and future mobile API support. DATA_MODEL section 24 is the evaluation input.

## 19. Provider and implementation confirmation

NO database/backend/auth/storage/hosting provider was selected or recommended. NO SQL tables, MongoDB collections, Prisma/Drizzle schema, repositories, APIs or business features were created. No runtime tests/builds/deployments or recovery exercise were performed in this documentation task. Existing client PDF/PPT remain historical; current Markdown status does not regenerate those binaries.

## 20. Exact next phase and verification

**DATABASE / BACKEND SELECTION**, followed by AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → assessment of DEVELOPMENT READY V1.0 → authorized IMPLEMENTATION.

Documentation validation: catalog/invariant/atomic ID counts and uniqueness, requirement/test/decision references, Markdown local links/anchors and table consistency, contextual repository contradiction searches, git diff --check and Markdown-only changed-file scope are checked. Validation passed: 19 repository Markdown files, 77 local links/anchors with zero broken targets; all Markdown table column counts consistent; E44/V15/R4/I44/A17 unique sequential definitions; 78 unique decision definitions and new requirement/test/decision references within their defined catalogs; exactly eight modified and one new Markdown file, no code/schema/package/binary changes; git diff --check passed. Numeric walkthroughs in DATA_MODEL section 23 are conceptual review evidence, not passing runtime tests.

## Historical business-policy review — 9 October 2026

Reviewed: 9 October 2026. This report supersedes the earlier capability-reconciliation report’s open business-policy gates. Documentation only: no application code, physical schema, provider selection, deployment or client PDF/PPT regeneration; no runtime tests executed.

### 1. Files reviewed

All 18 repository Markdown files: README.md; docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md, ENVIRONMENT.md; apps/web/README.md, apps/mobile/README.md, packages/shared/README.md. The supplied final-policy request was read in full. No applicable AGENTS.md was found in the repository/ancestor locations checked.

### 2. Files modified

14 Markdown files: README.md and docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md. ENVIRONMENT.md and the three workspace READMEs required no policy changes. Historical client PDF/PPT and implementation files remain unchanged.

### 3. Open policy decisions closed

DECISIONS.md preserves original questions and marks O02–O06 and O13–O18 CLOSED as business-policy gates, tracing final decisions D51–D69. O03’s source figures remain illustrative rather than verification of historical cash direction; explicit configured obligations/payment direction resolves the product-policy gate. O10’s recovery minimum and O12’s retention default are FINALIZED, retaining infrastructure/compliance details. Owner business lifecycle/transfer is finalized; provider provisioning remains open. O01/O09 technical choices and O07/O08/O11 company configuration are not silently closed.

### 4. Permissions added/changed

14 new V1 keys, bringing the catalog from 231 to 245 unique keys:

- orders.complete; trips.manual_price; trips.adjust_charges.
- invoices.adjust_charges; invoices.correct; invoices.reissue.
- expenses.allocate; owners.transfer.
- deduction_categories.view/create/edit/delete/archive/reactivate (six distinct keys).

Existing orders.reopen, trips.correct/override_rate, rates.view/create/edit, credit_notes.create/issue and debit_notes.create/issue are reused with clarified semantics. orders.edit covers mutable Bill To/agreement settings; settings.edit covers rounding/conversion configuration. customer_ledger keeps its existing namespace while covering the explicitly selected supported Bill To debtor. No duplicate note/ledger permissions or audit mutation grants were introduced. Authorization remains server-side, company/resource scoped, with Owner protection, lifecycle and financial invariants independent of grants.

### 5. Test cases added/changed

Added planned, unexecuted T61–T81: all four Bill To types/debtor ownership; fixed/percentage/multiple deductions; both multi-consignee workflows; discounts/rounding/gross history; same-currency success/cross-currency rejection; original kg↔ton conversion; both remaining bases; all three shortage effects; specific-rate recommendation/authorized valid alternative/denied override; interval conflicts/different conditions; both pricing modes/provisional-final snapshot/no fake unit rate; manual completion preserving unfinished Trips/denial/audit; correction/reissue/Credit/Debit Notes/history; invoice-date revenue/no later receipt revenue; all four shared allocation methods/reconciliation/profitability; expiry warnings/assignment/no blocking; last-Owner guard/transfer/audit; no automatic historical purge; multiple backups/day and documented pre-launch tested restore; explicit permitted document deletion/audit.

Updated T13 and T38–T60 to remove answered business-policy blockers and use configured fixtures; earlier cases remain required. Provider-backed execution is still pending. No runtime tests are marked passing.

### 6. V1 scope changes

Finalized policies specify explicit configurable Bill To; extensible fixed/percentage commissions/deductions; separate receiver Orders or multiple potential Order Consignees with actual Trip receiver snapshots; discounts/configured rounding preserving gross; same-currency invoice settlement within overall multi-currency; compatible original/normalized quantity conversion; configurable shortage and Loaded/Delivered remaining basis; most-specific valid recommendation and exact-condition rate-overlap rejection; calculated-rate/manual-total pricing; manual Order completion with unfinished Trips; controlled correction/reissue or original-linked notes; Invoice Date management revenue; equal/quantity/manual amount/manual percentage shared expense allocation; expiry warnings only; protected Owner setup/transfer/always-active safeguard; retention-by-default; multiple daily automatic backups and documented restore tested before production. Other finalized V1 capabilities are preserved.

### 7. V2/Future changes

Explicitly defer configurable document-expiry assignment blocking by document type and cross-currency invoice settlement/allocation if pursued. Preserve controlled bulk Excel/CSV import and configurable/manual approvals, later Expo/mobile and dark mode, plus GPS/offline sync/dispatch/portals/payroll/full accounting/bank integrations/messaging/independent tenant onboarding as previously deferred proposals requiring separate scope approval.

### 8. Contradictions found/fixed

| Previous active ambiguity or gate | Consistent final documentation |
|---|---|
| Bill debtor and commission rules awaiting confirmation; Customer Ledger implied only Clients | Explicit supported Bill To owns debt; operational parties remain separate; configurable charges and ledger namespace clarified |
| Singular Order Consignee and linkage policy open | Multiple potential receivers allowed, actual Trip receiver/destination historical; separate Orders also valid |
| Conversion, remaining basis and shortage policy open | Original/normalized compatible units, configured Loaded/Delivered remaining and three agreement shortage effects |
| Rate precedence/intervals/snapshot timing unresolved; all Trip snapshots assumed a rate | Most-specific recommendation, alternative valid match, exact-condition overlap rejection, provisional-date handling; Manual Total has no fabricated rate |
| Discounts/rounding/FX allocation still an unresolved V1 policy | Preserved gross/adjustments; same-currency V1 invoice allocation, cross-currency deferred |
| Completion aggregation and correction/rebilling gates open | Manual completion with warning/unchanged Trips; controlled versioned correction/reissue or linked notes and effective billing/ledger reconciliation |
| Revenue/shared-cost attribution unresolved | Invoice-date management revenue, payment separate; four reconciled allocation methods and general-cost exclusion |
| Expiry assignment policy open | V1 warning only, blocking V2/Future |
| Owner transfer/business retention still open | Protected eligible Owner transfer/last-active guard; retention-by-default, no automatic historical purge |
| Readiness report/memory/tasks still required answered policy approval | Business requirements/policies Finalized; next conceptual review; technical/configuration/compliance work distinguished |

Other forbidden contradiction patterns (Factory always pays, gross overwritten, arbitrary unauthorized rate, silent issued-history rewrite, payment-date revenue, automatic Trip completion/cancellation, Owner self-removal or automatic historical purging) were absent or already prohibited; explicit final safeguards and tests now make them reviewable. Multiple daily backups already existed; the pre-production documented/tested restore gate is reinforced. Earlier dated implementation/test evidence is retained as history, not current verification.

### 9. Remaining business requirement gaps

No material business-policy gaps remain. Company identity/base currency/timezone/languages, actual staff grants and exact bill branding/template remain configuration work. Formal jurisdiction-specific invoice/retention obligations require compliance review; no statutory certification or invented retention period is claimed. Source spreadsheet interpretation is data verification, not a missing global policy.

### 10. Remaining technical decisions

OPEN: database/backend technology; authentication provider/implementation; private object/file storage provider; hosting/deployment provider; exact backup schedule/provider/mechanism/retention and recovery operations/targets; provider-specific Owner provisioning; transaction/outbox implementation; append-only audit enforcement; physical decimal/FX representation; provider-specific export/file handling. Preserve the $0 constraint and evaluate feasibility later. Non-invoice account conversion mechanics, future import commit and notification adapters remain technical/deferred work, without permitting V1 cross-currency invoice settlement.

### 11. Internal consistency

Yes: the business requirements and policies are internally consistent across the reviewed Markdown documentation. Financial/operational roles and dates, gross/net amounts, original/converted quantities, Order/Trip states, V1/V2 and requirement/implementation status remain distinct. No providers are finalized by this conclusion.

### 12. Finalization status

| Area | Status |
|---|---|
| Business Requirements | Finalized |
| Business Policies | Finalized |
| Conceptual Data Model | Next — final review not completed |
| Technical Architecture Providers | Open |
| Implementation | Not Started for business workflows / existing shell only |
| Runtime acceptance/recovery tests | Planned, unexecuted by this task |
| Development Ready v1.0 | Not declared |

### 13. Final conceptual data model readiness

Ready for FINAL CONCEPTUAL DATA MODEL REVIEW. Required sequence: FINAL CONCEPTUAL DATA MODEL REVIEW → DATABASE/BACKEND SELECTION → AUTH/STORAGE/HOSTING/BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → DEVELOPMENT READY V1.0 → IMPLEMENTATION. Later provider/launch work must prove secure authorization, atomic financial/audit behavior, $0 feasibility and tested restore.

### 14. Material model/workflow issues and verification

No remaining unresolved business issue is identified that requires a different schema, financial model, authorization model or core workflow policy. The next conceptual review must validate party/consignee relationships, quantity/pricing/adjustment/allocation snapshots, exact rate conditions and ambiguity resolution, protected ownership, state/field locks and effective correction/rebilling balances against the finalized rules. Physical modeling, concurrency and provider feasibility remain open review work; this report does not approve a schema.

Documentation verification: all 18 Markdown files checked for local links; zero broken local links. Unique requirement/acceptance/decision/test definitions and 245 permission keys checked; all required sensitive actions present, no duplicate semantic note/ledger grants, audit catalog limited to view/export. Repository-wide contextual searches covered every requested stale-policy pattern, including prior pending-policy phrasing. git diff --check passed, and changed-file inspection confirmed 14 Markdown files only. No application tests/builds/deployment/recovery exercise were run. Historical UI lint/type/build blockers and stale PDF/PPT snapshots are unaffected and remain documented.
