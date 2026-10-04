# Product and Interface Design
Updated: 5 October 2026  
Status: Proposed UX specification grounded in [PRD.md](PRD.md).

## Design goals
Make daily order entry, cost recording and balance lookup fast. Prefer readable tables, clear forms and consistent terminology. Desktop and tablet are the first targets; preserve basic usability on narrow screens. Styling is proposed, not an approved visual mockup.

## Navigation
Group the PRD’s 16 sections without removing any:
- Overview.
- Operations: Orders & Deliveries, Outsourced Orders.
- Directory: Companies & Transport Partners, Factories, Customers & Consignees, Vehicles, Drivers.
- Costs: Fuel Management, Maintenance & Expenses.
- Finance: Billing & Invoices, Payments & Settlements.
- Reports.
- Administration: Data Import & Export, Users & Permissions, Business Settings.

Outsourced Orders filters the same order records and uses the same details page.

## Visual system
Proposed style: light neutral background, white content surfaces, navy text and blue primary actions. Restrained green/amber/red statuses with text labels; never communicate status through colour alone. Use consistent spacing, visible focus, legible type and accessible contrast. Avoid decorative dashboards that obscure operational information.
Right-align amounts and quantities. Show currency in headings and date basis beside filters. Blank or unknown is not displayed as zero. Use full consignee names where space permits.

## Shared list behaviour
Search, date range, relevant entity/status filters, sortable columns, pagination, result count and clear-filter action. Preserve filter state in the URL where appropriate. Provide column visibility for dense tables. Each row opens a detail page; money-changing actions must not be triggered accidentally by row clicks.
Support loading, empty, filtered-empty, unauthorized, validation-error, network-error and quota-exceeded states. An empty report says no matching records, not a misleading zero balance.

## Orders
Default columns: order number/date, factory, customer, consignee, cargo, vehicle or partner, delivery status and billing state. Financial columns appear only to authorized users.
Create form sections: customer relationships; cargo/quantity/unit; route and ordered stops; fulfilment; dates and notes. Selecting a new customer clears or asks to remap an incompatible consignee. Provide lookup/create shortcuts only where permission allows.
Fulfilment choice: business-managed assignment or outsourced partner. Vehicle owner is displayed independently from partner.
Detail tabs: Overview, Stops & Delivery, Assignments, Expenses, Billing/Payments and History. Show unavailable tabs according to permission without leaking totals.
Reordering stops must work with keyboard controls as well as drag-and-drop.

## Outsourcing
Show partner, fare, commission, agreed payable, advances/other payments and outstanding amount. Present customer collection separately. Calculation controls remain subject to settlement decisions. Show a breakdown rather than a single unexplained net figure. A payment dialog names its recipient and obligation before posting.

## Fuel and maintenance
Fuel form: vehicle, date, source, fuel type, litres, rate, calculated amount, optional odometer/receipt. Show adjustments and their reasons separately.
Maintenance form: vehicle, workshop, repair details, parts/labour/other costs, service due date/KM. Offer a total-only legacy mode when breakdown is unknown. Do not imply next-service mileage is overdue if current mileage is unknown.

## Billing and payments
Invoice flow: select billing account → select eligible orders → review charges → save draft → finalize → print. Show excluded/already-billed orders with reasons. Finalization shows the billing account and total and explains that later corrections are recorded.
Payment flow: choose receipt/outgoing payment → select account → enter amount/date/method → allocate → review → post. Label unallocated credit explicitly. Disable repeat submission during requests while backend idempotency provides actual protection.
Issued invoices distinguish invoiced amount, received amount and outstanding balance.

## Print layout
A4, minimal colour, company header, invoice/account information, order lines, total, payment summary and page numbering where supported. Repeat table headers and prevent clipped lines. Validate 1, 14, 15 and 35 rows, long descriptions and Unicode/Urdu text. Exact branding must come from the approved template.
Use browser print/Save as PDF initially. Test pagination in the target browser; do not assume CSS alone guarantees correct repeated headers or page numbers.

## Import review
Upload → map columns → preview → resolve issues → commit → results. Show source row, raw value, suggested mapping and validation reason. Separate errors from warnings. Never silently map Paid to a consignee. Report committed/skipped/failed counts and provide a retry path that does not duplicate rows.

## Terminology and accessibility
The current PRD calls the receiver Consignee (Receiver), formerly Party. Do not rename it to Client without an explicit recorded decision. Use Customer for the direct customer.
Forms need labels, required indicators, inline errors and an error summary. Dialogs manage focus and keyboard escape appropriately. Tables have accessible headings and status text. Warn about unsaved form changes; preserve entered values after recoverable failures.

## Review needed
Business branding, final language(s), date/currency presentation, staff roles, payment responsibility and exact invoice template remain open. See [DECISIONS.md](DECISIONS.md).

## Fuel supplier and branch screens

Fuel Management includes Suppliers, Branches, Purchases, Payments and Statements. Selecting a supplier filters branch choices. Supplier details show consolidated totals and branch breakdowns. Branch details show contacts, location, purchases and allocated payments. Payment entry offers Branch payment or Central supplier payment. Review allocations by purchase and branch before posting; show any unallocated credit. Statements distinguish purchase branch from payment recipient and reconcile totals without repeating a central payment in every branch.
