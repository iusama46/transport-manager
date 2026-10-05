import type {ReactNode} from "react";
export function FormSection({title,children}:{title:string;children:ReactNode}){return <fieldset className="form-section"><legend>{title}</legend><div className="form-grid">{children}</div></fieldset>;}
