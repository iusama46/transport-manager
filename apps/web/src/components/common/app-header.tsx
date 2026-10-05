import {StatusBadge} from "./status-badge";
export function AppHeader(){return <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-4 py-3 md:px-6"><span className="text-sm font-medium">Transport workspace</span><StatusBadge tone="warning">Setup preview · No live data</StatusBadge></header>;}
