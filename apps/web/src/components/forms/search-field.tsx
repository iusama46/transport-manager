"use client";
import {TextField} from "./text-field";import {Button} from "../ui/button";
export function SearchField({label="Search",value,onChange}:{label?:string;value:string;onChange:(value:string)=>void}){return <div className="search-field"><TextField label={label} type="search" value={value} onChange={e=>onChange(e.target.value)}/><Button variant="ghost" disabled={!value} onClick={()=>onChange("")}>Clear search</Button></div>;}
