"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButton } from "@/components/ui/icon-button";
import { useState } from "react";
import { Truck, Menu, X, ArrowUpRight } from "lucide-react";
import { sections } from "@/lib/navigation";

export function AppSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = [...new Set(sections.map((section) => section.group))];
  return (
    <aside className="border-r border-border bg-surface lg:fixed lg:inset-y-0 lg:w-60 lg:overflow-y-auto">
      <div className="flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 font-semibold tracking-tight text-foreground"
        >
          <span className="rounded-xl bg-primary p-2 text-primary-foreground">
            <Truck size={22} aria-hidden="true" />
          </span>
          <span>
            Transport Manager
            <span className="mt-0.5 block text-xs font-normal tracking-normal text-background0">
              Web workspace
            </span>
          </span>
        </Link>
        <IconButton
          variant="ghost"
          className="rounded-lg p-2 text-muted-foreground lg:hidden"
          label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </IconButton>
      </div>
      <nav
        onKeyDown={(event) => { if(event.key === "Escape") { setOpen(false); document.querySelector<HTMLButtonElement>('[aria-controls="main-navigation"]')?.focus(); } }}
        id="main-navigation"
        aria-label="Main navigation"
        className={`${open ? "block" : "hidden"} px-3 pb-6 lg:block`}
      >
        {groups.map((group) => (
          <div key={group} className="mt-5">
            <p className="mb-2 px-3 text-xs font-bold uppercase tracking-[0.16em] text-background0">
              {group}
            </p>
            {sections
              .filter((section) => section.group === group)
              .map((section) => {
                const href = `/${section.slug}`;
                const active =
                  pathname === href ||
                  (section.slug !== "" && pathname.startsWith(`${href}/`));
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`my-0.5 flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm leading-5 ${active ? "bg-info-background font-semibold text-info" : "text-muted-foreground hover:bg-background hover:text-foreground"}`}
                  >
                    {section.title}
                    {active && (
                      <ArrowUpRight
                        size={14}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
