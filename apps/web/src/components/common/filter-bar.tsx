import type {ReactNode} from "react";import {Button} from "../ui/button";
export function FilterBar({children,onClear}:{children:ReactNode;onClear:()=>void}){return <div role="group" aria-label="Filters" className="filter-bar">{children}<Button variant="outline" onClick={onClear}>Clear filters</Button></div>;}
