import {DropdownMenu} from "../ui/dropdown-menu";
export function ColumnVisibilityMenu({columns,onToggle}:{columns:{id:string;label:string;visible:boolean}[];onToggle:(id:string)=>void}){return <DropdownMenu label="Columns" items={columns.map(column=>({label:column.label,checked:column.visible,onSelect:()=>onToggle(column.id)}))}/>;}
