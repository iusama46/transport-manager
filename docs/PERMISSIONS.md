# Master Permission Catalog

Updated: 9 October 2026
Status: Finalized permission architecture; documentation only, not runtime enforcement.

## Authority and naming

This is the centralized master catalog referenced by PRD, architecture, UI and security. Keys use `module.action`; role names are user-defined labels, never authorization keys. Add reviewed catalog entries with action semantics, resource/company scope, UI mapping, server enforcement and tests as modules grow. Unknown permissions are denied; new permissions are not automatically granted to custom roles. Authorized users select existing permissions, not arbitrary executable keys. A future code catalog must stay synchronized with this document.

Customer (Client) means the direct customer; Consignee means that customer's receiver. `clients.*` covers direct customer records, not an automatic grant over factories, consignees or every company. Add separate catalog entries for those resources when their workflows are specified.

## Master catalog — V1

Each comma-separated action expands to a separate module.action key. These keys are conceptual authorization contracts; runtime implementation is pending.

| Module | Actions |
|---|---|
| orders | view, create, edit, delete, complete, cancel, reopen, approve, archive, deactivate, reactivate, export |
| trips | view, create, edit, delete, edit_delivered, correct, override_rate, manual_price, adjust_charges, archive, export |
| rates | view, create, edit, delete, archive, export |
| companies, factories, consignees, partners | view, create, edit, delete, archive, deactivate, reactivate, export |
| vehicles, drivers, clients | view, create, edit, delete, archive, deactivate, reactivate, export |
| vehicles | manage_ownership |
| drivers | manage_assignments, manage_affiliation |
| fuel_suppliers, fuel_branches | view, create, edit, delete, archive, deactivate, reactivate, export |
| fuel_rates | view, create, edit, delete, archive, export |
| fuel | view, create, edit, delete, approve, override_rate, override_amount, correct, export |
| expenses | view, create, edit, delete, approve, correct, allocate, archive, export |
| deduction_categories | view, create, edit, delete, archive, reactivate |
| expense_categories | view, create, edit, delete, archive, reactivate |
| invoices | view, create, edit, delete, issue, cancel, approve, partial_bill, adjust_charges, correct, reissue, export |
| credit_notes, debit_notes | view, create, edit, delete, approve, issue, cancel, export |
| payments | view, create, edit, approve, allocate, unallocate, reallocate, reverse, refund, correct_failed, export |
| customer_ledger, partner_ledger, supplier_ledger | view, export |
| settlements | view, create, correct, export |
| financial_accounts | view, create, edit, delete, archive, reactivate, export |
| account_transfers | view, create, reverse, export |
| taxes, currencies | view, create, edit, archive |
| exchange_rates | view, create, edit, override |
| documents | view, upload, edit, delete, archive, download, export |
| document_types | view, create, edit, delete, archive, reactivate |
| document_reminders | view, configure |
| identity_documents | view, upload, download |
| reports | view, export |
| users | view, create, edit, deactivate |
| owners | transfer |
| roles | view, create, edit, delete |
| settings | view, edit |
| activity_logs | view, export |

Grouped module cells expand independently (e.g. credit_notes.create and debit_notes.create). Grants do not propagate between namespaces. factories/consignees/partners are distinct from clients. Private identity documents require parent access plus identity_documents grants and the relevant documents action.

view permits scoped reads; create performs eligible operations; edit changes only mutable fields. delete applies only to unused dependency-free records/drafts and never ledger-impacting payments or referenced history. archive/deactivate/reactivate preserve history and record audit events. Export requires resource view plus export; ledger visibility does not automatically grant raw payment/identity access.

orders.cancel/reopen require reasons and dependency/lifecycle checks. trips.edit_delivered covers permitted sensitive delivered edits; trips.correct covers linked correction of locked relevant fields, never silent unlock. trips.override_rate selects another VALID matching rate and preserves recommended/selected references/values, optional reason and audited actor/time; it does not authorize arbitrary rate invention. fuel.override_rate and fuel.override_amount retain original/default/final snapshots and audited actor/time. invoices.partial_bill is additional to invoice create/issue authority. Payment allocation operations require payment and target ledger/resource access, not just payments.edit; payments.edit affects only eligible mutable data, never posted amounts. Reversal/bounce/refund preserve originals and reasons. account_transfers.create/reverse require access to both own accounts and the reviewed currency policy.

Note create/approve/issue keys control authoring/finalization/correction according to lifecycle. V1 AUTO APPROVAL means an authorized performer does not wait for another reviewer: applicable finalization authority is checked when issuing/posting; no routine manual approval queue. Future separate reviewers/rules are V2. Issued invoice/note corrections cannot use ordinary edit/delete grants. Permissions never override company scope, financial invariants, historical snapshots or dependency rules.

User activation/role assignment require users.edit (new user also users.create) plus delegation authority; deactivation uses users.deactivate. Role deactivation uses roles.edit, deletion roles.delete, subject to protected Owner/reassignment/history safeguards.

## V2/Future catalog additions

imports.view, imports.upload, imports.validate, imports.commit and imports.export_errors are planned only for controlled V2 bulk import, with target-module permissions and audit. Configurable manual-approval rule administration and separate reviewer permissions will be specified for V2; existing approve keys do not make these active V1 workflows. No activity_logs.edit/delete permissions exist in any scope.

## Roles and delegation

A protected system-level Owner/Super Admin role has full access to supported application actions within the authorized operating business. It cannot be deleted, deactivated, renamed into a custom role, or stripped of critical permissions. Full access does not include altering audit history or bypassing financial safeguards. There is no implicit cross-company/tenant membership or global-owner bypass. Protect the last active Owner from removal/deactivation/reassignment. First Owner is established at company setup/provisioning. Eligible authorized ownership transfer is finalized V1 policy via owners.transfer under protected Owner authority; provider-specific provisioning mechanics remain open. Keep at least one active Owner across concurrent creation/transfer/removal/deactivation/reassignment, audit each action and reject self-removal/deactivation by the last active Owner. Ordinary custom-role editing cannot bypass system ownership.

Custom roles have stable IDs, company context, arbitrary user-defined names, optional descriptions, active status and sets of permission keys. Examples such as Accountant, Operations Manager, Fuel Manager, Supervisor and Data Entry are labels only, with no predefined grants. Each active user membership has one assigned role initially; multiple simultaneous roles and union semantics are not assumed. Renaming a role preserves its ID and historical references.

Require the relevant role-management permission and verified company membership for changes. A non-Owner must not grant permissions beyond their own effective permissions, change or assign the protected Owner role, or manage a custom role containing higher privileges. Apply the same ceiling to role assignment; `users.edit` is not a privilege-escalation bypass. Recheck permissions and active status on the server after changes, including cached sessions.

Block deletion or deactivation of custom roles with active assigned users until reassignment succeeds atomically. Keep historical references for inactive users and audit events; archive rather than physically erase referenced roles. Concurrent assignments must not bypass the check.

## Company boundary

Authorize **User + Company/Tenant + Role + Permission + Resource**. Current scope is one operating business and multiple counterparties (factories, customers, vehicle owners, partners and suppliers). A counterparty ID is not a tenant grant. Resources, memberships, roles and audit events carry the operating company context. Scope all queries and related-record validation before returning data or mutating it. Reject guessed IDs belonging to a different operating company, even if multiple company fixtures exist only for isolation tests. Independent multi-tenant onboarding and Owner cross-tenant administration are not approved features; any future extension requires an explicit scope decision.

## Finalized policy action semantics

- orders.complete permits manual completion after warning about unfinished Trips, retaining their statuses and auditing the action. orders.reopen remains the distinct reasoned reopening grant. orders.edit covers Bill To, potential Consignees, remaining basis and shortage agreement on eligible mutable records; locked financial effects require correction authority.
- trips.manual_price is additional to Trip create/edit authority for Manual Total entry or eligible pricing-mode change. It preserves entered total/actor/time and cannot invent a unit rate or unlock history. trips.adjust_charges covers permitted commission/deduction, discount and shortage financial adjustments, retaining gross/calculated amounts and rules/results; invoiced locked changes additionally require trips.correct and the appropriate financial workflow.
- invoices.adjust_charges is additional to draft invoice create/edit authority for fixed/percentage discounts, commissions/deductions or manual adjustments; it never unlocks issued values. Rounding/conversion rule configuration uses existing settings.edit (tax configuration uses taxes.*); deduction_categories manages extensible commission/deduction categories, with archival of referenced categories.
- invoices.correct controls authorized historical correction of an issued invoice when business/legal rules permit; invoices.reissue controls linked replacement issue with invoices.issue. Both require reason, retained original/version links, relevant Trip correction authority and reconciled ledger/allocations. Existing credit_notes.create/issue and debit_notes.create/issue cover the adjustment paths; no duplicate note permissions are added. Ordinary invoices.edit/delete is insufficient.
- expenses.allocate is additional to source expense and target Trip access for equal/quantity/manual amount/manual percentage allocations. Reconcile exact totals, snapshot method/basis/values and audit changes; expenses.edit does not imply allocation authority.
- owners.transfer is usable only within the protected Owner workflow by an authorized Owner and to an eligible authorized user. A custom-role grant alone cannot establish Owner authority. Existing users.create/edit/deactivate covers ordinary user actions; Owner setup/removal/deactivation also enforces the protected lifecycle and audit. No owners.edit/delete bypass is introduced.

Customer ledger namespace is retained to avoid duplicate semantic permissions: customer_ledger.view/export covers scoped receivables of the explicitly selected Bill To, whether Factory, Client, Consignee or another supported party. It does not make every Client a debtor. Every action above repeats server-side User + Company/Tenant + Role + Permission + Resource authorization, lifecycle, currency and historical-integrity validation. V1 same-currency invoice allocation is mandatory even with payments.allocate/reallocate grants. No retention-purge or audit mutation permission exists.
