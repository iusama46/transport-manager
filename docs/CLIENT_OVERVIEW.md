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
| Consignee (Receiver) | Your customer’s customer who receives the goods; each Trip records its actual receiver/destination. |
| Bill To / Paying Party | Explicitly selected Factory, Client, Consignee or another supported party responsible for payment; independent of operational roles. |
| Vehicle owner | Your business, a partner company or an individual/external owner, with history. |
| Transport partner | An outside transporter assigned an outsourced order. |

### How a job moves through the system

1. Staff record the customer, receiver, factory, cargo, optional planned quantity, route and stops; create one or multiple Trips or separate movement Orders.
2. They assign each Trip its actual vehicle and driver, or execute it with a transport partner.
3. They update loading and delivery progress, including delays, returns and delivery proof.
4. They record fuel, repairs and other relevant expenses.
5. They prepare the transport bill for the selected Bill To debtor and record same-currency invoice payments.
6. They separately record payments owed to transport partners and suppliers.

### A clear view of each job

The order will connect its delivery history, assigned vehicle or partner, related charges and payments. Completing delivery will not automatically mark a bill as paid. Staff explicitly select the Bill To debtor for each applicable Order/agreement. One Order may have multiple potential receivers, with actual receiver/destination recorded historically on each Trip; separate receiver Orders also remain available. Authorized manual Order completion warns about unfinished Trips and preserves their individual statuses.

## What the first release will include

### Orders, vehicles and business contacts

Maintain factories, customers, their consignees, companies, vehicles and drivers. Record vehicle ownership, contacts, licence details, assignments and delivery history. Search orders by date, customer, vehicle, partner and status, with support for multiple delivery stops.

### Outsourced transport

Execute relevant Trips of an existing Order with an outside transport partner without entering the job twice. Track the agreed fare, commission, partner amount, advances, later payments and remaining balance. Keep customer collections separate from payments to the partner. Configured agreements support fixed/percentage and multiple extensible commissions/deductions with automatic or authorized manual calculation. Preserve gross revenue, itemized adjustments and net receivable; partner payable and its advances remain separate.

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

### Remaining configuration and technical work

Business requirements and policies are finalized; no material business-policy gaps remain. Final conceptual data model review is next. Company identity/base currency/timezone/languages, staff-specific grants, invoice branding and backup operator/targets remain configuration work. Database/backend, auth/private storage/hosting and exact backup arrangements remain open technical decisions. Formal jurisdiction-specific invoice/retention obligations require compliance review; this overview does not certify statutory compliance.

### How the first release will be accepted

Staff should be able to follow an order from entry through delivery and billing; print a bill longer than 14 rows; record partial payments; view separate customer and partner balances; reconcile branch and supplier fuel statements; and access only permitted information. Authorized exports must respect company/access scope, and a backup must be successfully restored before launch. Bulk import is V2.

## Company scope and document versions

Multiple companies can be recorded as factories, customers, vehicle owners, suppliers and transport partners within one operating business. This does not grant access to independent companies' private records. Permissions and audit events use the operating-company context; Owner access does not imply cross-tenant access. Factory → Customer/Client → Consignee relationships and existing transport/financial workflows are unchanged.

This Markdown includes the finalized 9 October capability decisions and earlier RBAC/audit requirements. The existing PDF and PowerPoint are historical 5 October snapshots and have not been regenerated in this documentation-only update.

## Additional finalized first-release capabilities

Orders may have one or multiple Trips, with separate Orders also available for individual movements. Planned quantity is optional; loaded/delivered quantities, shortage and agreed billable quantity remain distinct. Effective-dated transport rates use the agreement's Order/loading/delivery/custom date and preserve actual historical rates; authorized exceptions are traceable.

Selected Bill To receivables (Customer Ledger), partner and fuel supplier ledgers support partial/multiple allocations, bulk payments, unallocated credit and advances. Issued invoices and settled relevant Trip fields lock; cancellation, credit/debit notes, reversals, failed-payment corrections, refunds and reallocations preserve originals and ledger history. Cash/bank/custom accounts, own-account transfers, configurable methods/tax/numbering and historical multi-currency are included. Transfers are not income/expense.

Custom expense categories and Trip/Order/Vehicle/Driver/company expenses support attributable Trip margin, excluding general company expenses. Fuel prices retain history; liters × rate and authorized actual-total overrides stay visible. Ownership, driver affiliation and assignments retain history. Multiple documents use predefined/custom types and optional expiry with configurable dashboard reminders.

V1 defaults to auto-approval for authorized operations at their normal workflow stage. Configurable/manual approvals and controlled bulk import are V2. Bill To, commission/deduction, multi-consignee, pricing/discount/rounding, quantity/shortage, correction and profitability policies are finalized; database/backend/auth/storage/hosting remain open. These capabilities are planned, not implemented.

### Final first-release financial and control policies

Trips use Calculated Rate or an authorized Manual Total, preserving historical pricing without inventing a unit rate. The most specific valid rate is suggested; authorized alternatives preserve recommendation/selection and audit. Identical-condition rate periods cannot overlap. Compatible quantity conversion retains original entries; shortage can be informational, affect billable quantity or create an agreed deduction/claim, and Order remaining uses configured Loaded or Delivered quantity.

Fixed/percentage discounts and configured rounding preserve gross/calculated amounts and historical changes. The system supports multiple currencies overall, but V1 payments must match invoice currency. Post-invoice correction uses authorized permitted correction/reissue retaining history or original-linked Credit/Debit Notes, with reason and reconciled balances. Management revenue is reported by Invoice Date; later receipts reduce debt/change cash without new revenue. This is application reporting policy, not statutory accounting certification.

Shared expenses can split equally, by quantity, manual amount or percentage, reconciling to the source expense; Trip profitability uses only allocated shares and excludes unallocated company expenses. Expired documents warn and show reminders without expiry-only assignment blocking in V1. Owner setup and eligible transfer retain at least one active Owner, prevent last-Owner removal/deactivation and produce audit history. V1 retains historical business/financial/audit records without automatic purging; documents stay unless explicitly removable under permission and integrity/business/legal rules. Multiple automatic backups/day and documented, pre-launch tested restore remain required.

V2/Future also includes configurable document-type expiry blocking and cross-currency invoice settlement/allocation if pursued; bulk import/manual approvals/mobile and the other deferred items remain future scope. No implementation or passing runtime tests are claimed.
