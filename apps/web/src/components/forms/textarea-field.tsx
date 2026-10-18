"use client";
import {Textarea} from "../ui/textarea";import {FormField,type FieldProps} from "./form-field";import type {ComponentProps} from "react";
export function TextareaField({label,help,error,id,required,showCount,...props}:FieldProps & ComponentProps<typeof Textarea> & {showCount?:boolean}){return <FormField {...{label,help,error,id,required}}>{field=><><Textarea {...props} {...field}/>{showCount&&<span className="supporting">{String(props.value??"").length}{props.maxLength?` / ${props.maxLength}`:""} characters</span>}</>}</FormField>;}
