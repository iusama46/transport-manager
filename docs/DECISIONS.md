# Decision Log
Updated: 9 October 2026
Status key: Confirmed = explicit user direction; Proposed = design recommendation; Open = unresolved.

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

## Open decisions
| ID | Question | Current evidence | Gate |
|---|---|---|---|
| O01 | Supabase, MongoDB now, or MongoDB later? | Supabase originally proposed; user said MongoDB later, without answering follow-up | Persistence/auth/hosting implementation |
| O02 | Who owes the transport bill? | Asked but no unambiguous answer | Invoice account rules |
| O03 | Does Munir receive net fare and advance? | File has 100,000, 3,000, 97,000, 30,000, 67,000; interpretation unconfirmed | Settlement engine |
| O04 | Fixed or percentage commission; cost deductions? | Not specified | Settlement engine |
| O05 | PARTLY RESOLVED: multiple vehicles via Trips finalized by D26; multi-consignee rules remain open | Order → 1..N Trips; separate movement Orders allowed | Consignee cardinality/Trip linkage review |
| O06 | PARTLY RESOLVED: configurable billable quantity/rates/tax and multi-currency finalized; discounts, rounding/precision and FX allocation/differences remain open | D27–D29, D43–D44 | Financial calculation policy |
| O07 | Currency, timezone, business name, languages? | PKR/Asia-Karachi proposed from records, not confirmed | Settings and print acceptance |
| O08 | Which staff receive which custom grants and financial correction authority? | Role architecture resolved by D18–D21; actual assignments and detailed correction accounting policy remain open | Production access |
| O09 | Hosting/auth/files within free constraints? | Cloudflare candidate; provider fit not verified | Deployment |
| O10 | Backup owner, exact schedule/mechanism, retention and recovery target? | V1 multiple automatic backups daily and full export finalized; infrastructure-specific details open | Provider feasibility / launch |
| O11 | Exact approved bill design? | Prior minimal multipage bill referenced; not revalidated in this task | Print layout implementation |

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

O12 — Open operational policy: audit retention duration, archival schedule, operator, exceptional infrastructure disposal/legal hold and protection of unscoped authentication events. Coordinate with O10 backups/recovery; immutability through normal application operations is already finalized.

## FINALIZED capability decisions — 9 October 2026

These explicit product/architecture decisions supersede older conflicting proposals. Requirements: Finalized for this decision set. Design specification: Updated. Business implementation: Not Started. Detailed unresolved policies below are not silently finalized.

| ID | Finalized decision | Canonical specification |
|---|---|---|
| D26 | Order → 1..N Trips, one Trip valid; separate movement Orders valid; active Orders may add Trips subject to status/permissions | PRD FR-03 |
| D27 | Optional planned quantity; loaded/delivered/difference, agreed billing basis and historical billable quantity | PRD FR-03 |
| D28 | Effective-dated transport rate versions, optional matching dimensions, immutable Trip rate snapshot; authorized audited exception retains default/final rate | PRD FR-15 |
| D29 | Agreement-specific Order/loading/delivery/custom rate date; no global hard-coded rule | PRD FR-15 |
| D30 | One or multiple Trips per invoice; default full remaining billing, authorized audited partial billing, no duplicates/overbilling | PRD FR-07 |
| D31 | Customer receivables with partial/multi-invoice allocations, unallocated/advance credit and traceable reallocation | PRD FR-08 |
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

D11/D12 are now required in the scope above: outsourced views reuse existing records and financial posting preserves traceability/concurrency integrity. O05 vehicle cardinality and O06 capability questions are resolved as recorded; their narrower remaining policies are retained. Database/backend and hosting are NOT selected.

## Remaining requirement/policy review gates

| Gate | Unresolved policy and potential effect |
|---|---|
| O02 | Who legally/commercially owes charges (Client, Factory, Consignee or case-by-case)? Explicit billing account remains required; affects party links/credit ownership |
| O03/O04 | Munir sample collection direction, fixed/percentage commission, agreed payable and fuel/repair deductions; affects settlement calculations, never inferred from a sample |
| O05 | Can an Order/Trip involve multiple Consignees, and how do stops/delivery quantities map to them? Multiple Trips/vehicles is already finalized |
| O06 | Quantity/rate/money precision, rounding stage, discounts, FX conversion/allocation and exchange differences (including cross-currency transfers/refunds); affects financial integrity |
| O13 | Rate interval boundaries/overlaps, specificity precedence, missing rate/date handling and snapshot timing when Delivery Date is not known; affects pricing workflow |
| O14 | Quantity unit conversion, remaining basis (loaded or delivered), over-fulfilment and shortage disposition; affects progress and billing calculations |
| O15 | Exact lifecycle transitions/Order completion aggregation, delivered sensitive-field list, cancellation of dependent Trips and eligible reopening; affects operations/locks |
| O16 | Credit/debit note scope, tax/FX effects, rebilling eligibility and cancellation/refund/unallocation sequence; affects Trip balances and ledger corrections |
| O17 | Trip revenue recognition and shared Order/Vehicle/Driver expense/fuel attribution; affects profitability, avoids general expense/double-counting |
| O18 | Expired licence/document assignment blocking versus warnings; alert capability finalized, blocking policy unresolved |
| O07/O08/O11 | Identity/base currency/timezone/languages/print template; actual staff grants and Owner provisioning/transfer; defaults/production access still need agreement |
| O10/O12 | Backup/recovery owner and targets, audit/business/document retention and exceptional infrastructure disposal; recovery and access policy gates |

These are material gaps. The finalized capability set is internally consistent, but the complete business specification is not yet certified complete and the project is not declared Development Ready v1.0. Review these before committing affected model/financial/auth/workflow designs.

## Remaining technical choices

Database/backend technology; auth/private storage and Owner provisioning mechanism; hosting/deployment; exact backup frequency/mechanism/retention after infrastructure selection; provider-supported transaction/outbox, immutable audit protections, decimal/FX representation, export generation and secure file handling. Preserve the $0 constraint and validate multiple daily backups without selecting a provider in this task. Future import commit mechanics and future notification delivery remain deferred.
