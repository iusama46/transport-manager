# Architecture
Updated: 10 October 2026
Status: Business Requirements/Policies Finalized; Conceptual Data Model: FINALIZED. Database/backend selection is next; implementation architecture/providers remain open.

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

## Authoritative conceptual data model

[DATA_MODEL.md](DATA_MODEL.md) is the finalized provider-independent V1 model, replacing the earlier capability inventory in this section. It owns the entity/association/value inventory, cardinalities, snapshot matrix, invariant catalog, strong-consistency boundaries and database-selection requirements. PRD remains the business scope authority; no physical schema is approved.

- Company is the operating tenant. Tenant-local BusinessParty (the former ContactEntity identity responsibility) has narrow Factory/Client/Partner/FuelSupplier profiles and Client-specific Consignee relationships; external counterparties never confer membership. Bill To is independent of source/customer/receiver and vehicle owner is independent of executor.
- OrderConsignee captures potential receivers; Trip records one actual receiver when resolved. Draft/unknown fields remain explicit. Order has 0..N recorded Trips, with 1..N for fulfilled movement; manual completion leaves unfinished Trip states unchanged.
- Original/normalized loaded, delivered, billable and shortage measures, conversion/rate/tax/FX/adjustment inputs, ownership/affiliation and assignments retain historical evidence. Calculated-rate and Manual Total pricing have distinct snapshots.
- InvoiceVersion/InvoiceLine and original-linked notes/corrections separate covered Trip charges from final receivable amounts. Posted obligation/allocation/account evidence is authoritative; three ledgers and SupplierPayable are derived views, while PartnerPayable holds the independently agreed cost source.
- MaintenanceDetail belongs to Expense; one Assignment timeline also serves DriverVehicleAssignmentHistory. Document has a validated typed parent and multiple private AttachmentFiles. No unsafe arbitrary resource association is introduced.
- Protected system Owner Role classification and protected Membership lifecycle enforce always-active Owner authority independently of custom grants. Audit retains safe actor/resource snapshots and immutable successful-change evidence.

The inventory contains 44 entity/association/owned-history concepts, 15 values/configuration/catalog concepts and 4 derived views. These 63 named responsibilities are not 63 proposed persistence objects. ImportBatch/ImportRow remain V2 and are outside that inventory. See the [relationship map](DATA_MODEL.md#18-relationship-and-cardinality-map), [snapshots](DATA_MODEL.md#17-historical-snapshot-matrix), [invariants](DATA_MODEL.md#19-invariant-catalog) and [atomic operations](DATA_MODEL.md#20-strong-consistency-and-atomic-operations).

Stable internal IDs are system controlled. Display numbering is company configurable (e.g. ORD-000123, TRIP-000456, INV-000078, RB-ORD-2026-000123), collision-safe and distinct from Factory/PO/Bilty/DO/consignment references. Registration matching remains separate from display values.

## Financial operations and lifecycle integrity

Trusted services authorize actor/company/action/resource, validate lifecycle and related entities, recompute exact decimal amounts, reserve numbering and atomically commit business effects plus immutable audit history. Idempotency and concurrency guards protect partial billing, allocations, refunds and account transfers; version checks prevent stale operational overwrites.

Trip billing balance is Billable Amount − effective Invoiced Amount. Default invoice preparation consumes the selected remaining amount; authorized partial billing consumes only its explicit portion. Concurrent invoices cannot exceed the Trip balance or rebill a fully consumed Trip. Issuing captures immutable InvoiceLines and tax/FX/pricing-method/quantity details. Trace covered Trip charge portions separately from final payable invoice/note amounts: invoice discounts/deductions/rounding cannot reopen already-covered charges as billable remainder. Multi-Trip and partial billing preserve attributable adjustment/coverage links. Draft edit/delete is permission/dependency restricted; issued corrections use authorized correction/reissue where business/legal rules allow, retaining original versions, or linked CreditNote/DebitNote preserving the original, with reason and automatic ledger effect. Resolve payment allocations before cancelling paid invoices. Reconcile effective corrected Trip billable/invoiced amounts, tax/historical FX, notes and allocations atomically; do not reset eligibility or invoice an adjustment twice. Corrections/reissues preserve the original’s trace and avoid duplicate revenue.

Invoice outstanding derives from effective invoice/note amounts minus effective allocations. Payment available credit derives from posted amount less effective allocations/refunds/reversals. A payment can span targets or remain an advance. Reallocations retain original allocation history. Customer receivables, partner payables and fuel/workshop payables use common principles but remain separate by direction, counterparty, company and currency. Reject over-allocation and cross-counterparty relationships. V1 payment currency MUST match invoice currency, including advance/reallocation targets; reject cross-currency invoice settlement regardless of stored FX/base equivalent. Full multi-currency transactions/accounts/reporting remain V1; cross-currency invoice settlement/allocation is V2/Future if pursued.

Accounts derive balances from valid posted movements. InternalTransfer posts linked balanced source/destination effects without income/expense; cross-currency transfers retain explicit historical conversion inputs and paired account effects; physical representation remains a technical choice. Reversal/bounce/refund/partial refund/unallocation never erases the original; apply auditable linked effects and reconcile all affected ledgers/accounts.

Draft/In Progress editing is permission governed; Delivered sensitive edits require additional grants; invoiced/settled relevant Trip fields and issued financial values lock. Controlled correction preserves original values. Dependency-free unused records may be deleted with permission; referenced historical records can only archive/deactivate, with permitted reactivation. New selectors exclude archived records while historical joins still resolve them. Order cancellation/reopening follows PRD FR-03 with reason, permissions and dependent Trip/financial checks. orders.complete permits manual completion with unfinished Trips after a visible warning; preserve Trip statuses, audit completion and report Order/Trip status separately. No aggregation silently completes/cancels Trips. V1 never automatically purges historically significant operational/financial/audit records. Documents are retained except explicit permitted removal where legal/business and historical-integrity rules allow.

V1 management revenue is recognized by Invoice Date; later payment only reduces receivable and changes accounts. Operational Trip/dispatch/delivery dates remain separate. This policy is not statutory accounting certification. Trip margin uses attributable invoice/note revenue minus partner cost, fuel and Trip expense shares. Allocate shared expenses equally, by compatible quantity, manual amount or manual percentage; persist method/basis/values, reconcile to source expense (including explicit rounding remainder), authorize and audit changes, and prevent double-counting. Unallocated general company expenses are excluded. Reports reconcile in original currencies and separately in base currency using stored historical FX, not live rates.

## API conventions — conceptual, not implemented

Services cover Orders/Trips, rate versions and override, fuel prices/amount override, expenses/categories, eligible Trip billing/partial billing, invoice issue/cancel/correction/reissue and notes, manual Order completion, manual-total pricing and shared expense allocation, receipt/payable allocation/unallocation/reallocation/reversal/refund, accounts/transfers, documents/expiry, archives, roles/audit and export. Endpoint naming remains provisional; no V1 bulk-import commit endpoint is included. Server validation returns scoped validation/forbidden/conflict/quota errors, with stable bounded pagination and allowlisted sorts/filters. Client roles, totals and company flags are never authority.

## Configurable rate resolution

Transport agreement config chooses Order Date, Loading/Dispatch Date, Delivery Date or custom/agreed date. Resolve applicable effective-dated versions using optional company/factory/client/origin/destination/material/vehicle-category/rate-type/currency dimensions. Recommend the most specific valid match, retaining recommended and selected references/values. Authorized trips.override_rate can select another valid match, with optional reason and audit; do not invent an arbitrary rate. Equally specific/incomparable candidates require explicit valid resolution. Validate date intervals (start ≤ end, inclusive effective days, open-ended when no end) and reject overlap for identical exact match conditions; distinct conditions may coexist. Fuel price lookup uses transaction date and supplier/branch where applicable; preserve actual used rate. Fuel calculated total and actual total remain separate with override actor/time/reason/diff. Trip calculated rates may remain provisional until the configured rate-date event is known; require a resolved date/valid rate before final financial snapshot. Missing or unresolved candidates cannot silently finalize. Manual Total is an authorized alternative agreed total with its own historical snapshot; neither pricing mode bypasses financial locks/correction rules. Physical interval indexing and decimal representation remain technical choices.

## Documents, reminders, approval and export

Reusable private Document/Attachment supports multiple files and entity-scoped authorization, predefined/custom types and optional expiry. Reminder periods are company configurable; compute expired/expiring-soon dashboard views. V1 warnings/status never block otherwise-authorized assignment solely for expiry; configurable Warning Only/Block Assignment by type is V2/Future. Abstract reminder events from delivery adapters so future notification channels do not redesign the document model.

V1 auto-approves permitted operations at their normal finalization point, without a routine reviewer queue. Draft, issue/post and correction safeguards still apply. Future configurable/manual approval rules are V2 extensibility; no active threshold approval requirement is invented.

V1 authorized PDF/XLSX/CSV exports apply the same company/resource/field restrictions as reads and generate safe audit events. Reports expose date basis and reconcile with ledgers; business dates stay distinct from timestamps. V2 import staging preserves raw source values, provenance and reviewed mapping, detects duplicates, reports errors and requires confirmation; atomic versus resumable import commit remains a future technical choice.

## Free deployment and offline boundary
Database options remain unresolved; Supabase was proposed and MongoDB was raised later. Do not implement a speculative migration. Verify auth, file storage, runtime compatibility, transaction support and commercial free-tier terms together before choosing providers.
Cloudflare is only a hosting candidate. No payment plan is authorized. V1 requires automated backups multiple times per day, restricted secure backup access and documented restoration including attachment/audit recovery, tested before production launch. Exact frequency/mechanism/retention depends on future provider selection; verify feasibility within the $0 constraint.
Offline edits and synchronization are not approved scope. Browser draft recovery may be considered separately, but must never suggest a financial post succeeded while offline.

## Implementation gates
Business requirements/policies and the conceptual model are finalized (DECISIONS.md D51–D78; DATA_MODEL.md). No material business-policy or conceptual-model gap remains. Next sequence: Database/Backend Selection → Auth/Storage/Hosting/Backup Architecture → Final Architecture Audit → assessment of Development Ready v1.0 → authorized Implementation. Provider choices, protected Owner provisioning mechanism, transaction/outbox, append-only audit enforcement, physical decimal/FX and export/file handling remain open. The finalized conceptual model constrains that review; it is not an approved physical schema. Provider evaluation must prove DATA_MODEL.md A01–A17 and the Database Selection Requirements. A thin vertical slice should prove login → create order → persist → reload before building all modules.

## Fuel supplier/branch model — confirmed extension

Use FuelSupplier and FuelSupplierBranch (Branch/Pump) (supplier ID, name, contact, location, active status). FuelTransaction references both supplier and branch with an enforced relationship. Payment identifies the supplier/payee and optional branch scope; allocations reference specific fuel purchases. A central supplier payment may allocate across that supplier’s branches, while a branch-scoped payment allocates only to that branch. All allocations must match supplier and currency. Validate sums and remaining obligations atomically. Derive branch and supplier totals from the same effective allocations; report unallocated supplier credit separately. Keep branch history stable and require V2 import review for missing branch mappings.

Repository layout is a monorepo: apps/web, apps/mobile, packages/shared and docs. The proposed src paths above live under apps/web unless deliberately shared. Web/shared workspaces and a public placeholder shell exist; protected operations, RBAC and audit persistence are not implemented.

## Authorization and audit flow — finalized design

[PERMISSIONS.md](PERMISSIONS.md) owns permission names, role lifecycle, delegation and company boundaries; [AUDIT.md](AUDIT.md) owns event fields, coverage, redaction and retention. These concepts are provider-independent, not a finalized SQL schema or MongoDB collection design.

Request → verify authentication/session → resolve active user and company membership → load active role/effective catalog grants → check action and scoped resource/relationships → validate business change → persist change and immutable redacted audit event → return only permitted data. Frontend receives a safe effective-permission view for navigation and actions, but the server repeats checks. Client-supplied role/company flags never establish authority. Revalidate after role/assignment changes; any caching requires invalidation/version checks so revoked permissions cannot remain active.

All server components, API handlers, jobs and future mobile APIs use the same authorization services. Scope repositories, joins/lookups, counts, attachments and exports to company context. A protected Owner still needs authorized company context and cannot modify audit history. External companies remain counterparties within one operating business; independent tenant onboarding and Owner cross-tenant access are not supported by the current scope.

Role updates and active-user reassignment/deletion checks require concurrency-safe persistence. Permission keys come from the central catalog; role names remain arbitrary. Appending a new catalog action does not silently grant it to custom roles.

For successful sensitive changes, derive the diff from trusted previous and persisted new states and atomically persist business state with audit history. Provider-specific transaction or durable outbox mechanics remain an implementation gate. Authentication failures/denials use the separately protected event path described in AUDIT.md. Database access must prevent ordinary application identities from updating/deleting audit events. No application audit mutation API is designed.

## Protected Owner lifecycle

Provision the first Owner during company setup; keep at least one active Owner at all times, including concurrent transfer/removal/deactivation/reassignment. Owner manages company users/roles under system safeguards. Transfer to an eligible authorized user requires owners.transfer and protected Owner authority; ordinary custom-role editing cannot create/remove system ownership. Audit Owner creation/transfer/removal/deactivation. Provider-backed provisioning and concurrency mechanism remain open technical choices.
