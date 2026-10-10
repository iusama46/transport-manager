"use client";

// Compatibility exports only: both names use the same SearchableSelect implementation.
export { SearchableSelect as Combobox } from "./searchable-select";
export type {
  SearchableSelectOption as Option,
  OptionPage,
  OptionLoader,
} from "./searchable-select";
