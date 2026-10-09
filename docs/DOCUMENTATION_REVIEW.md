# Final business-policy documentation review

Reviewed: 9 October 2026. This report supersedes the earlier capability-reconciliation report’s open business-policy gates. Documentation only: no application code, physical schema, provider selection, deployment or client PDF/PPT regeneration; no runtime tests executed.

## 1. Files reviewed

All 18 repository Markdown files: README.md; docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md, ENVIRONMENT.md; apps/web/README.md, apps/mobile/README.md, packages/shared/README.md. The supplied final-policy request was read in full. No applicable AGENTS.md was found in the repository/ancestor locations checked.

## 2. Files modified

14 Markdown files: README.md and docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md. ENVIRONMENT.md and the three workspace READMEs required no policy changes. Historical client PDF/PPT and implementation files remain unchanged.

## 3. Open policy decisions closed

DECISIONS.md preserves original questions and marks O02–O06 and O13–O18 CLOSED as business-policy gates, tracing final decisions D51–D69. O03’s source figures remain illustrative rather than verification of historical cash direction; explicit configured obligations/payment direction resolves the product-policy gate. O10’s recovery minimum and O12’s retention default are FINALIZED, retaining infrastructure/compliance details. Owner business lifecycle/transfer is finalized; provider provisioning remains open. O01/O09 technical choices and O07/O08/O11 company configuration are not silently closed.

## 4. Permissions added/changed

14 new V1 keys, bringing the catalog from 231 to 245 unique keys:

- orders.complete; trips.manual_price; trips.adjust_charges.
- invoices.adjust_charges; invoices.correct; invoices.reissue.
- expenses.allocate; owners.transfer.
- deduction_categories.view/create/edit/delete/archive/reactivate (six distinct keys).

Existing orders.reopen, trips.correct/override_rate, rates.view/create/edit, credit_notes.create/issue and debit_notes.create/issue are reused with clarified semantics. orders.edit covers mutable Bill To/agreement settings; settings.edit covers rounding/conversion configuration. customer_ledger keeps its existing namespace while covering the explicitly selected supported Bill To debtor. No duplicate note/ledger permissions or audit mutation grants were introduced. Authorization remains server-side, company/resource scoped, with Owner protection, lifecycle and financial invariants independent of grants.

## 5. Test cases added/changed

Added planned, unexecuted T61–T81: all four Bill To types/debtor ownership; fixed/percentage/multiple deductions; both multi-consignee workflows; discounts/rounding/gross history; same-currency success/cross-currency rejection; original kg↔ton conversion; both remaining bases; all three shortage effects; specific-rate recommendation/authorized valid alternative/denied override; interval conflicts/different conditions; both pricing modes/provisional-final snapshot/no fake unit rate; manual completion preserving unfinished Trips/denial/audit; correction/reissue/Credit/Debit Notes/history; invoice-date revenue/no later receipt revenue; all four shared allocation methods/reconciliation/profitability; expiry warnings/assignment/no blocking; last-Owner guard/transfer/audit; no automatic historical purge; multiple backups/day and documented pre-launch tested restore; explicit permitted document deletion/audit.

Updated T13 and T38–T60 to remove answered business-policy blockers and use configured fixtures; earlier cases remain required. Provider-backed execution is still pending. No runtime tests are marked passing.

## 6. V1 scope changes

Finalized policies specify explicit configurable Bill To; extensible fixed/percentage commissions/deductions; separate receiver Orders or multiple potential Order Consignees with actual Trip receiver snapshots; discounts/configured rounding preserving gross; same-currency invoice settlement within overall multi-currency; compatible original/normalized quantity conversion; configurable shortage and Loaded/Delivered remaining basis; most-specific valid recommendation and exact-condition rate-overlap rejection; calculated-rate/manual-total pricing; manual Order completion with unfinished Trips; controlled correction/reissue or original-linked notes; Invoice Date management revenue; equal/quantity/manual amount/manual percentage shared expense allocation; expiry warnings only; protected Owner setup/transfer/always-active safeguard; retention-by-default; multiple daily automatic backups and documented restore tested before production. Other finalized V1 capabilities are preserved.

## 7. V2/Future changes

Explicitly defer configurable document-expiry assignment blocking by document type and cross-currency invoice settlement/allocation if pursued. Preserve controlled bulk Excel/CSV import and configurable/manual approvals, later Expo/mobile and dark mode, plus GPS/offline sync/dispatch/portals/payroll/full accounting/bank integrations/messaging/independent tenant onboarding as previously deferred proposals requiring separate scope approval.

## 8. Contradictions found/fixed

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

## 9. Remaining business requirement gaps

No material business-policy gaps remain. Company identity/base currency/timezone/languages, actual staff grants and exact bill branding/template remain configuration work. Formal jurisdiction-specific invoice/retention obligations require compliance review; no statutory certification or invented retention period is claimed. Source spreadsheet interpretation is data verification, not a missing global policy.

## 10. Remaining technical decisions

OPEN: database/backend technology; authentication provider/implementation; private object/file storage provider; hosting/deployment provider; exact backup schedule/provider/mechanism/retention and recovery operations/targets; provider-specific Owner provisioning; transaction/outbox implementation; append-only audit enforcement; physical decimal/FX representation; provider-specific export/file handling. Preserve the $0 constraint and evaluate feasibility later. Non-invoice account conversion mechanics, future import commit and notification adapters remain technical/deferred work, without permitting V1 cross-currency invoice settlement.

## 11. Internal consistency

Yes: the business requirements and policies are internally consistent across the reviewed Markdown documentation. Financial/operational roles and dates, gross/net amounts, original/converted quantities, Order/Trip states, V1/V2 and requirement/implementation status remain distinct. No providers are finalized by this conclusion.

## 12. Finalization status

| Area | Status |
|---|---|
| Business Requirements | Finalized |
| Business Policies | Finalized |
| Conceptual Data Model | Next — final review not completed |
| Technical Architecture Providers | Open |
| Implementation | Not Started for business workflows / existing shell only |
| Runtime acceptance/recovery tests | Planned, unexecuted by this task |
| Development Ready v1.0 | Not declared |

## 13. Final conceptual data model readiness

Ready for FINAL CONCEPTUAL DATA MODEL REVIEW. Required sequence: FINAL CONCEPTUAL DATA MODEL REVIEW → DATABASE/BACKEND SELECTION → AUTH/STORAGE/HOSTING/BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → DEVELOPMENT READY V1.0 → IMPLEMENTATION. Later provider/launch work must prove secure authorization, atomic financial/audit behavior, $0 feasibility and tested restore.

## 14. Material model/workflow issues and verification

No remaining unresolved business issue is identified that requires a different schema, financial model, authorization model or core workflow policy. The next conceptual review must validate party/consignee relationships, quantity/pricing/adjustment/allocation snapshots, exact rate conditions and ambiguity resolution, protected ownership, state/field locks and effective correction/rebilling balances against the finalized rules. Physical modeling, concurrency and provider feasibility remain open review work; this report does not approve a schema.

Documentation verification: all 18 Markdown files checked for local links; zero broken local links. Unique requirement/acceptance/decision/test definitions and 245 permission keys checked; all required sensitive actions present, no duplicate semantic note/ledger grants, audit catalog limited to view/export. Repository-wide contextual searches covered every requested stale-policy pattern, including prior pending-policy phrasing. git diff --check passed, and changed-file inspection confirmed 14 Markdown files only. No application tests/builds/deployment/recovery exercise were run. Historical UI lint/type/build blockers and stale PDF/PPT snapshots are unaffected and remain documented.
