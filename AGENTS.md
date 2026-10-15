# Transport Manager — AI operating manual

## Required Reading

1. [HANDOVER](docs/HANDOVER.md): current state.
2. [CONSTRAINTS](docs/CONSTRAINTS.md): hard rules.
3. [ARCHITECTURE](docs/ARCHITECTURE.md): V1 boundaries.
4. Task-relevant authorities: DATA_MODEL for data, DECISIONS for choices/alternatives, SECURITY for security, TEST_PLAN for testing and OPERATIONS_ARCHITECTURE for recovery. Do not fork them.

## Before Editing

Understand the requested behavior; inspect relevant implementation, affected invariants, assumptions and working-tree changes. Explain the approach for risky/non-trivial work; prepare a concrete reviewable proposal before unapproved effects. Development Ready v1.0: YES; Production Ready: NO. Neither authorizes production access or out-of-scope work.

## During Editing

One coherent behavior change at a time; split large phases into reviewable steps, not one file per prompt. Preserve architectural boundaries, finalized policies and others' work; avoid unrelated changes. Comments explain WHY, assumptions and invariants. Never weaken tests/security. Clarify genuine policy conflicts or material scope changes.

## After Editing

Inspect the full diff, including new/deleted files. Run applicable verification defined by [TEST_PLAN](docs/TEST_PLAN.md#ai-change-verification-gate) and report actual results: commands, failures/skips, unrun checks with reasons, **Assumptions made** (verified/unverified/disproven) and remaining risks. Never fabricate evidence/model identity.

Update HANDOVER only if state changed; keep [live assumptions](docs/HANDOVER.md#openunverified-assumptions) with evidence/resolution, removing resolved trivia. DECISIONS changes only for a meaningful decision; MEMORY holds durable context, Git detailed history. Normal work needs no fixed set of documentation edits.

## AI Action Policy

**The harder an action is to undo, the stronger the required review.** Classify actual side effects/environment, not tool names. This policy grants no platform permissions.

### SAFE

Within scope: read/search non-secret files, inspect the repository, non-destructive local analysis, scoped normal implementation, formatting, lint, typecheck and local synthetic tests. Inspect scripts for external/real-data effects first; preserve unrelated work.

### REVIEW REQUIRED

Dependency/configuration changes; authentication, authorization/RBAC or financial logic; migrations/database writes; external integrations/hosts; Cloudinary or backup/recovery configuration; file deletion; broad multi-file edits. Review the concrete proposal/diff, effects, verification and reversibility. Human review covers risky auth/payment/security changes before acceptance/shipping or live execution. Existing explicit authorization covers its defined scope; do not ask repeatedly. Safe preparation can continue before an unapproved effect. This task authorizes the specified documentation consolidation/removals only.

### NEVER AUTOMATICALLY EXECUTE

- Production deployment, database access/mutation, restoration, credential access/rotation or asset deletion without explicit authorized human action for that operation/environment. Follow OPERATIONS restore/cutover approvals.
- Force push/history rewrite, deleting unmerged branches or destructive shell operations without explicit reviewed authorization/recovery. Never pipe remote downloads into a shell.
- Unreviewed auth/payment/security effects; disabling tests/security/tenant/audit controls or exposing secrets as a workaround. Stop before unauthorized effects; inherently prohibited bypass/leakage remains prohibited.

## Dependencies and Secrets

Justify new dependencies; prefer suitable existing ones. For security-sensitive changes inspect ownership/maintenance, provenance, advisories/license and install-script risk. npm manifests/lockfile own inventory/version locking: review their diff and affected checks. No manual package ledger or per-package trace. Record significant trade-offs in existing task/decision context; no silent blanket fixes/downgrades.

Never put secret values in Git/docs/AI context/logs, print complete secrets, read `.env` unnecessarily or request pasted credentials. Only reviewed browser-safe configuration may be bundled; privileged Supabase/DB/Cloudinary secrets stay server-only. [ENVIRONMENT](docs/ENVIRONMENT.md) and [OPERATIONS](docs/OPERATIONS_ARCHITECTURE.md) own CI/operations credentials and independent encryption-key custody. Public-prefix validation remains fail-closed until deliberately integrated.

## Feature/Bug Trace Rule

Use a [feature](docs/features/TEMPLATE.md) or [bug](docs/bugs/TEMPLATE.md) trace only for multi-step, high-risk, session-spanning, hard-to-reproduce, financially/security-sensitive or architecturally significant work. Trivial styling/copy, small isolated fixes and routine components need no trace unless those risk criteria apply. Normal work uses its task/diff/completion report.

## Defense Rule

Before shipping a meaningful customer-facing subsystem—especially Auth/RBAC, Orders/Trips, pricing, invoicing, payments, accounts/ledgers, financial reporting or document security—require a current [Defense](docs/defense/TEMPLATE.md) and [PRE_SHIP_CHECKLIST](docs/PRE_SHIP_CHECKLIST.md). Not every component/small change needs one. Explain alternatives, abuse, data and failures with actual evidence/human diff review; no fake completed briefs or line-by-line memorization. These pre-ship gates do not block development.

## Git Hygiene

Coherent commits, intent-based messages, no unrelated staging. Humans review actual diff/evidence, not just AI summaries. Identify a known-good commit/authorized checkpoint before especially risky work where appropriate; preserve others' edits. [ROLLBACK](docs/ROLLBACK.md) distinguishes code rollback from data recovery.

No automatic history rewriting or commit/push without task authorization. Next: **Phase 1 — Trusted Access Foundations**. Do not start it during this documentation task.
