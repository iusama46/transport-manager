# Change rollback and recovery expectations

Status: engineering requirements; no feature rollback or production restore has been exercised by this document. [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md) is the only full recovery runbook; [AGENTS action policy](../AGENTS.md#ai-action-policy) governs authorization. Development Ready does not grant production access.

## Before a high-risk change

Identify a known-good commit and environment/configuration/migration baseline, affected data/provider versions, abort criteria, reversible boundary and verification. Arrange an authorized checkpoint of relevant work before risky edits; never commit unrelated/other people's work. Record the plan in the feature/bug trace. Prepare safe local review/testing first; production effects require explicit authorized human action. No real credential belongs in rollback instructions.

## Change-specific expectations

| Change | Rollback expectation | Required validation / limitation |
|---|---|---|
| Normal code | Review actual diff and revert the coherent commit or restore compatible known-good code through the normal reviewed delivery flow | Run targeted checks and affected path; preserve unrelated edits; no automatic reset/force push |
| Risky feature | Define containment/feature disable path before rollout, known-good commit and forward-fix fallback; do not invent a flag already implemented | Disable only with authorized policy; verify alternate path/data compatibility and retained history |
| Database migration | Explicitly review schema/data effects, old/new code compatibility, backup/restore evidence and forward-fix or rollback sequence before applying | Reverting application code does NOT reverse schema/data. Destructive down-migration is not a default recovery; use isolated rehearsal and approved recovery when necessary |
| Authentication | Preserve secure invite/session/provider configuration baseline; roll back compatible adapter/config or apply forward fix | Never re-enable public signup/revive invalid sessions to restore login. Recheck callbacks/reset/refresh/logout/revocation; key changes may require reauthentication |
| Authorization | Contain affected actions; restore reviewed policy/catalog/service boundary with known-good compatibility | Re-evaluate current memberships/revocations/Owner guard and direct allow/deny/foreign-Company tests. Never restore obsolete grants as an availability shortcut |
| Financial logic | Stop affected posting, preserve original operations/audit and identify bad outcomes; revert compatible logic or forward-fix after human review | Code revert cannot undo posted money. Use authorized linked correction/reversal with reconciled coverage/allocations/accounts; no silent snapshot/ledger/audit rewrite |
| Cloudinary/storage | Retain old object versions/manifests/private delivery policy; reverse compatible configuration or restore/remap originals under approved process | Code rollback cannot recreate deleted bytes. Validate parent/Company/version/checksums and original/derivative privacy; do not expose public URLs as fallback |
| Deployment/configuration | Record deployment ID, known-good code/config and compatible schema; use authorized rollback or forward fix | Validate environment targets/secrets references, HTTPS/auth/cache/dependency health and smoke path. Deployment rollback does not restore DB/Auth/files |

## Recovery approval and evidence

Stop affected writers when rollback could compound incorrect records. Restore only under the operations runbook with deliberate production restoration and cutover approvals, isolated validation, measured loss/time and preserved evidence. Use known-clean backups and independently held keys; never test restores against production. Record incident/change, executor/approver, commit/config/data baseline, commands/outcomes, reconciliations and remaining risks; keep secrets out of the record.

After any rollback, rerun applicable [AI verification gate](TEST_PLAN.md#ai-change-verification-gate), authorized path/negative tests and dependency checks. If compatibility/data effects are unknown, STOP AND ASK with the concrete risk; do not blindly revert or claim a rollback completed.
