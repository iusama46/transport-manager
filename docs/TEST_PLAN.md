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
| T13 | AC-13 | Sample settlement gives 67,000 then 47,000 after another 20,000 payment | Unit; explicitly configured agreement |
| T14 | AC-14 | Customer receipt and partner payment alter only their respective ledgers | Integration |
| T15 | AC-15 | Direct unauthorized API/file requests deny access | Security integration |
| T16 | AC-16 | Filtered reports reconcile; archive preserves history | Integration/browser |
| T17 | AC-17 | Restore export into isolated environment; counts, relationships and balances reconcile | Recovery exercise |
| T18 | AC-18 | Review deployment configuration: free plans, no chargeable add-ons | Release review |

## Additional financial cases
Zero versus missing amounts; agreed decimal precision/rounding; invalid negative payment; credit/overpayment; cross-currency allocation rejection; allocation exceeding payment; payment retry after timeout; same idempotency key with different payload; reversal of a reversed entry; cancellation after invoicing.
Verify atomic rollback if posting fails halfway. Test invoice numbering collisions. Settlement fixtures explicitly configure the finalized agreement rules and payment direction; sample spreadsheet interpretation is not an expected universal rule.

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

Verify finalized no-purge retention/archival rules; execute provider-specific backup/restore checks after the remaining O10/O12 technical/compliance details are resolved. Permission additions require new allow/deny/resource-scope tests; catalog changes must not grant custom roles new capabilities automatically. Include direct financial posting, reversal, branch/supplier and identity-file tests when their action semantics are finalized.

## Finalized V1 acceptance additions — planned, not executed

Each case checks granted success, denied direct server requests, company-scoped related IDs, correct audit event and concurrency/retry behavior where financially relevant. Business-policy gates are closed by D51–D69; fixtures use explicit agreement configuration and numeric examples below. Provider-dependent execution remains pending.

| Test | Requirement | Scenario / expected result |
|---|---|---|
| T37 | FR-03 | Create one Order/one Trip, one Order/multiple Trips and separate movement Orders; add Trip to eligible active Order, reject unauthorized/ineligible addition; Draft may precede first Trip |
| T38 | FR-03 | Optional Planned Quantity absent accumulates actuals; present shows target/loaded/delivered/remaining; loaded 100, delivered 98 shows shortage 2; loaded/delivered/custom billable basis retains actual quantity; original units/conversion preserved and Loaded/Delivered remaining basis per T66/T67 |
| T39 | FR-15 | Apply dated rate versions for 01–07 Oct, 08–15 Oct and 16 Oct onward; verify configured Order/loading/delivery/custom dates, optional dimensions and historical Trip unchanged after new rates; most-specific match, ambiguity resolution and provisional-to-final date handling per T69–T71 |
| T40 | FR-15/05 | Authorized Trip/fuel rate override retains default/final and reason where applicable; unauthorized override rejected; actual historical rate unchanged after later config |
| T41 | FR-07 | One Trip invoice and multi-Trip invoice; default full remaining; partial 40 of billable 100 leaves 60; reject partial without grant, overbilling, fully billed Trip and concurrent excess; audit partial billing |
| T42 | FR-08 | Invoice 100, receipt 30 leaves 70; one receipt spans invoices; fully/partially unallocated and advance credit later allocate once; reject excess/foreign target; reallocation preserves history and updates both balances |
| T43 | FR-08 | Customer/partner/supplier payments exercise unallocation, reallocation, reversal, bounced/failed correction, refund and partial refund; originals retained, reasons/grants/audit checked, account/ledger effects reconcile; same-currency invoice targets, original correction links and effective balances reconcile |
| T44 | FR-08 | Partner payment settles one/multiple Trip payables, partial/bulk and later advance allocation; outstanding/credit correct, customer receipts unchanged; explicit fixed/percentage agreement and payment-direction fixtures, no automatic debtor inference |
| T45 | FR-05/12 | Multiple suppliers/branches, cash/credit, historical transaction-date price; liters 10 × rate 5 = calculated 50; authorized actual 49 retains both, override flag/actor/time/reason/diff; unauthorized rejected; partial/bulk central/branch supplier payments and advance reconcile |
| T46 | FR-06 | Custom category; Trip/Order/Vehicle/Driver/general expenses and receipts/payment/creator; revenue 100 − partner 30 − attributable fuel 10 − Trip expense 5 = margin 55; general expense 20 excluded; four shared allocation methods reconcile per T75; invoice-date recognized revenue distinct from operational estimates |
| T47 | FR-02 | Company/partner/individual ownership and driver affiliation changes; driver switches vehicles and vehicle switches drivers; history and actual Trip snapshots remain unchanged |
| T48 | FR-16 | Multiple uploads, predefined/custom types and metadata; private download/parent/identity grants; optional expiry, expired/expiring-soon, configurable 30/15/7 or other periods and dashboard scope; V1 warning only; otherwise-authorized assignment remains possible per T76 |
| T49 | FR-17 | Delete unused dependency-free record with permission; referenced Trip/invoice/payment/fuel/expense/audit dependency rejects deletion; archive/deactivate/reactivate audited, selectors exclude inactive, history resolves |
| T50 | FR-03/17 | Draft/In Progress edits, Delivered sensitive permission, invoiced/settled financial locks; linked correction retains original. Draft Order dependency delete, reasoned cancel with Trips, completed/invoiced dependency guard, eligible reasoned reopen; manual Order completion warns/preserves unfinished Trips; reasoned eligible reopen does not change them |
| T51 | FR-07 | Draft invoice edit/delete allowed only with grants/no dependencies; issued core edit rejected; reasoned void/cancel and original-linked Credit/Debit Note with automatic ledger effect; paid/part-paid cancel blocked until allocations resolved; correction/reissue or original-linked note reconciles effective Trip billing, tax/historical FX and allocations with no duplicate billing |
| T52 | FR-18 | Cash/bank receipts, outgoing payment, configurable methods/accounts, own-account transfer 100 reduces source/increases destination once; no income/expense; concurrent retries and reversal reconcile balances |
| T53 | FR-18 | Company base currency and foreign-currency invoice/payment/receivable/payable/account/report; historical FX retained after new rate; do not sum unlike currencies; same-currency invoice settlement enforced per T65; no invoice cross-currency allocation or settlement differences in V1; non-invoice transfer mechanics remain technical |
| T54 | FR-18 | Tax-free invoice and configured tax rate; finalized tax snapshot unchanged after config edit, correction traceable; configured precision/rounding preserves original gross and historical results; physical representation follows technical selection |
| T55 | FR-11 | Company numbering for Orders/Trips/Invoices/Payments/notes, collision/retry guards; external Factory/PO/Bilty/DO/consignment references never replace unique IDs |
| T56 | FR-13 | Expanded catalog allows granted actions and denies unknown/ungranted actions server-side; spoof foreign Trip/rate/ledger/account/document/note IDs fails even for Owner; revoked grants lose access; no audit mutation keys |
| T57 | FR-14 | Exercise every newly listed AUDIT.md sensitive action including export; correct actor/company/original links/before-after; secrets nested in payloads redacted; normal users/Owner cannot edit/delete events; audit failure/retry durability |
| T58 | FR-19 | Authorized PDF/XLSX/CSV of applicable Orders/Trips/master/fuel/expense/invoice/payment/settlement/reports; unauthorized/field/foreign-company data excluded server-side; export logged and formula-leading text neutralized |
| T59 | FR-19 | Permitted V1 Orders/Trips/fuel/expenses/invoices complete normally with AUTO APPROVAL, no routine second reviewer; draft save does not issue/post. Verify V1 navigation/services have no bulk Excel/CSV import UI/API |
| T60 | FR-19 | Verify multiple scheduled automated backups in a day after provider selection, restricted access/security/retention; isolated documented restore reconciles records, relationships, snapshots, ledgers/accounts, audit and attachment objects; multiple-per-day and pre-production documented/tested restore are finalized requirements; exact schedule/provider/backup retention/targets remain technical |

V2 T10/T11 plus future cases cover Excel/CSV upload, preview/mapping, validation, duplicate detection, errors, confirmation, target grants and audit/retry provenance; configurable manual approval thresholds/reviewers are tested only after V2 policy design. Existing release/print/accessibility/security tests remain required; no application tests ran in this documentation task.

## Final business-policy acceptance — T61–T81, planned and unexecuted

These cases supplement T01–T60 without claiming runtime success. Use explicit company/agreement/currency/rule fixtures. Sensitive changes check allowed and denied direct requests, immutable safe audit, original snapshots and company scope; financially relevant cases include retry/concurrency and reconciliation.

| Test | Requirement / decision | Scenario and expected result |
|---|---|---|
| T61 | FR-03/07/08; D51 | Factory, Client, Consignee and supported alternative as Bill To each succeed when valid; invoice/receivable/credit belong to selected debtor, operational roles unchanged. Bill To change audited; foreign-company target rejected |
| T62 | FR-04/07; D52 | Gross 100,000: fixed deduction 3,000 gives 97,000 before other adjustments; percentage 3% gives 3,000; multiple fixed/percentage categories preserve individual bases, values, gross and net. Configured automatic and authorized manual entry, category archival/history and denied change tested |
| T63 | FR-03; D53 | Separate Orders for different Consignees and one Order with multiple potential Consignees both work; each Trip snapshots actual receiver/destination; incompatible receiver rejected and later relationship edits do not rewrite past Trips |
| T64 | FR-07/18; D54 | Gross 1,000, fixed discount 100 or 10% discount → 900 before configured tax/adjustments; rounding 900.126 to configured 2 decimals → 900.13 preserves original calculated value, rule/result and audit; unauthorized adjustment fails, configuration edit leaves history intact; discounted fully covered Trip has no phantom billable remainder, including multi-Trip/partial attribution |
| T65 | FR-08/18; D55 | AED invoice→AED payment, PKR→PKR and USD→USD allocations succeed; PKR payment→AED invoice fails via UI/direct API despite available FX/base values. Apply same rule to advance/reallocation and multi-invoice selection; ordinary multi-currency accounts/reports still work |
| T66 | FR-03; D56 | 30,000 kg↔30 tons with defined compatible rule; original entry/unit and converted values/rule remain historical after conversion configuration changes; incompatible units rejected |
| T67 | FR-03; D58 | Target 500 tons, loaded 30 and delivered 29.7: Loaded basis remaining 470; Delivered basis 470.3. Order/agreement basis retained, compatible units normalized and no optional target invented |
| T68 | FR-03/04/07; D57 | Loaded 30.00, delivered 29.70, shortage 0.30: informational rule changes no amount; billable-delivered rule bills 29.70 at configured rate; deduction/claim rule creates only configured financial effect. Preserve all quantities/rule/effect, audit changes, prevent double deduction and no universal shortage reduction |
| T69 | FR-15; D59 | Generic route 2,000, Factory+destination 2,100, Factory+material+destination 2,200 recommends 2,200. Authorized alternative valid 2,100 retains recommended/selected references/values and optional reason/audit; ungranted override and nonmatching/arbitrary rate rejected. Equal-specificity ambiguity is explicit, never silently arbitrary |
| T70 | FR-15; D60 | Exact conditions 01–31 Oct vs 15–31 Oct rejected; inclusive shared endpoint day rejected; nonoverlap 01–14 vs 15–31 accepted; end before start rejected; open-ended conflicts handled. Different match conditions coexist; concurrent identical-condition inserts cannot bypass rejection |
| T71 | FR-15; D61 | Calculated 30 tons×PKR 2,200/ton = 66,000 preserves source/rate/date/quantity/unit/gross snapshot. Manual Total 70,000 with operational quantity preserves creator/time/method/entered total and no fake unit rate. Provisional suggestion resolves at configured date event; missing date/match cannot silently lock; historical change needs authorized correction, audit; unauthorized manual price fails |
| T72 | FR-03; D62 | Manually complete Order with unfinished Trips using orders.complete: warning shown, Order Completed, Trip statuses unchanged (neither auto-completed nor cancelled), audit generated, report distinguishes statuses. Denied completion fails; permissioned reasoned reopen retains individual Trip history |
| T73 | FR-07/08/17; D63 | Original 30 tons/60,000 corrected to 29/58,000: permitted authorized correction/reissue retains original version/links OR original invoice plus 2,000 Credit Note. Increase via Debit Note path tested. Require reason and appropriate Trip/invoice/note grants; resolve allocated payments, preserve tax/historical FX, reconcile effective receivable/Trip billing/account balances, no silent mutation/reset/double billing/revenue |
| T74 | FR-06/09; D64 | Delivery 10 Oct, Invoice Date 15 Oct, payment 5 Nov: invoice-period revenue based on 15 Oct; receipt reduces debt/increases account cash, no new November revenue. Operational Trip/dispatch/delivery filters report their own activity. Corrections/reissues/notes reconcile once with original links; management-reporting policy labelled without statutory certification |
| T75 | FR-06; D65 | Expense 1,000 over two Trips: equal 500/500; compatible quantities 30/20 → 600/400; manual amounts 700/300; manual percentages 25/75 → 250/750. Reject totals ≠1,000 or percentages ≠100%, invalid/foreign target or unauthorized allocation; explicit rounding remainder reconciles. Preserve method/basis/values/history/audit; profitability uses each share once and excludes unallocated company expense |
| T76 | FR-02/16; D66 | Expired driver/vehicle/company/other applicable document shows status/warning/reminder/dashboard; otherwise-authorized assignment proceeds in V1 via UI/direct service. Expiry-only blocking and active blocking configuration absent; independent lack of permission still rejects |
| T77 | FR-13; D67 | First Owner established at company setup; has authorized company access/user-role management. Last active Owner cannot remove/deactivate self or be removed/reassigned by another or concurrent requests; ordinary custom-role changes cannot strip/forge ownership or bypass guard |
| T78 | FR-13/14; D67 | Protected authorized transfer to eligible active company user succeeds while always retaining an active Owner; unauthorized/ineligible/foreign recipient fails. Creation/transfer/removal/deactivation audit records correct actor and before/after; provider-backed execution waits technical selection |
| T79 | FR-17; D68 | Scheduled jobs/default retention settings perform no automatic purge of Orders, Trips, invoices, payments, ledger/fuel/financial/history or audit, including archived/deactivated records. Referenced history remains accessible under permission; no routine audit mutation/purge API |
| T80 | FR-19; D69 | Documentation and eventual selected infrastructure require multiple automatic backups/day, restricted access and documented restore. Production gate cannot pass without tested restore reconciling records/relationships/financial snapshots/ledgers/accounts/audit/private attachments. Exact schedule/provider/backup retention/targets await infrastructure choice; requirement existence is not execution evidence |
| T81 | FR-17/14; D68 | Documents retained by default; explicit permitted removal succeeds only with deletion grant and business/legal/dependency/integrity eligibility, with safe audit. Historical-integrity-protected or unauthorized removal rejected; no invented statutory retention period or automatic purge |

V2/Future test specifications additionally cover configurable Warning Only/Block Assignment by document type and cross-currency invoice settlement/allocation if pursued; neither behavior is enabled by V1 tests. Preserve controlled bulk import/manual approvals and existing deferred tests. Planned test coverage is complete for the supplied policies; no runtime tests were executed in this documentation-only task.

## SearchableSelect acceptance — T82–T101, planned and unexecuted

These scenarios validate the canonical [SearchableSelect contract](COMPONENTS.md#searchableselect) and [screen/state mapping](DESIGN.md#searchableselect-presentation-and-screen-mapping), extending the existing Combobox foundation. Use synthetic local sets of 10/100 records and a paged thousands-record service fixture; inspect requested page sizes and rendered option counts. Component/browser tests cover presentation and callbacks; T96/T97 require trusted service/security integration when those services exist. No new tests are implemented or executed by this documentation update.

| Test | Scenario | Expected result / level |
|---|---|---|
| T82 | Local search | Search loaded 10/100-option sets by feature-defined label/identifier matching; matching options and empty-dataset versus filtered-no-match states are correct, with no network required. Component |
| T83 | Server search | Debounce query changes and honor feature minimum characters; below threshold shows guidance, thousands-record fixture uses bounded requests, never a full-dataset download. Out-of-order results and changed permission/company scope cannot leak stale options/metadata. Component/service |
| T84 | Loading | Initial and next-page loading announce busy state, maintain layout/focus and committed selection; duplicate page requests prevented and obsolete options cannot be chosen. Component/browser |
| T85 | No results | No query matches shows No Results, distinct from no available scoped records; clearing/revising query recovers without selecting a fabricated value. Component |
| T86 | Search error/retry | First-page and next-page errors remain distinct from validation, retain selection/input and expose named retry. Retry targets only current query/page/scope, obsolete failed requests are ignored. Component/browser |
| T87 | Keyboard selection | Arrows open/navigate eligible options and scroll active item into view; Enter commits/toggles, Escape closes without changing committed value, Tab exits without trapping focus. Space types in search input and activates a dedicated selection trigger where applicable. Component/browser |
| T88 | Clear selection | Allowed clear reports null/empty collection and restores appropriate focus; prohibited clear absent; named per-item removal preserves other multi values. Component/browser |
| T89 | Required validation | Empty required value, including after permitted clear, cannot submit; visible required indicator and associated error, first-invalid focus and other form input retained. Query text alone never satisfies required entity selection. Component/browser |
| T90 | Disabled/read-only | No search, clear, keyboard/touch mutation or option-search fetch; disabled semantics/prerequisite help correct, read-only value legible and inspectable, unchanged form IDs retained by adapter. Component/browser |
| T91 | Single selection | Default commits exactly one stable ID; duplicate labels are distinguishable, selecting another replaces only that reference, popup closes and focus returns, query text never saved as ID. Component |
| T92 | Multi-selection | Explicit supported workflow toggles/deduplicates IDs, exposes selected states, wraps labels and provides full-selection view and named removal; no implicit select-all over unloaded results or multi Driver/Vehicle/initial Role reference. Component/browser |
| T93 | Pagination/load more | Stable ordered pages deduplicate IDs, honor hasMore, preserve selection and current-query results; accessible Load more remains available for infinite loading. Rendered options remain bounded as pages accumulate and active descendant remains mounted. Component/browser |
| T94 | Dependent reset | Factory→Client→Consignee, Supplier→Branch, Order→eligible Trips and applicable Partner→Vehicles: incompatible child reset/remap, compatible child retained; unknown compatibility blocks save. Late old-parent results ignored. Bill To independence and compatible cross-Order invoices unchanged. Component/service/browser |
| T95 | Archived history | New choices exclude archived/inactive entities; authorized historic edit/detail keeps original ID and label with status, even after archival, without blank/substitution. Unchanged history follows lifecycle rules; expiry-only V1 driver/vehicle warning does not block assignment. Component/service/browser |
| T96 | Tenant-invalid option | Bypass UI with guessed foreign-company IDs in lookup, selected-record resolution and save, including mixed-company multi IDs; server rejects, foreign labels/counts not returned and no unauthorized change occurs. Security integration |
| T97 | Unauthorized option | Direct requests with missing/revoked action/resource grants, inactive user or invalid relationship/status fail independently of UI; repeat after permission/relationship changes, historical read does not authorize new archived assignment. Security integration |
| T98 | Selected outside current page | Search, change page and retry retain selected ID/label; initial stored ID resolves through authorized selected-record read/snapshot without scanning pages. Missing or newly inaccessible reference is explicit and never replaced with first result or forbidden metadata. Component/service |
| T99 | Long labels | Primary/secondary metadata and multi labels wrap; full selected/option values available without hover at 200% zoom, similarly named records remain distinguishable, optional icons/status never sole label. Browser/manual |
| T100 | Mobile/touch | Narrow single-column layout and onscreen keyboard preserve popup/actions/active result inside viewport; at least 44px touch targets, scrolling and selection survive blur, no horizontal clipping or accidental clear. Browser/manual |
| T101 | Accessibility | Visible associated label, help/error/required semantics, valid combobox/listbox/active-descendant, selected/disabled/multi states; polite progress/results/selection announcements, named action controls, visible contrast/focus and dialog focus return. Check keyboard-only plus screen reader; ARIA presence alone does not pass. Browser/manual |

Reuse existing PRD security/lifecycle acceptance (T01/T15/T16/T49/T56/T63/T65/T69/T76–T78) rather than creating different business rules. Full SearchableSelect compliance and feature/server integration remain implementation work; historical table/showcase checks in TASKS.md are not execution evidence for T82–T101.

### Implementation verification — 10 October 2026

SearchableSelect and its synthetic showcase are now implemented with React Select. Web/shared lint and type checking, targeted Prettier, git diff --check, the four existing environment tests and an isolated production build with existing installed dependencies passed. These checks do not execute T82–T101. Component interaction, browser/mobile, screen-reader and trusted-service acceptance remains pending.
