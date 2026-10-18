import type {ReactNode} from "react";
export function PageHeader({title,description,actions}:{title:string;description?:string;actions?:ReactNode}){return <div className="page-header"><div><h1>{title}</h1>{description&&<p className="muted">{description}</p>}</div>{actions&&<div className="actions">{actions}</div>}</div>;}
