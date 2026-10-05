# Reusable Components
Updated: 5 October 2026
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
| QuantityField | Decimal string plus explicit unit; precision independent of currency |
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
| ConsigneePicker | Filter by customer; clear/remap invalid selection when customer changes |
| VehiclePicker | Show availability and owner separately from subcontractor |
| DriverPicker | Show availability/licence indicators according to agreed rules |
| TransportPartnerPicker | Select external order fulfiller |
| FuelSupplierPicker | Select supplier |
| FuelBranchPicker | Require supplier; show only its branches; reject stale search results |
| OrderStopsEditor | Add/remove/reorder beyond four stops, with keyboard move controls |
| FuelPurchaseForm | Supplier, branch, vehicle, litres/rate and cost preview; one transaction across entry screens |
| PaymentAllocationForm | Branch or central payment, purchase allocations, remaining amount and explicit unallocated credit |
| InvoiceOrderPicker | Billing account and eligible orders, with exclusion reasons |
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
