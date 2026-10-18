import type {ComponentProps} from "react";
export function ButtonGroup(props:ComponentProps<"div">){return <div {...props} className={`actions ${props.className??""}`}/>;}
