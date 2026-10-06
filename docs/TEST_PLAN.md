# Test Plan
Updated: 6 October 2026
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
| T06 | AC-06 | Simultaneous invoice finalizations for one order produce one valid billing allocation | Integration |
| T07 | AC-07 | Print 1/14/15/35 lines, long text and Urdu; no missing lines or repeated grand total | Browser/manual |
| T08 | AC-08 | Fuel entry through either screen uses one transaction in reports | Integration/browser |
| T09 | AC-09 | Repair 8,000+2,000, paid 4,000 → remaining 6,000 | Unit/integration |
| T10 | AC-10 | Paid in Party, ambiguous dates, text weight and missing money require review | Integration/browser |
| T11 | AC-11 | Repeated or interrupted import commit does not duplicate accepted rows | Integration |
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

## Operational and import cases
Registration case/whitespace variants match the reviewed canonical vehicle; similar registrations never auto-merge. Reject inactive assignments as required by the eventual rule. Exercise stale version conflicts between two staff sessions.
Test leap dates, month boundaries and business timezone conversions. Preserve unknown dates for review rather than inventing a day. Import damaged/unsupported files, duplicate source batches and missing required columns. Confirm summary totals exclude example rows marked as skipped.
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

T19 / AC-19: create two suppliers with two branches each; selection and direct requests reject mismatched supplier/branch IDs. T20 / AC-20: purchases A=10,000 and B=20,000, central payment allocations A=5,000/B=10,000 leave consolidated 15,000. T21 / AC-21: pay branch A another 5,000; only A clears. T22 / AC-22: reject cross-supplier/currency allocation; preserve unallocated credit separately; reverse a central payment and restore each affected branch balance. Exercise simultaneous allocations to the same purchase and reject over-allocation. Verify archived branches remain in historical statements and imports flag unknown suppliers/branches. These tests are planned, not executed.

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
| T29 | AC-25 | Exercise auth, user/role/grant, transport/master, outsourcing, fuel/expense, invoice/payment/settlement, import/export and settings actions from AUDIT.md; verify correct action, actor snapshot, company, resource and server time |
| T30 | AC-25 | Update vehicle/rate; persisted before/after and changed fields match actual data; create has no previous state; renamed/archived actor/resource preserves history; failed mutation produces no false success event |
| T31 | AC-25 | Inject synthetic password/token/API-key values into nested fields, descriptions, errors and request metadata; no credentials persist in audit storage, archives or exports; permitted business fields remain useful |
| T32 | AC-25 | Normal users and Owner cannot update/delete historical events through UI, crafted API or normal app database credentials; trusted writer can append only; provider tests wait for selection |
| T33 | AC-26 | Date/range boundaries, user/module/action/company/reference/text filters, stable sorting and pagination return only permitted matching events, including counts and empty states |
| T34 | AC-26 | View-only audit reader cannot export; export-only grant without view also fails; both grants allow scoped export and generate its audit event; record Activity additionally requires parent/field permissions |
| T35 | AC-25 | Audit-write failure rolls back sensitive mutation or preserves a tested durable outbox guarantee; retries produce one committed success event; safe denied/auth-failure events use restricted unknown-company handling |
| T36 | AC-23–26 | Keyboard/assistive use of permission matrix, role assignment and Activity history; protected controls locked, errors recoverable, redacted fields never fetched then hidden |

Verify retention/archival permissions and restoration once O10/O12 are resolved. Permission additions require new allow/deny/resource-scope tests; catalog changes must not grant custom roles new capabilities automatically. Include direct financial posting, reversal, branch/supplier and identity-file tests when their action semantics are finalized.
