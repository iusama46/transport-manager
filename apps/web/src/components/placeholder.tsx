import {PageHeader} from "./common/page-header";
import {Breadcrumbs} from "./common/breadcrumbs";
import {StatusBadge} from "./common/status-badge";
import {LinkButton} from "./ui/link-button";
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
      <Breadcrumbs items={[{label:"Workspace",href:"/"},{label:fuel?"Costs":"Setup preview"}]}/>
      <PageHeader title={title} description={description}/>
      {fuel && (
        <nav aria-label="Fuel Management" className="mb-6 flex flex-wrap gap-2">
          {fuelTabs.map((tab) => (
            <LinkButton
              variant={activeTab === tab ? "primary" : "outline"}
              key={tab}
              href={`/fuel/${tab.toLowerCase()}`}
              aria-current={activeTab === tab ? "page" : undefined}

            >
              {tab}
            </LinkButton>
          ))}
        </nav>
      )}
      <section
        className="rounded-xl border border-border bg-surface p-8 sm:p-12"
        aria-labelledby="placeholder-heading"
      >
        <div className="mb-6 inline-flex rounded-xl bg-secondary p-4 text-background0">
          <PanelsTopLeft size={30} aria-hidden="true" />
        </div>
        <StatusBadge tone="warning">Placeholder · Not implemented</StatusBadge>
        <h2
          id="placeholder-heading"
          className="text-xl font-semibold text-foreground"
        >
          A place for {title.toLowerCase()}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          This page establishes navigation only. Records, forms and reports are
          not available yet. No operational data is displayed.
        </p>
        <div className="mt-8 border-t border-secondary pt-6 text-sm text-background0">
          Planned functionality will be added in a later implementation phase.
        </div>
      </section>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
      >
        Back to overview <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </>
  );
}
