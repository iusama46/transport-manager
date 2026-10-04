# Implementation Tasks

Updated: 5 October 2026

Use this checklist in build order. [x] means the stated deliverable is completed; unchecked means not completed. Implementation and verification are separate tasks. No application functionality has been built or tested yet.

## 0. Documentation and repository foundation

- [x] Draft PRD, architecture, design, security, test plan, decision log and project memory.
- [x] Define apps/web, apps/mobile, packages/shared and docs folder structure.
- [x] Add implementation checklist and credential/data exclusions.
- [x] Document multiple fuel suppliers, their branches and both payment methods.
- [ ] Review open business and technical decisions with the owner.

## 1. Project setup

- [ ] Resolve database, authentication, storage and free hosting choices (O01/O09).
- [ ] Choose package manager and workspace configuration.
- [ ] Scaffold Next.js in apps/web and configure shared package.
- [ ] Configure TypeScript, linting, formatting and environment template without secrets.
- [ ] Configure local test runner and build checks within the free budget.
- [ ] Verify a clean install and build from a fresh checkout.

## 2. Authentication

- [ ] Configure provider and initial administrator provisioning.
- [ ] Implement login, logout, session expiry and account recovery.
- [ ] Protect routes and backend operations.
- [ ] Verify expired/revoked sessions and unauthorized direct requests.

## 3. Roles and permissions

- [ ] Confirm Admin, Operations, Accounts and Viewer permission matrix.
- [ ] Implement permission checks for reads, writes, exports and financial actions.
- [ ] Apply database access policies appropriate to the selected provider.
- [ ] Verify each role through direct API/data requests, including restricted files.

## 4. User management

- [ ] List and provision staff accounts using the agreed flow.
- [ ] Assign/change roles and activate/deactivate users.
- [ ] Audit access changes and enforce them on active sessions.
- [ ] Verify disabled users cannot continue accessing records.

## 5. Business settings

- [ ] Confirm business identity, currency, timezone, languages and rounding.
- [ ] Configure numbering, categories and print branding.
- [ ] Verify setting changes preserve historical invoices.

## 6. Companies, factories, customers and consignees

- [ ] Implement profiles, contacts, locations and company roles.
- [ ] Link consignees to customers and filter selections.
- [ ] Add search, edit and archive flows.
- [ ] Verify historical relationships survive archival.

## 7. Vehicles and drivers

- [ ] Implement registrations, ownership, capacities and driver profiles.
- [ ] Add licence expiry, availability and assignment history.
- [ ] Verify registration normalization and historical ownership.

## 8. Orders and deliveries

- [ ] Confirm multiple-vehicle/consignee rules (O05).
- [ ] Build order entry, filters, pagination and detail view.
- [ ] Add assignments, unlimited ordered stops, status history and delivery proof.
- [ ] Verify six-stop orders, reassignment, conflicts and delivery/payment independence.

## 9. Outsourced orders

- [ ] Add partner assignment and filtered outsourced view of the same orders.
- [ ] Confirm fare, commission, advance and deduction rules (O03/O04).
- [ ] Add agreed partner obligations and settlement breakdown.
- [ ] Verify no duplicate jobs or double-counted advances.

## 10. Fuel suppliers, branches and transactions

- [ ] Create multiple supplier profiles and branch records with contacts/locations.
- [ ] Filter branch selection by supplier and validate ownership server-side.
- [ ] Add vehicle fuel purchases, litres, rates, receipts and totals.
- [ ] Support branch payments and supplier-wide payments across branches.
- [ ] Allocate payments to purchases; track unallocated supplier credit explicitly.
- [ ] Add branch statements, consolidated supplier statements and vehicle rankings.
- [ ] Verify cross-supplier rejection, partial payments, reversals and reconciliation.

## 11. Maintenance and expenses

- [ ] Add workshop, parts/labour/other costs and legacy total-only mode.
- [ ] Add service date/mileage reminders and expense categories.
- [ ] Verify calculations, payment balances and unknown odometer behaviour.

## 12. Billing and invoices

- [ ] Confirm billing account, fare basis, tax/discount and rounding rules (O02/O06).
- [ ] Add draft invoices and eligible order selection.
- [ ] Implement atomic, idempotent finalization and correction workflow.
- [ ] Implement A4 printing and browser PDF output.
- [ ] Verify concurrent finalization and 1/14/15/35-line printing, including Urdu.

## 13. Payments and settlements

- [ ] Implement customer receipts and partner/supplier/workshop payments.
- [ ] Implement allocations, advances, credits and auditable reversals.
- [ ] Verify retry/concurrency safety and independent customer/partner balances.

## 14. Reports and overview

- [ ] Add metrics, date bases, filters and underlying-record drill-down.
- [ ] Add customer/partner statements, branch/supplier fuel statements and cost reports.
- [ ] Verify every total reconciles and no unvalidated net-profit claim appears.

## 15. Import and export

- [ ] Implement mapping, validation, preview and reviewed commit.
- [ ] Handle mixed dates, registrations, missing amounts and Paid in legacy Party.
- [ ] Add provenance and duplicate/retry protection.
- [ ] Verify exports and spreadsheet-formula injection protection.

## 16. Release verification and deployment

- [ ] Execute TEST_PLAN.md and record actual results.
- [ ] Complete access, accessibility, print and representative performance checks.
- [ ] Define backup owner/schedule and demonstrate restoration.
- [ ] Confirm free-plan compatibility, quotas and absence of paid add-ons.
- [ ] Deploy dashboard and perform smoke checks.

## 17. Later mobile phase

- [ ] Confirm mobile users and offline requirements.
- [ ] Scaffold Expo in apps/mobile and reuse domain contracts.
- [ ] Define and implement the approved mobile workflows.

## Update rules

Record implementation commit and test evidence when completing a feature. A written plan is not implementation. Keep decision blockers in DECISIONS.md and current state in MEMORY.md.
