# Product and Interface Design
Updated: 9 October 2026
Status: Proposed UX specification grounded in [PRD.md](PRD.md).

## Design goals
Make daily order entry, cost recording and balance lookup fast. Prefer readable tables, clear forms and consistent terminology. Desktop and tablet are the first targets; preserve basic usability on narrow screens. Styling is proposed, not an approved visual mockup.

## Navigation
Group the PRD’s 17 planned sections without removing any (the existing shell still has 16):
- Overview.
- Operations: Orders & Trips, Trip Details, Outsourced Orders, Rates / Rate History.
- Directory: Companies & Transport Partners, Factories, Customers & Consignees, Vehicles, Drivers.
- Costs: Fuel Management, Maintenance & Expenses.
- Finance: Invoices, Credit/Debit Notes, Customer/Partner/Supplier Ledgers, Payments & Settlements, Financial Accounts and Account Transfers.
- Reports.
- Administration: Data Export (bulk import V2), Documents & Expiry, Users & Permissions (Users; Roles & Permissions), Activity Log, Business Settings.

Outsourced Orders filters the same order records and uses the same details page.

## Visual system
Proposed style: light neutral background, white content surfaces, navy text and blue primary actions. Restrained green/amber/red statuses with text labels; never communicate status through colour alone. Use consistent spacing, visible focus, legible type and accessible contrast. Avoid decorative dashboards that obscure operational information.
Right-align amounts and quantities. Show currency in headings and date basis beside filters. Blank or unknown is not displayed as zero. Use full consignee names where space permits.

## Shared list behaviour
Search, date range, relevant entity/status filters, sortable columns, pagination, result count and clear-filter action. Preserve filter state in the URL where appropriate. Provide column visibility for dense tables. Each row opens a detail page; money-changing actions must not be triggered accidentally by row clicks.
Support loading, empty, filtered-empty, unauthorized, validation-error, network-error and quota-exceeded states. An empty report says no matching records, not a misleading zero balance.

## Orders
Default columns: order number/date, factory, customer, potential Consignees/actual Trip receivers, Bill To, cargo, Trip count/summary, operational status and billing state. Financial columns appear only to authorized users.
Create form sections: operational customer/potential Consignee relationships and separate Bill To selection; cargo/optional planned quantity/unit/Loaded-or-Delivered remaining basis; route and ordered stops; fulfilment; dates and notes. Selecting a new customer clears or asks to remap an incompatible consignee. Provide lookup/create shortcuts only where permission allows.
Each Trip chooses business-managed execution or outsourced partner. Vehicle owner is displayed independently from partner; an Order shows its Trip assignments.
Detail tabs: Overview, Stops & Delivery, Assignments, Expenses, Billing/Payments and Activity. Show unavailable tabs according to permission without leaking totals.
Reordering stops must work with keyboard controls as well as drag-and-drop.

## Outsourcing
Show partner, fare, commission, agreed payable, advances/other payments and outstanding amount. Present customer collection separately. Use configured fixed/percentage commission/deduction categories, with automatic/manual controls under permission and visible gross versus net snapshots; agreed partner obligation remains separate. Show a breakdown rather than a single unexplained net figure. A payment dialog names its recipient and obligation before posting.

## Fuel and maintenance
Fuel form: supplier, its branch/pump, vehicle, optional Trip, date, fuel type, liters, historical rate, calculated and final amount, payment information, optional odometer/receipt. Show permitted overrides and their actor/time/reason separately.
Maintenance form: vehicle, workshop, repair details, parts/labour/other costs, service due date/KM. Offer a total-only legacy mode when breakdown is unknown. Do not imply next-service mileage is overdue if current mileage is unknown.

## Billing and payments
Invoice flow: select billing account → select eligible Trips → review charges → save draft → finalize → print. Show excluded/fully-invoiced Trips with reasons. Finalization shows the billing account and total and explains that later corrections are recorded.
Payment flow: choose receipt/outgoing payment → select account → enter amount/date/method → allocate → review → post. Label unallocated credit explicitly. Disable repeat submission during requests while backend idempotency provides actual protection.
Issued invoices distinguish invoiced amount, received amount and outstanding balance.

## Print layout
A4, minimal colour, company header, invoice/account information, order lines, total, payment summary and page numbering where supported. Repeat table headers and prevent clipped lines. Validate 1, 14, 15 and 35 rows, long descriptions and Unicode/Urdu text. Exact branding must come from the approved template.
Use browser print/Save as PDF initially. Test pagination in the target browser; do not assume CSS alone guarantees correct repeated headers or page numbers.

## V2/Future import review
Upload → map columns → preview → resolve issues → commit → results. Show source row, raw value, suggested mapping and validation reason. Separate errors from warnings. Never silently map Paid to a consignee. Report committed/skipped/failed counts and provide a retry path that does not duplicate rows.

## Terminology and accessibility
The current PRD calls the receiver Consignee (Receiver), formerly Party. Do not rename it to Client without an explicit recorded decision. Use Customer for the direct customer.
Forms need labels, required indicators, inline errors and an error summary. Dialogs manage focus and keyboard escape appropriately. Tables have accessible headings and status text. Warn about unsaved form changes; preserve entered values after recoverable failures.

## Review needed
Business branding, final language(s), date/currency presentation, staff permission assignments, exact invoice template remain configuration work. Bill To responsibility is finalized as explicit selectable debtor; business policies are finalized. See [DECISIONS.md](DECISIONS.md).

## Fuel supplier and branch screens

Fuel Management includes Suppliers, Branches, Purchases, Payments and Statements. Selecting a supplier filters branch choices. Supplier details show consolidated totals and branch breakdowns. Branch details show contacts, location, purchases and allocated payments. Payment entry offers Branch payment or Central supplier payment. Review allocations by purchase and branch before posting; show any unallocated credit. Statements distinguish purchase branch from payment recipient and reconcile totals without repeating a central payment in every branch.


## Design system baseline - 5 October 2026

Use these standards for the first implementation. This is a specification, not completed UI. See COMPONENTS.md for separate component contracts. The initial theme is light; dark mode is deferred.

### Colours

| Semantic token | Value | Purpose |
|---|---|---|
| background | #F8FAFC | Page background |
| surface | #FFFFFF | Forms, tables, dialogs |
| foreground | #0F172A | Main text |
| muted-foreground | #64748B | Supporting text |
| primary | #2563EB | Primary action and selection |
| primary-hover | #1D4ED8 | Hover |
| primary-active | #1E40AF | Pressed |
| primary-foreground | #FFFFFF | Primary button text |
| secondary | #F1F5F9 | Secondary control fill |
| secondary-hover | #E2E8F0 | Secondary hover |
| border | #E2E8F0 | Decorative separators |
| input-border | #64748B | Essential control boundary |
| focus-ring | #2563EB | Focus with contrasting offset |
| destructive / destructive-hover | #B91C1C / #991B1B | Destructive action |
| success text / background | #166534 / #F0FDF4 | Success |
| warning text / background | #92400E / #FFFBEB | Warning |
| error text / background | #B91C1C / #FEF2F2 | Error |
| info text / background | #1E40AF / #EFF6FF | Information |

Implement semantic CSS variables; feature pages must not hardcode colours. Status always includes a text label. Disabled controls use secondary fill and muted text with semantic disabled state. Read-only remains selectable and legible. Pale decorative borders are not sufficient as the sole input boundary. Verify actual colour pairs: 4.5:1 for normal text, 3:1 for large text and required control indicators. Focus uses a 2px ring with 2px offset.

### Typography

Use locally hosted Inter with system-ui/sans-serif fallback and weights 400, 500, 600 and 700. Urdu UI remains unconfirmed; if enabled, evaluate Noto Sans Arabic using actual Urdu text, line-height and RTL checks before adoption.

| Role | Size / line height | Weight |
|---|---|---|
| Page title | 28 / 36px | 600 |
| Section title | 20 / 28px | 600 |
| Subsection | 16 / 24px | 600 |
| Body and inputs | 16 / 24px | 400 |
| Labels and buttons | 14 / 20px | 500 |
| Table cells | 14 / 20px | 400 |
| Supporting text | 12 / 18px minimum | 400 |
| Metric | 28 / 36px | 600 |

Use rem units and support zoom. Use tabular numerals and right-aligned amounts. Keep currency/unit visible and unknown values distinct from zero. Full values must be accessible without relying on hover.

### Dimensions and layout

Spacing scale: 4, 8, 12, 16, 24, 32, 48px. Field gap 16px, section gap 24px, page padding 24px desktop and 16px narrow. Controls have 8px radius; larger surfaces 12px. Use subtle shadows, stronger only for overlays.

Control height: 40px default, 32px compact desktop toolbar, 48px large/touch. Touch hit areas are at least 44px. Textarea minimum 96px. Icons: 16px inline, 20px controls, consistent icon family/stroke.

Sidebar 240px, header 64px, form maximum width 960px. Below 1024px collapse navigation; below 768px use single-column forms and wrapping actions. Tables scroll horizontally where needed. Rows are 48px default or 40px compact, expanding for content. Never clip wrapped text to enforce row height. Use 120-180ms transitions and respect reduced motion.

### Interaction standards

One primary action per action group. Buttons expose primary, secondary, outline, ghost and destructive variants. Financial actions show a review of account, amount and effect. Ordinary saves do not require unnecessary confirmation.

Inputs always have visible labels and connected help/errors. Validate on submit and after interaction, preserve values on failure and focus the first invalid field. Loading maintains width and announces progress. Financial success appears only after confirmed persistence. Keep disabled, read-only and permission-denied states distinct.

### Component ownership and showcase

Base UI: apps/web/src/components/ui. Reusable composites: components/common. Form adapters: components/forms. Business controls: features/<module>/components. Share domain types/validation in packages/shared; web DOM controls are separate from future Expo native controls.

Create a development-only /dev/components showcase with synthetic fixtures. Demonstrate controls, overlays, tables, feedback, long text, narrow screens and dependent entity pickers. Verify contrast, keyboard focus, zoom, async races and recovery before rollout. Components are specified separately in COMPONENTS.md. Exact branding, language and invoice template remain open.

## SearchableSelect presentation and screen mapping

Use the canonical [SearchableSelect contract](COMPONENTS.md#searchableselect), extending the current Combobox foundation. This section maps that contract to the existing visual system and planned screens; it does not introduce a second selector specification or claim those screens are implemented. Small fixed Yes/No, status, pricing-mode or payment-direction sets retain Select, radio or switch controls.

Use existing semantic CSS variables and light-mode surfaces: input-border for the control/popup boundary, foreground for the primary label, muted-foreground for secondary metadata, info/primary tokens for active/selected affordances, error tokens for validation and warning tokens plus text for archived/expiry status. Selected and keyboard-active options are distinguishable by text/check indication as well as fill. Keep Inter input text 16/24px, labels 14/20px and supporting text at least 12/18px; metadata is optional. Inherit the 8px control radius, spacing scale, 40px default/32px compact desktop/48px large control sizes and 2px focus ring with 2px offset. Preserve the baseline contrast requirements; do not add component-specific colors, fonts or a new UI package.

The popup aligns with the field, uses the existing overlay shadow and a bounded scrolling results area, and stays inside the viewport and enclosing dialog/drawer focus boundary. Long primary/secondary labels wrap and expand rows; selected text can wrap or offer an accessible full-value view without hover. Truncation must never make similar records impossible to distinguish. Multi labels wrap with named removal actions and a full-selection view. Below 768px use full-width fields in single-column forms; avoid horizontal overflow and keep clear/retry/load-more/options at least 44px touch targets. Ensure the onscreen keyboard does not hide the active result/action. Verify at narrow widths and 200% zoom.

| State | Presentation |
|---|---|
| Default | Label and placeholder/help; no implied selected record |
| Focused | Existing visible focus ring; popup only when interaction permits |
| Searching | Entered query; polite progress/threshold instruction during debounce, distinct from committed selection |
| Loading | Stable field width and busy status; preserve selected label and valid current-query results during page loading |
| Results | Primary label, optional metadata/status and visible active/selected/disabled distinctions |
| Empty | No available records under the current allowed scope; a permitted create shortcut only when the feature supplies it |
| No Results | No matches for the query; offer query revision/clear, not a misleading empty dataset message |
| Selected | Resolved label independent of result page; clear/removal action only when allowed |
| Disabled | Existing secondary fill/muted text and disabled semantics; prerequisite help where relevant |
| Read Only | Legible historical/current value, inspectable focus, no search/clear/edit affordance |
| Error | Associated field error for validation; separate actionable search/page failure with retry, preserving input/selection |
| Required | Text required indicator and validation on submit/after interaction; placeholder does not replace label |
| Archived historical selection | Stored label plus “Archived”/“Inactive” text; retained historical ID, not a new selectable active record |

| Planned screen/form | SearchableSelect use and constraints |
|---|---|
| Orders; Customer/Consignee directory | Factory, direct Customer (Client), linked Consignee; potential Order Consignees may explicitly be multiple, actual Trip receiver is single; dependency invalidation preserves compatible children |
| Orders/agreements; invoices/receipts | Explicit Bill To identity within supported party types, separate from Factory/Client/Consignee operational roles; tiny party-type choice may remain Select/radio |
| Trips/assignments; Vehicles/Drivers; outsourcing | Single Vehicle, Driver, owner identity and Partner/Transporter; associated-vehicle filtering only where appropriate, availability and expiry warning visible, ownership never inferred from partner |
| Fuel purchases/payments; Supplier/Branch management | Fuel Supplier, its Branch/Pump, Vehicle and optional Trip/Driver; branch prerequisite and relationship enforced |
| Invoices; payment/expense allocation | Explicit multi eligible Trips for invoicing or supported allocation targets; compatible Bill To/currency/remaining balance rules still apply. Order filter is optional where cross-Order billing is valid; retain the detailed allocation/table UI for amounts |
| Financial Accounts; Payments; Internal Transfers | Single FinancialAccount per reference and Currency per transaction; distinct source/destination accounts. Currency search never enables V1 cross-currency invoice settlement |
| Expenses/Maintenance; category settings | ExpenseCategory and relevant Order/Trip/Vehicle/Driver context; multiple categories only if an explicit workflow supports them, not automatically for one Expense |
| Documents/Attachments; document settings | Predefined/custom DocumentType and applicable parent entity; permission-aware custom management, historical type label retained |
| Rates/Rate History; Trip pricing | Rate/Agreement and supported match dimensions; most-specific recommendation, authorized valid alternative, date/currency/unit eligibility and locked snapshots remain visible |
| Users/Roles; Activity Log; reports/list filters | User/actor, single company-scoped Role for initial assignment, and searchable entity filters; custom role grants/delegation/Owner safeguards unchanged. PermissionMatrix remains grouped checkboxes; tiny module/action/status sets need not be searchable |

Search strategy and allowed metadata belong to each feature; local versus bounded server search follows COMPONENTS.md. Business-specific pickers are thin compositions of this one control, not separately styled dropdown implementations. Introduce them as their modules are implemented, without refactoring every placeholder form. Planned component and server-boundary acceptance is recorded in TEST_PLAN.md T82–T101; existing shell demos do not establish full contract compliance.

## Roles & Permissions dashboard

Roles list shows custom name, description, active/system status and assigned-user count with permission-aware create/edit/deactivate/delete actions. Create/Edit Role uses a custom name and description, then a reusable PermissionMatrix grouped by catalog module and action. Support labelled checkboxes, keyboard use, module selection and indeterminate partial selection. Show action descriptions and unavailable/non-delegable grants. Do not hardcode Accountant/Dispatcher screens or infer grants from a role name. New catalog actions appear without redesigning the matrix.

Save validates catalog keys, delegation scope and concurrency on the server, then refreshes effective permissions. User create/edit offers role assignment within the current company and the actor's assignment authority. Protected Owner is visibly locked; custom role deletion/deactivation is blocked while active users remain assigned. Provide an authorized reassignment flow before removal, with conflict feedback if membership changes concurrently. Preserve form input on validation failure. No privileged controls or data may be exposed by UI-only checks.

## Global Activity Log and record history

Add an Activity Log navigation entry gated by `activity_logs.view`. Filters: date/date range, user, module, action, company where applicable, record/reference ID and text search; provide sortable columns, stable pagination and clear filters. Company selection lists only authorized contexts; current single-business scope does not show an all-tenants option. Columns include time, actor snapshot, action, module, reference and safe description. Expand an event for permitted previous/new values and changed fields. Export requires `activity_logs.export` as well as view and uses the same scoped filters on the server.

Use a reusable read-only ActivityHistory/AuditTimeline in record Activity tabs for Orders, Vehicles, Drivers, Clients, Fuel transactions, Expenses, Invoices, Payments, Settlements, Users and Roles. An order can expose Details | Documents | Payments | Activity alongside its operational tabs. Record history is chronological, paginated and restricted to both audit and parent-record access. Show unavailable/redacted fields explicitly without fetching hidden values. Include loading, empty, denied and failure states. No event edit/delete controls exist, even for Owner. Use configured timezone and label missing actor/device information without inventing it. See AUDIT.md for the full event contract.

## Finalized V1 screen and interaction specification — 9 October 2026

| Screen / component group | Required interaction |
|---|---|
| Orders / Order Details | Optional planned quantity; Trip list with loaded/delivered/remaining where applicable; add one/multiple Trips or create separate movement Orders; reasoned cancel/reopen and dependency feedback |
| Trips / Trip Details | Actual vehicle/driver/owner/affiliation, execution partner, quantities/difference, billing basis and historical billable quantity; stops/proof, Documents, Expenses, Billing and Activity tabs |
| Rates / Rate History | Agreement dimensions, valid effective versions, most-specific recommendation and authorized alternative valid selection; configured rate date, recommended/selected snapshots and exact-condition overlap rejection |
| Clients / Factories / Consignees | Preserve direct Customer and linked receiver hierarchy, scoped selectors and history |
| Vehicles / Drivers / Partners | Owner type/history, driver affiliation/assignment history, execution partner separate from owner; archive/reactivate with historical visibility |
| Fuel Suppliers / Branches-Pumps / Fuel Transactions / Fuel Rate History | Supplier-dependent branch picker, transaction-date price, liters × rate preview, actual total override with actor/reason/time, cash/credit payment information |
| Expenses / Expense Categories | Custom category management, explicit Trip/Order/Vehicle/Driver/company context, receipts/payment information; attribution and auto-approved lifecycle visible |
| Invoices / Credit-Debit Notes | Eligible Trip picker with billable/invoiced/remaining amounts; default full remaining selection, partial amount only with permission; issued lock, reasoned cancel and linked notes |
| Customer / Partner / Supplier Ledger | Invoice/payable totals, effective allocations, outstanding, separate unallocated/advance credit; original currency and base totals distinctly labelled |
| Payments / Settlements | One or many eligible targets, partial/bulk allocations, later advance allocation; reasoned unallocate/reallocate/reverse/bounce/refund/partial refund, original history visible |
| Financial Accounts / Account Transfers | Cash/bank/custom account balances, configurable methods, source/destination and reviewed currency/amount; transfer is not income/expense |
| Documents / Document Expiry | Multiple private files, predefined/custom types, reference/date/notes/uploader/time; optional expiry/reminder periods and dashboard alerts; V1 warning only, otherwise-authorized assignment remains possible |
| Activity Log / Roles / Permission Matrix / Users | Existing immutable safe audit detail, custom grants and protected Owner design; additions follow the master catalog |
| Reports / Export / Settings | Scoped PDF/XLSX/CSV, explicit date basis and transaction/base currency, historical FX/tax; numbering and external references distinct |

Draft/In Progress Trip forms permit authorized edits. Delivered sensitive controls require additional permission; invoiced/settled fields display locked snapshots and a controlled correction action. Deletion is offered only for unused dependency-free records, otherwise archive/deactivate. Confirmation explains historical retention. Cancellation/reopening and financial correction dialogs show reason, affected dependencies and ledger effect. Permission-aware UI never fetches unauthorized fields to hide them later.

V1 auto-approval shows permitted operations completed at the normal workflow stage without a pending-review queue. Draft save and invoice issue/payment post remain distinct user intentions. Do not include V1 bulk-import UI/API; V2 import and manual approvals remain visibly deferred. Future notification channels do not imply V1 external messages.

Reuse Entity Activity Timeline, Documents/Attachments, Ledger, Payment Allocation, Status Badge, Money/Currency, Quantity, Rate History, Audit Detail, Archive/Deactivate Confirmation and Correction/Reason Dialog from COMPONENTS.md. All screens above are specifications, not claims about the current placeholder shell.

## Final business-policy interactions

| Flow | Required V1 presentation and behavior |
|---|---|
| Order parties and progress | Separate source Factory, commercial Client, potential Consignees and Bill To; permit separate receiver Orders or multiple potential receivers on one Order. Each Trip chooses actual receiver/destination. Show original and converted units, Loaded/Delivered remaining basis and shortage rule/effect |
| Trip pricing | Label Calculated Rate or Manual Total. Calculated mode shows recommended most-specific valid match and selected match, source/date/quantity/unit/calculated gross; permitted alternative selection explains recommendation difference. Provisional estimates are visibly provisional until date event. Manual Total captures entered amount/creator/time without creating a unit rate |
| Rate editing | Display effective interval and exact conditions; show conflict for identical-condition overlaps, allow different conditions; do not silently resolve equally specific/incomparable matches |
| Charges | Show gross transport amount, itemized fixed/percentage commissions/deductions and bases, discount, tax, rounding/other adjustments and final billable/net receivable. Category/rule history and permission-aware adjustment controls retain original values |
| Order completion | Dedicated orders.complete action warns/lists unfinished Trips. Preserve Trip statuses and show separate Order/Trip state in details/reports; reasoned reopen uses orders.reopen |
| Invoice correction | Locked invoice/Trip snapshots offer permitted correction/reissue or Credit/Debit Note path. Require reason and show original, revised amounts and allocation/ledger effect before finalization; history links remain available |
| Payments | Select invoice-compatible currency targets only; explain and server-reject mismatched invoice currency, including advances/reallocations. Show gross/net debt and unallocated credit distinctly |
| Shared expense | Allocation editor selects equal, quantity with explicit compatible basis, manual amount or percentage; shows each Trip share and reconciliation/rounding remainder, preserves history and requires expenses.allocate |
| Reports | Revenue filter labelled Invoice Date, cash filter Payment Date, operational filters Trip/dispatch/delivery date; later collection does not duplicate revenue. Trip profitability uses linked recognized invoice/note portions and allocated costs, excludes unallocated general expenses |
| Expiry | Clear expired status/warning and dashboard reminders; otherwise-authorized assignment can proceed in V1. No active V1 Block Assignment toggle; configurable blocking is V2/Future |
| Owner | Protected setup/transfer flow, eligible recipient, last-active-Owner guard and audit; ordinary role matrix cannot alter ownership. Provider mechanics remain unspecified |
| Retention | Archive/deactivate retains history. Explicit document/unused-record removal shows dependency/integrity constraints. No automatic historical purge controls |

Business branding/languages/staff assignments are company configuration, not unresolved business policies. V2/Future additionally defers cross-currency invoice settlement and document-type expiry blocking, preserving bulk import/manual approvals/mobile/dark mode and existing deferred scope. All interactions are specifications; no screens were implemented here.
