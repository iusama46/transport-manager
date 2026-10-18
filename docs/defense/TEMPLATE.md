# DEFENSE: [Subsystem]

Required only before shipping a meaningful customer-facing subsystem under [AGENTS](../../AGENTS.md#defense-rule), not every component/small change. Template only: fill actual paths/evidence, reviewer/date/commit/environment, related trace if warranted, and PLANNED/IMPLEMENTED/VERIFIED control status. Complete [PRE_SHIP_CHECKLIST](../PRE_SHIP_CHECKLIST.md); no fake completed brief or runtime claims.

A reviewer must be able to answer:

1. Why did we choose X instead of Y?
2. What happens if an actor behaves maliciously?
3. What data structure/model did we use and why?
4. Where does this fail?

Explain at system/design level; line-by-line memorization is not required. Link authoritative docs and actual evidence instead of copying architecture/runbooks. Label any new alternative comparison honestly rather than inventing history.

## What it does

User-visible behavior, scope and non-goals.

## How it works

Actual entry points/services/repositories/transactions and high-level flow; link FLOW and relevant code/tests.

## Key decisions

Why this design; link DECISIONS and actual trade-offs.

## Alternatives rejected

At least one actual considered alternative and why; distinguish new review comparisons from documented history.

## Important data structures

Model/ownership/access patterns and historical/financial invariants; link DATA_MODEL.

## Trust boundaries

Identity, membership, Company, grant/resource/field, provider and client/server boundaries.

## How it could be abused

Relevant THREAT IDs plus subsystem-specific adversarial paths.

## Controls

PLANNED / IMPLEMENTED / VERIFIED per control with actual code/config/test evidence. Never promote status from design alone.

## Where it fails

Expected FAILURE IDs, partial effects and limits.

## How we detect failure

Actual monitoring/logs/signals and tests; identify pending instrumentation.

## Rollback/recovery

Known-good commit, compatibility/containment, separate data effects and approved operations runbook.

## Known limitations

Residual risks, unverified material assumptions from HANDOVER and release disposition.

## What we would change later

Concrete revisit triggers; no unapproved future scope silently added to V1.
