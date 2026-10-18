# Development constraints and AI collaboration

These MUST rules govern implementation. [AGENTS.md](../AGENTS.md#ai-action-policy) owns action review/authorization categories; [TEST_PLAN.md](TEST_PLAN.md#ai-change-verification-gate) owns verification. This document references domain/security authorities rather than replacing them. Development Ready v1.0: YES; Production Ready: NO. Pre-ship requirements apply to implemented work being released, not permission to begin development.

## Architecture

- MUST use Next.js full-stack/TypeScript and `/api/v1/*` REST for V1. ALWAYS keep Route Handlers thin, business rules in server services and data access behind repositories/transactions.
- MUST preserve framework-independent contracts where practical and the same API for future Expo. MUST NOT introduce NestJS/another backend or change providers without a reviewed new decision in [DECISIONS.md](DECISIONS.md).
- MUST keep secret-bearing composition/adapters server-only; client/mobile/shared exports NEVER import repositories, privileged configuration or administration code. Server-rendered reads MUST use the same authorized services. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Database

Supabase PostgreSQL MUST remain authoritative business storage. Financial operations requiring atomicity MUST use transactions and concurrency/idempotency protection for [DATA_MODEL.md](DATA_MODEL.md) A01–A17/I01–I44. NEVER use binary floating-point arithmetic for monetary truth or rewrite historical snapshots from mutable masters. MUST NOT bypass Company/tenant isolation, invent missing facts or silently delete referenced history. DATA_MODEL is the authoritative equivalent of DATA.md.

## Authentication

Supabase Auth MUST establish identity; application authorization MUST establish access. V1 MUST remain invite-only with public/anonymous signup disabled. Authentication NEVER implies authorization. Session/refresh/revocation/bootstrap requirements remain in [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md).

## Authorization

Every protected operation MUST enforce authentication → active membership → Company scope → permission → resource/field/relationship authorization → business validation before query/mutation. ALWAYS include search/count/history/selected-ID/file/export reads and alternate server entry points. NEVER rely on UI hiding, client totals/roles or guessed IDs for authority. [PERMISSIONS.md](PERMISSIONS.md) owns grants; [SECURITY.md](SECURITY.md) owns detailed boundaries.

## Owner Protection

NEVER permit an operation leaving a provisioned Company without an active User + protected Owner Membership, including concurrent deactivation/reassignment/transfer. Custom role names/grants MUST NOT recreate Owner semantics. Audit critical lifecycle operations under [AUDIT.md](AUDIT.md); normal users including Owner NEVER edit historical audit events.

## Storage

Cloudinary MUST store actual file objects in development/production; PostgreSQL MUST store document metadata/manifests, not binary documents. Sensitive originals/derivatives MUST remain private and delivery authorized. Cloudinary signing/admin secrets MUST be server-only. ALWAYS preserve the staged object/metadata/audit and historical-evidence contract in OPERATIONS_ARCHITECTURE.

## Secrets

NEVER commit actual `.env`/`.env.*` files, expose service-role/privileged keys or Cloudinary secrets, print complete secrets, or paste production credentials into documentation/AI context. Reviewed `.env.example` files MAY contain names/placeholders only. NEVER inspect secret values unnecessarily. Follow [ENVIRONMENT.md](ENVIRONMENT.md), OPERATIONS_ARCHITECTURE custody rules and [AGENTS dependency/secret guidance](../AGENTS.md#dependencies-and-secrets).

## Financial Data

**STOP AND REVIEW** before changing invoicing, payment allocation, account transactions, internal transfers, pricing, fuel financial effects, expenses, corrections or financial reporting. Prepare a concrete scoped design/diff, affected invariants, failure/rollback plan and applicable tests; human review MUST cover the financial change before acceptance/shipping. Do not reopen finalized rules or execute unapproved financial/data operations. Existing explicit authorization for a reviewed scope need not be requested again; material scope changes require new review.

## Migrations

Migrations MUST receive explicit human review of the concrete schema/data effects, tenant constraints, compatibility and validation before application. Destructive migration review MUST include known-good commit, backup/recovery and tested restore/forward-fix consideration before execution. Code revert NEVER implies data reversal. No schema/migration is approved by this governance task. Follow [ROLLBACK.md](ROLLBACK.md).

## Production

AI agents MUST NOT autonomously access production databases, modify production data, deploy to production, execute production restoration, rotate production credentials or delete production Cloudinary assets without explicit authorized human action for that operation/environment. A plan, architectural selection, Development Ready status or general implementation request is NEVER production authorization. STOP AND ASK when that authorization is missing; complete safe local preparation first. Recovery and cutover approvals in OPERATIONS_ARCHITECTURE remain mandatory.

## Changes to finalized requirements

If a requested change conflicts with a finalized business/security/data/recovery invariant, **STOP AND ASK** with the concrete contradiction and smallest decision needed. Ordinary implementation details within those boundaries do not reopen architecture. [AGENTS.md](../AGENTS.md) owns working habits, trace criteria, comments, Git and completion reports; [TEST_PLAN.md](TEST_PLAN.md#ai-change-verification-gate) owns actual verification. No repeated procedural checklist is required here.
