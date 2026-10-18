# Pre-ship checklist

This gate applies before a meaningful implemented customer-facing subsystem is accepted for release. It is **not a blocker for starting development**. Development Ready v1.0: YES; Production Ready: NO. A checklist file or AI “tests passed” statement is not evidence or release approval. Use one filled copy/reference in the subsystem trace or Defense brief; no need to edit this master checklist for every release.

- [ ] Subsystem behavior and execution flow can be explained at a high level, with current entry points/data/authority boundaries.
- [ ] Current [Defense brief](defense/TEMPLATE.md) answers all four whiteboard questions; architecture, one actual considered alternative and trade-offs are understood. If none was previously evaluated, review an appropriate alternative now and label it as a new pre-ship comparison, not invented historical evidence.
- [ ] Relevant [threat paths](THREAT.md) and [failure modes](FAILURE.md), residual risks and responsible response are understood.
- [ ] Data structures/access patterns/history/Company relationships follow [DATA_MODEL.md](DATA_MODEL.md); no silent finalized-policy change.
- [ ] A human reviewed the actual full diff, including new files/dependencies/config, not only the AI completion summary. Auth/payment/permission/migration changes received their required review.
- [ ] Applicable [AI Change Verification Gate](TEST_PLAN.md#ai-change-verification-gate) commands actually ran on the final relevant change; results/failures/skips are linked and accepted. Relevant end-to-end/manual customer path was exercised where practical; any inability is explicit and material gaps remain unready to ship.
- [ ] No credentials/private customer files landed in code/docs/logs/artifacts/client/mobile bundles; provider and environment secret boundaries were checked.
- [ ] Dependencies are justified by the reviewed package/lockfile diff under [AGENTS](../AGENTS.md#dependencies-and-secrets); manifests/lockfile own the inventory, not a manual ledger. Current advisory/license review is recorded for affected additions/upgrades.
- [ ] Known-good commit, containment, code/config/schema compatibility and [rollback/recovery](ROLLBACK.md) are recorded and appropriate to this subsystem; data effects are not assumed reversible by code revert.
- [ ] Material UNVERIFIED assumptions in [HANDOVER](HANDOVER.md#openunverified-assumptions) are resolved; WRONG premises corrected with evidence. Remaining limitations/risks are explicit.
- [ ] HANDOVER reflects current operational state; DECISIONS was updated if a meaningful decision changed. No unnecessary churn in unrelated documents.
- [ ] Server authorization was tested through allowed and denied direct requests, including missing/revoked grants/session and resource/field boundaries where applicable.
- [ ] Company/tenant isolation, related IDs/counts/search/files/export and pooled/cache boundaries were tested where applicable.
- [ ] Financial invariants/exact arithmetic/concurrency/idempotency/correction effects were tested where applicable; customer/partner/supplier balances and transfers stay distinct.
- [ ] Required audit behavior/redaction/durability/immutability was verified where applicable, including failure/retry.
- [ ] Applicable storage/Auth/deployment/recovery checks and full-system production gates in FINAL_ARCHITECTURE_AUDIT/OPERATIONS_ARCHITECTURE are met before actual launch; no production authorization inferred from this list.
- [ ] Human reviewer/release owner, evidence links, commit/environment/date and any justified non-applicability are recorded. Material correctness/security/financial failures remain a NO-SHIP result.

Checklist completion describes subsystem readiness only within its tested scope. Production rollout/restoration and other protected effects still require the explicit authorization in [AGENTS action policy](../AGENTS.md#ai-action-policy).
