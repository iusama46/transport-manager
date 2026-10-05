"use client";
import type { ComponentProps } from "react";
import { LoaderCircle } from "lucide-react";
export type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive"; size?: "sm" | "default" | "lg"; loading?: boolean };
export function Button({variant="primary",size="default",loading=false,disabled,children,className="",onClick,type="button",...props}: ButtonProps) {
 return <button {...props} type={type} disabled={disabled} aria-disabled={disabled || loading || undefined} aria-busy={loading || undefined} data-variant={variant} data-size={size} className={`button ${className}`} onClick={e=>{if(loading){e.preventDefault();return;}onClick?.(e);}}><span className={loading?"invisible":""}>{children}</span>{loading && <span className="button-progress" role="status"><LoaderCircle size={20} className="spin" aria-hidden="true"/><span className="sr-only">Loading</span></span>}</button>;
}
