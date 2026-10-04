import Link from "next/link";
import { ArrowRight, PanelsTopLeft } from "lucide-react";
import type { Placeholder } from "@transport-manager/shared";
import { fuelTabs } from "@/lib/navigation";

export function PlaceholderPage({
  title,
  description,
  fuel = false,
  activeTab,
}: Placeholder & { fuel?: boolean; activeTab?: string }) {
  return (
    <>
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
          Workspace / {fuel ? "Costs" : "Setup preview"}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
      {fuel && (
        <nav aria-label="Fuel Management" className="mb-6 flex flex-wrap gap-2">
          {fuelTabs.map((tab) => (
            <Link
              key={tab}
              href={`/fuel/${tab.toLowerCase()}`}
              aria-current={activeTab === tab ? "page" : undefined}
              className={`rounded-lg border px-4 py-2 text-sm ${activeTab === tab ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-400"}`}
            >
              {tab}
            </Link>
          ))}
        </nav>
      )}
      <section
        className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12"
        aria-labelledby="placeholder-heading"
      >
        <div className="mb-6 inline-flex rounded-2xl bg-slate-100 p-4 text-slate-500">
          <PanelsTopLeft size={30} aria-hidden="true" />
        </div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-amber-800">
          Placeholder · Not implemented
        </p>
        <h2
          id="placeholder-heading"
          className="text-xl font-semibold text-slate-900"
        >
          A place for {title.toLowerCase()}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
          This page establishes navigation only. Records, forms and reports are
          not available yet. No operational data is displayed.
        </p>
        <div className="mt-8 border-t border-slate-100 pt-6 text-sm text-slate-500">
          Planned functionality will be added in a later implementation phase.
        </div>
      </section>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-700"
      >
        Back to overview <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </>
  );
}
