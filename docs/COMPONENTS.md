# Reusable Components
Updated: 9 October 2026
Status: Implementation specification; existing shell prototypes are identified where relevant. Specified behavior is not a claim of complete implementation.

## Ownership and file structure

Follow DESIGN.md for tokens and sizing. Use shadcn/ui as the primitive foundation with one consistent project API. Each component has its own file and clear responsibility. Button variants share one Button implementation rather than separate duplicated primary/secondary buttons.

| Folder | Separate component files |
|---|---|
| apps/web/src/components/ui | button.tsx, input.tsx, textarea.tsx, select.tsx, checkbox.tsx, radio-group.tsx, switch.tsx, dialog.tsx, drawer.tsx, tooltip.tsx, searchable-select.tsx, combobox.tsx (compatibility exports), multi-select.tsx |
| apps/web/src/components/forms | form-field.tsx, text-field.tsx, password-field.tsx, number-field.tsx, money-field.tsx, quantity-field.tsx, date-field.tsx, date-range-field.tsx |
| apps/web/src/components/common | page-header.tsx, breadcrumbs.tsx, data-table.tsx, filter-bar.tsx, pagination.tsx, empty-state.tsx, error-state.tsx, confirm-dialog.tsx, status-badge.tsx |
| apps/web/src/features/<module>/components | Business-specific selectors, editors and forms |
| packages/shared | Provider-independent domain types, validation and calculations |

UI primitives do not import business modules or provider SDKs. Reusable tables receive data and callbacks rather than hardcoded queries. Expo will have native controls sharing domain contracts, not web DOM components.

## Common contracts

Forward appropriate native props and refs, including id/name/required/disabled. Keep primitives independent of form libraries and add thin React Hook Form adapters. Prefer explicit controlled values. Use shared tokens, not arbitrary screen-specific colours. Distinguish disabled, read-only and unauthorized. Frontend permissions never replace backend authorization.

Async selectors expose loading/error/empty/retry, cancel obsolete requests and ignore stale responses. Decimal fields preserve entered strings until validation; never convert a blank to zero. Financial rules remain authoritative on the backend.

## Buttons

Button supports variant=primary/secondary/outline/ghost/destructive, size=sm/default/lg and loading. Default type is button; forms opt into submit deliberately. Loading prevents repeat activation, preserves width/focus and announces progress. Backend idempotency still prevents duplicate money transactions.

IconButton requires an accessible label and adequate hit area; tooltip only supplements the label. LinkButton uses real link semantics for navigation. ButtonGroup wraps on small screens and clearly distinguishes the main action.

## Form components

| Component | Responsibility and behaviour |
|---|---|
| FormField | Visible label, help, required indicator and error linked to control ID |
| TextField | String value, placeholder, autocomplete and appropriate input type |
| TextareaField | Multiline input, resize and optional visible character count |
| PasswordField | Visibility toggle with accessible label; appropriate autocomplete; never log value |
| NumberField | Numeric text, bounds and precision; blank stays blank |
| MoneyField | Decimal string plus explicit currency; no float money arithmetic or premature rounding |
| QuantityField | Decimal string plus original unit; compatible converted quantity/unit and rule separate; never silently replace original input; precision independent of currency |
| DateField | Calendar date or null; no timezone-induced day shift |
| DateRangeField | Start/end and valid range order; document inclusive display boundaries |
| SearchField | Clear action, optional debounce/submit, accessible name |
| FormSection | Semantic grouping, heading and responsive columns |
| FormActions | Submit/cancel, pending state and recoverable failure |

Preserve input on failures and focus the first invalid field after submit. Do not invent mandatory identity/phone masks before locale rules are confirmed. Store phone, CNIC and registration identifiers as strings. Cross-field rules are enforced server-side as well as in the form.

## Selection components

Select handles small fixed sets such as Yes/No or status/mode choices; RadioGroup and Switch remain appropriate for visible single choices and binary settings. SearchableSelect is the canonical searchable business-record control, extending the existing Combobox specification below. Its multi-selection mode is explicit, only for workflows allowing multiple records. Existing MultiSelect remains a labelled checkbox group for small loaded sets, not a competing searchable entity picker. Checkbox supports indeterminate partial table selection.

### SearchableSelect

**Reuse and implementation status.** `apps/web/src/components/ui/searchable-select.tsx` now provides the canonical control using React Select 5.10.2. `combobox.tsx` re-exports the same implementation and compatible option/loader types; there is one control implementation. It supports controlled single/multi selection, rich labels/status/disabled reasons, local filtering, external results or the existing query/page/AbortSignal loader, debounce/minimum-character settings, cancellation, scope resets, retry, load more, bounded result windows, required/validation associations and disabled/read-only display. The synthetic `/dev/components` showcase exercises these configurations, including supplier/branch dependencies. FormField/form adapters stay in `components/forms` and feature eligibility/loaders belong in `features/<module>`. The contract below remains the acceptance target; full browser, screen-reader and trusted-service acceptance has not been executed.

**Identity and options.** Required conceptual fields are stable `id`/value and primary `label`; optional `secondaryLabel`/metadata, status text and icon/avatar are display aids. For example: Vehicle `LEA-1234` / `Hino • Rana Transport`; Driver `Muhammad Ali` / `Driver ID 018 • Rana Transport`; Client `ABC Traders` / `Lahore • Active`. A feature may supply an unavailable/disabled reason. No option must supply all metadata. Compare, deduplicate and submit by stable ID, never by label or result index. Labels and authorized metadata disambiguate names; icons/status colors supplement text. Templates cannot change selection semantics, introduce nested interactive controls in options or expose unauthorized fields.

**Controlled API contract.** `SearchableSelectProps` implements the following responsibilities; feature adapters and acceptance checks remain necessary. Keep the existing `help` naming and FormField conventions rather than adding a separate `helperText` convention.

| Input / callback | Contract |
|---|---|
| `label`, `id`, `name`, ref/form adapter | Visible accessible label, stable associations and form integration; submit selected IDs, not typed search text |
| `value`, `onChange`, `multiple` | Default `multiple=false`: option or null; explicit multi mode: option collection (empty collection for none). Callback reports committed selection; shape is consistent with the chosen mode |
| `options` / existing `loadOptions` adapter | Small loaded dataset or current bounded result page; retain the existing query/page/AbortSignal loader as an adapter. Choose one authoritative loading path per instance, not competing internal and external fetches |
| `searchValue`, `onSearch` | Optional controlled query and query-change callback, separate from selection; otherwise managed internally. Query changes never fabricate an entity value |
| `loading`, search error, `onRetry`, `hasMore`, `onLoadMore` | Async state and recovery supplied through the chosen loading path; distinguish initial versus next-page requests and reject duplicate load-more requests |
| `disabled`, `readOnly`, `required`, `clearable` | Disable interaction; preserve inspectable read-only selection; required validation; explicit clear policy. Clearing reports null/empty collection only when allowed |
| `placeholder`, `help`, `error` | Placeholder supplements label; help and validation error use FormField associations. Search/network error is distinct from field validation and must offer meaningful retry |
| `getOptionLabel`, `getOptionValue`, `renderOption` | Optional domain adapters and non-interactive rich display; default to label/id. Accessible primary/secondary text and stable semantics remain mandatory |

Keep selected display data independently of the result page. A form with stored IDs resolves only those selected records through authorized feature reads or an allowed historical snapshot; it does not scan all pages to find them. A missing/unavailable reference is explicitly labelled and validated, never replaced with the first result. Single selection closes the popup and restores input focus. Multi mode keeps it open for deliberate toggles, deduplicates IDs, shows selected labels/count and individually labelled remove controls. Removing one item preserves the others. Normal Vehicle/Driver references remain single; multi mode is suitable for eligible invoice Trips, potential Order Consignees and expressly supported categories. PermissionMatrix remains the permission editor and initial User role assignment remains one Role; this control does not change business cardinality. No implicit select-all across unloaded results.

Required fields may be temporarily empty while editing; required validation blocks submission and focuses the field. A feature decides whether a clear action is offered. Disabled and read-only controls never search, clear or change value; read-only remains legible, focusable/inspectable and copyable, with no editable popup. Form submission explicitly retains unchanged values as appropriate rather than relying on disabled native controls to serialize them.

**Local and server search.** Local mode filters an already-loaded, small authorized dataset (e.g. 10 or 100 options); a local adapter may satisfy the existing loader contract without network access. The feature defines searchable fields and matching/normalization, including which displayed identifiers/metadata are useful. SearchableSelect need not be used if a tiny fixed Select/radio group is clearer. Server mode is required for potentially large entity sets such as thousands of Vehicles, Clients or Trips: query bounded pages, never fetch the entire collection merely to fill the dropdown. No API route, database or provider is prescribed.

The consuming feature owns debounce duration, optional minimum characters, page size, allowed filters and paging/cursor adaptation. Below the threshold, show an instruction such as “Type at least 2 characters”; do not claim no records exist. A new query or dependency scope resets page/active option, cancels obsolete work and ignores late responses. Scope includes verified company context, parent IDs and relevant eligibility/permission changes; cached pages and selected-record resolution must not leak across scopes. Losing access removes unavailable choices and shows a permitted unavailable-reference message without leaking forbidden labels.

Initial loading has a stable busy indicator; next-page loading preserves already-valid current-query results. Append pages in stable order, deduplicate IDs and prevent overlapping requests. Pagination may use explicit Load more or accessible infinite loading with an equivalent keyboard action. Retry repeats the failed query/page under the current scope, not a stale parent. Failed searches preserve valid committed selections and input but cannot make obsolete results selectable. Keep rendered collections bounded through feature-chosen page limits, an accessible result window or virtualization where justified; scrolling thousands of DOM options is not the default. Active descendants must remain mounted and scrolled into view. Multi selections use a readable wrapping/bounded summary with access to the full selection rather than an enormous popup list.

**Dependencies and lifecycle.** Feature wrappers apply approved Factory → Client → Consignee relationships; Fuel Supplier → Branch/Pump; Order → eligible Trips; Partner → associated Vehicles where the workflow calls for that association. These filters do not redefine relationships: Bill To is independent, invoice Trips may span compatible Orders, and ownership is separate from the execution partner. A parent change clears or explicitly remaps only incompatible selected children and resets their query/pages. While compatibility is unresolved, mark the child pending/invalid and prevent submission; never silently keep a stale child. Compatible selections remain. Missing prerequisite shows a disabled field with help. Cancel/ignore old-scope responses and revalidate on submit to cover races and relationship changes.

Ordinary new-entry results exclude archived/deactivated records by default. Historical edit/detail values still resolve by their stored ID and allowed snapshot, displaying e.g. `ABC Transport — Archived` with text status; the selected historical record need not appear as a selectable new result. Preserve it unchanged where lifecycle policy permits, or require an explicit permitted correction if changing it. Never blank it or silently substitute an active entity. Expired vehicle/driver documents show the V1 warning and do not cause expiry-only assignment blocking.

**Trust boundary.** UI filtering is presentation, not authorization. Trusted operations independently verify authenticated active user, company/tenant, action permission, resource access/relationships and active/allowed lifecycle status for lookup, selected-ID resolution and save, including every multi-selected ID. Counts and metadata are scoped too. Guessed IDs, foreign-company records, revoked grants and invalid children must fail even with direct requests; client company/role flags are not authority. Historical read access is not permission to make a new archived assignment. No backend logic is implemented by this specification; preserve ARCHITECTURE.md, PERMISSIONS.md and SECURITY.md safeguards.

**Interaction and accessibility.** Associate the visible label with the searchable input through FormField; connect help/errors via `aria-describedby` and expose `aria-required`/`aria-invalid` with native attributes where appropriate. Use combobox + listbox semantics, `aria-expanded`, `aria-controls`, appropriate autocomplete and a valid `aria-activedescendant` for the mounted active option. Options expose `aria-selected`, `aria-disabled`/reason and accessible text; multi listboxes expose `aria-multiselectable`. Keep keyboard focus on the input during option navigation, arrows open/navigate eligible options, Enter commits/toggles the active option and Escape closes without changing committed values. Space selects on a dedicated selection trigger where appropriate; in the editable search input it remains text. Tab follows normal form order and closes without committing unselected query text. Do not trap focus.

Mouse/touch selection matches keyboard behavior and must not be lost to premature blur. Clear/remove/retry/load-more controls have explicit names and work by keyboard/touch. Announce searching/loading, result/no-result counts and selection changes through a polite status region; associate validation and announce actionable failures without repeated noisy alerts on every keystroke. Restore input focus after selection/clear/removal where appropriate, keep it stable across requests, and participate in dialog focus containment/restoration and first-error form focus. Disabled/read-only semantics and visible focus must match DESIGN.md; screen-reader checks are required, not implied by adding ARIA attributes.

**States and verification.** DESIGN.md defines the visual state mapping; [TEST_PLAN.md](TEST_PLAN.md#searchableselect-acceptance--t82t101-planned-and-unexecuted) owns T82–T101 acceptance scenarios. Cover Default, Focused, Searching, Loading, Results, Empty, No Results, Selected, Disabled, Read Only, Error, Required and Archived historical selection. These states can coexist (e.g. required + selected, selected + next-page error); querying never erases a committed value. Extend the synthetic `/dev/components` showcase during implementation, then verify these cases before feature rollout.

## Shared layout and feedback

| Component | Required behaviour |
|---|---|
| AppSidebar / AppHeader | Active navigation, permission-aware links and narrow-screen menu |
| PageHeader / Breadcrumbs | One main heading and action slot with wrapping |
| StatusBadge | Domain-specific text and semantic colour; delivery/payment statuses remain distinct |
| Alert / InlineError | Persistent actionable errors; critical errors not toast-only |
| Toast | Brief announcements without private information |
| Skeleton / LoadingState | Stable layout, busy label and reduced-motion handling |
| EmptyState | Distinguish no records from no matching filtered results |
| ErrorState | Retry when meaningful; label any stale retained data |
| Dialog / Drawer | Labelled title, focus containment/restoration and scroll handling |
| ConfirmDialog | Specific action, record/account, amount if relevant, consequence and clear cancel |
| DropdownMenu / Tooltip | Keyboard access; no essential hover-only content |
| AttachmentField | Type/size validation, progress, cancellation, retry and private previews |
| AuditTimeline | Actor, timestamp and permitted change details |

## Tables and reporting

DataTable receives typed columns, rows, stable row IDs, sorting/pagination state, total/next-page indicator, loading/error and callbacks. Compose with FilterBar, ColumnVisibilityMenu, Pagination, RowActions and BulkActionBar as required. Sorting/filtering reset an invalid page. Selection clearly states its page or wider scope. Nested action clicks must not trigger row navigation.

MoneyText and QuantityText show formatted values with currency/units and explicit missing states. DateText distinguishes business dates from timestamps. SummaryMetric includes period, drill-down and unavailable state. ReportChart includes a textual summary/data alternative. Unauthorized financial data must not be fetched merely to hide its columns.

## Business-specific components

Entity pickers below compose SearchableSelect for searchable record references; each wrapper owns eligibility, dependencies and permitted metadata. Reuse that contract instead of separate dropdown implementations. Detailed allocation/pricing editors retain their own business controls.

| Component | Separate responsibility |
|---|---|
| CustomerPicker | SearchableSelect wrapper for direct Customer (Client), scoped by the applicable Factory relationship; stable ID |
| ConsigneePicker | SearchableSelect wrapper; filter potential Order receivers by customer; support multiple potential Consignees and actual Trip receiver/destination; clear/remap incompatible selection without changing history |
| BillToPicker | Explicit supported Factory/Client/Consignee/alternative debtor, independent of operational relationships |
| VehiclePicker | Show availability and owner separately from subcontractor |
| DriverPicker | Show availability/licence expiry warning/status; expiry alone does not block otherwise-authorized V1 assignment |
| TransportPartnerPicker | Select external Trip fulfiller |
| FuelSupplierPicker | Select supplier |
| FuelBranchPicker | Require supplier; show only its branches; reject stale search results |
| OrderStopsEditor | Add/remove/reorder beyond four stops, with keyboard move controls |
| FuelPurchaseForm | Supplier, branch, vehicle, liters/rate and cost preview; one transaction across entry screens |
| PaymentAllocationForm | Branch or central payment, purchase allocations, remaining amount and explicit unallocated credit |
| InvoiceTripPicker | Billing account and eligible Trips with remaining billable amounts, with exclusion reasons |
| InvoicePreview | Draft or issued snapshot with dedicated print layout |
| PermissionGate | Presentational access wrapper with optional fallback; server checks still required |

PaymentAllocationForm validates supplier/currency and scope. Branch payments allocate within that branch; central payments may cover several branches of one supplier. Advances count once. Server transactions protect against concurrent over-allocation. Customer receipts and partner payments remain independent.

## States and component verification

Demonstrate default, hover, focus, pressed/selected, disabled, read-only, loading, empty, validation error and network failure where applicable. A label does not need a loading variant. Do not display financial success before a confirmed server result.

Build a development-only showcase using synthetic data. Include long labels, 200% zoom, narrow screens, keyboard navigation, dialog focus return, decimal inputs, blank versus zero and async failures. Verify stale parent-child selector responses cannot select the wrong customer/consignee or supplier/branch. Test table selection after filtering and scope rules in allocation forms. Tests target behaviour rather than CSS class names. Print QA remains in TEST_PLAN.md.

## Implementation sequence

1. Theme tokens, local fonts and layout primitives.
2. Button, labels/errors, form controls and selectors.
3. Tables, feedback, overlays and filter composition.
4. Showcase review and accessibility checks.
5. Business selectors/editors as modules are implemented.

Add this sequence to TASKS.md before individual screens. Record implementation and verification separately; writing this specification does not complete those tasks.

## Planned RBAC and audit composites — 6 October 2026

- PermissionMatrix: accepts the centralized catalog, selected keys, delegable keys and read-only/system constraints; renders reusable module/action selections with keyboard labels and partial-selection states. It has no hard-coded business-role behavior.
- RolePicker: company-scoped active roles permitted for assignment; preserves IDs independently of custom names and handles stale/deactivated choices.
- PermissionGate: uses effective action grants and scope for presentation only; every backing operation repeats server authorization.
- ActivityLogFilters: date/range, actor, module, action, permitted company, reference and text, composed with server sorting/pagination.
- ActivityHistory/AuditTimeline: read-only, chronological, paginated safe event details for global/record views, including actor snapshot and permitted before/after changes. No edit/delete affordances; no hidden secrets in component props.

RolePicker and applicable actor filters compose SearchableSelect under its canonical contract; PermissionMatrix retains its dedicated grouped checkbox UI. These composites and their integration remain unimplemented. Contracts follow PERMISSIONS.md, AUDIT.md and DESIGN.md; test stale permissions, denied views/exports and sensitive-field masking as well as accessibility.

## Finalized reusable V1 contracts — 9 October 2026

| Component | Contract |
|---|---|
| OrderTripList / TripEditor | One/multiple Trips, add subject to lifecycle, optional target and loaded/delivered/shortage/billable quantity with units |
| RateHistory / RateSnapshot | Effective agreement/price versions and date basis; default/final historical rates and permission-aware overrides |
| InvoiceTripPicker / PartialBillingEditor | Eligible Trips, billable/invoiced/remaining; full remaining default; explicit permitted partial amount, no overbilling |
| Ledger / PaymentAllocation | Separate receivable/partner/supplier targets, partial/multiple allocations, advances/credit; correction links and historical currency/FX |
| Documents/Attachments / DocumentExpiry | Multiple files, predefined/custom type and metadata, private authorized access, optional expiry/configurable reminder periods |
| OwnershipHistory / DriverAssignmentHistory | Effective relationships and actual historical Trip identities; no permanent driver-vehicle assumption |
| AccountPicker / InternalTransferReview | Company-scoped cash/bank/custom accounts and methods, both balances, currency effects; no revenue/expense transfer |
| CorrectionReasonDialog / ArchiveDeactivateConfirmation | Specific action, reason when required, dependencies, ledger effects and traceable original; lifecycle governs availability |
| Money/Currency / Quantity / StatusBadge | Transaction/base currencies and historical FX distinguished; quantity units/missing target explicit; operational/billing/payment/approval states separate |
| EntityActivityTimeline / AuditDetail | Existing read-only redacted history for every appropriate entity; no historical event mutation |

ExpenseCategoryPicker and DocumentTypePicker support authorized custom management. TaxPreview and NumberingPreview display configured rules while internal IDs and external references remain separate. V1 auto-approval has no routine reviewer queue; bulk-import and manual-approval composites belong to V2. Backend checks are authoritative for all component actions.

## Final business-policy composite contracts

- TripPricingEditor/PricingSnapshot: CALCULATED_RATE recommended/selected valid references, quantity/unit/date basis, provisional/final gross snapshot; MANUAL_TOTAL amount/user/time with no synthetic unit rate. Additional permission and correction locks govern changes.
- ChargeBreakdown/AdjustmentEditor: preserve gross, multiple extensible fixed/percentage commission/deduction categories/bases, fixed/percentage discount, tax, rounding and other adjustment snapshots, net/final amount and audit links. Server validates all arithmetic and grants.
- QuantityConversion/ShortageSummary: original quantity/unit, normalized value/unit/conversion rule; loaded/delivered/difference, configurable shortage effect and Order Loaded/Delivered remaining basis.
- ManualOrderCompletion: orders.complete, unfinished-Trip warning and unchanged Trip statuses; scoped audit and separate Order/Trip display.
- ExpenseAllocationEditor: equal/compatible quantity/manual amount/manual percentage, target shares, explicit remainder and exact source-amount reconciliation; method/value history and expenses.allocate.
- InvoiceCorrectionReview: legal/business-permitted correction/reissue with original versions or linked Credit/Debit Note; required reason, relevant grants, effective billing/ledger/allocations and no duplicate billing/revenue.
- OwnerTransfer: protected authority plus owners.transfer, eligible user, always-active Owner constraint, concurrency feedback and audit; no custom-role shortcut.

Ledger/PaymentAllocation uses selected Bill To receivables under existing customer_ledger namespace and only same-currency invoice targets in V1. DocumentExpiry warns without expiry-only assignment blocking; future blocking settings remain V2. SummaryMetric/ReportChart label invoice-date management revenue separately from operational dates and cash receipt dates; profitability consumes allocated expense shares, excluding unallocated company costs. No history-purge component exists. These contracts remain unimplemented.
