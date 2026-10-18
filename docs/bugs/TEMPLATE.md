# BUG: [Name]

Use only for work meeting [AGENTS trace criteria](../../AGENTS.md#featurebug-trace-rule), such as risky or hard-to-reproduce defects; small isolated routine fixes need no trace. Use sanitized synthetic evidence.

## Symptom and impact

Observed versus expected, affected users/security/data/finance and environment/version.

## Reproduction and root cause

Minimal steps/fixtures and evidence-backed cause; explicitly label unresolved hypotheses. Link live assumptions in [HANDOVER](../HANDOVER.md#openunverified-assumptions).

## Fix and recovery

One coherent correction, affected boundaries/data, containment and [rollback](../ROLLBACK.md); relevant decisions only if changed.

## Verification and regression

Actual reproduction/regression commands and results, negative cases/customer path where applicable, failures/skips and checks not run with reasons. Follow [TEST_PLAN](../TEST_PLAN.md#ai-change-verification-gate); never invent a passing test.

## Status and remaining risk

OPEN / INVESTIGATING / FIXED / VERIFIED with evidence; update HANDOVER only if current state changed, and an existing subsystem Defense if affected.
