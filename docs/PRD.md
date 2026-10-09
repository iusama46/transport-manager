# Transport Management Dashboard
## Product Requirements Document — v0.5

Updated: 9 October 2026
Status: Finalized 9 October capability decisions reconciled; remaining commercial policies explicitly gated in DECISIONS.md. Business implementation: Not Started.
Phase 1: Web dashboard. Phase 2: Expo mobile app.  
Budget constraint: $0 recurring service cost. No paid plans or add-ons without explicit approval.

## 1. Purpose and business storyline

One transport business needs a central dashboard to replace disconnected spreadsheets for orders, fleet operations, fuel, repairs, bills and payments. It operates its own vehicles, uses vehicles belonging to other companies, and sometimes outsources entire orders to transport partners.

A customer requests transportation from a factory to their customer, the consignee. Staff create an order with the factory, customer, consignee, cargo, quantity, route and stops. They assign a vehicle and driver or outsource the job to a transport partner. They track loading, delivery progress, delays, returns and delivery proof.

Fuel, repairs and expenses build vehicle operating history. Staff prepare transport bills, print them across multiple pages and record collections. For outsourced work, they separately track agreed partner charges, commission, advances and settlement balances. The owner reviews operations, costs, collections and outstanding obligations.

Who owes each transport bill and the exact partner settlement rules remain to be confirmed. The system must not infer these from delivery status or vehicle ownership.

## 2. Confirmed scope and terminology

| Term | Meaning |
|---|---|
| Operating business | The one transport business using the dashboard |
| Factory | Originating factory/company for the goods |
| Customer (Client) | The transport business’s direct customer; `clients.*` is its permission namespace |
| Consignee (Receiver) | The customer’s customer receiving the goods; replaces the label Party |
| Vehicle owner | Our company, a partner company or an individual/external owner owning a vehicle |
| Transport partner / Subcontractor | An external individual or company fulfilling an outsourced order |
| Billing account | The person/business responsible for transport charges; selected explicitly |

Customers can have multiple consignees. Companies can have several roles. Vehicle ownership and subcontracting are separate: an external owner is not automatically the subcontractor for every job. External companies are records inside one operating business, not independent software tenants.

## 3. Main dashboard sections

| Section | Main requirements |
|---|---|
| 1. Overview Dashboard | Orders, deliveries, collections, balances, fuel/maintenance costs and reminders |
| 2. Companies & Transport Partners | Operating company, external vehicle owners, subcontractors, contacts and linked records |
| 3. Factories | Details, pickup locations, contacts and order history |
| 4. Customers & Consignees | Customer profiles, linked receivers, locations and history |
| 5. Vehicles | Registration, owner, type, capacity, status, assignments and history |
| 6. Drivers | Identity, contact, licence, experience, availability and assignments |
| 7. Orders & Deliveries | Cargo, quantities, routes, stops, assignments, dates, status and proof |
| 8. Outsourced Orders | Partner assignment, fare, commission, partner payable, advances and balance |
| 9. Fuel Management | Fuel purchases, sources, quantity, rates, receipts and rankings |
| 10. Maintenance & Expenses | Repairs, parts, labour, workshops, other expenses and service reminders |
| 11. Billing & Invoices | Eligible Trip selection, automatic totals, invoice history and multipage printing |
| 12. Payments & Settlements | Customer receipts, partner/supplier payments, advances and balances |
| 13. Reports | Customer/partner statements, operations, costs, commissions, receivables and payables |
| 14. Data Export | Authorized PDF, XLSX and CSV exports; bulk import is V2 |
| 15. Users & Permissions | Accounts, custom Roles & Permissions dashboard and company-scoped assignments |
| 16. Business Settings | Business identity, currency, timezone, numbering, branding and categories |
| 17. Activity Log | Global immutable audit trail, filters, controlled export and record-specific Activity history |

## 4. Users and permissions

Dynamic/custom RBAC is finalized. Keep a protected Owner/Super Admin role and let authorized users create arbitrarily named custom roles with granular `module.action` grants from [PERMISSIONS.md](PERMISSIONS.md). Business job titles carry no automatic permissions. Enforce effective permissions in frontend flows and independently in every backend/API operation, with User + Company/Tenant + Role + Permission + Resource checks.

The existing multi-company scope includes external company records inside one operating business, not independent tenants. Owner full access is limited to the authorized operating company; cross-tenant access is not implied. Actual staff assignments and financial correction grants remain open. Restrict identity files and financial information to authorized staff. [AUDIT.md](AUDIT.md) defines the core immutable, company-aware Activity Log and redacted change history.

## 5. Functional requirements

### FR-01 — Master records

Create, edit, search and archive companies, factories, customers, consignees and partners. Store contacts, addresses and notes. Filter consignee selection by the selected customer. Archive used records without removing historical relationships. Avoid duplicate companies when the same entity holds multiple roles.

### FR-02 — Vehicles and drivers

Vehicles store registration, vehicle category/type, capacity, status and owner identity/type. Ownership may be our company, a partner transport company or an individual/external owner; preserve VehicleOwnershipHistory. Ownership is separate from Trip execution type. Normalize registration case/whitespace; uncertain matches require review.

Drivers retain contact, optional CNIC, licence number/type/expiry, location, experience, availability, notice period, status and notes. Affiliation may be our company, a partner or an individual/external owner. Drivers are not permanently bound to vehicles: preserve DriverVehicleAssignmentHistory and actual vehicle, driver and ownership/affiliation snapshots on each Trip. Licence expiry warnings are V1; assignment-blocking policy remains open.

### FR-03 — Orders and Trips

Order → 1..N Trips is the finalized operational model. One Trip is valid; separate Orders for individual movements are also valid. A Draft Order may exist before its first Trip. Authorized users may add Trips to active Orders subject to status; completed/cancelled Orders require an eligible reopening/correction flow. Do not force all vehicles in a customer request into one Order.

Order stores company, unique internal ID, configurable display number, external references, Order Date, Factory, Customer (Client), linked Consignee, goods/material, route/stops, notes and optional Planned Quantity/unit. Trip stores its Order, execution type, partner when outsourced, actual vehicle/driver snapshots, loading/dispatch date, expected/actual delivery date, stop progress, delivery proof and quantities. Preserve more than four ordered stops, sequence, pagination, search, filters and status history.

Planned Quantity is optional. When present show Planned, Dispatched/Loaded, Delivered and Remaining Quantity where applicable; when absent accumulate actual Trip quantities without inventing a target. Display Loaded Quantity and Delivered Quantity separately and their difference/shortage. Unit conversion and the basis of Remaining Quantity require the policy review recorded in DECISIONS.md.

Each commercial agreement selects billing basis: Loaded Quantity, Delivered Quantity or other agreed/custom quantity. Preserve actual historical billable quantity. Order and Trip operational state, invoicing and payment state remain separate; delivery never marks a record paid. Order states include Draft, Confirmed, In Progress, Completed, Cancelled; Trip states include Draft/In Progress and Delivered, with scheduling, transit, delay and return details preserved. Exact transition/aggregation rules remain a review gate.

Draft Orders may be deleted only under dependency rules. Confirmed/In Progress cancellation requires orders.cancel and a reason, accounts for existing Trips, and never removes history. Completed Orders use controlled correction rules; invoiced dependencies require financial correction. Eligible reopening requires orders.reopen, a reason and an audit event. Cancelled Orders remain visible.

### FR-04 — Outsourced orders

Mark the relevant Trip execution as outsourced and select its transport partner; an Order may contain outsourced Trips. The outsourced-orders screen is a filtered view of the same records, not duplicate data entry. Store partner contacts and actual vehicle/driver details, plus cargo, route, dates and status; unknown details must be explicit, not invented.

Track total fare, commission, net partner payable, advances, later payments, adjustments and remaining balance. Keep delivery, customer collection and partner settlement statuses independent. Advances are payment transactions and must not be deducted twice.

The supplied Munir example shows:

| Field | Amount |
|---|---:|
| Total fare | 100,000 |
| Commission | 3,000 |
| Net fare | 97,000 |
| Advance paid | 30,000 |
| Remaining amount | 67,000 |

Proposed interpretation, awaiting confirmation: partner payable = fare minus retained commission; remaining payable = partner payable minus advances and subsequent payments. Confirm who collects the fare, who receives the advance and whether commission is fixed or percentage-based. Do not label commission as net profit. Do not automatically deduct fuel or repairs without an agreed rule.

### FR-05 — Fuel management

FuelSupplier → multiple Supplier Branches/Petrol Pumps → FuelTransactions. Capture supplier, its branch/pump, vehicle, optional Trip/driver, date, fuel type, liters, rate per liter, Calculated Total, Final/Actual Total, reference/slip, payment information, notes and optional odometer. Cash and credit purchases are supported. One underlying transaction serves all entry screens and reports.

Calculated Total = Liters × Rate Per Liter. Authorized fuel amount overrides retain calculated and final values, override flag, reason where applicable, actor, timestamp and audited before/after values. FuelPriceHistory is effective-dated per supplier/branch where applicable; transaction date suggests/applies the applicable rate, authorized overrides retain default and actual rates. New prices never rewrite old transactions.

Supplier payable ledgers support partial/bulk payments, one payment across multiple purchases, advances/credits and later allocation. Branch-scoped payments stay in that branch; central supplier payments may span its branches. Show branch/pump and supplier outstanding plus unallocated credit separately. Monthly/annual vehicle/owner/type/source summaries and purchased-liters/cost rankings remain V1; rankings do not imply fuel efficiency.

### FR-06 — Maintenance and flexible expenses

Authorized users manage ExpenseCategories, including Toll, Loading, Unloading, Driver allowance, Repair, Parking, Weighbridge, Fine/challan, Miscellaneous and custom categories. Categories are configurable and referenced ones are archived instead of erased.

Expense links to a Trip, Order, Vehicle, Driver or general/company context as appropriate. Capture amount/currency, category, date, reference, notes, payment information, creator, relevant approval status and receipts. Maintenance retains workshop, odometer, parts/labour/other breakdown, total-only historical mode and next-service date/KM; unknown mileage cannot imply overdue service. Partial payments and outstanding workshop obligations remain supported.

Trip Margin / Profit = Trip Revenue − Outsourcing Cost − Fuel Cost − Trip Expenses. Include only attributable costs; general company expenses must not enter Trip margin, and shared Order/Vehicle/Driver costs require an explicit attribution rule without double-counting. This is not company net profit. Revenue recognition and attribution policies remain review gates.

### FR-07 — Flexible billing and corrections

Select eligible Trips for an explicit billing account. One Trip → one Invoice and multiple Trips → one Invoice are supported, including eligible Trips from separate Orders when account/currency rules permit. Default: invoice the full remaining selected Trip amount. Authorized invoices.partial_bill permits partial billing and is audited. Track Billable Amount, Invoiced Amount and Remaining Billable Amount per Trip; enforce duplicate/overbilling prevention atomically under concurrent requests.

Invoice/InvoiceLine retains issue/due dates, billed-to snapshot, Trip/Order references, actual billable quantity/basis, applied rate, adjustments, tax snapshot, transaction currency, base currency, historical exchange rate and totals. Draft invoices may be edited/deleted under permission/dependency rules. Issued core financial values are locked. Void/cancel requires invoices.cancel and a reason where legally/business appropriate; CreditNotes and DebitNotes reference originals and automatically affect the ledger. Paid/partially paid invoices cannot be cancelled/deleted while allocations remain unresolved. Corrections preserve originals and use audited linked records; the precise impact on Trip billing eligibility is an open policy gate.

A4 browser print/Save as PDF retains repeated headings, page numbers where supported, minimal colour and more than 14 rows without clipping/duplicate totals. Verify branding and Urdu with the approved template.

### FR-08 — Receivables, payables and payments

Customer receivable ledger tracks Invoice Total, Allocated Amount, Outstanding Amount and Customer Credit Balance. One receipt may fully/partially settle one invoice, span multiple invoices, remain partially/fully unallocated or be an advance/credit for future invoices. Allocation and reallocation are traceable and audited.

PartnerPayable tracks obligations from outsourced Trips separately from customer receivables. Support one payment to one payable, multiple Trips/payables, partial/bulk payments, outstanding balance, advances/credits and later allocation. SupplierPayable follows the same ledger principles for fuel; existing workshop payables remain supported. Customer → money owed to us is Receivable; we → money owed to partner/supplier is Payable. No customer collection automatically settles a partner.

Payments record direction, counterparty, date, amount/currency, affected FinancialAccount, configurable method, reference and allocation history. Ledger-impacting payments are never silently deleted. Support unallocation, reallocation, reversal, bounced/failed correction, refund and partial refund across customer receipts, partner payments and fuel supplier payments. Apply granular permission, reason where appropriate, audit event and automatic ledger/account updates; retain the original. Advances are counted once. Allocation cannot exceed available payment credit or outstanding obligation.

### FR-09 — Overview and reports

Show order/delivery counts, vehicle activity, fuel and maintenance cost, invoiced value, collections, customer outstanding and partner/supplier payables. Each metric links to its contributing records. Distinguish invoice value from cash collected. Show Trip Margin only from attributable revenue/costs; do not present it as company net profit.

Provide customer, consignee, factory, vehicle, owner and partner filters; monthly/yearly views; and exports. Label date bases explicitly: order date, delivery date, invoice date and payment date are different. Statements must reconcile to underlying records.

### FR-10 — V2/Future imports and data quality

Bulk import is explicitly excluded from V1 UI/API. In V2, import CSV/XLSX through mapping, preview, validation and reviewed commit. Retain source file/row and original values. Identify duplicates and prevent accidental repeated batch imports. Preserve source attachments unchanged.

Flag inconsistent registration spelling/case, mixed or incomplete dates, unmatched entities, text quantities, missing amounts and conflicting payment labels. The legacy Party column contains names and “Paid”; never create a consignee named Paid automatically. Review apparent test/example rows. Reconcile source transactions rather than relying on cached workbook summary totals. Missing data must not become zero or paid by default.

### FR-11 — Settings

Configure business identity, contact details, base currency, timezone, company-specific numbering for Orders, Trips, Invoices, Payments, Credit/Debit Notes and other documents, print branding, payment methods and categories. Internal identifiers stay unique/system controlled; Factory references, Client PO, Bilty, DO and consignment numbers are separate external references. Archive used categories to preserve history. PKR and Asia/Karachi are proposed from the data, not yet confirmed.

## 6. Source material

| File | Evidence used |
|---|---|
| Drivers List - Drivers.csv | Header-only driver template |
| Fleet Operations Tracker - Vehicle Tracking.csv | 77 nonempty body rows with fuel, repair, payment and service fields |
| Orders 2026 - August.csv | 811 nonempty body rows, including dates beyond August |
| Petroleum_2026 (2).xlsx | Monthly transaction/summary tabs, annual summary and vehicle rankings |
| Munir_Orders.xlsx | Outsourcing fields and one illustrative financial row |

Counts are populated source rows, not validated records. The original Customer/Consignee and Party columns need reviewed mapping to the agreed Customer → Consignee terminology. Neither customer nor factory names establish vehicle ownership.

## 7. Technology and $0 operating constraint

| Layer | Direction |
|---|---|
| Web | Next.js App Router + TypeScript |
| UI | Tailwind CSS + shadcn/ui |
| Tables | TanStack Table with server-side filtering/pagination where needed |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Tests | Vitest for calculations; Playwright for key workflows |
| Database | Open: Supabase PostgreSQL was proposed; user later raised MongoDB |
| Auth/files | Supabase Auth/Storage if Supabase is selected; revisit if MongoDB is chosen |
| Hosting | Free commercial-use-compatible hosting; Cloudflare Free is a candidate pending compatibility/limit checks |
| PDF | Browser print and Save as PDF initially |
| Mobile later | Expo + React Native |

No database migration is approved or scheduled. Resolve whether MongoDB is mandatory now, desired later or only an option before implementing the schema. Database changes require data migration and query changes; they are not a configuration toggle.

Put authoritative financial logic in reusable trusted backend operations available to both web and future mobile. Use atomic financial updates, duplicate-submission protection, decimal money and stable IDs. Enforce access restrictions appropriate to the chosen database; do not expose backend secrets in clients.

Use free plans only. Do not enable paid add-ons, automatically charging trials or purchases without explicit approval. Use a free hosting address or existing domain. Validate current quotas, commercial-use terms, inactivity behaviour and deployment compatibility before launch. Free operation is a constraint, not a promise of unlimited capacity or availability.

Compress attachments, enforce upload limits and monitor quotas. If limits prevent a feature, revisit scope or architecture rather than silently upgrading. V1 requires automated backups multiple times per day, restricted access, documented restoration and a retention policy finalized with infrastructure. Define a no-cost backup procedure and responsible person; exact frequency/mechanism/provider remain open. Test restoration before production; paid managed backups are not assumed.

## 8. Quality requirements

- Keyboard-accessible forms, readable tables and clear validation on desktop/tablet.
- Server-side pagination and indexes for common filters; V1 bounded exports; V2 visible import progress and row-level failures.
- Historical invoice snapshots, assignments and ownership remain stable after master-data changes.
- Private documents and least-privilege staff access; audit important actions.
- Business dates remain distinct from timestamps; display timestamps in configured business timezone.
- Proposed performance target: common filtered views within two seconds at an agreed benchmark volume. Validate on the selected free setup rather than treating this as a hosting guarantee.

## 9. Acceptance criteria

| ID | Check |
|---|---|
| AC-01 | Customer selection filters consignees correctly. |
| AC-02 | Owner changes do not rewrite historical order ownership. |
| AC-03 | An order with more than four stops saves and reopens in the correct sequence. |
| AC-04 | Delivered orders with valid unpaid charges remain financially unpaid. |
| AC-05 | Invoice 10,000 minus receipts 3,000 and 2,000 leaves 5,000; reversals restore the correct balance. |
| AC-06 | Trip billing never exceeds remaining billable amount; fully invoiced Trips cannot be billed again, including concurrent requests. |
| AC-07 | A 35-line bill prints with all lines, repeated headings and one correct final total. |
| AC-08 | Fuel entered through different screens appears once in reports. |
| AC-09 | Repair parts 8,000 plus labour 2,000 gives 10,000; payment 4,000 leaves 6,000. |
| AC-10 | V2 imports flag ambiguous Party/date/payment values and do not silently invent valid records. |
| AC-11 | V2 reimporting an approved batch does not duplicate records. |
| AC-12 | Outsourced and main order views refer to the same order. |
| AC-13 | Subject to confirming the sample rule, 100,000 less 3,000 commission and 30,000 advance leaves 67,000 partner payable; another 20,000 payment leaves 47,000. |
| AC-14 | Customer receipts and partner payments update separate balances. |
| AC-15 | Unauthorized direct requests cannot access restricted documents or post financial changes. |
| AC-16 | Reports reconcile to source records and preserve archived entities in history. |
| AC-17 | Backup restoration recovers sample records and relationships before launch. |
| AC-18 | Deployment uses free plans and no chargeable add-ons. |

## 10. Delivery phases

1. Resolve database and financial rules; agree source mapping.
2. Build access control and master records.
3. Build orders, stops, assignments and outsourcing.
4. Add fuel, maintenance and expense tracking.
5. Add invoices, receipts, partner settlements and printing.
6. Add overview reports and authorized PDF/XLSX/CSV exports; imports are V2.
7. Complete acceptance checks, restoration test and staff review; launch dashboard.
8. Define the Expo mobile app from actual mobile-user needs.

GPS tracking, offline sync, automated dispatch, customer/partner portals, multiple independent business tenants, payroll, full accounting, banking integrations and automated messaging are outside this initial release. No delivery dates are committed yet.

## 11. Remaining policy and technical gates

[DECISIONS.md](DECISIONS.md) owns the remaining questions. The capabilities finalized on 9 October are not open. Still unresolved: billing responsibility, commission/cost deductions, multi-consignee Trip/Order rules, quantity conversions/remaining basis, rate matching precedence/date availability, currency precision and cross-currency allocation/FX effects, discount/rounding rules, correction impact on rebilling, lifecycle transitions, cost attribution/revenue recognition, expiry assignment policy, staff grants and operational retention/recovery policies. These may materially affect the conceptual/financial model; requirements are not certified complete. Database/backend, auth/storage and hosting remain unselected.

## 12. Companion documents

[ARCHITECTURE.md](ARCHITECTURE.md), [DESIGN.md](DESIGN.md), [TEST_PLAN.md](TEST_PLAN.md), [SECURITY.md](SECURITY.md), [DECISIONS.md](DECISIONS.md) and [MEMORY.md](MEMORY.md) contain proposed implementation guidance and project continuity. No application implementation or testing is claimed by this documentation release.

## 13. Confirmed fuel supplier and branch extension — 5 October 2026

FR-12: Support multiple fuel suppliers, each with multiple branches/petrol pumps. Each purchase records a supplier and one of its branches, vehicle, date, fuel type, liters, rate and cost. Branch details include name, location and contact. The branch selector filters by supplier; enforce this relationship on the backend. Historical purchases retain their original branch association.

Support both branch-specific settlement and a central supplier payment covering multiple branches. Allocate payments to individual purchases belonging to the same supplier and currency. Never allocate across suppliers. Branch outstanding equals branch purchases less effective allocated payments; consolidated supplier outstanding is the sum of branch outstanding. Show unallocated supplier credits separately, not as a payment assigned to every branch. Reversals restore affected purchase balances. Archive used suppliers/branches rather than deleting history. Legacy fuel source labels such as Agency/Petrol Pump are not sufficient to invent a supplier or branch: flag unmapped values for review.

AC-19: A selected supplier shows only its branches and invalid branch IDs are rejected server-side. AC-20: Branch A purchases 10,000 and B purchases 20,000; a central payment of 15,000 allocated 5,000 to A and 10,000 to B leaves A 5,000 and B 10,000, consolidated 15,000. AC-21: A subsequent branch-A payment of 5,000 clears A without changing B. AC-22: Cross-supplier allocations are rejected; unallocated credit and reversals reconcile without double-counting.

## 14. Finalized RBAC and Activity Log — 6 October 2026

FR-13 — Dynamic roles: provide Roles list, create/edit name and description, reusable module/action permission matrix, save, user assignment, and safe deactivation/deletion. Enforce protected Owner and last-Owner safeguards, delegation limits, immediate effective-permission changes and active-user reassignment rules from PERMISSIONS.md. The master catalog grows with modules without redesigning roles. Unknown or ungranted actions are denied.

FR-14 — Activity Log: automatically capture important business/security actions using the full event contract and coverage in AUDIT.md. Preserve immutable redacted before/after history, actor snapshots and company context. No normal application user, including Owner, may modify historical events. Global Activity Log supports date/range, user, module, action, company where applicable, record/reference ID, text search, sorting, pagination and permission-controlled export. Provide reusable record Activity/History for Orders, Vehicles, Drivers, Clients, Fuel, Expenses, Invoices, Payments, Settlements, Users and Roles where appropriate.

AC-23: An authorized user creates an arbitrarily named role, edits granular grants and assigns it; authorized operations succeed and unauthorized UI/API/direct-ID requests fail, including foreign-company requests and revoked grants.
AC-24: Protected Owner restrictions hold, delegated administrators cannot escalate access, and an assigned custom role cannot be removed/deactivated before safe reassignment.
AC-25: Important actions produce accurate, durable, company-aware events with permitted before/after fields; credentials never enter audit payloads; normal application operations cannot alter historical events.
AC-26: Global filters, sorting, pagination and export respect audit permissions/company scope; record Activity additionally enforces parent-resource and sensitive-field access.

These are completed requirements/design decisions, not implemented features or executed acceptance tests.

## 15. Finalized V1 capabilities — 9 October 2026

### FR-15 — Versioned transport rates

RateAgreement/RateHistory stores effective start/end dates; a rate remains valid until its end or supersession under agreement rules. Optional matching dimensions include company, factory, client, origin, destination, goods/material, vehicle category, rate type and currency; no agreement requires every dimension. Commercial agreements configure the rate-effective date as Order Date, Loading/Dispatch Date, Delivery Date or custom/agreed date; no global hard-coded date basis.

Each Trip stores the applicable agreement/version, selected date basis/date, original/default rate, final applied rate and actual billable quantity as historical snapshots. Authorized trips.override_rate may apply an exceptional rate with optional reason and audit history. Current rate changes never modify historical Trips. Ambiguous/missing matches or unavailable dates must be resolved under the still-open matching policy before financial finalization.

### FR-16 — Documents and expiry

Reusable Document/Attachment supports multiple files, predefined/custom DocumentType, reference number, document date, optional expiry, notes, uploader/time, related entity and activity/audit history. Types include Bilty/Consignment Note, Loading Slip, Weighbridge Slip, Delivery Receipt/POD, Fuel Slip, Expense Receipt, Invoice Supporting Document, Vehicle Registration, Insurance, Permit, Driver Licence, Company Licence, Contract and Other.

Use across Orders, Trips, Vehicles, Drivers, Clients, Partners, FuelTransactions, Expenses, Invoices and Payments. Expired/expiring-soon status and dashboard alerts use configurable reminder periods (e.g. 30/15/7 days, not hard-coded). Future notification channels must fit without redesign; external messaging remains future scope.

### FR-17 — Locks and hybrid lifecycle

Draft/In Progress Trips allow permitted edits. Delivered sensitive changes require additional permission where applicable. Invoiced/financially settled relevant fields are locked; linked controlled corrections retain original values and audited diffs. Unused dependency-free records may be permanently deleted with permission. Referenced operational/financial/audit-relevant records cannot be permanently deleted; deactivate/archive, exclude from ordinary new-entry choices and retain historical visibility. Audit delete/archive/deactivate/reactivate actions.

### FR-18 — Financial accounts, tax and currencies

Each company manages FinancialAccounts (Main Office Cash, Branch Cash, Petty Cash, banks and custom accounts) and configurable payment methods (Cash, Bank Transfer, Cheque, Card, Online, Other). Receipts/payments identify affected accounts. InternalTransfer connects own accounts, updates balances from valid transactions and is never income/expense.

TaxConfiguration supports tax-free and configured tax rates/rules; finalized tax details are historical snapshots. Full multi-currency is V1: each company has a base currency, supported invoices/payments/receivables/payables/account transactions may use transaction currencies, and each retains the historical exchange rate and base-currency equivalent. Reports distinguish original currency from base-currency totals; never sum unlike currencies or revalue old transactions using today's rate. Precise FX allocation, exchange differences and rounding policy remain review gates, not a single-currency fallback.

### FR-19 — V1 approval, backups and export

V1 default is AUTO APPROVAL: an actor permitted to perform an operation normally completes/approves it under its usual lifecycle without another user's approval. Saving a draft does not silently issue/post it. No routine V1 manual approval queue is required; retained approve keys govern explicit finalization where applicable, not an extra mandatory reviewer. Future threshold/manual approval rules belong in V2 unless an existing explicit approval exception is confirmed.

Automated backups multiple times daily, documented restore capability and restricted secure backups are mandatory V1. Exact mechanism/frequency/retention follows infrastructure selection.

Full authorized PDF reports, XLSX and CSV exports cover Orders, Trips, Vehicles, Drivers, Clients, Partners, Fuel, Expenses, Invoices, Payments, Settlements and reports where appropriate. Export enforces RBAC, tenant isolation, sensitive-field restrictions and audit coverage.

## 16. V1 versus V2/Future

V1 includes FR-01–09 and FR-11–19: flexible Orders/Trips/quantities/rates, all three ledgers, partial billing, financial corrections/refunds, ownership/assignment history, maintenance, custom expenses/documents/expiry, accounts/transfers, configurable tax/numbering, full multi-currency, dynamic RBAC, immutable audit, auto-approval, multiple daily backups and full authorized export. FR-10 and AC-10/11 are explicitly V2.

V2 includes controlled Excel/CSV bulk import: upload, mapping, preview, validation, duplicate detection, error reporting, explicit confirmation, durable provenance/retry protection and audit logging; targets may include Vehicles, Drivers, Clients, Partners, Suppliers and suitable business records. Configurable/manual approval workflows beyond V1 auto-approval are V2. Expo mobile, dark mode and existing future features stay deferred. GPS/offline sync/dispatch/portals/payroll/full accounting/banking integrations/messaging/independent tenant onboarding remain future proposals requiring separate scope approval; financial account tracking does not imply a full general ledger.

Acceptance for these additions is specified in TEST_PLAN.md T37–T60; all are planned, unexecuted.
