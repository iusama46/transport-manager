"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Truck, Menu, X, ArrowUpRight } from "lucide-react";
import { sections } from "@/lib/navigation";

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const groups = [...new Set(sections.map((section) => section.group))];
  return (
    <aside className="border-r border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:w-72 lg:overflow-y-auto">
      <div className="flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 font-semibold tracking-tight text-slate-900"
        >
          <span className="rounded-xl bg-blue-700 p-2 text-white">
            <Truck size={22} aria-hidden="true" />
          </span>
          <span>
            Transport Manager
            <span className="mt-0.5 block text-xs font-normal tracking-normal text-slate-500">
              Web workspace
            </span>
          </span>
        </Link>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-600 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <nav
        id="main-navigation"
        aria-label="Main navigation"
        className={`${open ? "block" : "hidden"} px-3 pb-6 lg:block`}
      >
        {groups.map((group) => (
          <div key={group} className="mt-5">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
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
                    className={`my-0.5 flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[13px] leading-5 ${active ? "bg-blue-50 font-semibold text-blue-800" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"}`}
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
