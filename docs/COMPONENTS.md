# Reusable Components
Updated: 9 October 2026
Status: Implementation specification; components are not yet claimed as implemented.

## Ownership and file structure

Follow DESIGN.md for tokens and sizing. Use shadcn/ui as the primitive foundation with one consistent project API. Each component has its own file and clear responsibility. Button variants share one Button implementation rather than separate duplicated primary/secondary buttons.

| Folder | Separate component files |
|---|---|
| apps/web/src/components/ui | button.tsx, input.tsx, textarea.tsx, select.tsx, checkbox.tsx, radio-group.tsx, switch.tsx, dialog.tsx, drawer.tsx, tooltip.tsx |
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

Select handles short fixed options. Combobox handles searchable entities, ID values, pagination, loading/error/retry and keyboard selection. MultiSelect is only used where multiple choices are explicitly supported. Checkbox supports indeterminate state for partial table selection. RadioGroup gives a labelled single choice. Switch represents a binary setting with visible persistence feedback.

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

| Component | Separate responsibility |
|---|---|
| CustomerPicker | Select direct customer by stable ID |
| ConsigneePicker | Filter potential Order receivers by customer; support multiple potential Consignees and actual Trip receiver/destination; clear/remap incompatible selection without changing history |
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

These composites and their integration remain unimplemented. Contracts follow PERMISSIONS.md, AUDIT.md and DESIGN.md; test stale permissions, denied views/exports and sensitive-field masking as well as accessibility.

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
