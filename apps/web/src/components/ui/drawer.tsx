import {Dialog} from "./dialog";import type {ComponentProps} from "react";
export function Drawer(props:Omit<ComponentProps<typeof Dialog>,"kind">){return <Dialog {...props} kind="drawer"/>;}
