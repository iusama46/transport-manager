import type {ComponentProps} from "react";
export function Switch({label,...props}:Omit<ComponentProps<"input">,"type"> & {label:string}) {return <label className="choice"><input {...props} type="checkbox" role="switch" className="check"/>{label}</label>;}
