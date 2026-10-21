# Planned execution flows

Status: **PLANNED business paths**; the current shell has no protected business backend. [ARCHITECTURE.md](ARCHITECTURE.md) owns layers, [SECURITY.md](SECURITY.md) trust boundaries and [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md) provider/session/file/recovery details. These high-level flows do not prescribe unimplemented function names.

## Authenticated API Request

Client → Next.js Route Handler → Authentication → active Membership resolution → Company scope → Permission → Resource/field/relationship authorization → Validation → Service → Repository/Transaction → Audit where required → committed safe Response.

Handlers may reject malformed/oversized transport input early; that never authorizes resource lookup or exposes data. Services repeat authority at all server entry points, including authorized Server Component reads. Reads do not invent financial mutations; safe denial/security events use the separate audit path. Private responses/refresh cookies never enter shared public caches.

## File Upload

Client → API → Auth/RBAC/parent access → validate file/limits → Cloudinary → verified metadata/manifest in PostgreSQL + audit → response.

This is a staged external operation, not a cross-provider database transaction: reserve unavailable pending metadata first, upload/inspect privately, then atomically finalize availability/manifest/audit. A partial failure stays unavailable and is retried/reconciled under A17. No client response alone can declare a file available. Original/history/derivative privacy and explicit permitted deletion remain operations requirements.

## Financial Mutation

Client → API → Auth/RBAC → validation → service → DB transaction → recheck financial invariants under concurrency protection → financial effects + redacted success audit + durable idempotency outcome → commit → response.

Commit failure produces no financial success. A timeout may leave outcome unknown; reauthorize/reconcile the original operation identity instead of creating a fresh payment. Audit durability belongs in the same logical commit, not an unreliable post-response callback. External notifications are outside the financial commit. See DATA_MODEL A01–A17 and AUDIT.

## Future Expo Request

Expo → `/api/v1/*` → verified bearer identity → same membership/Company/permission/resource/business layers → service/repository → safe response.

Expo never gets privileged provider credentials or direct repository access. Native secure token storage/refresh is an adapter concern; no parallel mobile business-rule implementation.

## Maintenance

**Update this document when actual implementation paths exist.** Link entry points/services/tests then; preserve the distinction between intended flow and verified behavior. Relevant [failure](FAILURE.md) and [threat](THREAT.md) entries belong in each subsystem's Defense brief before shipping.

## Implemented persistence foundation — Phase 1.2

Future authorized service → repository receiving `DatabaseContext` → [server-only database adapter](../apps/web/src/server/db/index.ts) → lazy validated Node pool → Supabase shared transaction pooler. Services use `database.withTransaction` and pass the callback context to participating repositories. [Module conventions](../apps/web/src/server/db/README.md) define nesting, safe SQL, decimal strings, error categories and ambiguous commit handling. Synthetic tests verify orchestration; no live DB, business repository, protected workflow or API is implemented. Migration planning stays offline and separate from application runtime; [procedure](../db/migrations/README.md).
