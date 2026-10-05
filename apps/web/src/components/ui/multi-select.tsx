"use client";
import {Checkbox} from "./checkbox";import type {Option} from "./combobox";
export function MultiSelect({label,options,value,onChange,disabled}:{label:string;options:Option[];value:string[];onChange:(ids:string[])=>void;disabled?:boolean}){return <fieldset className="stack" disabled={disabled}><legend>{label}</legend>{options.map(option=><label className="choice" key={option.id}><Checkbox checked={value.includes(option.id)} onChange={e=>onChange(e.target.checked?[...value,option.id]:value.filter(id=>id!==option.id))}/>{option.label}</label>)}</fieldset>;}
