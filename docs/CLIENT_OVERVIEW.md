# Transport Manager

## Client Overview & Scope

5 October 2026 | Draft for client review

This document describes planned capabilities. It does not certify completed features.

## The business and its daily workflow

### Purpose

Transport Manager will give one transport business a shared place to manage transport orders, vehicles, drivers, fuel, repairs, bills and payments. It is intended to reduce repeated data entry and make outstanding work and balances easier to follow.

### Who will use it

The proposed users are the business owner, operations staff, accounts staff and users with view-only access. Each person will see and change only the information allowed by their role. Exact staff access will be agreed before launch.

### People and businesses involved

| Item | Description |
|---|---|
| Factory | The business or location from which the goods originate. |
| Customer | Your direct customer who arranges transportation. |
| Consignee (Receiver) | Your customer’s customer who receives the goods. |
| Vehicle owner | Your business or another company that owns the vehicle. |
| Transport partner | An outside transporter assigned an outsourced order. |

### How a job moves through the system

1. Staff record the customer, receiver, factory, cargo, quantity, route and stops.
2. They assign a vehicle and driver, or send the order to a transport partner.
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

Assign an existing order to an outside transport partner without entering the job twice. Track the agreed fare, commission, partner amount, advances, later payments and remaining balance. Keep customer collections separate from payments to the partner. The commission calculation and responsibility for expenses must be agreed.

### Fuel suppliers and branches

Manage multiple fuel suppliers, each with multiple petrol-pump branches. Record each purchase against its supplier, branch and vehicle, including fuel type, litres, rate and cost. View branch statements and a combined supplier statement. Pay a single branch or pay the supplier centrally for purchases across several of its branches. Each payment is applied to specific purchases so it is counted once.

### Maintenance and expenses

Record repairs, workshops, parts, labour and other vehicle expenses. Track payments still due and upcoming service dates or mileage where readings are available. Keep a history for each vehicle.

### Bills, payments and reports

Prepare bills from selected orders, calculate totals and print or save them as PDFs. Long bills will continue onto additional pages without a 14-row limit. Record full or partial payments, advances and outstanding balances. Review orders, vehicle activity, fuel purchases, repairs, customer collections and partner or supplier balances.

### Access, settings and existing records

Manage staff accounts and permissions, business details and bill settings. Record important changes for review. Existing spreadsheet data will be checked before import, including inconsistent vehicle numbers, unclear dates and incomplete payment details. Export records and reports when needed.

## Delivery plan and client review

### Planned delivery stages

| Item | Description |
|---|---|
| 1. Foundation | Staff login, permissions, users and business settings. |
| 2. Daily operations | Companies, customers, receivers, vehicles, drivers and orders. |
| 3. Costs and partners | Outsourced jobs, fuel suppliers/branches, repairs and expenses. |
| 4. Billing and reporting | Bills, collections, settlements, statements and overview reports. |
| 5. Launch preparation | Reviewed data import, practical checks, backup recovery and staff review. |

### Later phases

A mobile app is planned after the dashboard. Live GPS tracking, offline synchronization, automated dispatch, customer or partner portals, payroll, full accounting, bank integrations and automated messages are outside the first release unless separately agreed.

### Budget and scheduling

The initial target is no monthly software-service subscription cost. Free services have limits, so file storage, usage and backup arrangements must be checked before launch. Paid services will require explicit approval. This document is a scope overview, not a price quotation or delivery-date commitment.

### Decisions to confirm

Who pays the transport bill: customer, receiver, factory or case-by-case?
How are fares, commission, partner advances and expense deductions agreed?
Can one order use several vehicles or deliver to several receivers?
What currency, tax/discount rules, language and bill format are required?
Which staff can change records, finalize bills and record or reverse payments?
Who will check imported records and maintain backups?

### How the first release will be accepted

Staff should be able to follow an order from entry through delivery and billing; print a bill longer than 14 rows; record partial payments; view separate customer and partner balances; reconcile branch and supplier fuel statements; and access only permitted information. Existing records must import without unintended duplicates, and a backup must be successfully restored before launch.
