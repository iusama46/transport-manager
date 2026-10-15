# B1 recovery architecture closure and readiness reassessment

Reviewed: later 16 October 2026 on `feat/project-setup`. Supersedes the initial same-day blocked final audit retained below.

**B1: CLOSED. Development Ready v1.0: YES. Production Ready: NO.** All original recovery decisions are explicitly selected in the single [authoritative operations recovery specification](OPERATIONS_ARCHITECTURE.md#backup-and-disaster-recovery--authoritative-v1-specification); [FINAL_ARCHITECTURE_AUDIT.md](FINAL_ARCHITECTURE_AUDIT.md) now reports PASS WITH MINOR ACTIONS. No new material architecture/business/security-design blocker was identified. Real account/contact IDs, secrets, pinned tooling and capacity measurement are implementation/production configuration, not unspecified recovery architecture.

## Selected recovery and evidence

Supabase Pro with eligible Small-or-higher compute/seven-day PITR plus explicit application/Auth logical exports from protected private operations GitHub Actions to separate private Cloudflare R2 Standard storage. Three-hour capture replaces proposed six-hour starts to leave completion/retry headroom for independent RPO <=6h. Whole-system RTO <=4h includes validation and human approval. Retention is seven-day frequent, 35-day daily, 400-day monthly complete generations. TLS/age/provider encryption, independent vault/offline decryption custody, separate automation/restore/prune/verifier access and lock-backed retention are selected.

System Owner / Designated Technical Administrator owns investigation/execution/evidence; Owner explicitly approves production restoration and cutover. Better Stack external five-minute checks verify R2 evidence, alert on four-hour staleness/six-hour breach and failed/corrupt/missing artifacts/retention/synchronization. The spec defines coordinated DB/Auth/original file manifests, Auth configuration and fresh-session boundary, controlled Cloudinary remapping, threat model, fifteen-step runbook and monthly integrity/quarterly or on-change full exercises. Full pre-launch recovery must be measured; no test, notification, provisioning or restore was executed.

Verified current official provider/tool documentation linked beside claims in OPERATIONS_ARCHITECTURE.md. Important findings addressed: PITR replaces daily backups, default CLI dump excludes managed Auth/schema data, GitHub scheduled jobs can be dropped, R2 administrator lock removal remains possible, and native Cloudinary S3 backup does not establish R2 compatibility. Use our explicit exporter; never silently omit Auth or trust workflow success alone. RPO/RTO are objectives pending exercises, not advertised provider SLAs.

## Files and change scope

Updated 15 existing Markdown files relative to the incoming working tree: README, OPERATIONS_ARCHITECTURE, FINAL_ARCHITECTURE_AUDIT, ARCHITECTURE, SECURITY, DECISIONS, TASKS, MEMORY, DOCUMENTATION_REVIEW, TEST_PLAN, PRD, DATA_MODEL, ENVIRONMENT, CLIENT_OVERVIEW and DATABASE_BACKEND_SELECTION. Preserved existing uncommitted work and branch. No additional repository file, source/configuration, workflow, schema, dependency, credential, client binary, infrastructure deployment or app feature. Model conceptual sections 2–23 remain unchanged; PRD policy changes are limited to superseded recovery status, not business-rule redesign. D92–D96 and planned T111–T118 record selections/acceptance without runtime claims.

## Verification

Validation **PASS**: 22 Markdown files; 128 local links/anchors with zero broken targets; consistent Markdown table widths; 96 unique decision and 118 planned test definitions; E44/V15/R4/I44/A17 and selection P20/A17 coverage intact. Model conceptual sections 2–23 are byte-for-byte unchanged from the incoming tree; FR-01–FR-19 bodies remain unchanged except superseded recovery status in FR-19. Changes against the incoming tree are exactly the 15 Markdown files above, no new repository files. `git diff --check` passed.

Safe secret scan: 103 current tracked/untracked nonignored files and 221 reachable Git-history blobs across local refs, including PPTX XML. No recognizable private/provider/age key, JWT/service-role token, credential-bearing URL or quoted secret-assignment candidates; no current/reachable-history actual env paths. Both templates remain comment-only and recursive env ignores passed. This heuristic does not fully cover compressed PDF/image contents, ignored local data, unreachable/remote-only history or external accounts. No full secrets/values were printed and no live credentials were used.

Contextual stale-decision search found remaining BLOCKED/NO/open-recovery wording only in expressly superseded historical milestones, the original resolved B1 finding or dated feasibility inputs. Active statuses/selection references now say B1 CLOSED and Development Ready YES. GitHub delay/Cloudinary/R2/Auth caveats have selected mitigations; they are production verification risks, not hidden unresolved architecture. No Markdown linter is configured and Prettier excludes Markdown. No source/configuration changed, so runtime lint/typecheck/build/feature tests were not rerun. All recovery tests remain explicitly planned and unexecuted.

## Exact next phase

After separate user authorization: **isolated development infrastructure and trusted access foundation** — server-only validated provider/configuration boundaries, Company/User/Membership/protected Owner provisioning, invite-only Auth/session recovery/revocation, central service authorization and transactional redacted audit; prove a protected read with isolation/revocation/Owner/bundle checks. Master records precede Orders/Trips and financial modules. Do not start implementation automatically.

---

## Historical initial final audit — before B1 closure

Reviewed: 16 October 2026 on `feat/project-setup`.

**Audit verdict: BLOCKED. Development Ready v1.0: NO.** The [final audit](FINAL_ARCHITECTURE_AUDIT.md) contains all requested status sections, cross-document business/model/concurrency traceability, contradictions, severity findings, production gates and the dependency-ordered first implementation phase. [OPERATIONS_ARCHITECTURE.md](OPERATIONS_ARCHITECTURE.md) consolidates selected-provider authentication, document security, environment/deployment and recovery requirements.

One material architecture gap remains, **B1**: select a complete coordinated Supabase PostgreSQL/Auth + Cloudinary recovery design (durable runner, independent encrypted destination, capture cadence/retention, key custody, RPO/RTO, responsible operator, monitoring/escalation and restore drill interval/cutoff strategy). Existing docs had requirements/candidates, not finalized recovery decisions. No demand is made to run a production restore before development; implemented measured restoration remains a production launch gate. Exact tooling names, schemas/indexes/precision, pagination defaults and runtime tests for not-yet-implemented features do not independently block development.

## Current selections and corrections

Next.js/TypeScript full-stack REST `/api/v1/*` with thin handlers → authorized portable services/repositories → Supabase PostgreSQL. Supabase Auth identifies invite-only users; application membership/RBAC/resources authorize them. Cloudinary stores private document bytes in development/production; PostgreSQL stores metadata/manifests. Vercel supports the selected direction with appropriate paid production acceptable. D87–D91 supersede stale provider/$0/next-phase claims. No finalized business/model policy was changed.

Corrected active unselected-auth/storage statements, free-only production AC-18/T18, Hobby-as-blocker wording, model/phase status and stale SearchableSelect rich/multi implementation task. Added explicit provider session/revocation/cache safeguards, protected bootstrap reconciliation, Cloudinary original/derivative privacy and expiring delivery, server-mediated bounded upload/object lifecycle, three-environment isolation and REST error/paging/idempotency/rate contracts. T102–T110 are planned acceptance additions, not executed tests. Historical dated milestones below and client PDF/PPT remain explicitly superseded snapshots.

## Scope and current verification

All 20 incoming repository Markdown files and relevant source/configuration were inspected; the exact inventory/scope is in FINAL_ARCHITECTURE_AUDIT.md. Two Markdown documents were created; 13 existing Markdown files updated. Incoming uncommitted documentation edits and the untracked selection document were preserved; branch unchanged. No source, config, package/lockfile, schema, endpoint, binary or deployment changed. No runtime tests/build/security/restore exercise is claimed.

Secret review of 101 incoming current files and 206 reachable history blobs found no recognizable credential candidates or committed actual env paths. Templates remain comments only. Scan limits (including compressed PDF/image data, ignored files and external accounts) are recorded in the final audit; no complete secret values were printed. Historical dependency audit counts are not current vulnerability verification.

Final validation: **PASS** — 22 Markdown files; 123 local links/anchors with no broken targets; consistent table widths; 91 unique decision definitions and 110 unique planned test definitions; E44/V15/R4/I44/A17 and selection P20/A17 coverage intact. Model sections 2–23 are byte-for-byte unchanged from the incoming working tree. FR-01–FR-19 bodies are unchanged except the explicitly superseded provider-status sentence in FR-19; AC-18/T18 follow the authorized paid-production direction. Final scan of all 103 current nonignored files found no recognizable credential candidates or current/reachable-history actual env paths; recursive env ignores passed. Contextual stale-term hits are prohibitions, actual B1/implementation work or explicitly dated superseded history. All task changes are Markdown only and `git diff --check` passed. Markdown is excluded by Prettier and no Markdown linter is configured. Lint/typecheck/runtime tests were not run for this Markdown-only audit.

## Next action

Close B1 and reassess readiness. After readiness and separate implementation authorization, first implement isolated development infrastructure + trusted access/Owner/RBAC/audit foundation, proving a protected read and direct denial/revocation/concurrency/bundle boundaries, then master data → Orders/Trips → rates/costs → billing/payments/reports. Do not begin business modules in this audit.

---

## Historical clarified V1 backend-framework review

Reviewed: later 12 October 2026 on `feat/project-setup`. This supersedes the initial same-day separate NestJS selection (D80); historical selection/model review evidence is retained below. Selection remains documentation only; no business API/backend/schema/credential or deployment implementation.

## Current decision

Next.js + TypeScript full-stack provides Web Dashboard and versioned REST Route Handlers at `/api/v1/*`. Thin transport adapters call modular authorized server-side services/repositories; domain/services use framework-independent inputs/results/context/transaction ports for later justified NestJS extraction. Supabase PostgreSQL development selection and Drizzle recommendation are retained. Vercel is the hosting direction with $0 testing target subject to plan/eligibility; no paid plan/deployment is authorized. Auth/private storage/full recovery and deployment configuration remain next-phase work.

The reasoning is one application/deployment using the existing stack, without a second API runtime/host/network boundary. It preserves financial/RLS/idempotency/audit responsibilities; it does not move business logic into handlers. Server Components can use the same authorized read service directly, while browser/Expo use the public REST contract. Server Actions do not replace the mobile API.

## Changes and evidence

Updated the same selection document and ten companion Markdown files (README, ARCHITECTURE, PRD, DECISIONS, TASKS, MEMORY, ENVIRONMENT, SECURITY, CLIENT_OVERVIEW, DOCUMENTATION_REVIEW). D84 explicitly supersedes D80; D85 records Vercel direction and eligibility gate; D86 records portable service boundaries. No apps/api/NestJS service is planned for V1. DATA_MODEL.md, functional-requirement bodies, V1/V2 and Owner policies remain unchanged; the working-tree scope remains ten modified + one new selection Markdown file relative to HEAD.

Official Next.js Route Handler/server-only/backend guidance and Vercel Hobby/runtime/pooling/cron documentation were checked. Current Hobby terms are personal/non-commercial only; business testing is not automatically eligible for free hosting. Current Fluid Compute Hobby function duration is 300 seconds and request/response body limit is 4.5 MB; those are outer limits, not financial transaction budgets. Each Hobby cron job is daily-only; a single daily job is not the multiple-daily backup requirement, and any multi-job/external pipeline still needs independent validation. Framework selection does not prove a compliant $0 recovery architecture.

Selected serverless runtime implications: Node.js pg APIs, bounded per-instance pools, transaction-local tenant context, durable idempotency and same-transaction audit across instances/timeouts; private response cache isolation, preview/data/secret boundaries and authorized direct object upload/delivery for larger files. No in-memory lock/process timer/post-response work may replace a financial commit boundary. These are architecture requirements, not passing runtime tests.

## Validation and next phase

Check all local Markdown links/anchors/table widths, decision uniqueness and P01–P20/A01–A17 coverage; verify model equality and unchanged functional/V1-V2/Owner policies; review remaining NestJS references as deferred/superseded history only; run git diff --check. Validation passed: 20 Markdown files, 97 valid local links/anchors, consistent table widths, 86 unique decision definitions and complete P01–P20/A01–A17 mappings. DATA_MODEL.md equals HEAD byte-for-byte; all PRD functional-requirement bodies, V1/V2 and Owner policy match HEAD. Remaining NestJS references describe superseded history or deferred extraction. Scope is ten modified + one new Markdown file only; git diff --check passed. No code/package/schema or deployment changes; no runtime test/backup/restore claim. Exact next phase remains AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE in a separate authorized task, followed by audit/readiness assessment/implementation; Development Ready v1.0 is not declared.

## Historical initial database/backend selection review — 12 October 2026

Reviewed: 12 October 2026 on `feat/project-setup`, starting from commit `d01b3ae`. This current outcome supersedes earlier phase/provider-status statements for development only. Historical conceptual/business review evidence is preserved below. Domain model and finalized business policies are unchanged; production decisions remain open.

### 1. Files created

[DATABASE_BACKEND_SELECTION.md](DATABASE_BACKEND_SELECTION.md): executive status distinction, alternatives, P01–P20 native/application/infrastructure mapping, A01–A17 concurrency strategy, current official Supabase limits/restore guidance, NestJS/DTO ownership, Prisma/Drizzle comparison, security, quantified growth, backup feasibility/blocker, migration/portability and next-phase inputs.

Reviewed the 11 prioritized documents (DATA_MODEL, PRD, ARCHITECTURE, DECISIONS, SECURITY, PERMISSIONS, AUDIT, TEST_PLAN, TASKS, MEMORY, ENVIRONMENT), README/current review and relevant client overview/code-shell context. Supabase/PostgreSQL/NestJS/Prisma/Drizzle/node-postgres/GitHub operational facts use linked official documentation checked on 12 October. No live project/account/database inspection was performed.

### 2. Files modified

10 existing Markdown files: ARCHITECTURE.md, DECISIONS.md, TASKS.md, MEMORY.md, DOCUMENTATION_REVIEW.md and README.md; plus PRD.md (technology/status only), SECURITY.md, ENVIRONMENT.md and CLIENT_OVERVIEW.md to remove active conflicting unselected-DB/frontend-backend/provider assumptions. No business requirement/policy is changed. DATA_MODEL.md is byte-for-byte unchanged. No package/lockfile, code, schema, credential/template, workflow, binary or deployment change.

### 3. Final technology decision

Selected by explicit user instruction: PostgreSQL on Supabase Free for development/testing, NestJS/TypeScript, existing Next.js frontend, versioned REST and DTO-based server validation. NestJS owns business rules, tenant/resource authorization, financial calculations and transaction/audit orchestration. Web/server rendering/mobile call these APIs and cannot bypass NestJS through protected direct DB/generated Supabase endpoints. Development begins with local processes and no selected paid service. D79/D80 finalize development selection only.

### 4. ORM recommendation

Drizzle ORM with node-postgres is recommended, unapproved/unimplemented (D81), for explicit SQL/native PostgreSQL concurrency/reporting/migration behavior and portability. Prisma is viable with convenient decimal/client ergonomics, but native features still need reviewed migrations. Exact decimal runtime/string DTO/JSON and pinned supported release/driver compatibility must be reviewed before adoption; no money conversion to JS number, no prerelease package installation inferred from docs.

### 5. Supabase Free limitations

Verified official limits: 500 MB DB with read-only quota behavior; shared Nano compute; 1 GB object storage/50 MB upload (private storage not selected); 5 GB uncached plus independent 5 GB cached egress; Nano 60 direct DB connections/200 pooler clients, not 200 parallel server connections; low-activity pausing, two active projects, community support/no uptime SLA. No managed automatic DB backups/PITR. Current pause documentation states a one-year Studio restore window, superseding legacy 90-day guidance; pause recovery is not compliant multiple-daily independent backup.

Planning assumptions, not measured schema: 24 business/history/manifest rows + 12 audit/operation rows, indexes/overhead, 80 KiB retained growth per transaction with 40–160 KiB sensitivity and 50 MB baseline. At 500/1,000/5,000 monthly transactions, base DB growth is 40.96/81.92/409.60 MB per month. All assumption/formula/sensitivity values and file/backup bandwidth estimates are in the selection document; small transaction volume does not establish indefinite Free feasibility.

### 6. Outstanding technical decisions

Authentication/session/transport/MFA/revocation and Owner bootstrap; private file provider/access/object versions; Next.js/NestJS production hosting/network/TLS/pools; production DB plan/host/capacity; backup scheduler/store/encryption keys/operator/retention/RPO/RTO/monitoring and demonstrated full restore; ORM adoption/version/exact-decimal layer; physical constraints/RLS/native audit/numbering/idempotency/migrations. No auth/storage/production provider is silently selected by Supabase DB choice.

### 7. Unresolved risks and mandatory production gate

Supabase Free is approved for development/testing only. No compliant $0 production recovery/hosting/storage architecture is established or tested (D82). V1 still demands multiple automated backups daily, restricted secure independent copies and documented successful isolated restoration of data, financial/audit history and private object bytes before production. Daily-only backups, manually available exports, code commits or pause recovery do not satisfy it. Candidate operator/CI/off-site/paid alternatives remain evaluation inputs; paid services require separate approval. Growth/egress/pausing, scheduler reliability, backend-credential/RLS trust, concurrency, decimal precision, object consistency and ORM version compatibility remain validation risks.

### 8. Exact next phase

**AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE**, in a separate authorized task; do not start it automatically. Then FINAL ARCHITECTURE AUDIT → assessment of DEVELOPMENT READY V1.0 → authorized IMPLEMENTATION. Selection does not create a backend/database or declare readiness. V1/V2 boundaries, Company isolation, same-currency invoice allocations, warning-only expiry, immutable corrections/audit and all 44 model invariants remain unchanged.

### Documentation validation

Validate local links/anchors, table structure, P01–P20 and A01–A17 coverage, decision uniqueness, conceptual-model equality, unchanged business-requirement sections, growth arithmetic, scoped current/historical provider statements and Markdown-only change scope; run git diff --check. Checks passed: 20 Markdown files and 95 local links/anchors with zero broken targets; consistent Markdown table columns; P01–P20/A01–A17 complete unique mapping; 83 unique decision definitions; growth arithmetic verified; 10 modified + 1 new Markdown file only. DATA_MODEL.md equals HEAD byte-for-byte (SHA256 00e276f42802c1c1aef95e36a648acd3a2fd0575d6f5ccebe72320574759c6be); all PRD functional-requirement bodies, V1/V2 scope and Owner policy match HEAD. git diff --check passed. Remaining unselected-provider statements are scoped production decisions or explicitly dated superseded history. No runtime/concurrency/load/backup/restore test, deployment or application implementation was performed.

## Historical conceptual data model review — 10 October 2026

Reviewed: 10 October 2026 on `feat/project-setup`, starting from commit `dda79c4`. This report's current outcome supersedes the 9 October pre-model phase status; the earlier report is preserved below as historical evidence. Documentation only: no provider/schema/API/business implementation, deployment or runtime acceptance test.

### 1. Files reviewed

Required documents read: README.md and docs/PRD.md, ARCHITECTURE.md, DECISIONS.md, PERMISSIONS.md, AUDIT.md, SECURITY.md, TEST_PLAN.md, DESIGN.md, COMPONENTS.md, TASKS.md, MEMORY.md and DOCUMENTATION_REVIEW.md (13). Also reviewed the new DATA_MODEL.md and contextual client-overview/remaining Markdown contradiction searches. Relevant code inspected: packages/shared/src/index.ts; web placeholder/navigation/routes; quantity/money/number/form contracts; SearchableSelect types/loader/showcase. Existing code is UI/synthetic shell, with no business entity schema to preserve. No applicable repository/ancestor AGENTS.md was found in the checked locations.

### 2. Files created

[DATA_MODEL.md](DATA_MODEL.md), the authoritative provider-independent V1 model, including scope/authority, exact inventory, entity ownership/lifecycles, cardinalities, snapshot matrix, invariants, atomic boundaries, query pressure, simplification, requirement traceability and Database Selection Requirements.

### 3. Files modified

Eight existing Markdown files: ARCHITECTURE.md, DECISIONS.md, TASKS.md, MEMORY.md, DOCUMENTATION_REVIEW.md, plus README.md, PRD.md and CLIENT_OVERVIEW.md. The last three receive minimal current phase/status/link corrections because “conceptual review next” would now contradict the completed review. Historical dated milestones are preserved. No other Markdown, application/package/lockfile, binary snapshot or configuration changes are made by this task.

### 4. Final entity/concept count

63 named V1 responsibilities: **44 entities/associations/owned-history concepts, 15 values/configuration/catalog concepts, 4 derived views**. E01–E44/V01–V15/R01–R04 are unique catalog definitions. These are not 63 planned tables/collections. Aliases (ContactEntity/BusinessParty, Assignment/DriverVehicleAssignmentHistory, MaintenanceExpense/Expense-owned detail), diagram shorthand and V2 imports are not counted twice.

### 5. Major relationships

Company owns business resources; User connects through Membership with one active assigned same-company Role. Role grants known catalog Permissions. Tenant-local BusinessParty reuses narrow role profiles; Factory/Client eligibility is nonexclusive and ConsigneeRelationship is Client-specific. Order has potential receivers via OrderConsignee and 0..N recorded Trips; resolved Trip has one actual eligible receiver. Trip preserves sequential assignments and can have several partial InvoiceLines over time. Invoice owns retained versions/lines and original-linked notes. Payment owns multiple compatible allocations; direct Expense disbursement can explicitly retain an unrecorded payee without creating a fake supplier/receivable ledger; Expense owns reconciling Trip shares. FuelSupplier owns branches; accounts own posted movements. Precise lifecycle-qualified cardinalities are in DATA_MODEL section 18.

### 6. Historical snapshots required

DATA_MODEL section 17 covers 15 snapshot groups: Order commercial context; Trip assignment/receiver/owner/affiliation; original/normalized measurements/conversion/shortage; calculated or Manual Total pricing; adjustments and partner obligations; invoice debtor/line/coverage/tax/FX; note/replacement changes; payment/account/allocation context; fuel prices/totals; expense/maintenance/share history; private document evidence; safe actor/resource audit display. Live stable references remain for traceability and permission checks, never today's mutable historical values.

### 7. Financial invariants

Separate gross/adjusted receivable, covered Trip charges, partner cost, supplier/workshop obligation and cash effects. Concurrent billing/allocation cannot exceed remaining entitlement/credit/outstanding. Invoice-only discounts do not reopen covered charges. Issued history retains versions/notes and one effective economic change; refunds alone do not cancel revenue/coverage. V1 invoice allocations—including later advances/reallocation—require identical invoice/payment currency. Payment allocation moves no cash; own-account transfer is neither revenue nor expense. Shared shares reconcile exactly; invoice-date revenue and payment-date cash remain distinct.

### 8. Tenant/security invariants

Exactly one verified Company per business resource/history; all typed links validate same-company ownership. External parties never imply membership. Server-side User/Membership/Role/Permission/Resource checks apply to lookup/counts/history/files/export as well as writes. Owner is immutable system Role classification with protected active Membership lifecycle, not custom grants/name; one active Owner always remains. Delegation/reassignment/revocation guards remain. Audit is redacted before persistence, snapshots safe actor/resource display, and is not editable by normal users/Owner. No new permission keys or auth policy changes.

### 9. Atomic operations identified

17 logical groups A01–A17: Order eligibility/Trip contribution; Trip snapshot/financial lock; rate interval conflict; invoice lines/coverage/number/audit; Trip correction/reissue/notes/allocations; payment/allocation/account post/correction; credit reallocation; partner settlement; supplier/branch settlement; immediate expense/fuel cash settlement; shared-expense version; paired transfer; Owner lifecycle; custom-role/reassignment/revocation; numbering; durable mutation/audit; staged document manifest/object integrity. Provider mechanisms remain open.

### 10. High-pressure query patterns

Orders/progress, Trip assignment/date/receiver, billable coverage, party receivable/aging/credit, partner/supplier/branch/workshop payable, invoice-date Trip/vehicle profitability, fuel quantity/cost rankings, expense/context/maintenance shares, effective-date rate specificity, account reconciliation, expiry reminders, Activity Log and bounded dashboard/export/recovery queries. Scope/counts/pagination and original/base currencies must stay coherent.

### 11. Over-modeling removed

Avoid separate duplicate party identity per role, permanent driver/vehicle history duplicates, separately posted MaintenanceExpense cost, editable ledger totals, independent full-accounting engine, universal arbitrary party/document/context framework, freely editable parallel Owner flag and premature V2 import/workflow/notification entities. Rates/adjustments/stops/tax/FX/maintenance details are owned configuration/values where appropriate. “Removed” means rejected conceptual duplication, not code/schema deletion.

### 12. Under-modeling corrected

Explicit role/eligibility associations, potential versus actual receiver, four quantity meanings and conversion evidence, two pricing modes, rate candidate/interval semantics, charge coverage versus receivable, owned invoice versions/effective correction lineage, typed payment targets and one source per movement, reconciling expense versions, assignment/owner/affiliation history, document parent/file ownership, protected Owner membership and safe audit resource snapshots.

### 13. Contradictions found and fixed

Architecture's inventory lacked enough cardinality/history/ownership detail to serve as a finalized model; replaced it with authoritative DATA_MODEL references. The active current phase/status references said conceptual review was next; corrected them to completed/FINALIZED and database/backend selection next. ContactEntity/party naming and Assignment/DriverVehicleAssignmentHistory/MaintenanceExpense counts are clarified without duplicate concepts. No finalized business policy was changed. Searches verify forbidden patterns are prohibitions, rejected alternatives, UI-only examples or preserved dated history, not active contradictory rules.

### 14. Remaining conceptual-model questions

None material identified. Nonexclusive Factory/Client links avoid an unstated restriction; receiver identity remains reusable with Client-specific eligibility. Unknown outsourced/draft details remain explicit. Exact rule values/state-field enforcement, physical representation, non-invoice transfer enablement and legal eligibility are later configuration/technical review under fixed invariants, not guessed new policies.

### 15. Remaining business-policy questions

None material identified. Business identity/base currency/timezone/language, actual grants/agreement values, branding/numbering/compliance applicability, operator/recovery targets and formal legal retention remain launch configuration/compliance work. Ambiguous legacy source facts require data verification rather than a new global policy.

### 16. Finalization status

**Conceptual Data Model: FINALIZED.** Business Requirements/Policies remain Finalized. Technical Architecture Providers remain Open. Business implementation remains not started beyond existing UI/environment shell. Development Ready v1.0 is not declared.

### 17. Potential physical-schema impact

No unresolved conceptual issue currently requires changing entity ownership, cardinality, financial relationships, snapshots, authorization or core workflows. Physical embedding/splitting/decimal/index/transaction strategies are still open and must preserve the logical model. This does not promise a migration-free future or approve physical schema; new model-changing requirements require explicit review.

### 18. Database-selection requirements

Prove atomic operations/concurrent bounds, typed tenant relationships, rate intervals/specificity, exact quantities/money/FX, unique numbering/idempotency, revocation/Owner protection, immutable/durable redacted history, effective financial reporting, scoped pagination/export, private file/manifest lifecycle and secure multiple-daily backups with tested full restore. Later verify current commercial $0 tier limits/runtime fit and future mobile API support. DATA_MODEL section 24 is the evaluation input.

### 19. Provider and implementation confirmation

NO database/backend/auth/storage/hosting provider was selected or recommended. NO SQL tables, MongoDB collections, Prisma/Drizzle schema, repositories, APIs or business features were created. No runtime tests/builds/deployments or recovery exercise were performed in this documentation task. Existing client PDF/PPT remain historical; current Markdown status does not regenerate those binaries.

### 20. Exact next phase and verification

**DATABASE / BACKEND SELECTION**, followed by AUTH / STORAGE / HOSTING / BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → assessment of DEVELOPMENT READY V1.0 → authorized IMPLEMENTATION.

Documentation validation: catalog/invariant/atomic ID counts and uniqueness, requirement/test/decision references, Markdown local links/anchors and table consistency, contextual repository contradiction searches, git diff --check and Markdown-only changed-file scope are checked. Validation passed: 19 repository Markdown files, 77 local links/anchors with zero broken targets; all Markdown table column counts consistent; E44/V15/R4/I44/A17 unique sequential definitions; 78 unique decision definitions and new requirement/test/decision references within their defined catalogs; exactly eight modified and one new Markdown file, no code/schema/package/binary changes; git diff --check passed. Numeric walkthroughs in DATA_MODEL section 23 are conceptual review evidence, not passing runtime tests.

## Historical business-policy review — 9 October 2026

Reviewed: 9 October 2026. This report supersedes the earlier capability-reconciliation report’s open business-policy gates. Documentation only: no application code, physical schema, provider selection, deployment or client PDF/PPT regeneration; no runtime tests executed.

### 1. Files reviewed

All 18 repository Markdown files: README.md; docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md, ENVIRONMENT.md; apps/web/README.md, apps/mobile/README.md, packages/shared/README.md. The supplied final-policy request was read in full. No applicable AGENTS.md was found in the repository/ancestor locations checked.

### 2. Files modified

14 Markdown files: README.md and docs/DOCUMENTATION_REVIEW.md, PRD.md, ARCHITECTURE.md, DESIGN.md, SECURITY.md, TEST_PLAN.md, DECISIONS.md, MEMORY.md, TASKS.md, PERMISSIONS.md, AUDIT.md, COMPONENTS.md, CLIENT_OVERVIEW.md. ENVIRONMENT.md and the three workspace READMEs required no policy changes. Historical client PDF/PPT and implementation files remain unchanged.

### 3. Open policy decisions closed

DECISIONS.md preserves original questions and marks O02–O06 and O13–O18 CLOSED as business-policy gates, tracing final decisions D51–D69. O03’s source figures remain illustrative rather than verification of historical cash direction; explicit configured obligations/payment direction resolves the product-policy gate. O10’s recovery minimum and O12’s retention default are FINALIZED, retaining infrastructure/compliance details. Owner business lifecycle/transfer is finalized; provider provisioning remains open. O01/O09 technical choices and O07/O08/O11 company configuration are not silently closed.

### 4. Permissions added/changed

14 new V1 keys, bringing the catalog from 231 to 245 unique keys:

- orders.complete; trips.manual_price; trips.adjust_charges.
- invoices.adjust_charges; invoices.correct; invoices.reissue.
- expenses.allocate; owners.transfer.
- deduction_categories.view/create/edit/delete/archive/reactivate (six distinct keys).

Existing orders.reopen, trips.correct/override_rate, rates.view/create/edit, credit_notes.create/issue and debit_notes.create/issue are reused with clarified semantics. orders.edit covers mutable Bill To/agreement settings; settings.edit covers rounding/conversion configuration. customer_ledger keeps its existing namespace while covering the explicitly selected supported Bill To debtor. No duplicate note/ledger permissions or audit mutation grants were introduced. Authorization remains server-side, company/resource scoped, with Owner protection, lifecycle and financial invariants independent of grants.

### 5. Test cases added/changed

Added planned, unexecuted T61–T81: all four Bill To types/debtor ownership; fixed/percentage/multiple deductions; both multi-consignee workflows; discounts/rounding/gross history; same-currency success/cross-currency rejection; original kg↔ton conversion; both remaining bases; all three shortage effects; specific-rate recommendation/authorized valid alternative/denied override; interval conflicts/different conditions; both pricing modes/provisional-final snapshot/no fake unit rate; manual completion preserving unfinished Trips/denial/audit; correction/reissue/Credit/Debit Notes/history; invoice-date revenue/no later receipt revenue; all four shared allocation methods/reconciliation/profitability; expiry warnings/assignment/no blocking; last-Owner guard/transfer/audit; no automatic historical purge; multiple backups/day and documented pre-launch tested restore; explicit permitted document deletion/audit.

Updated T13 and T38–T60 to remove answered business-policy blockers and use configured fixtures; earlier cases remain required. Provider-backed execution is still pending. No runtime tests are marked passing.

### 6. V1 scope changes

Finalized policies specify explicit configurable Bill To; extensible fixed/percentage commissions/deductions; separate receiver Orders or multiple potential Order Consignees with actual Trip receiver snapshots; discounts/configured rounding preserving gross; same-currency invoice settlement within overall multi-currency; compatible original/normalized quantity conversion; configurable shortage and Loaded/Delivered remaining basis; most-specific valid recommendation and exact-condition rate-overlap rejection; calculated-rate/manual-total pricing; manual Order completion with unfinished Trips; controlled correction/reissue or original-linked notes; Invoice Date management revenue; equal/quantity/manual amount/manual percentage shared expense allocation; expiry warnings only; protected Owner setup/transfer/always-active safeguard; retention-by-default; multiple daily automatic backups and documented restore tested before production. Other finalized V1 capabilities are preserved.

### 7. V2/Future changes

Explicitly defer configurable document-expiry assignment blocking by document type and cross-currency invoice settlement/allocation if pursued. Preserve controlled bulk Excel/CSV import and configurable/manual approvals, later Expo/mobile and dark mode, plus GPS/offline sync/dispatch/portals/payroll/full accounting/bank integrations/messaging/independent tenant onboarding as previously deferred proposals requiring separate scope approval.

### 8. Contradictions found/fixed

| Previous active ambiguity or gate | Consistent final documentation |
|---|---|
| Bill debtor and commission rules awaiting confirmation; Customer Ledger implied only Clients | Explicit supported Bill To owns debt; operational parties remain separate; configurable charges and ledger namespace clarified |
| Singular Order Consignee and linkage policy open | Multiple potential receivers allowed, actual Trip receiver/destination historical; separate Orders also valid |
| Conversion, remaining basis and shortage policy open | Original/normalized compatible units, configured Loaded/Delivered remaining and three agreement shortage effects |
| Rate precedence/intervals/snapshot timing unresolved; all Trip snapshots assumed a rate | Most-specific recommendation, alternative valid match, exact-condition overlap rejection, provisional-date handling; Manual Total has no fabricated rate |
| Discounts/rounding/FX allocation still an unresolved V1 policy | Preserved gross/adjustments; same-currency V1 invoice allocation, cross-currency deferred |
| Completion aggregation and correction/rebilling gates open | Manual completion with warning/unchanged Trips; controlled versioned correction/reissue or linked notes and effective billing/ledger reconciliation |
| Revenue/shared-cost attribution unresolved | Invoice-date management revenue, payment separate; four reconciled allocation methods and general-cost exclusion |
| Expiry assignment policy open | V1 warning only, blocking V2/Future |
| Owner transfer/business retention still open | Protected eligible Owner transfer/last-active guard; retention-by-default, no automatic historical purge |
| Readiness report/memory/tasks still required answered policy approval | Business requirements/policies Finalized; next conceptual review; technical/configuration/compliance work distinguished |

Other forbidden contradiction patterns (Factory always pays, gross overwritten, arbitrary unauthorized rate, silent issued-history rewrite, payment-date revenue, automatic Trip completion/cancellation, Owner self-removal or automatic historical purging) were absent or already prohibited; explicit final safeguards and tests now make them reviewable. Multiple daily backups already existed; the pre-production documented/tested restore gate is reinforced. Earlier dated implementation/test evidence is retained as history, not current verification.

### 9. Remaining business requirement gaps

No material business-policy gaps remain. Company identity/base currency/timezone/languages, actual staff grants and exact bill branding/template remain configuration work. Formal jurisdiction-specific invoice/retention obligations require compliance review; no statutory certification or invented retention period is claimed. Source spreadsheet interpretation is data verification, not a missing global policy.

### 10. Remaining technical decisions

OPEN: database/backend technology; authentication provider/implementation; private object/file storage provider; hosting/deployment provider; exact backup schedule/provider/mechanism/retention and recovery operations/targets; provider-specific Owner provisioning; transaction/outbox implementation; append-only audit enforcement; physical decimal/FX representation; provider-specific export/file handling. Preserve the $0 constraint and evaluate feasibility later. Non-invoice account conversion mechanics, future import commit and notification adapters remain technical/deferred work, without permitting V1 cross-currency invoice settlement.

### 11. Internal consistency

Yes: the business requirements and policies are internally consistent across the reviewed Markdown documentation. Financial/operational roles and dates, gross/net amounts, original/converted quantities, Order/Trip states, V1/V2 and requirement/implementation status remain distinct. No providers are finalized by this conclusion.

### 12. Finalization status

| Area | Status |
|---|---|
| Business Requirements | Finalized |
| Business Policies | Finalized |
| Conceptual Data Model | Next — final review not completed |
| Technical Architecture Providers | Open |
| Implementation | Not Started for business workflows / existing shell only |
| Runtime acceptance/recovery tests | Planned, unexecuted by this task |
| Development Ready v1.0 | Not declared |

### 13. Final conceptual data model readiness

Ready for FINAL CONCEPTUAL DATA MODEL REVIEW. Required sequence: FINAL CONCEPTUAL DATA MODEL REVIEW → DATABASE/BACKEND SELECTION → AUTH/STORAGE/HOSTING/BACKUP ARCHITECTURE → FINAL ARCHITECTURE AUDIT → DEVELOPMENT READY V1.0 → IMPLEMENTATION. Later provider/launch work must prove secure authorization, atomic financial/audit behavior, $0 feasibility and tested restore.

### 14. Material model/workflow issues and verification

No remaining unresolved business issue is identified that requires a different schema, financial model, authorization model or core workflow policy. The next conceptual review must validate party/consignee relationships, quantity/pricing/adjustment/allocation snapshots, exact rate conditions and ambiguity resolution, protected ownership, state/field locks and effective correction/rebilling balances against the finalized rules. Physical modeling, concurrency and provider feasibility remain open review work; this report does not approve a schema.

Documentation verification: all 18 Markdown files checked for local links; zero broken local links. Unique requirement/acceptance/decision/test definitions and 245 permission keys checked; all required sensitive actions present, no duplicate semantic note/ledger grants, audit catalog limited to view/export. Repository-wide contextual searches covered every requested stale-policy pattern, including prior pending-policy phrasing. git diff --check passed, and changed-file inspection confirmed 14 Markdown files only. No application tests/builds/deployment/recovery exercise were run. Historical UI lint/type/build blockers and stale PDF/PPT snapshots are unaffected and remain documented.
