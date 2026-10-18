"use client";
import { useEffect, useRef, type ComponentProps } from "react";
export function Checkbox({indeterminate=false,ref,...props}:Omit<ComponentProps<"input">,"type"> & {indeterminate?:boolean}) {
 const local=useRef<HTMLInputElement>(null);useEffect(()=>{if(local.current)local.current.indeterminate=indeterminate;},[indeterminate]);
 return <input {...props} type="checkbox" className={`check ${props.className??""}`} ref={node=>{local.current=node;if(typeof ref==="function")return ref(node);else if(ref)ref.current=node;}} aria-checked={indeterminate?"mixed":props.checked}/>;
}
