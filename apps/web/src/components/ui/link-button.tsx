import Link from "next/link";
import type { ComponentProps } from "react";
export function LinkButton({className="",variant="outline",...props}:ComponentProps<typeof Link> & {variant?:"primary"|"outline"|"ghost"}) {return <Link {...props} data-variant={variant} className={`button ${className}`}/>;}
