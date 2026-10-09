# Transport Manager

## Client Overview & Scope

9 October 2026 | Updated requirements for client review

This document describes planned capabilities. It does not certify completed features.

## The business and its daily workflow

### Purpose

Transport Manager will give one transport business a shared place to manage transport orders, vehicles, drivers, fuel, repairs, bills and payments. It is intended to reduce repeated data entry and make outstanding work and balances easier to follow.

### Who will use it

A protected Owner/Super Admin has full supported access within the authorized operating business. Authorized staff can create custom roles with any name, select granular permissions and assign roles to users. Titles such as Accountant or Fuel Manager do not automatically confer access. Each person sees and changes only permitted information; the server also rejects unauthorized requests. Exact staff grants will be agreed before launch.

### People and businesses involved

| Item | Description |
|---|---|
| Factory | The business or location from which the goods originate. |
| Customer (Client) | Your direct customer who arranges transportation. |
| Consignee (Receiver) | Your customer’s customer who receives the goods. |
| Vehicle owner | Your business, a partner company or an individual/external owner, with history. |
| Transport partner | An outside transporter assigned an outsourced order. |

### How a job moves through the system

1. Staff record the customer, receiver, factory, cargo, optional planned quantity, route and stops; create one or multiple Trips or separate movement Orders.
2. They assign each Trip its actual vehicle and driver, or execute it with a transport partner.
3. They update loading and delivery progress, including delays, returns and delivery proof.
4. They record fuel, repairs and other relevant expenses.
5. They prepare the transport bill and record customer payments.
6. They separately record payments owed to transport partners and suppliers.

### A clear view of each job

The order will connect its delivery history, assigned vehicle or partner, related charges and payments. Completing delivery will not automatically mark a bill as paid. Who is responsible for paying each transport bill still needs to be confirmed.

## What the first release will include

### Orders, vehicles and business contacts

Maintain factories, customers, their consignees, companies, vehicles and drivers. Record vehicle ownership, contacts, licence details, assignments and delivery history. Search orders by date, customer, vehicle, partner and status, with support for multiple delivery stops.

### Outsourced transport

Execute relevant Trips of an existing Order with an outside transport partner without entering the job twice. Track the agreed fare, commission, partner amount, advances, later payments and remaining balance. Keep customer collections separate from payments to the partner. The commission calculation and responsibility for expenses must be agreed.

### Fuel suppliers and branches

Manage multiple fuel suppliers, each with multiple petrol-pump branches. Record each purchase against its supplier, branch and vehicle, including fuel type, liters, rate and cost. View branch statements and a combined supplier statement. Pay a single branch or pay the supplier centrally for purchases across several of its branches. Each payment is applied to specific purchases so it is counted once.

### Maintenance and expenses

Record repairs, workshops, parts, labour and other vehicle expenses. Track payments still due and upcoming service dates or mileage where readings are available. Keep a history for each vehicle.

### Bills, payments and reports

Prepare bills from selected eligible Trips, including multi-Trip invoices and authorized partial billing, calculate totals and print or save them as PDFs. Long bills will continue onto additional pages without a 14-row limit. Record full or partial payments, advances and outstanding balances. Review orders, vehicle activity, fuel purchases, repairs, customer collections and partner or supplier balances.

### Access, settings and existing records

Manage staff accounts, custom Roles & Permissions, business details and bill settings. Protect the Owner role and reassign active users before removing their custom role. Maintain an immutable Activity Log of important business/security actions with actor, time, company and safe change details. Authorized users can filter/search the global log, export with explicit permission and inspect Activity history on individual records. No normal application user can edit/delete audit history, and credentials never enter the log. V1 provides full authorized PDF/XLSX/CSV exports. Controlled spreadsheet import is V2, with preview, validation, duplicate detection, error reporting, confirmation and audit.

## Delivery plan and client review

### Planned delivery stages

| Item | Description |
|---|---|
| 1. Foundation | Staff login, custom roles/permissions, users, immutable audit capture and business settings. |
| 2. Daily operations | Companies, customers, receivers, vehicles, drivers and orders. |
| 3. Costs and partners | Outsourced jobs, fuel suppliers/branches, repairs and expenses. |
| 4. Billing and reporting | Bills, collections, settlements, statements and overview reports. |
| 5. Launch preparation | Authorized export, practical checks, multiple-daily automated backups, documented recovery and staff review. |

### Later phases

A mobile app is planned after the dashboard. Live GPS tracking, offline synchronization, automated dispatch, customer or partner portals, payroll, full accounting, bank integrations and automated messages are outside the first release unless separately agreed.

### Budget and scheduling

The initial target is no monthly software-service subscription cost. Free services have limits, so file storage, usage and backup arrangements must be checked before launch. Paid services will require explicit approval. This document is a scope overview, not a price quotation or delivery-date commitment.

### Decisions to confirm

Who pays the transport bill: customer, receiver, factory or case-by-case?
How are fares, commission, partner advances and expense deductions agreed?
Multiple vehicles via Trips is finalized; multiple receiver/stop linkage still needs review.
Full multi-currency and configurable tax are finalized; agree base currency, FX/rounding/discount policies, language and bill format.
Which staff can change records, finalize bills and record or reverse payments?
Who maintains backups/recovery and reviews future V2 imports?

### How the first release will be accepted

Staff should be able to follow an order from entry through delivery and billing; print a bill longer than 14 rows; record partial payments; view separate customer and partner balances; reconcile branch and supplier fuel statements; and access only permitted information. Authorized exports must respect company/access scope, and a backup must be successfully restored before launch. Bulk import is V2.

## Company scope and document versions

Multiple companies can be recorded as factories, customers, vehicle owners, suppliers and transport partners within one operating business. This does not grant access to independent companies' private records. Permissions and audit events use the operating-company context; Owner access does not imply cross-tenant access. Factory → Customer/Client → Consignee relationships and existing transport/financial workflows are unchanged.

This Markdown includes the finalized 9 October capability decisions and earlier RBAC/audit requirements. The existing PDF and PowerPoint are historical 5 October snapshots and have not been regenerated in this documentation-only update.

## Additional finalized first-release capabilities

Orders may have one or multiple Trips, with separate Orders also available for individual movements. Planned quantity is optional; loaded/delivered quantities, shortage and agreed billable quantity remain distinct. Effective-dated transport rates use the agreement's Order/loading/delivery/custom date and preserve actual historical rates; authorized exceptions are traceable.

Customer, partner and fuel supplier ledgers support partial/multiple allocations, bulk payments, unallocated credit and advances. Issued invoices and settled relevant Trip fields lock; cancellation, credit/debit notes, reversals, failed-payment corrections, refunds and reallocations preserve originals and ledger history. Cash/bank/custom accounts, own-account transfers, configurable methods/tax/numbering and historical multi-currency are included. Transfers are not income/expense.

Custom expense categories and Trip/Order/Vehicle/Driver/company expenses support attributable Trip margin, excluding general company expenses. Fuel prices retain history; liters × rate and authorized actual-total overrides stay visible. Ownership, driver affiliation and assignments retain history. Multiple documents use predefined/custom types and optional expiry with configurable dashboard reminders.

V1 defaults to auto-approval for authorized operations at their normal workflow stage. Configurable/manual approvals and controlled bulk import are V2. Detailed payer/commission, multi-consignee, pricing/FX/rounding, corrections and profitability policies still require review; database/backend and hosting remain open. These capabilities are planned, not implemented.
