import {Skeleton} from "../ui/skeleton";
export function LoadingState({label="Loading records…"}:{label?:string}){return <div role="status" aria-busy="true" className="stack"><p>{label}</p><Skeleton/><Skeleton/></div>;}
