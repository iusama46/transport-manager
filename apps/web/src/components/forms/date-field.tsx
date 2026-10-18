"use client";
import {TextField,type TextFieldProps} from "./text-field";
export function DateField({value,onValueChange,...props}:Omit<TextFieldProps,"type"|"value"|"onChange"> & {value:string|null;onValueChange:(value:string|null)=>void}){return <TextField {...props} type="date" value={value??""} onChange={e=>onValueChange(e.target.value||null)}/>;}
