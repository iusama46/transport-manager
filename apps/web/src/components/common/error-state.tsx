import {Alert} from "../ui/alert";import {Button} from "../ui/button";
export function ErrorState({message,onRetry,stale=false}:{message:string;onRetry?:()=>void;stale?:boolean}){return <Alert tone="error" title="Unable to load">{message}{stale&&<p>Previously loaded data is shown and may be out of date.</p>}{onRetry&&<Button variant="outline" onClick={onRetry}>Retry</Button>}</Alert>;}
