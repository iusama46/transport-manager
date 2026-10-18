import {notFound} from "next/navigation";
export default async function ComponentsPage(){
 if(process.env.NODE_ENV!=="development")notFound();
 const {ComponentShowcase}=await import("./showcase");
 return <ComponentShowcase/>;
}
