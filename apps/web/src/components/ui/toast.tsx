"use client";
import type {ReactNode} from "react";import {Button} from "./button";
export function Toast({children,onDismiss}:{children:ReactNode;onDismiss:()=>void}){return <div className="toast" role="status">{children}<Button variant="ghost" size="sm" onClick={onDismiss}>Dismiss</Button></div>;}
