import Link from "next/link";
export function Breadcrumbs({items}:{items:{label:string;href?:string}[]}){return <nav aria-label="Breadcrumb"><ol className="breadcrumbs">{items.map((item,i)=><li key={i}>{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</li>)}</ol></nav>;}
