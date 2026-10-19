# Security Requirements
Updated: 18 October 2026
Status: Environment foundations implemented and checked; business security controls remain planned. No comprehensive security assessment has been performed.

## Implemented scope and verification

The current application contains public placeholder pages and UI demos only. Inspection found no API handlers, server actions, persistence, private records, exports or attachment operations to authorize. The existing `/dev/components` page checks execution mode on the server and returns not-found outside development. This is not user authentication.

- Actual environment files are ignored at every monorepo depth; exact `.env.example` templates are allowed. Web requires APP_ENV and documents optional inactive server provider contracts; reserved mobile remains comment-only.
- The Node parser validates explicit environment selection, host/provider-label consistency, complete provider groups and safe URL/value formats with value-free errors. Next bootstrap and the typed immutable runtime getter reuse it. All public-prefix variables remain rejected; no SDK or connection exists. [ENVIRONMENT](ENVIRONMENT.md) owns the variable contract.
- Configuration tests cover missing/invalid values, production/preview mismatch, public-prefix rejection/redaction, immutable snapshots and recursive Git ignores. The isolated Next boundary probe checks server imports, browser-bundle exclusion and compiler denial of a transitive Client Component import; [Phase 1.1 evidence](features/phase-1-1-environment.md) records actual results. Operator environment labels do not prove credential ownership; real target/host isolation remains an integration gate.
- A targeted scan of 89 tracked index files found no actual environment files or recognizable credential patterns. This does not cover Git history or every secret format. See [ENVIRONMENT.md](ENVIRONMENT.md) for setup, boundaries and scan limitations.

Authentication, session handling, role/permission checks, company/record scoping and provider data policies are **not implemented or verified**. There are no implemented protected business operations to retrofit. Add server enforcement and adversarial direct-request tests with the first protected operation; do not infer protection from this foundation. All requirements below remain planned unless explicitly identified above.

## Protected data and boundaries
Protect customer contacts, driver CNIC/licence information, private receipts/proof, financial transactions, exports and credentials. The browser is untrusted. Authentication establishes identity; backend/data policies establish permission for every operation. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Dynamic RBAC and least privilege
Use dynamic custom roles and the central [permission catalog](PERMISSIONS.md); no fixed job-title grants. A protected Owner/Super Admin has full supported access within the authorized operating company, not an implicit cross-tenant bypass. Enforce least privilege and deny unknown/ungranted actions. Protect Owner critical permissions and the last active Owner. Apply delegation ceilings to role edits and assignments; a role-management grant must not allow privilege escalation. Reassign active users before deleting/deactivating their custom role, with concurrent assignment checks.

Frontend permission gates control navigation/actions; server checks independently authorize every operation. Reload active membership and effective role permissions after role or account changes; stale sessions cannot preserve revoked grants. See PERMISSIONS.md for exact lifecycle rules.

## Authentication and secrets
Use selected Supabase Auth with invite-only email/password, configured verification, reset and refresh. Disable public/anonymous signup at the provider. Identity never implies application access. Follow the session verification/revocation, protected provisioning, CSRF, callback and cache/client isolation contract in [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md). MFA policy for privileged accounts is a pre-launch configuration/security review item; do not create password cryptography.
Keep privileged secrets server-side, out of source control, logs and public environment variables. Distinguish intentionally public project identifiers from privileged service credentials. Use secure session cookies and CSRF/origin protections where cookie authentication is used.

## Record and action authorization
Scope queries and mutations to the operating business and actor’s permitted records/actions. Test guessed IDs, exports and attachment routes. Validate role decisions on the server. Selected development PostgreSQL is hosted on Supabase Free behind authorized Next.js server services only. Protected business resources must not be directly client-accessible through generated Supabase database APIs. Evaluate Company-qualified relationship constraints and tested RLS with a non-owner/non-superuser/no-BYPASSRLS backend role, validated transaction-local Company context and fail-closed pooled access. Detailed policies/credentials are not implemented; RLS complements server-service action/resource authorization.

## Financial integrity
Recompute totals on trusted code, use exact decimal handling and atomic posting. Protect invoice numbers and Trip billed-amount allocations from concurrency. Persist idempotency outcomes so timeout retries cannot create additional payments.
Use linked reversals/adjustments and reasons rather than destructive edits. Record actors and timestamps, prohibit historical audit modification through normal application operations and keep financial history readable after master-data archival. Customer and subcontractor balances remain independent.

## Attachments, export and V2 imports
Cloudinary is selected for development and production; PostgreSQL stores metadata only. Follow OPERATIONS_ARCHITECTURE.md for authenticated originals/derivatives, explicitly expiring delivery, server-mediated uploads, validation, staging/audit/deletion and orphan reconciliation. Keep all business documents private by default. Validate object access against parent-record permissions before issuing short-lived downloads. Use unpredictable storage keys, bounded upload sizes and allowlisted types. Verify content signatures where practical; do not trust filename or client MIME alone. Avoid rendering active HTML/SVG as trusted attachments.
V1 exports must neutralize spreadsheet-formula injection in exported text fields. V2 imports must bound spreadsheet row/file limits and parser resource usage, validate server-side and preserve provenance; never execute uploaded workbook formulas as application code.

## Application controls
Validate inputs and allowlist sort/filter options. Use parameterized queries or safe query builders; reject user-controlled query operators. Encode untrusted output and sanitize any explicitly supported rich text. Protect mutation endpoints from CSRF as appropriate to the auth mechanism. Set security headers and safe content policies appropriate to the final deployment.
Return useful user errors without stack traces or secret values. Limit expensive reports/exports and repeated upload requests to protect free quotas.

## Logging and privacy
Log action, record ID, actor and result with minimal personal data. Exclude credentials, session tokens, raw CNIC values and private signed URLs. Restrict audit access. V1 retention-by-default prohibits automatic historical business/financial/audit purging; archived/deactivated records remain. Documents may be explicitly removed only with permission and business/legal/historical-integrity checks. Formal jurisdiction-specific periods/deletion obligations remain compliance review; no legal compliance claim is made.

## Backups and incident handling
V1 requires automated backups multiple times per day, encrypted/protected storage and transport, restricted backup/restore access, documented recovery and a responsible operator. The recovery design is selected and B1 CLOSED in [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md#backup-and-disaster-recovery--authoritative-v1-specification). It specifies separate GitHub/R2 credentials, public-key encryption with off-runner custody, retention locks, independent monitoring, DB/Auth/file checkpoint consistency and deliberate production restore/cutover approval. Include database records and an attachment manifest/objects as needed. Test isolated restore and reconciliation before launch.
If credentials leak: revoke/rotate, disable affected sessions, inspect audit history, contain exposure and document impact. If financial inconsistency appears: suspend affected posting, preserve evidence and reconcile before resuming. Do not delete logs or source records to hide an incident.

## Release checks
Validate custom permission sets through direct requests, private downloads, session revocation, secret scanning, dependency review, upload/import abuse cases and recovery. See [TEST_PLAN.md](TEST_PLAN.md). B1 architecture is complete; selected provider integrations, recovery pipeline and actual staff permissions are not implemented controls. Actual runtime security/restore acceptance is required before launch.

## Fuel settlement authorization

Treat branch and central supplier payments as financial posting actions requiring the applicable explicit payment/settlement grants from the catalog, independently of custom role names. Validate supplier, branch, purchase and currency relationships server-side. Users granted fuel purchase entry do not automatically gain settlement authority. Audit allocations and reversals. Direct requests cannot bypass branch scope or allocate another supplier’s payment.

## Company isolation and audit protection

Authorize User + Company/Tenant + Role + Permission + Resource in server services and data policies. Scope reads, mutations, related IDs, private downloads, history, counts and exports to verified membership; never trust a client-supplied company or role. External counterparties do not confer tenant membership. Owner cannot bypass company scope. Independent tenant onboarding/cross-tenant ownership is outside current scope.

[AUDIT.md](AUDIT.md) is the authoritative event/redaction/retention contract. Capture events on trusted code; never persist passwords, tokens, secrets, API keys or other credentials in before/after fields, descriptions or request metadata. Use safe field allowlists and preserve actor/resource history. Audit reading requires `activity_logs.view`; export also requires `activity_logs.export`; record history additionally checks parent access and sensitive fields. Neither ordinary users nor administrators may edit/delete historical events through the application.

Require append-only provider protections, restricted infrastructure access, durable event capture and protected archives/backups before release. Retention periods and exceptional infrastructure disposal remain policy decisions, not application permissions. Test direct API bypass, cross-company IDs, role escalation/revocation, audit tampering and redaction as specified in TEST_PLAN.md. These controls remain unimplemented.

## Finalized integrity controls — 9 October 2026

Apply User + Company/Tenant + Role + Permission + Resource to every new RateAgreement/history, Trip, ledger/payment allocation, account/transfer, FX/tax configuration, expense/category, supplier/branch, document/type/reminder and note. Validate related IDs before writes; counts, searches, previews, generated exports and signed file downloads use the same scope. Guessed IDs never confer access.

Versioned rates and fuel prices require configuration grants; exceptional Trip/fuel rate and fuel amount overrides require dedicated grants and redacted before/after audit history. Preserve original/default/final values, actual quantity, vehicle/driver/owner/affiliation and historical rate/tax/FX. Future settings cannot rewrite finalized transactions. Exact currency/quantity arithmetic, bounded allocations and atomic concurrent billing/ledger/account effects are mandatory; do not net different currencies without reviewed conversion policy.

Issued invoices and invoiced/settled relevant Trip fields lock. Delivered sensitive edits require additional grants. Corrections, invoice cancel/void/credit/debit notes, payment unallocation/reallocation/reversal/bounce/refund/partial refund and own-account transfers require explicit permission, reason where applicable, original linkage and audited automatic ledger effects. No posted payment deletion or referenced-record permanent deletion is allowed; only unused dependency-free records may be deleted. Archival retains references and excludes records from ordinary new selections.

Exports require resource view plus export grant, company/field filters and audit events; mask unauthorized identity/financial data before generation. Neutralize formula-leading spreadsheet text without altering stored values. File metadata, preview, upload/download and archive/deletion require parent access and applicable document/identity permissions; expiry reminders reveal only permitted information.

Backup security preserves tenant/access restrictions, audit redaction, financial snapshots and private attachment objects/manifests. Test isolated restore with relationship and account/ledger reconciliation. V1 auto-approval does not bypass permissions, lifecycle or posting integrity; no V1 import endpoint should exist. Provider protections and these business controls remain unimplemented.

## Final business-policy safeguards

Server checks enforce explicit Bill To debtor, original gross/calculated versus adjusted/net values, compatible quantity conversion with original units retained, agreement shortage/remaining basis and shared expense reconciliation. Rate selection recommends most specific valid conditions, rejects exact-condition interval overlaps and requires trips.override_rate for another valid match. Manual Total uses trips.manual_price plus ordinary resource authority, captures entered total/actor/time and respects financial locks; never fabricate a unit rate.

V1 invoice payment/advance/reallocation currency must match invoice currency; historical FX/base conversion never bypasses this invariant. Controlled invoice correction/reissue and credit/debit notes require respective grants, reason, original history and consistent Trip/ledger/account/allocations without duplicate billing or revenue. Invoice-date revenue and cash collection remain separate in reporting.

Manual Order completion requires orders.complete, unfinished-Trip warning and audit; remaining Trip statuses stay intact. Expired documents show warnings/status/reminders; V1 assignment remains possible if otherwise authorized and expiry alone cannot block it. Future blocking is not an active V1 safeguard.

First Owner is established during company setup. Owner creation/transfer/removal/deactivation is audited; always preserve an active Owner with concurrency-safe checks, deny last-Owner self-removal/deactivation and custom-role bypass. owners.transfer requires protected Owner authority and an eligible recipient; provider provisioning remains open. Multiple automatic backups daily, restricted access and a documented restore tested before production remain launch requirements, not completed verification.

## Database/backend selection security boundary — 12 October 2026

[DATABASE_BACKEND_SELECTION.md](DATABASE_BACKEND_SELECTION.md) records PostgreSQL/Supabase Free + Next.js full-stack selection and native/application/infrastructure requirements. Modular server services own identity/membership/role/grant/resource validation, financial transactions and redacted audit; thin Route Handlers provide the REST adapter. Frontend/mobile cannot bypass these operations with direct DB credentials or protected Supabase data endpoints. Supabase Auth and Cloudinary are selected by the 16 October user direction; Supabase Storage is not selected. Application grants remain independent of provider authentication.

Required future safeguards: least-privilege runtime separate from migration/backup credentials, unexposed business schema/generated-API grant controls, parameterized values and allowlisted identifiers, TLS verification, short transaction-owned queries, concurrency/idempotency tests, RLS context isolation across pooled connections and append-only audit permissions. Backend-asserted Company context defends against scope bugs but cannot by itself defeat a compromised backend credential able to assert another context; treat that credential as a protected authority and validate this threat boundary before release. Ordinary runtime cannot alter RLS/schema/roles, truncate audit or silently rewrite issued versions.

No production security/recovery approval: Free has no managed automatic backup/PITR; multiple automatic daily backups and documented successful complete restore of financial/audit/private-object history are still mandatory. Scheduler/store/key custody/operator/retention/targets/monitoring are selected in OPERATIONS_ARCHITECTURE.md; B1 is CLOSED at architecture level, with implementation/restore tests still required before launch. Vercel permits an appropriate paid production plan; its concrete configuration and auth/private-file controls must be implemented/tested before launch. No credential, schema, policy or security test is created by provider selection.

## Full-stack transport safeguards — clarified 12 October 2026

Every /api/v1/* request repeats verified identity, active company membership, action/resource/field/lifecycle checks through authorized services; middleware/Proxy, hidden controls or route placement are insufficient. Server Components and any future Server Actions use those same services with validated context. Client/shared UI imports cannot reach DB/provider/auth secrets; composition/repository entry points are server-only, while service/domain contracts avoid framework/request objects for later extraction. Private responses must not enter shared static/public caches; test cross-user/company reads and permission revocation.

Vercel many-instance execution requires transaction-scoped DB/RLS context, bounded pools, durable idempotency and same-transaction success audit; no in-memory mutex, timer or post-response callback establishes financial correctness. Respect request deadlines and private-file body limits without weakening historical/tenant/document invariants. No auth provider, application control or API is implemented here. Use an appropriate production plan; the previous $0/Hobby constraint is superseded and is not a development blocker.

## Recovery architecture security disposition — 16 October 2026

Development Ready v1.0: YES; Production Ready: NO. Follow only the authoritative recovery specification in OPERATIONS_ARCHITECTURE.md for backup trust boundaries, encryption/custody, credential separation, threat model, monitoring and human recovery approvals. Newly documented risks include delayed/dropped scheduler events, silent Auth omission in default CLI exports, mutable administrator-controlled bucket locks, broad export credentials, poisoned backups and resurrection of revoked access after rollback. The selected controls address the design; direct permission/locked-delete/scheduler-failure/Auth-revocation and full recovery acceptance remain unexecuted. No irreversible WORM, six-hour scheduler SLA or four-hour measured restoration is claimed.
