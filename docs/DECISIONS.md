# Decision Log
Updated: 6 October 2026
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
| O05 | Multiple vehicles or receivers per order? | Multiple stops known; cardinality not confirmed | Order schema |
| O06 | Fare basis, tax, discounts and rounding? | Not specified | Financial calculations |
| O07 | Currency, timezone, business name, languages? | PKR/Asia-Karachi proposed from records, not confirmed | Settings and print acceptance |
| O08 | Which staff receive which custom grants and financial correction authority? | Role architecture resolved by D18–D21; actual assignments/correction workflow remain open | Production access |
| O09 | Hosting/auth/files within free constraints? | Cloudflare candidate; provider fit not verified | Deployment |
| O10 | Export/backup owner, frequency, retention and recovery target? | Free backups required; method not selected | Launch |
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
