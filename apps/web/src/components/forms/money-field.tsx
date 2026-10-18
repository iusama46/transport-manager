"use client";
import {NumberField} from "./number-field";import type {TextFieldProps} from "./text-field";
export function MoneyField({currency,label,...props}:Omit<TextFieldProps,"type"> & {currency:string}){return <NumberField {...props} label={`${label} (${currency})`}/>;}
