"use client";
import {NumberField} from "./number-field";import type {TextFieldProps} from "./text-field";
export function QuantityField({unit,label,...props}:Omit<TextFieldProps,"type"> & {unit:string}){return <NumberField {...props} label={`${label} (${unit})`}/>;}
