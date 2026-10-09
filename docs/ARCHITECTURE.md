# Architecture
Updated: 9 October 2026
Status: Proposed implementation design; database and deployment decisions remain open.

## Scope and references
Implement [PRD.md](PRD.md). See [DECISIONS.md](DECISIONS.md) for status and [SECURITY.md](SECURITY.md) for trust boundaries. No application has been implemented or deployed by this documentation task.

## Components
- Next.js App Router dashboard with TypeScript.
- Server components for initial authorized reads where the eventual host supports them; client components for forms, interactive tables and charts.
- Application services for orders, assignments, Trips, rates, invoicing, payments, accounts, documents, exports and reports; imports are V2.
- A persistence layer containing database-specific queries; do not scatter database calls across UI components.
- Authentication and private object storage providers, selected with the database and hosting.
- Later Expo app using authenticated API endpoints and the same application rules.

Proposed dependency direction: UI and HTTP handlers call application services; services enforce rules and call repositories/storage adapters. Domain calculations do not import UI or provider SDKs. This reduces duplication but does not make database migration automatic.

## Proposed code organization
| Path | Responsibility |
|---|---|
| src/app | Routes, layouts, server entry points and API handlers |
| src/features | Forms, tables and views grouped by business module |
| src/domain | Money, status rules and financial calculations |
| src/services | Authorized business operations and transaction boundaries |
| src/repositories | Data access and query implementations |
| src/integrations | Auth, private files and export integrations |
| src/shared | Reusable UI and validation |
| tests | Unit, integration and browser tests |

Use a modular application initially. No separate microservices are required by the PRD.

## Logical data model — finalized conceptual capabilities

Provider-independent entities and relationships, not SQL tables or database collections. Every business resource carries verified Company/Tenant context; all relationship traversals enforce it. External counterparties remain distinct from operating tenants.

| Concept | Relationships / responsibility |
|---|---|
| Company/Tenant | Settings, base Currency, timezone, numbering, reminder periods; one operating business currently, isolation mandatory |
| User; UserMembership/UserRole | Verified identity, active company membership, one assigned Role initially |
| Role; Permission; RolePermission | Protected Owner or custom company-scoped Role, granular catalog grants; delegation and last-Owner guards |
| Factory; Client; Consignee/ClientCustomer | Preserve Factory → direct Customer (Client) → that Client's Consignee; filtered receiver linkage |
| ContactEntity; Partner/Transporter | Reusable person/company identity, explicit business roles; counterparties never confer membership |
| Order; OrderStop | Factory/Client/Consignee, optional planned quantity, ordered stops, external references, lifecycle; active Orders may receive Trips |
| Trip | Belongs to one Order; Order has 1..N Trips operationally (Draft may precede first Trip); quantities/billing basis, execution, dates/stops and snapshots |
| Assignment; DriverVehicleAssignmentHistory | Operational reassignment periods at Trip level; drivers not permanently attached to vehicles |
| Vehicle; VehicleOwnershipHistory | Own-company, partner-company or individual owner with effective history; registration/category/capacity |
| Driver | Company/partner/external affiliation, identity/licence, availability; Trip preserves historical affiliation |
| RateAgreement; RateHistory | Effective-dated versions with optional matching dimensions, rate type/currency, agreement-specific date basis |
| FuelSupplier; FuelSupplierBranch | Supplier has multiple branches/pumps; historical branch associations retained |
| FuelPriceHistory; FuelTransaction | Effective supplier/branch prices; actual rate snapshot, liters, calculated/final total, overrides, vehicle and optional Trip |
| ExpenseCategory; Expense; MaintenanceExpense | Configurable categories; Trip/Order/Vehicle/Driver/general context, payment data and receipts; maintenance breakdown/reminders preserved |
| Invoice; InvoiceLine | One/multiple selected Trips; partial amount allocations, issued financial snapshots and unique number |
| CreditNote; DebitNote | Original Invoice reference, issued adjustments and automatic receivable effect; preserve source snapshots |
| PartnerPayable; SupplierPayable | Trip partner obligations and fuel supplier obligations; workshop obligations retained; independent of customer receivables |
| Payment; PaymentAllocation | Receipt/outgoing type, counterparty/account/currency, posted original and correction links; one-to-many targets with partial/unallocated credit and history |
| FinancialAccount; AccountTransaction; InternalTransfer | Company-scoped cash/bank/custom accounts, valid balance movements and paired own-account transfers |
| Currency; ExchangeRateSnapshot | Transaction/base currencies, historical rate/date/source and base equivalent; no current-rate rewriting |
| TaxConfiguration | Configurable rules/rates and tax-free handling; finalized transaction tax snapshot |
| DocumentType; Document/Attachment | Predefined/custom type, multiple private files, parent entity, references/dates/expiry, uploader/time and history |
| AuditLog | Immutable redacted event contract from AUDIT.md, actor/company/resource/time and safe diffs |
| ImportBatch; ImportRow — V2 only | Preview, validation, duplicate/provenance tracking and confirmed commit; no V1 import API/UI |

Trip snapshots preserve actual vehicle, driver, owner/affiliation, billable basis/quantity, selected rate agreement/version, date basis/resolved date, default/final rate and override details. Finalized documents/payments retain currency, historical FX, tax and billed-to details. Updating master records or rate/tax/FX configuration never rewrites history. Names are conceptual, not mandated storage names.

Stable internal IDs are system controlled. Display numbering is company configurable (e.g. ORD-000123, TRIP-000456, INV-000078, RB-ORD-2026-000123), collision-safe and distinct from Factory/PO/Bilty/DO/consignment references. Registration matching remains separate from display values.

## Financial operations and lifecycle integrity

Trusted services authorize actor/company/action/resource, validate lifecycle and related entities, recompute exact decimal amounts, reserve numbering and atomically commit business effects plus immutable audit history. Idempotency and concurrency guards protect partial billing, allocations, refunds and account transfers; version checks prevent stale operational overwrites.

Trip billing balance is Billable Amount − effective Invoiced Amount. Default invoice preparation consumes the selected remaining amount; authorized partial billing consumes only its explicit portion. Concurrent invoices cannot exceed the Trip balance or rebill a fully consumed Trip. Issuing captures immutable InvoiceLines and tax/FX/rate/quantity details. Draft edit/delete is permission/dependency restricted; issued corrections use linked void/cancel/CreditNote/DebitNote with reason and automatic ledger effect. Resolve payment allocations before cancelling paid invoices. Exact treatment of correction-adjusted Trip eligibility is a policy gate, not an assumed reset.

Invoice outstanding derives from effective invoice/note amounts minus effective allocations. Payment available credit derives from posted amount less effective allocations/refunds/reversals. A payment can span targets or remain an advance. Reallocations retain original allocation history. Customer receivables, partner payables and fuel/workshop payables use common principles but remain separate by direction, counterparty, company and currency. Reject over-allocation and cross-counterparty relationships. Preserve the existing same-currency allocation invariant until explicit FX allocation/conversion policy is reviewed; full multi-currency transactions/reporting remain V1.

Accounts derive balances from valid posted movements. InternalTransfer posts linked balanced source/destination effects without income/expense; cross-currency transfers require explicit historical conversion policy. Reversal/bounce/refund/partial refund/unallocation never erases the original; apply auditable linked effects and reconcile all affected ledgers/accounts.

Draft/In Progress editing is permission governed; Delivered sensitive edits require additional grants; invoiced/settled relevant Trip fields and issued financial values lock. Controlled correction preserves original values. Dependency-free unused records may be deleted with permission; referenced historical records can only archive/deactivate, with permitted reactivation. New selectors exclude archived records while historical joins still resolve them. Order cancellation/reopening follows PRD FR-03 with reason, permissions and dependent Trip/financial checks.

Trip margin uses attributable revenue minus partner cost, fuel and Trip expenses. General company expenses are excluded; shared costs require a reviewed attribution rule. Reports reconcile in original currencies and separately in base currency using stored historical FX, not live rates.

## API conventions — conceptual, not implemented

Services cover Orders/Trips, rate versions and override, fuel prices/amount override, expenses/categories, eligible Trip billing/partial billing, invoice issue/cancel and notes, receipt/payable allocation/unallocation/reallocation/reversal/refund, accounts/transfers, documents/expiry, archives, roles/audit and export. Endpoint naming remains provisional; no V1 bulk-import commit endpoint is included. Server validation returns scoped validation/forbidden/conflict/quota errors, with stable bounded pagination and allowlisted sorts/filters. Client roles, totals and company flags are never authority.

## Configurable rate resolution

Transport agreement config chooses Order Date, Loading/Dispatch Date, Delivery Date or custom/agreed date. Resolve applicable effective-dated versions using optional company/factory/client/origin/destination/material/vehicle-category/rate-type/currency dimensions. Retain default and final rates; require trips.override_rate for exceptions and audit the optional reason. Fuel price lookup uses transaction date and supplier/branch where applicable; preserve actual used rate. Fuel calculated total and actual total remain separate with override actor/time/reason/diff. Interval boundaries, overlaps, dimension precedence, missing-date/rate behavior and draft-to-final snapshot timing require policy review before implementation; do not silently choose a global rule.

## Documents, reminders, approval and export

Reusable private Document/Attachment supports multiple files and entity-scoped authorization, predefined/custom types and optional expiry. Reminder periods are company configurable; compute expired/expiring-soon dashboard views. Abstract reminder events from delivery adapters so future notification channels do not redesign the document model.

V1 auto-approves permitted operations at their normal finalization point, without a routine reviewer queue. Draft, issue/post and correction safeguards still apply. Future configurable/manual approval rules are V2 extensibility; no active threshold approval requirement is invented.

V1 authorized PDF/XLSX/CSV exports apply the same company/resource/field restrictions as reads and generate safe audit events. Reports expose date basis and reconcile with ledgers; business dates stay distinct from timestamps. V2 import staging preserves raw source values, provenance and reviewed mapping, detects duplicates, reports errors and requires confirmation; atomic versus resumable import commit remains a future technical choice.

## Free deployment and offline boundary
Database options remain unresolved; Supabase was proposed and MongoDB was raised later. Do not implement a speculative migration. Verify auth, file storage, runtime compatibility, transaction support and commercial free-tier terms together before choosing providers.
Cloudflare is only a hosting candidate. No payment plan is authorized. V1 requires automated backups multiple times per day, restricted secure backup access and documented restoration including attachment/audit recovery. Exact frequency/mechanism/retention depends on future provider selection; verify feasibility within the $0 constraint.
Offline edits and synchronization are not approved scope. Browser draft recovery may be considered separately, but must never suggest a financial post succeeded while offline.

## Implementation gates
Review the conceptual model and remaining policy gates in DECISIONS.md, then select database/backend/auth/storage and hosting. Order → Trip cardinality, partial billing and the new capabilities are finalized; multi-consignee, settlement, currency/rounding and matching/correction policies still require review. A thin vertical slice should prove login → create order → persist → reload before building all modules.

## Fuel supplier/branch model — confirmed extension

Use FuelSupplier and FuelSupplierBranch (Branch/Pump) (supplier ID, name, contact, location, active status). FuelTransaction references both supplier and branch with an enforced relationship. Payment identifies the supplier/payee and optional branch scope; allocations reference specific fuel purchases. A central supplier payment may allocate across that supplier’s branches, while a branch-scoped payment allocates only to that branch. All allocations must match supplier and currency. Validate sums and remaining obligations atomically. Derive branch and supplier totals from the same effective allocations; report unallocated supplier credit separately. Keep branch history stable and require V2 import review for missing branch mappings.

Repository layout is a monorepo: apps/web, apps/mobile, packages/shared and docs. The proposed src paths above live under apps/web unless deliberately shared. Web/shared workspaces and a public placeholder shell exist; protected operations, RBAC and audit persistence are not implemented.

## Authorization and audit flow — finalized design

[PERMISSIONS.md](PERMISSIONS.md) owns permission names, role lifecycle, delegation and company boundaries; [AUDIT.md](AUDIT.md) owns event fields, coverage, redaction and retention. These concepts are provider-independent, not a finalized SQL schema or MongoDB collection design.

Request → verify authentication/session → resolve active user and company membership → load active role/effective catalog grants → check action and scoped resource/relationships → validate business change → persist change and immutable redacted audit event → return only permitted data. Frontend receives a safe effective-permission view for navigation and actions, but the server repeats checks. Client-supplied role/company flags never establish authority. Revalidate after role/assignment changes; any caching requires invalidation/version checks so revoked permissions cannot remain active.

All server components, API handlers, jobs and future mobile APIs use the same authorization services. Scope repositories, joins/lookups, counts, attachments and exports to company context. A protected Owner still needs authorized company context and cannot modify audit history. External companies remain counterparties within one operating business; independent tenant onboarding and Owner cross-tenant access are not supported by the current scope.

Role updates and active-user reassignment/deletion checks require concurrency-safe persistence. Permission keys come from the central catalog; role names remain arbitrary. Appending a new catalog action does not silently grant it to custom roles.

For successful sensitive changes, derive the diff from trusted previous and persisted new states and atomically persist business state with audit history. Provider-specific transaction or durable outbox mechanics remain an implementation gate. Authentication failures/denials use the separately protected event path described in AUDIT.md. Database access must prevent ordinary application identities from updating/deleting audit events. No application audit mutation API is designed.
