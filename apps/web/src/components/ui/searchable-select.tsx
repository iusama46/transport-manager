"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import ReactSelect, {
  type SelectInstance,
  type StylesConfig,
} from "react-select";
import { Input } from "./input";
import { Button } from "./button";
import { FormField } from "../forms/form-field";

export type SearchableSelectOption = {
  id: string;
  label: string;
  secondaryLabel?: string;
  status?: string;
  icon?: ReactNode;
  disabled?: boolean;
  disabledReason?: string;
};
export type OptionPage<T = SearchableSelectOption> = {
  options: T[];
  hasMore: boolean;
};
export type OptionLoader<T = SearchableSelectOption> = (
  query: string,
  page: number,
  signal: AbortSignal,
) => Promise<OptionPage<T>>;

type Selection<T> =
  | { multiple?: false; value: T | null; onChange: (value: T | null) => void }
  | { multiple: true; value: readonly T[]; onChange: (value: T[]) => void };
type Source<T> =
  | {
      loadOptions: OptionLoader<T>;
      options?: never;
      searchMode?: never;
      loading?: never;
      searchError?: never;
      onRetry?: never;
      hasMore?: never;
      onLoadMore?: never;
    }
  | {
      loadOptions?: never;
      options: readonly T[];
      searchMode?: "local" | "external";
      loading?: boolean;
      searchError?: string;
      onRetry?: () => void | Promise<void>;
      hasMore?: boolean;
      onLoadMore?: () => void | Promise<void>;
    };
export type SearchableSelectProps<
  T extends SearchableSelectOption = SearchableSelectOption,
> = Selection<T> &
  Source<T> & {
    label: string;
    id?: string;
    name?: string;
    ref?: Ref<HTMLInputElement>;
    help?: string;
    error?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    clearable?: boolean;
    searchValue?: string;
    onSearch?: (query: string) => void;
    getOptionLabel?: (option: T) => string;
    getOptionValue?: (option: T) => string;
    renderOption?: (option: T) => ReactNode;
    filterOption?: (option: T, query: string) => boolean;
    /** Change when company, permissions or dependent parent scope changes. */
    resetKey?: string | number;
    debounceMs?: number;
    minSearchLength?: number;
    /** Bounds mounted options; larger collections use an accessible result window. */
    maxVisibleOptions?: number;
  };

const getLabel = (option: SearchableSelectOption) => option.label;
const getId = (option: SearchableSelectOption) => option.id;
const noOptions: never[] = [];

// Extends the original Combobox loader: cancel obsolete work and never expose old-scope pages.
function useOptionLoader<T>(
  loader: OptionLoader<T> | undefined,
  query: string,
  scope: string | number | undefined,
  enabled: boolean,
  debounceMs: number,
) {
  type Context = { query: string; scope: typeof scope; loader: typeof loader };
  type Result = Context &
    OptionPage<T> & { page: number; retry: number; error?: string };
  const [pagination, setPagination] = useState<Context & { page: number }>();
  const [result, setResult] = useState<Result>();
  const [retry, setRetry] = useState(0);
  const page =
    pagination?.query === query &&
    pagination.scope === scope &&
    pagination.loader === loader
      ? pagination.page
      : 0;
  const matches =
    result?.query === query &&
    result.scope === scope &&
    result.loader === loader;
  const loading =
    !!loader &&
    enabled &&
    (!matches || result.page !== page || result.retry !== retry);

  useEffect(() => {
    if (!loader || !enabled) return;
    const controller = new AbortController();
    const timer = setTimeout(
      async () => {
        try {
          const next = await loader(query, page, controller.signal);
          if (controller.signal.aborted) return;
          setResult((previous) => ({
            query,
            scope,
            loader,
            page,
            retry,
            hasMore: next.hasMore,
            options:
              page > 0 &&
              previous?.query === query &&
              previous.scope === scope &&
              previous.loader === loader
                ? [...previous.options, ...next.options]
                : next.options,
          }));
        } catch {
          if (controller.signal.aborted) return;
          setResult((previous) => ({
            query,
            scope,
            loader,
            page,
            retry,
            error: "Could not load options.",
            options:
              page > 0 &&
              previous?.query === query &&
              previous.scope === scope &&
              previous.loader === loader
                ? previous.options
                : [],
            hasMore: page > 0,
          }));
        }
      },
      Math.max(0, debounceMs),
    );
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [loader, query, scope, enabled, page, retry, debounceMs]);

  return {
    options: matches ? result.options : noOptions,
    hasMore: matches && result.hasMore,
    error: matches && result.retry === retry ? result.error : undefined,
    loading,
    retry: () => setRetry((value) => value + 1),
    more: () => setPagination({ query, scope, loader, page: page + 1 }),
  };
}

export function SearchableSelect<
  T extends SearchableSelectOption = SearchableSelectOption,
>(props: SearchableSelectProps<T>) {
  // Reset query/menu/page state when the authorized entity scope changes.
  return <SearchableSelectControl key={props.resetKey} {...props} />;
}

function SearchableSelectControl<T extends SearchableSelectOption>(
  props: SearchableSelectProps<T>,
) {
  const {
    label,
    id,
    name,
    help,
    error,
    placeholder = "Search and select…",
    disabled = false,
    readOnly = false,
    required = false,
    clearable = true,
    getOptionLabel = getLabel,
    getOptionValue = getId,
    renderOption,
    filterOption,
    resetKey,
    debounceMs = 0,
    minSearchLength = 0,
    maxVisibleOptions = 100,
  } = props;
  const generated = useId();
  const controlId = id ?? generated;
  const select = useRef<SelectInstance<T, boolean>>(null);
  const actionInFlight = useRef(false);
  const [actionPending, setActionPending] = useState(false);
  const [actionError, setActionError] = useState<string>();
  const [internalQuery, setInternalQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [window, setWindow] = useState<{ offset: number; query: string }>();
  const query = props.searchValue ?? internalQuery;
  const open = expanded && !disabled && !readOnly;
  const threshold = Math.max(0, minSearchLength);
  const enoughCharacters = query.trim().length >= threshold;
  const limit = Math.max(1, Math.floor(maxVisibleOptions) || 100);
  const loaded = useOptionLoader(
    props.loadOptions,
    query,
    resetKey,
    open && enoughCharacters,
    debounceMs,
  );
  const loading = props.loadOptions ? loaded.loading : !!props.loading;
  const searchError = props.loadOptions ? loaded.error : props.searchError;
  const hasMore = props.loadOptions ? loaded.hasMore : props.hasMore;
  const source = props.loadOptions ? loaded.options : props.options;
  const mode = props.searchMode ?? (props.onSearch ? "external" : "local");
  const seen = new Set<string>();
  const options = (source ?? noOptions).filter((option) => {
    const key = getOptionValue(option);
    if (seen.has(key)) return false;
    seen.add(key);
    if (props.loadOptions || mode === "external") return true;
    return filterOption
      ? filterOption(option, query)
      : [getOptionLabel(option), option.secondaryLabel, option.status]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase()
          .includes(query.trim().toLocaleLowerCase());
  });
  const selection = props.multiple
    ? props.value
    : props.value
      ? [props.value]
      : [];
  const selectedText = selection
    .map((option) =>
      [getOptionLabel(option), option.status].filter(Boolean).join(" — "),
    )
    .join(", ");
  const baseOffset = window?.query === query ? window.offset : 0;
  const offset = Math.min(
    baseOffset,
    Math.max(0, Math.floor((options.length - 1) / limit) * limit),
  );
  const visible = options.slice(offset, offset + limit);
  // External fetchers may retain previous results while a query is pending.
  const canChoose =
    enoughCharacters &&
    !searchError &&
    (!loading || (!!props.loadOptions && options.length > 0));

  const updateQuery = (next: string) => {
    if (props.searchValue === undefined) setInternalQuery(next);
    props.onSearch?.(next);
    setWindow(undefined);
    setActionError(undefined);
  };
  const runAction = async (
    callback: (() => void | Promise<void>) | undefined,
  ) => {
    if (!callback || actionInFlight.current || loading || disabled || readOnly)
      return;
    actionInFlight.current = true;
    setActionPending(true);
    setActionError(undefined);
    try {
      await callback();
    } catch {
      setActionError("Could not load options. Please retry.");
    } finally {
      actionInFlight.current = false;
      setActionPending(false);
    }
  };
  const content = (option: T) =>
    renderOption ? (
      renderOption(option)
    ) : (
      <span className="select-option-content">
        {option.icon && <span aria-hidden="true">{option.icon}</span>}
        <span className="select-option-text">
          <span>{getOptionLabel(option)}</span>
          {option.secondaryLabel && (
            <span className="supporting">{option.secondaryLabel}</span>
          )}
          {option.status && <span className="supporting">{option.status}</span>}
          {option.disabledReason && (
            <span className="supporting">{option.disabledReason}</span>
          )}
        </span>
      </span>
    );
  const status = !enoughCharacters
    ? `Type at least ${threshold} characters.`
    : searchError || actionError
      ? "Options could not be loaded."
      : loading || actionPending
        ? "Loading options…"
        : !options.length
          ? query.trim()
            ? "No matching options."
            : "No available options."
          : `${options.length} options available${hasMore ? "; more can be loaded" : ""}.`;
  const styles: StylesConfig<T, boolean> = {
    control: (base, state) => ({
      ...base,
      minHeight: "var(--control-default)",
      backgroundColor: disabled ? "var(--secondary)" : "var(--surface)",
      borderRadius: "var(--radius-control)",
      borderColor: error
        ? "var(--error)"
        : state.isFocused
          ? "var(--focus-ring)"
          : "var(--input-border)",
      boxShadow: state.isFocused ? "0 0 0 2px var(--focus-ring)" : "none",
      ":hover": { borderColor: error ? "var(--error)" : "var(--focus-ring)" },
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      backgroundColor: "var(--surface)",
      border: "1px solid var(--input-border)",
      borderRadius: "var(--radius-control)",
      boxShadow: "var(--shadow-overlay)",
    }),
    option: (base, state) => ({
      ...base,
      minHeight: 44,
      overflowWrap: "anywhere",
      backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
          ? "var(--info-background)"
          : "var(--surface)",
      color: state.isDisabled
        ? "var(--muted-foreground)"
        : state.isSelected
          ? "var(--primary-foreground)"
          : "var(--foreground)",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      ":active": {
        backgroundColor: "var(--info-background)",
        color: "var(--foreground)",
      },
    }),
    singleValue: (base) => ({
      ...base,
      whiteSpace: "normal",
      overflow: "visible",
      color: disabled ? "var(--muted-foreground)" : "var(--foreground)",
      overflowWrap: "anywhere",
    }),
    input: (base) => ({ ...base, color: "var(--foreground)" }),
    placeholder: (base) => ({ ...base, color: "var(--muted-foreground)" }),
    multiValue: (base) => ({
      ...base,
      maxWidth: "100%",
      backgroundColor: "var(--secondary)",
      borderRadius: "var(--radius-control)",
    }),
    multiValueLabel: (base) => ({
      ...base,
      whiteSpace: "normal",
      overflowWrap: "anywhere",
      color: "var(--foreground)",
    }),
    multiValueRemove: (base) => ({
      ...base,
      minWidth: 44,
      minHeight: 44,
      justifyContent: "center",
      display: clearable ? "flex" : "none",
      ":hover": {
        backgroundColor: "var(--error-background)",
        color: "var(--error)",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      minWidth: 44,
      minHeight: 44,
      justifyContent: "center",
      color: "var(--muted-foreground)",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      minWidth: 44,
      minHeight: 44,
      justifyContent: "center",
      color: "var(--muted-foreground)",
    }),
  };

  return (
    <FormField
      id={controlId}
      label={label}
      help={help}
      error={error}
      required={required}
    >
      {(field) => (
        <div className="searchable-select">
          {readOnly ? (
            <Input
              {...field}
              ref={props.ref}
              value={selectedText}
              readOnly
              disabled={disabled}
              aria-readonly="true"
            />
          ) : (
            <ReactSelect<T, boolean>
              ref={(instance) => {
                select.current = instance;
                const input = instance?.inputRef ?? null;
                if (typeof props.ref === "function") props.ref(input);
                else if (props.ref) props.ref.current = input;
              }}
              instanceId={controlId}
              inputId={controlId}
              aria-describedby={field["aria-describedby"]}
              aria-invalid={field["aria-invalid"]}
              aria-errormessage={error ? `${controlId}-error` : undefined}
              required={required}
              isDisabled={disabled}
              isClearable={clearable}
              isMulti={!!props.multiple}
              isSearchable
              blurInputOnSelect={false}
              backspaceRemovesValue={clearable}
              tabSelectsValue={false}
              closeMenuOnSelect={!props.multiple}
              hideSelectedOptions={false}
              openMenuOnFocus
              menuPlacement="auto"
              maxMenuHeight={280}
              menuIsOpen={open}
              inputValue={query}
              value={props.value}
              options={
                enoughCharacters && (!loading || props.loadOptions)
                  ? visible
                  : []
              }
              isLoading={loading || actionPending}
              styles={styles}
              filterOption={null}
              getOptionLabel={getOptionLabel}
              getOptionValue={getOptionValue}
              isOptionDisabled={(option) => !!option.disabled || !canChoose}
              formatOptionLabel={(option, meta) =>
                meta.context === "menu"
                  ? content(option)
                  : [getOptionLabel(option), option.status]
                      .filter(Boolean)
                      .join(" — ")
              }
              placeholder={placeholder}
              noOptionsMessage={() => status}
              loadingMessage={() => status}
              onInputChange={(next, meta) => {
                if (
                  meta.action === "input-change" ||
                  meta.action === "set-value"
                )
                  updateQuery(next);
              }}
              onMenuOpen={() => setExpanded(true)}
              onMenuClose={() => setExpanded(false)}
              onChange={(next) => {
                if (disabled) return;
                if (props.multiple)
                  props.onChange(Array.isArray(next) ? ([...next] as T[]) : []);
                else props.onChange(next as T | null);
              }}
            />
          )}
          {name &&
            selection.map((option) => (
              <input
                key={getOptionValue(option)}
                type="hidden"
                name={name}
                value={getOptionValue(option)}
              />
            ))}
          {!disabled && !readOnly && (
            <>
              {open && (
                <p className="supporting" role="status" aria-live="polite">
                  {status}
                </p>
              )}
              {(searchError || actionError) && (
                <div className="inline-error" role="alert">
                  {searchError || actionError}
                  <Button
                    variant="outline"
                    onClick={() => {
                      setExpanded(true);
                      if (props.loadOptions) loaded.retry();
                      else void runAction(props.onRetry);
                    }}
                    disabled={
                      (!props.loadOptions && !props.onRetry) ||
                      loading ||
                      actionPending
                    }
                  >
                    Retry {label} options
                  </Button>
                </div>
              )}
              {!searchError && options.length > limit && (
                <div className="actions">
                  <p className="supporting">
                    Showing {offset + 1}–
                    {Math.min(offset + limit, options.length)} of{" "}
                    {options.length} results
                  </p>
                  <Button
                    variant="ghost"
                    disabled={offset === 0 || loading}
                    onClick={() => {
                      setWindow({ offset: Math.max(0, offset - limit), query });
                      select.current?.focus();
                      setExpanded(true);
                    }}
                  >
                    Previous {label} results
                  </Button>
                  <Button
                    variant="ghost"
                    disabled={offset + limit >= options.length || loading}
                    onClick={() => {
                      setWindow({ offset: offset + limit, query });
                      select.current?.focus();
                      setExpanded(true);
                    }}
                  >
                    Next {label} results
                  </Button>
                </div>
              )}
              {enoughCharacters && hasMore && !searchError && (
                <Button
                  variant="ghost"
                  disabled={loading || actionPending}
                  onClick={() => {
                    setExpanded(true);
                    if (props.loadOptions) loaded.more();
                    else void runAction(props.onLoadMore);
                  }}
                >
                  Load more {label} options
                </Button>
              )}
            </>
          )}
        </div>
      )}
    </FormField>
  );
}
