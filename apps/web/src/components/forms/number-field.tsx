"use client";
import {TextField,type TextFieldProps} from "./text-field";
// Deliberately textual: blank, trailing decimal and leading zeroes survive editing.
export function NumberField(props:Omit<TextFieldProps,"type">){return <TextField inputMode="decimal" {...props} type="text"/>;}
