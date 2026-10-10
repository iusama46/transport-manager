# Decision Log
Updated: 10 October 2026
Status key: Confirmed = explicit user direction; FINALIZED = final business-policy or explicitly labelled conceptual-model decision; Closed = answered/superseded with traceability; Proposed = design recommendation; Open = unresolved technical/configuration/compliance item. Business Requirements: Finalized; Business Policies: Finalized; Conceptual Data Model: FINALIZED; Technical Architecture Providers: Open; Business Implementation: Not Started / existing shell only.

## Recorded decisions
| ID | Status | Decision | Reason / consequence |
|---|---|---|---|
| D01 | Confirmed | Build the web dashboard first; Expo mobile later | Dashboard is the initial delivery |
| D02 | Confirmed; clarified 6 October 2026 | One operating transport business with multiple external company records | Company-aware isolation is mandatory; external counterparties are not independent tenants; see D24 |
| D03 | Confirmed | Track external vehicle owners | Owner association and history are required |
| D04 | Confirmed | Factory → Customer → customer’s receiver | Receiver is linked to the customer |
| D05 | Confirmed in visible discussion/current PRD | Use Consignee (Receiver) instead of Party | Keep Customer distinct; do not silently rename |
| D06 | Confirmed | Include outsourced orders | Partner assignments and financial tracking in scope |
| D07 | Confirmed | Target $0 recurring service cost | No paid plans/add-ons without approval |
| D08 | Implemented shell; workflows pending | Next.js + TypeScript dashboard | Versions pinned in package lockfile; no business implementation claim |
| D09 | Proposed | Tailwind/shadcn, TanStack Table, RHF/Zod, Recharts | Reusable dashboard UI; verify versions when implementing |
| D10 | Proposed | Shared domain services for web/mobile | Keep financial logic consistent |
| D11 | Proposed | Outsourced view references ordinary order records | Avoid duplicate entry and divergent history |
| D12 | Proposed | Atomic financial posting with idempotency and reversals | Prevent duplicate or untraceable transactions |
| D13 | Proposed | Browser print/Save as PDF | Fits initial cost constraint; requires print QA |

## Decision disposition after final business-policy review

Original questions are retained here with their final disposition on 9 October 2026. Closed policy gates are not awaiting further business approval.

| ID | Original question | Disposition / replacement |
|---|---|---|
| O01 | Supabase, MongoDB now, or MongoDB later? | OPEN technical: database/backend selection; historical candidates are not selections |
| O02 | Who owes the transport bill? | CLOSED — D51: explicit selectable Bill To determines debtor |
| O03 | Does Munir receive net fare and advance? | CLOSED as a product-policy gate — D51/D52: explicit debtor, partner obligation and payment direction, configurable deductions; illustrative agreement is not verification of source-row events |
| O04 | Fixed or percentage commission; cost deductions? | CLOSED — D52: both, multiple extensible categories, configured automatic/manual calculation and historical gross/net |
| O05 | Multiple vehicles and multi-consignee linkage? | CLOSED — D26/D53: Trips; separate receiver Orders or one Order with multiple potential Consignees, actual Trip receiver/destination snapshot |
| O06 | Fare basis, tax/currency, discounts/rounding/FX allocation? | CLOSED business policy — D27–D29/D44/D54/D55: configurable discounts/rounding preserve gross; V1 invoice settlement same currency. Physical decimal/FX and non-invoice transfer mechanics stay technical |
| O07 | Currency, timezone, business name, languages? | OPEN company configuration: identity/base currency/timezone/languages; PKR/Asia-Karachi remain historical suggestions |
| O08 | Which staff receive grants and correction authority? | OPEN deployment configuration: actual staff assignments; dynamic RBAC and granular correction/Owner safeguards finalized by PERMISSIONS.md |
| O09 | Hosting/auth/files within free constraints? | OPEN technical: auth implementation, private object/file storage and hosting/deployment; no provider selected |
| O10 | Backup owner/schedule/mechanism/retention/recovery target? | FINALIZED minimum — D69: multiple automatic backups/day, restricted access, documented and pre-launch tested restore. OPEN infrastructure operations: exact schedule/provider/mechanism/backup retention, operator and recovery targets |
| O11 | Exact approved bill design? | OPEN presentation/configuration: exact branding/template; existing multipage/Urdu acceptance remains |
| O12 | Audit/business/document retention and exceptional disposal? | FINALIZED default — D68: retained, no automatic historical purge; explicit permitted document removal only. Formal jurisdiction-specific periods/legal holds and exceptional lawful disposal remain compliance review; archival/security-stream mechanics remain technical |
| O13 | Rate specificity, overlaps, missing dates and snapshot timing? | CLOSED — D59/D60/D61: most-specific valid recommendation, authorized alternative valid match, exact-condition interval rejection, provisional until rate-date resolved then historical lock |
| O14 | Quantity units, remaining basis and shortage disposition? | CLOSED — D56–D58: compatible conversions, original values retained, configurable Loaded/Delivered remaining, agreement shortage effect. Optional target progress does not itself invent billing or forced completion |
| O15 | Completion aggregation, delivered locks, cancel/reopen eligibility? | CLOSED business policy — D38/D40/D62: manual Order completion with warning, unfinished Trips unchanged; permissioned reasoned reopening/correction and dependency guards. Detailed state/field mapping is next conceptual/workflow review |
| O16 | Credit/debit notes, rebilling and allocation consistency? | CLOSED business policy — D63 plus FR-07/08: legal/business-permitted correction/reissue with history OR original-linked note; reason/grants/audit, atomic effective balance reconciliation, no reset/double billing; provider posting mechanics remain open |
| O17 | Revenue recognition/shared cost attribution? | CLOSED — D64/D65: Invoice Date management revenue, later receipt not new revenue; four shared expense allocation methods, exact reconciliation and unallocated general costs excluded |
| O18 | Expired documents block assignment or warn? | CLOSED — D66: V1 warning only; configurable blocking by type V2/Future |

## Interpretation rules
A short yes following several alternatives does not establish which financial rule was chosen. Sample figures demonstrate a possible calculation, not approved accounting policy. A company owning a vehicle need not be the subcontractor receiving payment.
The current saved PRD remains the terminology baseline. Unverified summaries mentioning other labels or database options must not override explicit decisions; obtain the actual decision before changing these files.

## Decision process
When resolved, preserve the original question, record date, decision, rationale, alternatives and affected requirements/tests. Update PRD and relevant design documents in the same change. Do not erase old decisions; mark superseded entries and link their replacement. Do not claim that a proposed option is implemented.

## Decisions added 5 October 2026

D14 — Confirmed: Multiple fuel suppliers with multiple branches; support both branch-specific payments and central supplier payments. Use purchase-level allocations and consolidated reporting.
D15 — Confirmed direction: transport-manager repository with apps/web, apps/mobile, packages/shared and docs. npm workspaces subsequently implemented; see MEMORY.md.
D16 — Confirmed: User explicitly authorized adding the project documents after being informed the repository is public. Business source spreadsheets, credentials and identity documents are excluded.
D17 — Proposed implementation rule: branch-scoped payments allocate to that branch only; central payments allocate across branches of the same supplier and currency. Unallocated credit remains at supplier level.

## Finalized RBAC and audit decisions — 6 October 2026

The user finalized the following requirements. These supersede the earlier proposed Admin/Operations/Accounts/Viewer role matrix, not the underlying transport or financial rules. Implementation remains pending.

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D18 | Confirmed | Dynamic/custom RBAC replaces fixed business roles | Authorized staff create named roles; names never imply grants |
| D19 | Confirmed | Protected Owner/Super Admin system role | Full supported access within authorized company scope; protected lifecycle and critical grants |
| D20 | Confirmed | Granular `module.action` permissions in an extensible master catalog | PERMISSIONS.md owns the catalog; additions require reviewed semantics and tests |
| D21 | Confirmed | Enforce permission checks server-side and reflect them in UI | Hidden buttons are insufficient; direct API requests must be rejected |
| D22 | Confirmed | Activity Log/Audit Trail is a core cross-cutting capability | AUDIT.md defines event contract, action coverage and record/global views |
| D23 | Confirmed | Historical audit records are immutable through normal application operations | No audit editing/deletion permissions or administrative mutation UI/API |
| D24 | Confirmed | Company/tenant-aware authorization and audit context | User + Company/Tenant + Role + Permission + Resource; no implicit Owner cross-tenant bypass |
| D25 | Confirmed | Credentials never enter audit before/after or other payload fields | Redact before persistence using safe field allowlists |

Scope reconciliation: the new request refers to existing multi-company architecture. D02/PRD actually define multiple company counterparties within one operating business, with independent tenant onboarding outside the initial release. Preserve this distinction and reject foreign operating-company access; do not silently introduce a multi-tenant SaaS or global Owner. A future expansion needs an explicit product decision.

Supporting design: one role per active company membership initially, company-scoped custom roles, delegation ceilings, last-Owner protection and atomic reassignment checks are documented in PERMISSIONS.md. Provider-backed Owner provisioning/transfer details remain an implementation gate; arbitrary multi-role union is not assumed.

O12 originally raised audit retention/archival/disposal. D68 now FINALIZES V1 retention-by-default and no automatic purge; only formal compliance periods/legal holds and technical archival/security-stream/operator details remain open. Coordinate infrastructure operations with O10; application audit immutability stays finalized.

## FINALIZED capability decisions — 9 October 2026

These explicit product/architecture decisions supersede older conflicting proposals. Requirements: Finalized for this decision set. Design specification: Updated. Business implementation: Not Started. The final business-policy decisions D51–D69 below now close the narrower policies left open by this earlier capability review.

| ID | Finalized decision | Canonical specification |
|---|---|---|
| D26 | Order → 1..N Trips, one Trip valid; separate movement Orders valid; active Orders may add Trips subject to status/permissions | PRD FR-03 |
| D27 | Optional planned quantity; loaded/delivered/difference, agreed billing basis and historical billable quantity | PRD FR-03 |
| D28 | Effective-dated transport rate versions, optional matching dimensions, immutable Trip rate snapshot; authorized audited exception retains default/final rate | PRD FR-15 |
| D29 | Agreement-specific Order/loading/delivery/custom rate date; no global hard-coded rule | PRD FR-15 |
| D30 | One or multiple Trips per invoice; default full remaining billing, authorized audited partial billing, no duplicates/overbilling | PRD FR-07 |
| D31 | Selected Bill To receivables (Customer Ledger namespace) with partial/multi-invoice allocations, unallocated/advance credit and traceable reallocation | PRD FR-08 |
| D32 | Separate partner payables with partial/bulk/multi-Trip payments, advances and outstanding balances | PRD FR-08 |
| D33 | Configurable expenses linked to Trip/Order/Vehicle/Driver/company; receipts and attributable Trip margin exclude general company costs | PRD FR-06 |
| D34 | Supplier/branch fuel ledger, cash/credit, partial/bulk allocation and advances | PRD FR-05/12 |
| D35 | Fuel calculated versus actual total, authorized override actor/time/reason and audited before/after; effective-dated prices and actual rate history | PRD FR-05 |
| D36 | Company/partner/individual ownership and driver affiliation; assignment/ownership histories and actual Trip snapshots | PRD FR-02 |
| D37 | Reusable multi-file predefined/custom documents with metadata/history, optional expiry and configurable reminders/dashboard alerts | PRD FR-16 |
| D38 | Status-aware locks and linked controlled sensitive corrections preserving originals | PRD FR-17 |
| D39 | Dependency-free deletion only; referenced records archive/deactivate with historical visibility; audit lifecycle changes | PRD FR-17 |
| D40 | Controlled reasoned cancellation/reopening, dependent Trip/financial resolution, historical visibility | PRD FR-03 |
| D41 | Draft invoice mutability only; issued lock, reasoned void/cancel and linked credit/debit notes, automatic ledger effects | PRD FR-07 |
| D42 | No silent payment deletion; unallocation/reallocation/reversal/bounce/refund/partial refund across all three ledgers | PRD FR-08 |
| D43 | Company accounts and configurable methods; own-account transfers affect balances, never income/expense | PRD FR-18 |
| D44 | Configurable tax/tax-free and full multi-currency; historical tax/FX snapshots across invoices/payments/ledgers/accounts/reports | PRD FR-18 |
| D45 | Company numbering and unique system IDs distinct from external references | PRD FR-11 |
| D46 | V1 AUTO APPROVAL; no routine manual-review queue; future configurable/manual workflows V2 | PRD FR-19 |
| D47 | V1 automatic backups multiple times daily, secure restricted access, documented restore; provider/mechanism/exact schedule/retention open | PRD FR-19 |
| D48 | V1 full authorized PDF/XLSX/CSV export; bulk Excel/CSV import excluded from V1 and planned V2 | PRD FR-10/19 |
| D49 | Preserve/extend dynamic RBAC, immutable credential-redacted audit and company isolation for every new concept | PERMISSIONS.md; AUDIT.md; SECURITY.md |
| D50 | Preserve Factory → Customer (Client) → Consignee; separate V1 from V2 and conceptual model from provider schema | PRD; ARCHITECTURE.md |

D11/D12 are now required in the scope above: outsourced views reuse existing records and financial posting preserves traceability/concurrency integrity. O05/O06 capability questions were resolved here; D51–D69 now close the narrower remaining business-policy questions. Database/backend and hosting are NOT selected.

## FINALIZED business-policy decisions — 9 October 2026

Final user direction closes the business-policy gates above. Rationale: preserve flexible commercial agreements, financial/operational separation, historical traceability and authorized actions without selecting providers. These supersede the prior review’s pending-policy wording; they do not verify historical spreadsheet transactions or implementation. Canonical details: PRD FR-02–09/15–19 and Owner policy, PERMISSIONS.md, AUDIT.md; planned tests T61–T81.

| ID | Status | Final decision | Traceability |
|---|---|---|---|
| D51 | FINALIZED | Configurable Bill To: Factory, Client, Consignee or supported other debtor, separate from operational roles | O02/O03; T61 |
| D52 | FINALIZED | Fixed/percentage, multiple extensible commissions/deductions, configured automatic/manual calculation, historical gross → deductions → tax/other → net | O03/O04; T62 |
| D53 | FINALIZED | Separate receiver Orders OR one Order/multiple potential Consignees; each Trip snapshots actual receiver/destination | O05; T63 |
| D54 | FINALIZED | Fixed/percentage discounts, configurable rounding, original gross/calculated preserved, permissioned historical audit | O06; T64 |
| D55 | FINALIZED | Multi-currency overall; payment MUST match invoice currency in V1; cross-currency invoice settlement/allocation V2/Future if pursued | O06; T65 |
| D56 | FINALIZED | Compatible quantity conversion (kg↔ton), original quantity/unit plus normalized values and defined historical rule | O14; T66 |
| D57 | FINALIZED | Shortage agreement chooses informational, billable-quantity effect or deduction/claim; retain loaded/delivered/difference/rule/effect | O14; T68 |
| D58 | FINALIZED | Order/agreement Remaining Quantity basis configurable Loaded or Delivered | O14; T67 |
| D59 | FINALIZED | Most-specific valid rate recommended; authorized alternative valid match retains recommendation/selection and audit, optional reason | O13; T69 |
| D60 | FINALIZED | Reject overlapping effective periods with same exact match conditions; distinct conditions may coexist; interval validation | O13; T70 |
| D61 | FINALIZED | CALCULATED_RATE or MANUAL_TOTAL Trip pricing; historical source/value/date/quantity snapshot or entered total/creator/time without fake unit rate; provisional until configured event, locked corrections | O13; T71 |
| D62 | FINALIZED | Authorized manual Order completion despite unfinished Trips, warning, unchanged Trip states, audit and separate reporting | O15; T72 |
| D63 | FINALIZED | Controlled legally/business-permitted invoice correction/reissue retaining history OR Credit/Debit Note preserving original; permissions/reason/audit/ledger consistency, no silent rebilling | O16; T73 |
| D64 | FINALIZED | V1 management revenue by Invoice Date; payment changes receivable/cash, not new revenue; operational dates separate, no statutory certification | O17; T74 |
| D65 | FINALIZED | Shared Trip expenses equal/quantity/manual amount/manual percentage allocation, method/values/history/audit and exact totals; unallocated general costs excluded | O17; T75 |
| D66 | FINALIZED | V1 expiry warning/status/reminders only, no expiry-only assignment blocking; configurable blocking by type V2/Future | O18; T76 |
| D67 | FINALIZED | First Owner at setup, authorized company access/user-role management, at least one active Owner, no last-Owner self-removal/deactivation, eligible protected transfer and audit | Owner policy; T77/T78 |
| D68 | FINALIZED | V1 retention-by-default, no automatic historical operational/financial/audit purge; documents retained unless explicit permitted removal, no invented jurisdiction periods | O12; T79/T81 |
| D69 | FINALIZED | Multiple automatic backups/day, restricted access, documented restore tested before production; infrastructure details remain open | O10; T80 |

V1/V2 scope, permission additions and audit events reflect these decisions in the companion documents. No material business-policy gaps remain. Business Requirements: Finalized; Business Policies: Finalized. At this 9 October milestone, ready for FINAL CONCEPTUAL DATA MODEL REVIEW, not yet Development Ready v1.0; the completed 10 October outcome is D70–D78 below. The then-next review was to validate relationships/snapshots, calculation configuration, rate ambiguity/state mapping, effective correction balances and concurrency safeguards against these finalized rules; it is not a new policy-approval gate.

## Remaining technical choices and operational configuration

Remain OPEN: database/backend technology; authentication provider/implementation; private object/file storage; hosting/deployment; exact backup schedule/provider/mechanism/retention; provider-specific Owner provisioning; transaction/outbox implementation; append-only audit enforcement; physical decimal/FX representation; provider-specific export/file handling. Preserve the $0 constraint and prove backup/security/financial requirements with the eventual architecture. Non-invoice currency transfer representation must preserve explicit historical conversion and paired account effects without authorizing cross-currency invoice settlement. Future import commit mechanics and notification adapters remain deferred.

Company identity/base currency/timezone/languages, actual staff grants, bill branding/template, backup operator/targets and formal jurisdiction-specific compliance/retention obligations remain configuration, operations or compliance work. They do not reopen configurable Bill To, discounts/rounding, Owner safeguards or retention defaults. No current material business gap is identified that requires a different schema, financial, authorization or core workflow policy; detailed conceptual mapping and technical feasibility are still to be reviewed.

Current sequence after the 10 October conceptual review: DATABASE/BACKEND SELECTION → AUTH/STORAGE/HOSTING/BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → assessment of DEVELOPMENT READY V1.0 → authorized IMPLEMENTATION.

## Final conceptual data model review — 10 October 2026

These are provider-independent model decisions derived by cross-checking finalized requirements, not new business policies or physical schema choices. They supersede the earlier dated “conceptual review next” status. [DATA_MODEL.md](DATA_MODEL.md) is authoritative; business policies D51–D69 and the permission/audit catalogs remain unchanged. Alternatives were reviewed for lifecycle/history, actual relationships and unnecessary abstractions.

| ID | Status | Model decision | Rationale / traceability |
|---|---|---|---|
| D70 | FINALIZED conceptual | Tenant-local BusinessParty identity with narrow role profiles, FactoryClientEligibility and Client-specific ConsigneeRelationship; explicit independent Bill To | Avoid duplicate identity per role and unstated exclusive Factory ownership; no generic arbitrary-party/resource framework. DATA_MODEL sections 2–4; D02/D04/D24/D50/D51/D53 |
| D71 | FINALIZED conceptual | OrderConsignee eligibility, actual Trip receiver and original/normalized measurement/pricing/shortage snapshots; one assignment timeline plus owner/affiliation histories | Preserve flexible Orders and event truth without a singular receiver/quantity/rate or permanent driver/vehicle link. Sections 4–8/17; D26/D27/D36/D53/D56–D58/D61/D62 |
| D72 | FINALIZED conceptual | Owned InvoiceVersion/InvoiceLine with charge coverage distinct from receivable, original-linked note/replacement effects and one effective financial position | Prevent discounted phantom remainder, destructive issued edits and duplicate correction/rebilling/revenue. Sections 9–10; D30/D41/D54/D63/D64 |
| D73 | FINALIZED conceptual | Transaction/allocation evidence is authoritative; ledgers/SupplierPayable derived, independently agreed PartnerPayable explicit, one source per account movement | Avoid editable duplicate balances, mixed obligation families and cash/advance/transfer double counting. Sections 11–14; D31/D32/D34/D42–D44/D55/D65 |
| D74 | FINALIZED conceptual | Protected system Owner Role classification with protected single-role Membership assignments, not custom grant/name or editable parallel flag | Preserve existing protected-role policy, delegation and at least one active Owner under concurrent user/membership/role changes. Section 16; D19/D24/D67 |
| D75 | FINALIZED conceptual | Expense-owned MaintenanceDetail; one typed supported parent per Document with owned AttachmentFiles and retained evidence | Independent metadata/history without duplicate costs or arbitrary unsafe attachment links; warning-only expiry/hybrid retention unchanged. Sections 14–15; D33/D37/D39/D66/D68 |
| D76 | FINALIZED conceptual | Exact-condition rate conflict scope spans same-company agreements; specificity is constraint dominance, maximal incomparable candidates explicitly resolved | No duplicate agreement bypass or arbitrary tie-break. Sections 7–8; D28/D29/D59/D60/D61 |
| D77 | FINALIZED conceptual | 44 entity/association/history + 15 value/configuration/catalog + 4 derived concepts; 44 invariants and 17 logical atomic boundaries | Count responsibilities, not physical objects; enforce tenant, financial, history, audit and Owner integrity in later provider evaluation. Sections 2/19–24 |
| D78 | FINALIZED conceptual | Conceptual Data Model: FINALIZED; next DATABASE / BACKEND SELECTION | No remaining material ownership/cardinality/finance/snapshot/authorization/workflow issue identified; no provider/schema/readiness approval. Sections 23–24 |

No database/backend/auth/storage/hosting selection, physical schema or business implementation was performed. Physical precision/index/transaction/outbox/audit/Owner bootstrap/object/backup mechanisms, non-invoice transfer enablement and launch/compliance configuration remain open under the documented invariants. No Development Ready v1.0 claim is made.
