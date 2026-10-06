# Master Permission Catalog

Updated: 6 October 2026
Status: Finalized permission architecture; documentation only, not runtime enforcement.

## Authority and naming

This is the centralized master catalog referenced by PRD, architecture, UI and security. Keys use `module.action`; role names are user-defined labels, never authorization keys. Add reviewed catalog entries with action semantics, resource/company scope, UI mapping, server enforcement and tests as modules grow. Unknown permissions are denied; new permissions are not automatically granted to custom roles. Authorized users select existing permissions, not arbitrary executable keys. A future code catalog must stay synchronized with this document.

Customer (Client) means the direct customer; Consignee means that customer's receiver. `clients.*` covers direct customer records, not an automatic grant over factories, consignees or every company. Add separate catalog entries for those resources when their workflows are specified.

## Initial catalog

Each action below expands to a separate key: for example orders + view means `orders.view`.

| Module | Actions |
|---|---|
| orders | view, create, edit, delete, approve, export |
| vehicles | view, create, edit, delete, export |
| drivers | view, create, edit, delete |
| clients | view, create, edit, delete |
| fuel | view, create, edit, delete, approve, export |
| expenses | view, create, edit, delete, approve, export |
| invoices | view, create, edit, cancel, approve, export |
| payments | view, create, edit, approve, export |
| reports | view, export |
| users | view, create, edit, deactivate |
| roles | view, create, edit, delete |
| settings | view, edit |
| activity_logs | view, export |

`view` permits scoped reads; `create` creates eligible records; `edit` changes eligible mutable fields; `approve` permits the defined approval/finalization action; `export` permits an export only with the corresponding view permission. `delete` applies only where business history rules allow it: archive referenced master records, and never erase posted financial history. `cancel` preserves the original and requires the applicable correction workflow. Permissions never override financial invariants, company scope or record lifecycle rules.

User activation and role assignment require `users.edit`; deactivation requires `users.deactivate`. Creating a user with a role requires `users.create` plus authority to assign that role. Role deactivation requires `roles.edit`; deletion requires `roles.delete`. Assignment and role editing must obey the delegation restrictions below. Dedicated permissions for reversals, settlements, private identity files, imports, factories/consignees, partners and other future actions must be explicitly cataloged before implementing them; never infer them from a job title or unrelated edit permission. Detailed business approval/correction rules remain open.

## Roles and delegation

A protected system-level Owner/Super Admin role has full access to supported application actions within the authorized operating business. It cannot be deleted, deactivated, renamed into a custom role, or stripped of critical permissions. Full access does not include altering audit history or bypassing financial safeguards. There is no implicit cross-company/tenant membership or global-owner bypass. Protect the last active Owner from removal/deactivation/reassignment. Initial provisioning and ownership transfer need a provider-backed, explicitly authorized workflow before implementation.

Custom roles have stable IDs, company context, arbitrary user-defined names, optional descriptions, active status and sets of permission keys. Examples such as Accountant, Operations Manager, Fuel Manager, Supervisor and Data Entry are labels only, with no predefined grants. Each active user membership has one assigned role initially; multiple simultaneous roles and union semantics are not assumed. Renaming a role preserves its ID and historical references.

Require the relevant role-management permission and verified company membership for changes. A non-Owner must not grant permissions beyond their own effective permissions, change or assign the protected Owner role, or manage a custom role containing higher privileges. Apply the same ceiling to role assignment; `users.edit` is not a privilege-escalation bypass. Recheck permissions and active status on the server after changes, including cached sessions.

Block deletion or deactivation of custom roles with active assigned users until reassignment succeeds atomically. Keep historical references for inactive users and audit events; archive rather than physically erase referenced roles. Concurrent assignments must not bypass the check.

## Company boundary

Authorize **User + Company/Tenant + Role + Permission + Resource**. Current scope is one operating business and multiple counterparties (factories, customers, vehicle owners, partners and suppliers). A counterparty ID is not a tenant grant. Resources, memberships, roles and audit events carry the operating company context. Scope all queries and related-record validation before returning data or mutating it. Reject guessed IDs belonging to a different operating company, even if multiple company fixtures exist only for isolation tests. Independent multi-tenant onboarding and Owner cross-tenant administration are not approved features; any future extension requires an explicit scope decision.
