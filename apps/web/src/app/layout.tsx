import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Transport Manager", template: "%s | Transport Manager" },
  description: "Transport management workspace — setup preview.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Sidebar />
        <div className="lg:pl-72">
          <header className="flex min-h-20 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4 sm:px-10">
            <span className="text-sm font-medium text-slate-600">
              Transport workspace
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
              Setup preview · No live data
            </span>
          </header>
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto max-w-7xl px-6 py-10 sm:px-10"
          >
            {children}
          </main>
          <footer className="mx-auto max-w-7xl px-6 pb-8 text-xs text-slate-500 sm:px-10">
            Transport Manager · Foundation phase
          </footer>
        </div>
      </body>
    </html>
  );
}
