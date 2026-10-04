# Transport Management Dashboard
## Product Requirements Document — v0.3

Updated: 5 October 2026  
Status: Documentation baseline; supersedes v0.2; open business rules remain unresolved  
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
| Customer | The transport business’s direct customer |
| Consignee (Receiver) | The customer’s customer receiving the goods; replaces the label Party |
| Vehicle owner | The business/company owning a vehicle |
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
| 11. Billing & Invoices | Order selection, automatic totals, invoice history and multipage printing |
| 12. Payments & Settlements | Customer receipts, partner/supplier payments, advances and balances |
| 13. Reports | Customer/partner statements, operations, costs, commissions, receivables and payables |
| 14. Data Import & Export | CSV/XLSX mapping, validation, duplicate checks and exports |
| 15. Users & Permissions | Accounts, access roles and audit history |
| 16. Business Settings | Business identity, currency, timezone, numbering, branding and categories |

## 4. Users and permissions

Proposed roles: Owner/Admin, Operations, Accounts and Viewer. Actual staff assignments remain open. Admin manages configuration and access. Operations manages orders and operating records. Accounts manages financial posting and settlements. Viewer has authorized read access only.

Enforce permissions in backend operations and data access, not just hidden buttons. Restrict CNIC/licence documents and financial information to authorized staff. Audit important changes with actor, timestamp and before/after values.

## 5. Functional requirements

### FR-01 — Master records

Create, edit, search and archive companies, factories, customers, consignees and partners. Store contacts, addresses and notes. Filter consignee selection by the selected customer. Archive used records without removing historical relationships. Avoid duplicate companies when the same entity holds multiple roles.

### FR-02 — Vehicles and drivers

Vehicles store registration number, owner company, type, capacity when known, status and optional current driver. Normalize registration case/whitespace for matching, but review uncertain matches rather than merging automatically. Preserve owner and driver history on completed assignments.

Drivers store name, contact numbers, optional CNIC, licence number/type/expiry, location, experience, availability, notice period, status and notes. Show licence-expiry warnings. Whether expiry prevents assignment requires confirmation.

### FR-03 — Orders and deliveries

Store order number, order date, factory, customer, consignee, cargo/material, numeric quantity and unit, weight where relevant, pickup, destination, ordered stops, vehicle, driver, loading date, expected/actual delivery dates, proof and remarks.

Support search, pagination, sorting and date/entity/status filters. Allow more than four stops. Record stop sequence and completion. Proposed delivery statuses: Draft, Scheduled, In transit, Delivered, Delayed, Returned and Cancelled. Record status history and cancellation/return reasons. Keep notes separate from statuses.

Proposed initial model: one active vehicle assignment per order with reassignment history. Split loads, multiple vehicles and multiple consignees within one order need confirmation before schema design. Delivering an order does not mark it paid. Cancelled or returned work may retain agreed charges through explicit financial handling.

### FR-04 — Outsourced orders

Mark an existing order as outsourced and select its transport partner. The outsourced-orders screen is a filtered view of the same records, not duplicate data entry. Store partner contacts and vehicle/driver details when available, plus cargo, route, dates and status.

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

Store date, vehicle, optional driver/order, supplier/source, fuel type, litres, rate, calculated cost, optional odometer, receipt and notes. Calculate using decimal arithmetic and agreed rounding. Record adjustments explicitly.

Show monthly/annual summaries by vehicle, owner, fuel type and source. Rank vehicles by purchased litres or cost and show transaction counts. Rankings are not fuel-efficiency measurements. Fuel entered from fleet operations and the fuel screen must reference one transaction. Track purchases separately from supplier payments.

### FR-06 — Maintenance and expenses

Store vehicle, date, odometer, repair category/description, workshop, parts, labour, other costs, total, receipt and next-service date/KM. Allow legacy total-only expenses without inventing a breakdown. Reconcile any supplied breakdown to the total.

Track partial payments and outstanding payables. Provide service reminders by date and by mileage when current odometer data is available. Support general vehicle-expense categories beyond fuel and repairs.

### FR-07 — Billing and printing

Select eligible orders for an explicit billing account. Support one or several orders per invoice, in the same currency. Proposed initial rule: each order is billed once; split billing remains open.

Store invoice number, issue/due dates, billed-to snapshot, order references, descriptions, quantities/rates or negotiated amounts, adjustments and total. Confirm fare basis, tax and discount rules before implementation. Prevent duplicate billing, including concurrent submissions. Financial finalization runs through trusted backend operations.

Provide A4 print layouts and browser Save as PDF with repeated headers, page numbers and clear totals. Support more than 14 rows without crashes, clipping or duplicate totals. Use minimal colour. Verify branding and Urdu text against the approved bill template before implementation.

### FR-08 — Payments and settlements

Record payment direction, account, date, amount, method, reference and allocations. Separate customer receipts, partner payments, fuel supplier payments and workshop payments. Derive status and balance from posted transactions. Unapplied overpayments remain explicit credits.

Support advances, partial payments and auditable reversals. Finalized financial records cannot be silently overwritten. Partner statements list orders, payables, advances, payments, adjustments and balances. Payment received from a customer must not automatically settle the subcontractor.

### FR-09 — Overview and reports

Show order/delivery counts, vehicle activity, fuel and maintenance cost, invoiced value, collections, customer outstanding and partner/supplier payables. Each metric links to its contributing records. Distinguish invoice value from cash collected. Do not show net profit until cost coverage and settlement rules are established.

Provide customer, consignee, factory, vehicle, owner and partner filters; monthly/yearly views; and exports. Label date bases explicitly: order date, delivery date, invoice date and payment date are different. Statements must reconcile to underlying records.

### FR-10 — Imports and data quality

Import CSV/XLSX through mapping, preview, validation and reviewed commit. Retain source file/row and original values. Identify duplicates and prevent accidental repeated batch imports. Preserve source attachments unchanged.

Flag inconsistent registration spelling/case, mixed or incomplete dates, unmatched entities, text quantities, missing amounts and conflicting payment labels. The legacy Party column contains names and “Paid”; never create a consignee named Paid automatically. Review apparent test/example rows. Reconcile source transactions rather than relying on cached workbook summary totals. Missing data must not become zero or paid by default.

### FR-11 — Settings

Configure business identity, contact details, currency, timezone, invoice numbering, print branding and categories. Archive used categories to preserve history. PKR and Asia/Karachi are proposed from the data, not yet confirmed.

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

Compress attachments, enforce upload limits and monitor quotas. If limits prevent a feature, revisit scope or architecture rather than silently upgrading. Define a no-cost data export/backup procedure, responsible person and schedule. Test restoration before production; paid managed backups are not assumed.

## 8. Quality requirements

- Keyboard-accessible forms, readable tables and clear validation on desktop/tablet.
- Server-side pagination and indexes for common filters; visible import progress and row-level failures.
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
| AC-06 | Duplicate invoice creation for the same order is prevented under the agreed billing rule, including concurrent requests. |
| AC-07 | A 35-line bill prints with all lines, repeated headings and one correct final total. |
| AC-08 | Fuel entered through different screens appears once in reports. |
| AC-09 | Repair parts 8,000 plus labour 2,000 gives 10,000; payment 4,000 leaves 6,000. |
| AC-10 | Imports flag ambiguous Party/date/payment values and do not silently invent valid records. |
| AC-11 | Reimporting an approved batch does not duplicate records. |
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
6. Add overview reports and reviewed imports.
7. Complete acceptance checks, restoration test and staff review; launch dashboard.
8. Define the Expo mobile app from actual mobile-user needs.

GPS tracking, offline sync, automated dispatch, customer/partner portals, multiple independent business tenants, payroll, full accounting, banking integrations and automated messaging are outside this initial release. No delivery dates are committed yet.

## 11. Open decisions

| Question | Affected area |
|---|---|
| MongoDB from the start, a later migration, or only an option? | Database, auth, files, hosting and API design |
| Who owes transport charges: customer, consignee, factory or case-by-case? | Billing and collections |
| Does the Munir example mean retained commission and an advance paid to the partner? Who collects the gross fare? | Settlement calculations |
| Fixed or percentage commission? Who bears partner fuel/repairs and other deductions? | Partner accounts |
| One order with multiple vehicles or consignees? | Order/assignment model |
| Per-trip, weight, distance or negotiated charges; taxes/discounts? | Invoice rules |
| Business name, currency, timezone, language and exact print template? | Configuration |
| Which staff and access roles? | Permissions |
| Backup/export schedule, retention and recovery expectations? | Production operations |

These items are explicitly unresolved and must be settled before implementing their affected rules.

## 12. Companion documents

[ARCHITECTURE.md](ARCHITECTURE.md), [DESIGN.md](DESIGN.md), [TEST_PLAN.md](TEST_PLAN.md), [SECURITY.md](SECURITY.md), [DECISIONS.md](DECISIONS.md) and [MEMORY.md](MEMORY.md) contain proposed implementation guidance and project continuity. No application implementation or testing is claimed by this documentation release.

## 13. Confirmed fuel supplier and branch extension — 5 October 2026

FR-12: Support multiple fuel suppliers, each with multiple branches/petrol pumps. Each purchase records a supplier and one of its branches, vehicle, date, fuel type, litres, rate and cost. Branch details include name, location and contact. The branch selector filters by supplier; enforce this relationship on the backend. Historical purchases retain their original branch association.

Support both branch-specific settlement and a central supplier payment covering multiple branches. Allocate payments to individual purchases belonging to the same supplier and currency. Never allocate across suppliers. Branch outstanding equals branch purchases less effective allocated payments; consolidated supplier outstanding is the sum of branch outstanding. Show unallocated supplier credits separately, not as a payment assigned to every branch. Reversals restore affected purchase balances. Archive used suppliers/branches rather than deleting history. Legacy fuel source labels such as Agency/Petrol Pump are not sufficient to invent a supplier or branch: flag unmapped values for review.

AC-19: A selected supplier shows only its branches and invalid branch IDs are rejected server-side. AC-20: Branch A purchases 10,000 and B purchases 20,000; a central payment of 15,000 allocated 5,000 to A and 10,000 to B leaves A 5,000 and B 10,000, consolidated 15,000. AC-21: A subsequent branch-A payment of 5,000 clears A without changing B. AC-22: Cross-supplier allocations are rejected; unallocated credit and reversals reconcile without double-counting.
