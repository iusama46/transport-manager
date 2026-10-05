import type { Metadata } from "next";
import { AppSidebar } from "@/components/common/app-sidebar";
import {AppHeader} from "@/components/common/app-header";
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
        <AppSidebar />
        <div className="lg:pl-60">
          <AppHeader />
          <main
            id="main-content"
            tabIndex={-1}
            className="mx-auto max-w-7xl px-4 py-6 md:px-6"
          >
            {children}
          </main>
          <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground md:px-6">
            Transport Manager · Foundation phase
          </footer>
        </div>
      </body>
    </html>
  );
}
