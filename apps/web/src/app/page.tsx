import Link from "next/link";
import { ArrowRight, LayoutDashboard, Route, Wallet, Fuel } from "lucide-react";
export default function Overview() {
  return (
    <>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
        Your workspace
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">
        Overview
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        A central place for transport operations, costs and accounts.
      </p>
      <section
        className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 sm:p-10"
        aria-labelledby="overview-placeholder"
      >
        <div className="mb-6 inline-flex rounded-xl bg-blue-50 p-3 text-blue-700">
          <LayoutDashboard size={28} aria-hidden="true" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-800">
          Placeholder · Not implemented
        </p>
        <h2
          id="overview-placeholder"
          className="mt-3 text-2xl font-semibold tracking-tight"
        >
          The workspace foundation is ready.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Use the navigation to explore the planned sections. Operational
          summaries, reminders and balances will appear here after their
          workflows are implemented. No operational data is displayed.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
          <span className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-600">
            Navigation available
          </span>
          <span className="rounded-md bg-slate-100 px-3 py-2 text-xs text-slate-600">
            Data workflows pending
          </span>
        </div>
      </section>
      <h2 className="mb-4 mt-10 text-sm font-semibold text-slate-900">
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
            className="group rounded-xl border border-slate-200 bg-white p-6 hover:border-blue-400"
          >
            <Icon
              size={22}
              className="mb-5 text-slate-500"
              aria-hidden="true"
            />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            <span className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-700">
              View placeholder <ArrowRight size={14} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
