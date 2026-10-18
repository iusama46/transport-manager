"use client";
import * as Primitive from "@radix-ui/react-dialog";
import type {ReactNode} from "react";
import {Button} from "./button";
// shadcn-style owned composition over Radix's accessible primitive.
export function Dialog({trigger,title,description,children,open,onOpenChange,kind="dialog"}:{trigger?:ReactNode;title:string;description:string;children:ReactNode;open?:boolean;onOpenChange?:(open:boolean)=>void;kind?:"dialog"|"drawer"}){return <Primitive.Root open={open} onOpenChange={onOpenChange}>{trigger&&<Primitive.Trigger asChild>{trigger}</Primitive.Trigger>}<Primitive.Portal><Primitive.Overlay className="overlay"/><Primitive.Content className={`dialog ${kind}`}><Primitive.Title asChild><h2>{title}</h2></Primitive.Title><Primitive.Description className="muted">{description}</Primitive.Description>{children}<Primitive.Close asChild><Button variant="outline">Close</Button></Primitive.Close></Primitive.Content></Primitive.Portal></Primitive.Root>;}
