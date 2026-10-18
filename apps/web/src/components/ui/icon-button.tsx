import { Button, type ButtonProps } from "./button";
export function IconButton({label,...props}: Omit<ButtonProps,"aria-label"> & {label:string}) {return <Button {...props} aria-label={label} className={`icon-button ${props.className??""}`}/>;}
