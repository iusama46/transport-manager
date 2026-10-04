# Test Plan
Updated: 5 October 2026  
Status: Planned tests only. No application tests have run.

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
Run each role against read/write/finalize/reverse/admin/export actions. Alter record IDs and object keys, spoof role fields, try expired/revoked sessions and direct requests bypassing UI.
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
