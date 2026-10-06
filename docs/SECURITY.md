# Security Requirements
Updated: 6 October 2026
Status: Environment foundations implemented and checked; business security controls remain planned. No comprehensive security assessment has been performed.

## Implemented scope and verification

The current application contains public placeholder pages and UI demos only. Inspection found no API handlers, server actions, persistence, private records, exports or attachment operations to authorize. The existing `/dev/components` page checks execution mode on the server and returns not-found outside development. This is not user authentication.

- Actual environment files are ignored at every monorepo depth; exact `.env.example` templates are allowed. Web and reserved mobile templates contain comments only because no application variables are required.
- Node-only configuration validation is invoked by the web Next configuration. Required-name validation produces errors without values; the current required list is empty. All public-prefix variables are rejected until explicitly reviewed public configuration is implemented.
- Environment tests verify empty configuration, missing/blank required values, public-prefix rejection without value disclosure, and root/nested Git ignore behavior.
- A targeted scan of 89 tracked index files found no actual environment files or recognizable credential patterns. This does not cover Git history or every secret format. See [ENVIRONMENT.md](ENVIRONMENT.md) for setup, boundaries and scan limitations.

Authentication, session handling, role/permission checks, company/record scoping and provider data policies are **not implemented or verified**. There are no implemented protected business operations to retrofit. Add server enforcement and adversarial direct-request tests with the first protected operation; do not infer protection from this foundation. All requirements below remain planned unless explicitly identified above.

## Protected data and boundaries
Protect customer contacts, driver CNIC/licence information, private receipts/proof, financial transactions, exports and credentials. The browser is untrusted. Authentication establishes identity; backend/data policies establish permission for every operation. See [ARCHITECTURE.md](ARCHITECTURE.md).

## Dynamic RBAC and least privilege
Use dynamic custom roles and the central [permission catalog](PERMISSIONS.md); no fixed job-title grants. A protected Owner/Super Admin has full supported access within the authorized operating company, not an implicit cross-tenant bypass. Enforce least privilege and deny unknown/ungranted actions. Protect Owner critical permissions and the last active Owner. Apply delegation ceilings to role edits and assignments; a role-management grant must not allow privilege escalation. Reassign active users before deleting/deactivating their custom role, with concurrent assignment checks.

Frontend permission gates control navigation/actions; server checks independently authorize every operation. Reload active membership and effective role permissions after role or account changes; stale sessions cannot preserve revoked grants. See PERMISSIONS.md for exact lifecycle rules.

## Authentication and secrets
Use a maintained authentication provider selected alongside hosting; do not create password cryptography. Support session expiry and revocation, protect credential-reset routes and rate-limit login attempts. Decide MFA availability for administrators during provider selection.
Keep privileged secrets server-side, out of source control, logs and public environment variables. Distinguish intentionally public project identifiers from privileged service credentials. Use secure session cookies and CSRF/origin protections where cookie authentication is used.

## Record and action authorization
Scope queries and mutations to the operating business and actor’s permitted records/actions. Test guessed IDs, exports and attachment routes. Validate role decisions on the server. Where Supabase is chosen, enforce RLS on client-accessible data; if another database is chosen, use equivalent server authorization. Provider-specific policies cannot be finalized yet.

## Financial integrity
Recompute totals on trusted code, use exact decimal handling and atomic posting. Protect invoice numbers and billed-order allocations from concurrency. Persist idempotency outcomes so timeout retries cannot create additional payments.
Use linked reversals/adjustments and reasons rather than destructive edits. Record actors and timestamps, prohibit historical audit modification through normal application operations and keep financial history readable after master-data archival. Customer and subcontractor balances remain independent.

## Attachments and imports
Keep all business documents private by default. Validate object access against parent-record permissions before issuing short-lived downloads. Use unpredictable storage keys, bounded upload sizes and allowlisted types. Verify content signatures where practical; do not trust filename or client MIME alone. Avoid rendering active HTML/SVG as trusted attachments.
Bound spreadsheet row/file limits and parser resource usage. Validate imports server-side and preserve provenance. Neutralize spreadsheet-formula injection in exported text fields. Never execute formulas from uploaded workbooks as application code.

## Application controls
Validate inputs and allowlist sort/filter options. Use parameterized queries or safe query builders; reject user-controlled query operators. Encode untrusted output and sanitize any explicitly supported rich text. Protect mutation endpoints from CSRF as appropriate to the auth mechanism. Set security headers and safe content policies appropriate to the final deployment.
Return useful user errors without stack traces or secret values. Limit expensive reports/exports and repeated upload requests to protect free quotas.

## Logging and privacy
Log action, record ID, actor and result with minimal personal data. Exclude credentials, session tokens, raw CNIC values and private signed URLs. Restrict audit access. Retention, deletion obligations and business record retention require a policy decision; no jurisdiction-specific compliance claim is made.

## Backups and incident handling
Define no-cost encrypted exports, protected storage, retention and a responsible operator. Include database records and an attachment manifest/objects as needed. Test isolated restore and reconciliation before launch.
If credentials leak: revoke/rotate, disable affected sessions, inspect audit history, contain exposure and document impact. If financial inconsistency appears: suspend affected posting, preserve evidence and reconcile before resuming. Do not delete logs or source records to hide an incident.

## Release checks
Validate custom permission sets through direct requests, private downloads, session revocation, secret scanning, dependency review, upload/import abuse cases and recovery. See [TEST_PLAN.md](TEST_PLAN.md). Unresolved provider choice, backup ownership and staff permissions are implementation gates, not completed controls.

## Fuel settlement authorization

Treat branch and central supplier payments as financial posting actions requiring the applicable explicit payment/settlement grants from the catalog, independently of custom role names. Validate supplier, branch, purchase and currency relationships server-side. Users granted fuel purchase entry do not automatically gain settlement authority. Audit allocations and reversals. Direct requests cannot bypass branch scope or allocate another supplier’s payment.

## Company isolation and audit protection

Authorize User + Company/Tenant + Role + Permission + Resource in server services and data policies. Scope reads, mutations, related IDs, private downloads, history, counts and exports to verified membership; never trust a client-supplied company or role. External counterparties do not confer tenant membership. Owner cannot bypass company scope. Independent tenant onboarding/cross-tenant ownership is outside current scope.

[AUDIT.md](AUDIT.md) is the authoritative event/redaction/retention contract. Capture events on trusted code; never persist passwords, tokens, secrets, API keys or other credentials in before/after fields, descriptions or request metadata. Use safe field allowlists and preserve actor/resource history. Audit reading requires `activity_logs.view`; export also requires `activity_logs.export`; record history additionally checks parent access and sensitive fields. Neither ordinary users nor administrators may edit/delete historical events through the application.

Require append-only provider protections, restricted infrastructure access, durable event capture and protected archives/backups before release. Retention periods and exceptional infrastructure disposal remain policy decisions, not application permissions. Test direct API bypass, cross-company IDs, role escalation/revocation, audit tampering and redaction as specified in TEST_PLAN.md. These controls remain unimplemented.
