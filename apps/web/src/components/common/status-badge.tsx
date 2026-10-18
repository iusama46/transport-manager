import type {ReactNode} from "react";import type {Tone} from "../ui/alert";
export function StatusBadge({tone="info",children}:{tone?:Tone;children:ReactNode}){return <span className="badge" data-tone={tone}>{children}</span>;}
