"use client";
import {useState} from "react";import {TextField,type TextFieldProps} from "./text-field";import {Button} from "../ui/button";
export function PasswordField(props:Omit<TextFieldProps,"type">){const [visible,setVisible]=useState(false);return <div className="stack"><TextField autoComplete="current-password" {...props} type={visible?"text":"password"}/><Button variant="ghost" size="sm" disabled={props.disabled} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible?"Hide":"Show"} password</Button></div>;}
