# Activity Log / Audit Trail

Updated: 6 October 2026
Status: Finalized core requirement and design; implementation and validation pending.

## Event contract

AuditLog is an immutable historical event, not an editable business record. Capture where applicable:

| Field | Meaning |
|---|---|
| event ID | Stable unique audit identifier |
| user ID and display-name snapshot | Verified actor and name at the time; system or unauthenticated actor explicitly identified |
| company/tenant ID | Verified operating-company context, distinct from a counterparty ID |
| action and module/resource type | Stable event/action identifiers, including success/failure outcome |
| record/resource ID | Stable affected resource reference |
| description | Human-readable, safely encoded summary |
| previous values, new values, changed fields | Allowlisted and redacted business changes; create has no previous state |
| timestamp | Server-generated instant; UI uses configured business timezone |
| IP address | Derived using trusted proxy configuration, when available |
| session/request information | Non-secret correlation identifiers; never session cookies or bearer tokens |
| device/browser/user agent | Bounded, untrusted metadata where available; never a trusted identity claim |

Failed authentication may have no verified user or company. Store explicit unknown context in a restricted security stream; never trust a supplied tenant ID to route an event into a company's visible log. Missing device/IP data must remain unavailable rather than invented. Historical snapshots survive renaming, deactivation and archival of source records.

## Required coverage

Record login, logout and failed authentication; user creation/activation/deactivation and role assignments; role creation/update/deletion/deactivation and permission changes; order creation/edit/delete/cancel/approval; vehicle/driver and client/company changes; outsourcing; fuel and expense transactions; invoice creation/edit/approval/cancellation; payments, settlements and reversals; import and export operations; important settings changes; and other sensitive financial, operational or security actions. Log denied sensitive operations safely without recording an unauthorized target's private contents. Export events describe scope, actor and outcome, not full exported payloads.

## Trusted capture and durability

The server authenticates and authorizes the operation, loads its scoped previous state, validates the change, derives the actual persisted after-state and a safe diff, and records the business change with its audit event atomically. Use an equivalent durable transaction/outbox design only after provider selection; do not allow a successful sensitive mutation to lose its audit record. Retries use operation/event correlation so a committed operation does not duplicate its success event. Rollback must not leave a false success event. Auth events and denied attempts use a separate durable security-event path with bounded abuse handling; failed logout reporting must not keep a session valid.

Use a central event builder and per-resource field allowlists. Redact before persistence, including nested payloads, descriptions, errors and request metadata. Never retain passwords, tokens, session secrets, API keys, authorization headers or credentials in before/after data or other audit fields. Do not record raw CNIC, private signed URLs or unnecessary personal data. Restricted business changes must be omitted/masked for readers lacking field-level access, even when the event itself is visible.

## Immutability, access and retention

Only the trusted audit writer may append. Normal application identities, including Owner/Super Admin, have no historical update/delete path. The permission catalog contains only `activity_logs.view` and `activity_logs.export`; no audit editing or deletion permissions may be added. Enforce append-only behavior using database privileges/policies appropriate to the selected provider, separate writer/reader capabilities and protected storage/archives. Privileged infrastructure access remains a risk to address through restricted operations, monitoring and tamper detection; do not claim physical immutability before verification.

Global viewing requires `activity_logs.view`, active membership and company scope. Export requires both view and export permissions. Record history additionally requires view access to the parent resource and permitted fields. Apply the same filters/scope to queries, counts, detail views and exports. Audit readers cannot use record history to bypass a revoked resource permission. Audit exports themselves generate events.

Retention duration, archival schedule, responsible operator and any exceptional disposal/legal-hold process remain open (O10/O12). No routine UI/API deletion is provided. Define any retention execution as a separate controlled infrastructure procedure with authorization, integrity verification and its own evidence. Backups and restores must preserve audit relationships, redaction and access restrictions. No legal compliance claim is made.

## Presentation

Use the global Activity Log and reusable record Activity tab specified in DESIGN.md. Display actor snapshot, action, resource reference, timestamp and permitted before/after fields chronologically. Illustrative only: Usama Iftikhar updated ORD-1024, vehicle LEA-1234 → LEA-5678 and rate AED 1,500 → AED 1,650 at 06 Oct 2026, 8:52 PM. This example does not finalize the business currency or timezone.
