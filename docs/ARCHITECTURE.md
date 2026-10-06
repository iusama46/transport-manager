# Architecture
Updated: 6 October 2026
Status: Proposed implementation design; database and deployment decisions remain open.

## Scope and references
Implement [PRD.md](PRD.md). See [DECISIONS.md](DECISIONS.md) for status and [SECURITY.md](SECURITY.md) for trust boundaries. No application has been implemented or deployed by this documentation task.

## Components
- Next.js App Router dashboard with TypeScript.
- Server components for initial authorized reads where the eventual host supports them; client components for forms, interactive tables and charts.
- Application services for orders, assignments, invoicing, payments, imports and reports.
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

## Logical data model
This is conceptual, not an approved SQL schema or MongoDB collection layout.

| Record | Relationships / important fields |
|---|---|
| Business | Settings, currency, timezone |
| User | Provider identity reference, display name, active status |
| UserMembership / UserRole | User, operating company, assigned role, active status; one role per membership initially |
| Role | Stable ID, company context, custom name/description, status, protected-system marker |
| Permission | Stable module.action catalog key, resource/action semantics |
| RolePermission | Role-to-permission association; no SQL-specific representation assumed |
| ContactEntity | Person/company, business roles, contact details |
| CustomerConsignee | Customer-to-receiver relationship |
| Vehicle | Normalized registration, current owner, type, capacity |
| Driver | Contact, licence and availability |
| Order | Factory, customer, consignee, dates, cargo, fulfilment type |
| OrderStop | Order, sequence, location and completion |
| Assignment | Order, vehicle, driver, partner, historical owner, effective period |
| FuelTransaction | Vehicle, supplier, quantity, rate, cost, source reference |
| MaintenanceExpense | Vehicle, supplier/workshop, breakdown or legacy total |
| Invoice / InvoiceLine | Billing account, immutable issued details, linked orders |
| PartnerObligation | Outsourced order, agreed calculation inputs and payable |
| Payment / Allocation | Direction, counterparty, currency, target obligation, amount |
| Attachment | Private object key, parent record, uploader and metadata |
| AuditLog | Immutable event contract in AUDIT.md: actor/name snapshot, company, action/resource, redacted diff, time and safe request metadata |
| ImportBatch / ImportRow | Source provenance, review results, commit status |

Stable IDs establish relationships. Keep normalized registration matching separate from display values. Do not introduce multiple operating tenants as a product feature merely because records include business IDs.

## Financial operations
Invoice finalization must authorize the actor, validate all orders and account/currency consistency, recompute totals, reserve a unique number, snapshot details and commit atomically. An idempotency key prevents retried requests from creating another invoice. Concurrent finalization must not bill the same eligible order twice.

Posting a payment validates account, direction, amount and allocations. Commit payment, allocations and audit event together. Derive balances from effective posted transactions. Reversals reference originals; do not erase posted history. Advances are payments, not an extra deduction field. Persist decimal values or agreed integer minor units without binary floating-point money calculations.

Use version checks for conflicting operational edits. Return a conflict with current values; do not silently overwrite another staff member.

## API conventions
Proposed routes: /api/orders, /api/orders/:id/assignments, /api/invoices/:id/finalize, /api/payments, /api/payments/:id/reverse, /api/imports/:id/commit and /api/reports.
Validate inputs server-side. Return structured validation, forbidden, conflict and quota errors. Paginate lists with stable ordering and bounded page size. Allowlist sorting/filter fields. Never accept a client-supplied role or total as authoritative.

## Imports and reporting
Stage imports, preserve raw source values, resolve entities, preview errors and commit reviewed rows with durable provenance. Define either atomic batch commit or resumable row commits explicitly before implementation. A retry must report existing committed rows rather than duplicate them.
Report queries use an explicit date basis and reconcile against ledgers. Store business dates separately from timestamps. Snapshot historical ownership and issued billing details.

## Free deployment and offline boundary
Database options remain unresolved; Supabase was proposed and MongoDB was raised later. Do not implement a speculative migration. Verify auth, file storage, runtime compatibility, transaction support and commercial free-tier terms together before choosing providers.
Cloudflare is only a hosting candidate. No payment plan is authorized. Keep backup/export procedures viable without managed paid backups.
Offline edits and synchronization are not approved scope. Browser draft recovery may be considered separately, but must never suggest a financial post succeeded while offline.

## Implementation gates
Resolve database/provider choice, billing responsibility, partner settlement interpretation, order cardinality and currency/rounding before their affected schema and rules. A thin vertical slice should prove login → create order → persist → reload before building all modules.

## Fuel supplier/branch model — confirmed extension

Add FuelSupplier and FuelBranch (supplier ID, name, contact, location, active status). FuelTransaction references both supplier and branch with an enforced relationship. Payment identifies the supplier/payee and optional branch scope; allocations reference specific fuel purchases. A central supplier payment may allocate across that supplier’s branches, while a branch-scoped payment allocates only to that branch. All allocations must match supplier and currency. Validate sums and remaining obligations atomically. Derive branch and supplier totals from the same effective allocations; report unallocated supplier credit separately. Keep branch history stable and require import review for missing branch mappings.

Repository layout is a monorepo: apps/web, apps/mobile, packages/shared and docs. The proposed src paths above live under apps/web unless deliberately shared. Web/shared workspaces and a public placeholder shell exist; protected operations, RBAC and audit persistence are not implemented.

## Authorization and audit flow — finalized design

[PERMISSIONS.md](PERMISSIONS.md) owns permission names, role lifecycle, delegation and company boundaries; [AUDIT.md](AUDIT.md) owns event fields, coverage, redaction and retention. These concepts are provider-independent, not a finalized SQL schema or MongoDB collection design.

Request → verify authentication/session → resolve active user and company membership → load active role/effective catalog grants → check action and scoped resource/relationships → validate business change → persist change and immutable redacted audit event → return only permitted data. Frontend receives a safe effective-permission view for navigation and actions, but the server repeats checks. Client-supplied role/company flags never establish authority. Revalidate after role/assignment changes; any caching requires invalidation/version checks so revoked permissions cannot remain active.

All server components, API handlers, jobs and future mobile APIs use the same authorization services. Scope repositories, joins/lookups, counts, attachments and exports to company context. A protected Owner still needs authorized company context and cannot modify audit history. External companies remain counterparties within one operating business; independent tenant onboarding and Owner cross-tenant access are not supported by the current scope.

Role updates and active-user reassignment/deletion checks require concurrency-safe persistence. Permission keys come from the central catalog; role names remain arbitrary. Appending a new catalog action does not silently grant it to custom roles.

For successful sensitive changes, derive the diff from trusted previous and persisted new states and atomically persist business state with audit history. Provider-specific transaction or durable outbox mechanics remain an implementation gate. Authentication failures/denials use the separately protected event path described in AUDIT.md. Database access must prevent ordinary application identities from updating/deleting audit events. No application audit mutation API is designed.
