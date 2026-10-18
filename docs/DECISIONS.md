# Decision Log
Updated: 16 October 2026
Status key: Confirmed = explicit user direction; FINALIZED = business-policy or labelled conceptual decision; Proposed = recommendation; Open = unresolved item. Current selections D87–D90 supersede dated provider/$0 assumptions below: Next.js full-stack, Supabase PostgreSQL/Auth, Cloudinary and Vercel; paid production is acceptable. Business requirements/policies/model remain finalized. D92–D96 close D91/B1: Development Ready v1.0: YES. Production Ready: NO; recovery implementation and measured objectives are pending. Business workflows are unimplemented. Earlier dated milestone conclusions are historical evidence.

## Recorded decisions
| ID | Status | Decision | Reason / consequence |
|---|---|---|---|
| D01 | Confirmed | Build the web dashboard first; Expo mobile later | Dashboard is the initial delivery |
| D02 | Confirmed; clarified 6 October 2026 | One operating transport business with multiple external company records | Company-aware isolation is mandatory; external counterparties are not independent tenants; see D24 |
| D03 | Confirmed | Track external vehicle owners | Owner association and history are required |
| D04 | Confirmed | Factory → Customer → customer’s receiver | Receiver is linked to the customer |
| D05 | Confirmed in visible discussion/current PRD | Use Consignee (Receiver) instead of Party | Keep Customer distinct; do not silently rename |
| D06 | Confirmed | Include outsourced orders | Partner assignments and financial tracking in scope |
| D07 | Superseded for production by D90 | Historical $0 recurring-service target | Eligible free development resources remain optional; paid production is acceptable |
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
| O01 | Supabase, MongoDB now, or MongoDB later? | CLOSED development selection — 12 October D79/D84: PostgreSQL on Supabase Free for development/testing; initial NestJS choice D80 superseded by Next.js full-stack D84. MongoDB alternatives superseded. Production/recovery direction selected by D92–D96; provisioning/testing pending |
| O02 | Who owes the transport bill? | CLOSED — D51: explicit selectable Bill To determines debtor |
| O03 | Does Munir receive net fare and advance? | CLOSED as a product-policy gate — D51/D52: explicit debtor, partner obligation and payment direction, configurable deductions; illustrative agreement is not verification of source-row events |
| O04 | Fixed or percentage commission; cost deductions? | CLOSED — D52: both, multiple extensible categories, configured automatic/manual calculation and historical gross/net |
| O05 | Multiple vehicles and multi-consignee linkage? | CLOSED — D26/D53: Trips; separate receiver Orders or one Order with multiple potential Consignees, actual Trip receiver/destination snapshot |
| O06 | Fare basis, tax/currency, discounts/rounding/FX allocation? | CLOSED business policy — D27–D29/D44/D54/D55: configurable discounts/rounding preserve gross; V1 invoice settlement same currency. Physical decimal/FX and non-invoice transfer mechanics stay technical |
| O07 | Currency, timezone, business name, languages? | OPEN company configuration: identity/base currency/timezone/languages; PKR/Asia-Karachi remain historical suggestions |
| O08 | Which staff receive grants and correction authority? | OPEN deployment configuration: actual staff assignments; dynamic RBAC and granular correction/Owner safeguards finalized by PERMISSIONS.md |
| O09 | Hosting/auth/files within free constraints? | CLOSED provider direction D87–D90: Supabase Auth, Cloudinary and Vercel; paid production acceptable. Integration/deployment configuration remains work |
| O10 | Backup owner/schedule/mechanism/retention/recovery target? | CLOSED architecture B1/D92–D96: selected in OPERATIONS_ARCHITECTURE.md; actual implementation and measured full restore are production gates |
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
When resolved, preserve the original question, date, Context, Options, Chosen, Why, Trade-off, Revisit if, affected requirements/tests and approval scope. Record agent/tool/model when known for significant AI-assisted architecture work; do not invent exact model identity. Update PRD/design only if actually affected; do not churn unrelated documents. Retain superseded decisions with their replacements and distinguish proposed/implemented/verified. Review actual diff and evidence, not just an AI summary. [HANDOVER.md](HANDOVER.md) owns active session assumptions; this log owns accepted decisions and their alternatives.

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

D11/D12 are now required in the scope above: outsourced views reuse existing records and financial posting preserves traceability/concurrency integrity. O05/O06 capability questions were resolved here; D51–D69 now close the narrower remaining business-policy questions. At this 9 October milestone database/backend and hosting were NOT selected; D79/D80 below supersede development database/backend status on 12 October, with production hosting still open.

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

Current architecture: D87–D90 below and [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md). Recovery architecture B1/O10 is CLOSED by D92–D96; Development Ready v1.0: YES. Exact closure evidence is in [FINAL_ARCHITECTURE_AUDIT.md](FINAL_ARCHITECTURE_AUDIT.md). ORM adoption/pinning, exact decimal runtime, physical constraints/indexes/RLS/audit/idempotency enforcement and bounded loader/HTTP defaults are implementation choices within fixed I01–I44/A01–A17.

Company settings, staff grants, domain/branding, actual service plans/capacity, SMTP/MFA/compliance configuration and implemented security/performance/restore acceptance are pre-launch work. They do not reopen finalized business policies. Next: authorized isolated development infrastructure and trusted-access foundation implementation; no automatic implementation. The remaining dated milestones below preserve historical review evidence; unselected providers/$0/next-phase wording is superseded by D87–D91.

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

## Development database/backend selection — 12 October 2026

Historical initial 12 October selection: user explicitly selected the following development stack. The later clarified V1 constraints supersede D80 via D84; current hosting direction is D85. [DATABASE_BACKEND_SELECTION.md](DATABASE_BACKEND_SELECTION.md) evaluates model section 24, all 20 requested requirements and A01–A17 using current official documentation. These entries supersede earlier dated “no provider selected/database selection next” status only for this development scope; business policies and conceptual model are unchanged.

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D79 | Confirmed / FINALIZED development | PostgreSQL hosted on Supabase Free for development/testing | Engine/initial development host selected; no project provisioned. Free capacity/inactivity and missing managed backups/PITR prohibit a production-ready claim; production plan/host remains open |
| D80 | Superseded by D84 | NestJS/TypeScript, versioned REST, DTO server validation; existing Next.js → NestJS → PostgreSQL | NestJS owns authorization/domain/financial workflows/transactions; frontend/mobile cannot bypass it. Auth provider and private storage remain separate pending decisions |
| D81 | Recommended, unapproved | Drizzle ORM with node-postgres; Prisma evaluated alternative | Explicit SQL/native PostgreSQL control and portable pool/transactions suit financial/reporting predicates; exact decimal runtime, pinned supported version and migrations must be reviewed before adoption. No ORM schema/dependency implementation |
| D82 | Required production gate; unresolved architecture | Supabase Free approved for development/testing only; mandatory multiple-daily automated backups/full tested restore retained | No compliant $0 production architecture yet established; scheduler/private off-site copies/object history/keys/monitoring/operator/RPO/RTO/retention and costs remain next-phase work. Daily-only backup/export availability is not completion |
| D83 | FINALIZED phase outcome | Next AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE; stop after selection task | Then final architecture audit/readiness assessment/authorized implementation. No automatic next-phase start, deployment, credentials or Development Ready v1.0 |

Official limits were checked on 12 October, including the current one-year paused-project restore window rather than older 90-day guidance. Growth assumes 36 associated records and 80 KiB/transaction with 40–160 KiB sensitivity, plus 50 MB fixed baseline; these are planning assumptions, not measured schema/benchmark results. Paid alternatives require explicit later budget approval; no paid plan/provider is selected. DATA_MODEL.md stays byte-for-byte unchanged.

## Clarified V1 backend/deployment constraints — later 12 October 2026

Re-evaluation supersedes the separate NestJS deployment, preserving PostgreSQL/domain/invariants and the portable service boundary. [ARCHITECTURE.md](ARCHITECTURE.md) and [DATABASE_BACKEND_SELECTION.md](DATABASE_BACKEND_SELECTION.md) are updated to the current path; no implementation/deployment occurs.

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D84 | Confirmed / FINALIZED V1; supersedes D80 | Next.js + TypeScript full-stack Route Handlers at /api/v1/*, server-side services/repositories/auth/validation/database adapters | One Vercel application path removes a separately hosted API. Thin HTTP handlers invoke modular authorized use cases; browser/Expo use the same REST contract, Server Components may use the same authorized read service directly |
| D85 | Confirmed hosting direction; plan/eligibility gated | Vercel hosting, $0 testing target | No deployed project/paid plan authorization. Hobby is personal/non-commercial only; commercial/internal business testing requires an eligible plan determination. Function/pool/job/backup/production settings remain unproved; no $0 commercial-production promise |
| D86 | Confirmed architecture boundary | Portable domain/services/repository ports with Next-specific transport/auth wiring at adapters; separate NestJS deferred | No financial formulas/ORM queries in route handlers, no framework objects/decorators in core contracts, no client credentials/repository bypass. Later Nest extraction requires justified runtime/team/scaling needs and preserves API/business invariants |

Auth/private storage/production DB plan/backup architecture/ORM adoption remain open. Exact decimal, transaction/idempotency/RLS/audit, multiple-daily secure backups and full tested restoration are unchanged. Next architecture phase stays separate; no Development Ready v1.0 or application implementation is declared.

## Final architecture audit — 16 October 2026

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D87 | Confirmed user direction | Supabase PostgreSQL is the selected authoritative business datastore for V1; Next.js/TypeScript full-stack REST and portable service/repository boundaries retained | Supabase Free may serve development; actual production capacity/recovery must meet invariants; no new database candidate review |
| D88 | Confirmed user direction | Supabase Auth, invite-only email/password, configured verification/reset/refresh/activation | Identity is separate from application membership/RBAC/resource authority; no public/anonymous signup. Session/revocation/bootstrap safeguards follow OPERATIONS_ARCHITECTURE.md |
| D89 | Confirmed user direction | Cloudinary stores file bytes in development AND production; PostgreSQL stores metadata | No Supabase Storage selection or binary-in-DB design. Authorized server-mediated private upload/delivery, originals/derivatives, version/manifests, audit and cleanup requirements documented |
| D90 | Confirmed user direction; supersedes D07 production/D85 cost gate | Vercel selected; appropriate paid production plan acceptable, eligible free resources optional for development | Hobby/$0 eligibility is no longer a production architecture blocker. No purchase or deployment authorized/performed by this audit |
| D91 | Historical audit outcome; superseded by D92–D96 | Initial verdict: Development Ready v1.0: NO — recovery architecture was incomplete | Select runner/independent store/cadence/retention/key custody/targets/operator/monitoring and consistent DB/Auth/file recovery; then reassess. Runtime feature tests and actual restore execution are production gates, not prerequisites to starting implementation after architecture closure |

No finalized business policy or conceptual responsibility is redesigned. No schema, migration, endpoint, feature, credential, package or deployment was created. Final evidence: FINAL_ARCHITECTURE_AUDIT.md and DOCUMENTATION_REVIEW.md.

## B1 recovery architecture closure — later 16 October 2026

[OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md#backup-and-disaster-recovery--authoritative-v1-specification) is the single selected recovery specification. These are architecture decisions under the user's request, not infrastructure procurement/configuration or restore execution.

| ID | Status | Decision | Rationale / consequence |
|---|---|---|---|
| D92 | Selected V1 recovery architecture | Supabase Pro + eligible Small-or-higher compute, seven-day PITR; independent logical DB/Auth archives from protected private GitHub Actions to a separate private Cloudflare R2 Standard recovery account | Managed recovery and off-provider/account recovery are separate paths; explicit Auth coverage, configuration/secrets inventory and immutable file manifests required |
| D93 | Selected cadence/objectives | Capture every three hours with one-hour sealing budget; independent RPO <= 6 hours and total RTO <= 4 hours are objectives pending measured exercises | Replaces proposed six-hour starts to provide completion/delay headroom. GitHub schedules can be delayed/dropped; monitoring/fallback exposes breaches rather than promising a scheduler SLA |
| D94 | Selected retention/security/custody | Seven-day frequent, 35-day daily and 400-day monthly self-contained encrypted generations, tier locks, separate prune/verification access; age decryption identities in independent vault/offline custody | No keys with backup objects or capture-runner decrypt keys. R2 admin can remove locks; separate administration/MFA/dual approval and external alerts mitigate residual risk |
| D95 | Selected operations/recovery | System Owner / Designated Technical Administrator owns alerts/investigation/execution/evidence; Owner approves production restore and traffic cutover; Better Stack external freshness monitoring; explicit DB/Auth/Cloudinary runbook and drills | Four-hour stale warning, six-hour RPO breach; pre-production full isolated restore, monthly integrity drills, quarterly/full-on-change restores. No test has been executed |
| D96 | Final readiness reassessment; supersedes D91 | B1: CLOSED. Development Ready v1.0: YES. Production Ready: NO | All B1 decisions selected; no new material architecture/business blocker identified. Runtime security, operational configuration/capacity and measured restore remain production gates; next implementation phase needs separate authorization |

## Architecture alternatives and revisit triggers

This is the canonical alternatives record; no competing ALTERNATIVES.md is needed. Entries consolidate documented choices, not a new provider selection/benchmark. SECURITY/DATA_MODEL/OPERATIONS remain the detailed authorities. Where no comparison exists, that limitation is explicit. Historical source for the earlier hosting candidate: `d01b3ae`, `docs/ARCHITECTURE.md`, “Free deployment and offline boundary”. No newly invented alternative is attributed to past review.

### Backend

- **Context:** V1 has an existing Next.js UI and needs reusable trusted REST workflows for web/future Expo.
- **Options:** Existing full-stack Next.js; earlier separate NestJS deployment (D80), subsequently superseded; handler-embedded business logic rejected in DATABASE_BACKEND_SELECTION.
- **Chosen:** Next.js full-stack thin `/api/v1/*` adapters, authorized modular services/repositories (D84/D86).
- **Why:** One V1 application/deployment preserves the existing stack while portable contracts retain the ability to extract business services.
- **Trade-off:** Function/pool/job boundaries must be respected; a separate backend offers independent execution/scaling at the cost of another deployment boundary.
- **Revisit if:** Sustained independent runtime/scaling/team/extraction requirements materially change the architecture; new reviewed decision required before NestJS adoption.

### Database

- **Context:** Finalized relational/financial/history invariants and multi-record atomic operations in DATA_MODEL.
- **Options:** PostgreSQL on Supabase; PostgreSQL on another/self-managed host; earlier MongoDB/Firebase suggestions. DATABASE_BACKEND_SELECTION §2 explicitly does not claim document-store benchmarks or full suitability studies.
- **Chosen:** Supabase PostgreSQL; development Free and selected production recovery plan are distinct (D79/D87/D92).
- **Why:** Explicit user choice; documented native relational/transaction/numeric mechanisms fit the conceptual invariants when application controls are implemented.
- **Trade-off:** Managed service quotas/configuration and Auth/export adapters need operational care; portability is a verified migration/reconciliation process, not just a connection-string swap.
- **Revisit if:** Verified capacity, operational/security/recovery needs no longer fit; preserve business invariants and review evidence before changing engine/host.

### Storage

- **Context:** Private documents need metadata/history/Company authorization while bytes stay outside PostgreSQL.
- **Options:** Cloudinary selected; Supabase Storage was mentioned as a possible later choice/quota input in the historical database selection. No formal comparative storage evaluation was recorded.
- **Chosen:** Cloudinary in development AND production (D89), PostgreSQL metadata/manifests.
- **Why:** Explicit user direction; private original/derivative, version and independent recovery requirements are defined through the provider adapter.
- **Trade-off:** Separate DB/object consistency requires stages/reconciliation; delivery/privacy/version/export settings and quotas must be proven. No undocumented price/security superiority is claimed.
- **Revisit if:** Verified private delivery, required formats, limits, recovery or economics cannot meet finalized needs; new decision, not an automatic Supabase Storage substitution.

### Authentication

- **Context:** Invite-only identity/session recovery must be separate from domain Membership/RBAC/Owner authority.
- **Options:** Supabase Auth is the documented selection; repository history records no named competing authentication-provider evaluation. Bespoke password cryptography is prohibited by SECURITY, not a historically evaluated provider.
- **Chosen:** Supabase Auth (D88), with application authorization remaining independent.
- **Why:** Explicit user direction and maintained provider boundary; OPERATIONS defines identity/session/reset/revocation/provisioning contracts.
- **Trade-off:** Provider session/cookie/configuration and Auth export/recovery details require testing; a valid token never proves domain permission.
- **Revisit if:** Identity/security/recovery/mobile requirements cannot be met by the verified integration; document an actual comparison and new decision first.

### Hosting

- **Context:** Full-stack Next.js production must meet runtime/security/isolation/recovery needs; paid production is acceptable.
- **Options:** Vercel selected; Cloudflare was an earlier hosting candidate in `d01b3ae`. The earlier mandatory $0/Hobby premise was superseded, not proven commercially adequate.
- **Chosen:** Vercel with appropriate production plan (D85/D90).
- **Why:** Explicit selected direction fits the existing full-stack deployment boundary; no present material conflict was found in the final audit.
- **Trade-off:** Body/deadline/pool limits and durable background execution need appropriate architecture/testing; selection does not imply unlimited capacity or launch approval.
- **Revisit if:** Measured finalized workload or operational requirements materially conflict with available deployment capabilities; review evidence and alternatives before changing host.

### Recovery

- **Context:** Loss/corruption of DB/Auth/private originals must be recoverable beyond a primary provider/account.
- **Options:** Provider-only backup, independent logical/file recovery, proposed six-hour GitHub starts, and the documented operator/CI/off-site candidates in historical selection inputs.
- **Chosen:** D92–D95 and the single OPERATIONS recovery specification: managed Supabase recovery plus independent private GitHub/R2 complete generations with three-hour capture.
- **Why:** Provider-only DB recovery omits Cloudinary bytes/configuration and shares a failure domain. Three-hour capture provides headroom for the six-hour RPO objective; no schedule SLA is invented.
- **Trade-off:** More storage/credentials/verification/custody and restore work; scheduler delays, admin-removable locks and poisoned source data remain modeled risks with mitigations.
- **Revisit if:** Measured capacity, recovery objectives, failure domains or repeated objective breaches require a changed runner/store/cadence; preserve tested complete recovery and deliberate human restore approval.

## AI development governance — 16 October 2026

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D97 | Confirmed governance scope; documented, not runtime enforcement | Adopt HANDOVER-first workflow, CONSTRAINTS/AI action policy, meaningful trace/Defense/pre-ship requirements and actual verification evidence; retain existing authorities for decisions/data/tests/security/recovery | No business policy/provider change or reversal of Development Ready YES. Agent/tool: Codex; exact model version not recorded. Governance task does not authorize implementation, commit/push, production access or deployment |

## Governance consolidation — 16 October 2026

| ID | Status | Decision | Consequence |
|---|---|---|---|
| D98 | Confirmed documentation refinement | AGENTS owns action/dependency/secret/workflow rules; HANDOVER keeps current state/live assumptions; traces depend on risk/complexity/session scope; one Defense template before meaningful subsystem release | Refines D97's organization without changing business/architecture/security/data/recovery/production requirements. Manifests/lockfile own dependencies; normal work does not update a document set. Agent/tool: Codex; no Phase 1 execution or commit/push |
