"use client";
import { Input } from "../ui/input";
import { FormField,type FieldProps } from "./form-field";
import type {ComponentProps} from "react";
export type TextFieldProps=FieldProps & ComponentProps<typeof Input>;
export function TextField({label,help,error,id,required,...props}:TextFieldProps){return <FormField {...{label,help,error,id,required}}>{field=><Input {...props} {...field}/>}</FormField>;}
