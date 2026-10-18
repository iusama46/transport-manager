import type {ReactNode} from "react";
export type Tone="info"|"success"|"warning"|"error";
export function Alert({tone="info",title,children}:{tone?:Tone;title:string;children?:ReactNode}){return <div className="alert" data-tone={tone} role={tone==="error"?"alert":"status"}><strong>{title}</strong>{children&&<div>{children}</div>}</div>;}
