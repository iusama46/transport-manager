# FEATURE: [Name]

Use only when [AGENTS trace criteria](../../AGENTS.md#featurebug-trace-rule) apply; routine work needs no trace. Keep this record proportional to risk, not a form requiring every field.

## Goal and scope

One-sentence behavior, acceptance criteria and non-goals; request/environment reference.

## Design and risks

Flow/data/contracts, relevant decision IDs, dependency justification if any, security/Company/financial/audit effects and [rollback](../ROLLBACK.md). Link authoritative docs; do not copy them.

## Steps and status

Reviewable slices and actual progress. Distinguish proposed/implemented/verified; record blockers.

## Verification

Actual commands/results/failures/skips and unrun checks with reasons under [TEST_PLAN](../TEST_PLAN.md#ai-change-verification-gate); affected customer path where practical.

## Open assumptions and decisions

Link live material assumptions in [HANDOVER](../HANDOVER.md#openunverified-assumptions); resolve before shipping. Update DECISIONS only for an actual meaningful decision. A subsystem [Defense](../defense/TEMPLATE.md) is needed only when preparing meaningful customer-facing functionality for release.
