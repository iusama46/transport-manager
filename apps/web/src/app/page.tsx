import {PageHeader} from "@/components/common/page-header";
import {StatusBadge} from "@/components/common/status-badge";
import {LinkButton} from "@/components/ui/link-button";
import Link from "next/link";
import { ArrowRight, LayoutDashboard, Route, Wallet, Fuel } from "lucide-react";
export default function Overview() {
  return (
    <>
      <PageHeader title="Overview" description="A central place for transport operations, costs and accounts." actions={process.env.NODE_ENV === "development" ? <LinkButton href="/dev/components">Component showcase</LinkButton>:undefined}/>
      <section
        className="mt-8 rounded-xl border border-border bg-surface p-8 sm:p-10"
        aria-labelledby="overview-placeholder"
      >
        <div className="mb-6 inline-flex rounded-xl bg-info-background p-3 text-primary">
          <LayoutDashboard size={28} aria-hidden="true" />
        </div>
        <StatusBadge tone="warning">Placeholder · Not implemented</StatusBadge>
        <h2
          id="overview-placeholder"
          className="mt-3 text-xl font-semibold tracking-tight"
        >
          The workspace foundation is ready.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Use the navigation to explore the planned sections. Operational
          summaries, reminders and balances will appear here after their
          workflows are implemented. No operational data is displayed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-secondary pt-6">
          <span className="rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
            Navigation available
          </span>
          <span className="rounded-md bg-secondary px-3 py-2 text-xs text-muted-foreground">
            Data workflows pending
          </span>
        </div>
      </section>
      <h2 className="mb-4 mt-10 text-sm font-semibold text-foreground">
        Explore planned workflows
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Orders & Deliveries",
            href: "/orders",
            icon: Route,
            text: "From pickup to delivery, with stops and assignments.",
          },
          {
            title: "Fuel Management",
            href: "/fuel",
            icon: Fuel,
            text: "Suppliers, branches, purchases and statements.",
          },
          {
            title: "Payments & Settlements",
            href: "/payments",
            icon: Wallet,
            text: "Separate customer collections and partner payments.",
          },
        ].map(({ title, href, icon: Icon, text }) => (
          <Link
            key={href}
            href={href}
            className="group rounded-xl border border-border bg-surface p-6 hover:border-input-border"
          >
            <Icon
              size={22}
              className="mb-5 text-background0"
              aria-hidden="true"
            />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            <span className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
              View placeholder <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
