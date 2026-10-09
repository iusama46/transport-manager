# Test Plan
Updated: 9 October 2026
Status: Business/RBAC/audit tests below are planned, not executed. Existing environment/shell verification and current build blockers are recorded in TASKS.md.

## Scope and strategy
Validate [PRD.md](PRD.md) using domain unit tests, data/service integration tests, browser workflows and targeted manual print/accessibility checks. Vitest and Playwright are proposed. Provider-specific tests follow the database decision. Use synthetic fixtures; do not copy private identity documents into test repositories.

## Traceability
| Test | PRD criteria | Scenario and expected result | Level |
|---|---|---|---|
| T01 | AC-01 | Change customer; incompatible consignee cannot persist | Integration/browser |
| T02 | AC-02 | Change owner after job; old assignment retains historical owner | Integration |
| T03 | AC-03 | Save/reorder six stops; reload preserves all stops and sequence | Browser |
| T04 | AC-04 | Deliver an unpaid priced order; collection status stays unpaid | Integration |
| T05 | AC-05 | Invoice 10,000, receipts 3,000+2,000 → balance 5,000; reverse 2,000 → 7,000 | Unit/integration |
| T06 | AC-06 | Simultaneous invoice finalizations for one Trip cannot exceed its remaining billable amount | Integration |
| T07 | AC-07 | Print 1/14/15/35 lines, long text and Urdu; no missing lines or repeated grand total | Browser/manual |
| T08 | AC-08 | Fuel entry through either screen uses one transaction in reports | Integration/browser |
| T09 | AC-09 | Repair 8,000+2,000, paid 4,000 → remaining 6,000 | Unit/integration |
| T10 — V2 | AC-10 | Paid in Party, ambiguous dates, text weight and missing money require review | Integration/browser |
| T11 — V2 | AC-11 | Repeated or interrupted import commit does not duplicate accepted rows | Integration |
| T12 | AC-12 | Edit outsourced record; both list views reflect one order | Browser |
| T13 | AC-13 | Sample settlement gives 67,000 then 47,000 after another 20,000 payment | Unit; blocked on rule confirmation |
| T14 | AC-14 | Customer receipt and partner payment alter only their respective ledgers | Integration |
| T15 | AC-15 | Direct unauthorized API/file requests deny access | Security integration |
| T16 | AC-16 | Filtered reports reconcile; archive preserves history | Integration/browser |
| T17 | AC-17 | Restore export into isolated environment; counts, relationships and balances reconcile | Recovery exercise |
| T18 | AC-18 | Review deployment configuration: free plans, no chargeable add-ons | Release review |

## Additional financial cases
Zero versus missing amounts; agreed decimal precision/rounding; invalid negative payment; credit/overpayment; cross-currency allocation rejection; allocation exceeding payment; payment retry after timeout; same idempotency key with different payload; reversal of a reversed entry; cancellation after invoicing.
Verify atomic rollback if posting fails halfway. Test invoice numbering collisions. Settlement expectations remain provisional until business rules are confirmed.

## Operational cases and V2-only import cases
Registration case/whitespace variants match the reviewed canonical vehicle; similar registrations never auto-merge. Reject inactive assignments as required by the eventual rule. Exercise stale version conflicts between two staff sessions.
Test leap dates, month boundaries and business timezone conversions. Preserve unknown dates for review rather than inventing a day. V2 only: import damaged/unsupported files, duplicate source batches and missing required columns. Confirm summary totals exclude example rows marked as skipped.
Fuel source reports and overall reports must reconcile to the same accepted purchases.

## Security and file cases
Run generated custom roles with explicit permission sets against read/write/finalize/reverse/access-management/export actions; never infer authorization from role names. Alter record IDs and object keys, spoof role fields, try expired/revoked sessions and direct requests bypassing UI.
Test uploads with oversized files, spoofed extensions and unsafe content types; private attachments must not become public. CSV exports containing formula-leading text must be neutralized without changing stored data. Logs must not expose credentials or full identity numbers.

## UX and compatibility
Check keyboard-only entry, focus/error summaries, table scrolling and tablet layout. Test reload/back navigation with active filters. Preserve form data on validation/network failure. Do not show success before a confirmed response.
Agree supported browsers before release; initially validate current Chrome and Safari on the intended computers. Browser-print rendering is a release check, not just a screenshot test.

## Performance and recovery
Use a representative synthetic set and document its size, selected provider, browser and network. The PRD’s two-second target is provisional. Measure common filtered lists and reports; inspect pagination and query counts rather than only loading tiny fixtures.
Simulate quota/network failures and retry recovery. Restore data and attachment manifests separately; a database-only export does not prove attachment recovery.

## Release gate and evidence
No unresolved high-severity authorization, financial-integrity, duplicate-entry or data-loss defects. Pass applicable ACs and record blocked ones with their decision dependencies. Restore test and multipage print test must pass.
For every run record date, commit, environment, fixtures, test command, pass/fail counts and unresolved defects. Never label this document as evidence that implementation already passed.

## Fuel extension tests

T19 / AC-19: create two suppliers with two branches each; selection and direct requests reject mismatched supplier/branch IDs. T20 / AC-20: purchases A=10,000 and B=20,000, central payment allocations A=5,000/B=10,000 leave consolidated 15,000. T21 / AC-21: pay branch A another 5,000; only A clears. T22 / AC-22: reject cross-supplier/currency allocation; preserve unallocated credit separately; reverse a central payment and restore each affected branch balance. Exercise simultaneous allocations to the same purchase and reject over-allocation. Verify archived branches remain in historical statements and V2 imports flag unknown suppliers/branches. These tests are planned, not executed.

## Dynamic RBAC and Activity Log acceptance — planned

Use synthetic users and at least two operating-company fixtures, plus separate external counterparties. The second company is an isolation adversary, not a commitment to tenant onboarding. Cover frontend states and direct server/API/data access. All cases below are unexecuted.

| Test | Criteria | Scenario and expected result |
|---|---|---|
| T23 | AC-23 | Create an arbitrary custom name/description and catalog grants; save/reload/edit role; renaming changes no authorization; unknown keys fail |
| T24 | AC-23 | Assigned active user performs a granted operation successfully; ungranted action and spoofed role/company fail via direct API despite crafted UI requests |
| T25 | AC-23 | Assign/change role, remove permission, deactivate user/role after reassignment; existing sessions lose old rights without retaining cached access |
| T26 | AC-23 | Guess another company's resource/role/audit IDs in reads, writes, counts, related IDs, downloads and exports; reject without leaking data; Owner has no implicit foreign membership |
| T27 | AC-24 | Attempts to delete/deactivate protected Owner, remove critical permissions or remove last active Owner fail; custom-role administrator cannot grant/assign higher privileges or forge system-role status |
| T28 | AC-24 | Delete/deactivate role with active assignments fails; authorized atomic reassignment permits safe archival/removal; concurrent new assignment cannot bypass guard; history remains linked |
| T29 | AC-25 | Exercise auth, user/role/grant, transport/master, outsourcing, fuel/expense, invoice/payment/settlement, V1 export (V2 import) and settings actions from AUDIT.md; verify correct action, actor snapshot, company, resource and server time |
| T30 | AC-25 | Update vehicle/rate; persisted before/after and changed fields match actual data; create has no previous state; renamed/archived actor/resource preserves history; failed mutation produces no false success event |
| T31 | AC-25 | Inject synthetic password/token/API-key values into nested fields, descriptions, errors and request metadata; no credentials persist in audit storage, archives or exports; permitted business fields remain useful |
| T32 | AC-25 | Normal users and Owner cannot update/delete historical events through UI, crafted API or normal app database credentials; trusted writer can append only; provider tests wait for selection |
| T33 | AC-26 | Date/range boundaries, user/module/action/company/reference/text filters, stable sorting and pagination return only permitted matching events, including counts and empty states |
| T34 | AC-26 | View-only audit reader cannot export; export-only grant without view also fails; both grants allow scoped export and generate its audit event; record Activity additionally requires parent/field permissions |
| T35 | AC-25 | Audit-write failure rolls back sensitive mutation or preserves a tested durable outbox guarantee; retries produce one committed success event; safe denied/auth-failure events use restricted unknown-company handling |
| T36 | AC-23–26 | Keyboard/assistive use of permission matrix, role assignment and Activity history; protected controls locked, errors recoverable, redacted fields never fetched then hidden |

Verify retention/archival permissions and restoration once O10/O12 are resolved. Permission additions require new allow/deny/resource-scope tests; catalog changes must not grant custom roles new capabilities automatically. Include direct financial posting, reversal, branch/supplier and identity-file tests when their action semantics are finalized.

## Finalized V1 acceptance additions — planned, not executed

Each case checks granted success, denied direct server requests, company-scoped related IDs, correct audit event and concurrency/retry behavior where financially relevant. Policy-dependent cases cannot receive final numeric expectations until the referenced DECISIONS.md gates close.

| Test | Requirement | Scenario / expected result |
|---|---|---|
| T37 | FR-03 | Create one Order/one Trip, one Order/multiple Trips and separate movement Orders; add Trip to eligible active Order, reject unauthorized/ineligible addition; Draft may precede first Trip |
| T38 | FR-03 | Optional Planned Quantity absent accumulates actuals; present shows target/loaded/delivered/remaining; loaded 100, delivered 98 shows shortage 2; loaded/delivered/custom billable basis retains actual quantity; remaining/unit policy waits O14 |
| T39 | FR-15 | Apply dated rate versions for 01–07 Oct, 08–15 Oct and 16 Oct onward; verify configured Order/loading/delivery/custom dates, optional dimensions and historical Trip unchanged after new rates; ambiguity/missing-date policies wait O13 |
| T40 | FR-15/05 | Authorized Trip/fuel rate override retains default/final and reason where applicable; unauthorized override rejected; actual historical rate unchanged after later config |
| T41 | FR-07 | One Trip invoice and multi-Trip invoice; default full remaining; partial 40 of billable 100 leaves 60; reject partial without grant, overbilling, fully billed Trip and concurrent excess; audit partial billing |
| T42 | FR-08 | Invoice 100, receipt 30 leaves 70; one receipt spans invoices; fully/partially unallocated and advance credit later allocate once; reject excess/foreign target; reallocation preserves history and updates both balances |
| T43 | FR-08 | Customer/partner/supplier payments exercise unallocation, reallocation, reversal, bounced/failed correction, refund and partial refund; originals retained, reasons/grants/audit checked, account/ledger effects reconcile; correction sequence waits O16 |
| T44 | FR-08 | Partner payment settles one/multiple Trip payables, partial/bulk and later advance allocation; outstanding/credit correct, customer receipts unchanged; sample commission calculations wait O03/O04 |
| T45 | FR-05/12 | Multiple suppliers/branches, cash/credit, historical transaction-date price; liters 10 × rate 5 = calculated 50; authorized actual 49 retains both, override flag/actor/time/reason/diff; unauthorized rejected; partial/bulk central/branch supplier payments and advance reconcile |
| T46 | FR-06 | Custom category; Trip/Order/Vehicle/Driver/general expenses and receipts/payment/creator; revenue 100 − partner 30 − attributable fuel 10 − Trip expense 5 = margin 55; general expense 20 excluded; shared attribution waits O17 |
| T47 | FR-02 | Company/partner/individual ownership and driver affiliation changes; driver switches vehicles and vehicle switches drivers; history and actual Trip snapshots remain unchanged |
| T48 | FR-16 | Multiple uploads, predefined/custom types and metadata; private download/parent/identity grants; optional expiry, expired/expiring-soon, configurable 30/15/7 or other periods and dashboard scope; block policy waits O18 |
| T49 | FR-17 | Delete unused dependency-free record with permission; referenced Trip/invoice/payment/fuel/expense/audit dependency rejects deletion; archive/deactivate/reactivate audited, selectors exclude inactive, history resolves |
| T50 | FR-03/17 | Draft/In Progress edits, Delivered sensitive permission, invoiced/settled financial locks; linked correction retains original. Draft Order dependency delete, reasoned cancel with Trips, completed/invoiced dependency guard, eligible reasoned reopen; transitions wait O15 |
| T51 | FR-07 | Draft invoice edit/delete allowed only with grants/no dependencies; issued core edit rejected; reasoned void/cancel and original-linked Credit/Debit Note with automatic ledger effect; paid/part-paid cancel blocked until allocations resolved; rebilling/tax/FX effects wait O16 |
| T52 | FR-18 | Cash/bank receipts, outgoing payment, configurable methods/accounts, own-account transfer 100 reduces source/increases destination once; no income/expense; concurrent retries and reversal reconcile balances |
| T53 | FR-18 | Company base currency and foreign-currency invoice/payment/receivable/payable/account/report; historical FX retained after new rate; do not sum unlike currencies; conversion/allocation/differences and cross-currency transfer/refund expectations wait O06 |
| T54 | FR-18 | Tax-free invoice and configured tax rate; finalized tax snapshot unchanged after config edit, correction traceable; precision waits O06 |
| T55 | FR-11 | Company numbering for Orders/Trips/Invoices/Payments/notes, collision/retry guards; external Factory/PO/Bilty/DO/consignment references never replace unique IDs |
| T56 | FR-13 | Expanded catalog allows granted actions and denies unknown/ungranted actions server-side; spoof foreign Trip/rate/ledger/account/document/note IDs fails even for Owner; revoked grants lose access; no audit mutation keys |
| T57 | FR-14 | Exercise every newly listed AUDIT.md sensitive action including export; correct actor/company/original links/before-after; secrets nested in payloads redacted; normal users/Owner cannot edit/delete events; audit failure/retry durability |
| T58 | FR-19 | Authorized PDF/XLSX/CSV of applicable Orders/Trips/master/fuel/expense/invoice/payment/settlement/reports; unauthorized/field/foreign-company data excluded server-side; export logged and formula-leading text neutralized |
| T59 | FR-19 | Permitted V1 Orders/Trips/fuel/expenses/invoices complete normally with AUTO APPROVAL, no routine second reviewer; draft save does not issue/post. Verify V1 navigation/services have no bulk Excel/CSV import UI/API |
| T60 | FR-19 | Verify multiple scheduled automated backups in a day after provider selection, restricted access/security/retention; isolated documented restore reconciles records, relationships, snapshots, ledgers/accounts, audit and attachment objects; exact schedule/targets wait O10/O12 |

V2 T10/T11 plus future cases cover Excel/CSV upload, preview/mapping, validation, duplicate detection, errors, confirmation, target grants and audit/retry provenance; configurable manual approval thresholds/reviewers are tested only after V2 policy design. Existing release/print/accessibility/security tests remain required; no application tests ran in this documentation task.
