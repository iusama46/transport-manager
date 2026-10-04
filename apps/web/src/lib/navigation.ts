import { placeholderSchema, type Placeholder } from "@transport-manager/shared";

export type Section = Placeholder & { slug: string; group: string };
const entries = [
  [
    "",
    "Overview",
    "Workspace",
    "Operational summaries, collections, balances and reminders will appear here once the underlying workflows are implemented.",
  ],
  [
    "orders",
    "Orders & Deliveries",
    "Operations",
    "Manage cargo, routes, stops, assignments and delivery progress.",
  ],
  [
    "outsourced-orders",
    "Outsourced Orders",
    "Operations",
    "Review partner fulfilment through a filtered view of the same order records. Settlement rules remain open.",
  ],
  [
    "companies",
    "Companies & Transport Partners",
    "Directory",
    "Maintain the operating company, external vehicle owners and transport partners.",
  ],
  [
    "factories",
    "Factories",
    "Directory",
    "Manage factory contacts, pickup locations and order history.",
  ],
  [
    "customers",
    "Customers & Consignees",
    "Directory",
    "Manage direct customers and their linked consignees (receivers).",
  ],
  [
    "vehicles",
    "Vehicles",
    "Directory",
    "Manage registrations, ownership, assignments and vehicle history.",
  ],
  [
    "drivers",
    "Drivers",
    "Directory",
    "Manage driver profiles, licences, availability and assignments.",
  ],
  [
    "fuel",
    "Fuel Management",
    "Costs",
    "Manage suppliers, branches, purchases, payments and reconciled statements.",
  ],
  [
    "maintenance",
    "Maintenance & Expenses",
    "Costs",
    "Record repairs, operating expenses and service reminders.",
  ],
  [
    "billing",
    "Billing & Invoices",
    "Finance",
    "Prepare transport bills and multipage invoices after billing rules are confirmed.",
  ],
  [
    "payments",
    "Payments & Settlements",
    "Finance",
    "Track customer receipts and partner or supplier payments independently.",
  ],
  [
    "reports",
    "Reports",
    "Insights",
    "Explore statements and operational reports linked to their contributing records.",
  ],
  [
    "import-export",
    "Data Import & Export",
    "Administration",
    "Map, preview and validate source files before reviewed imports and exports.",
  ],
  [
    "users",
    "Users & Permissions",
    "Administration",
    "Manage staff access and audit history after authentication and roles are agreed.",
  ],
  [
    "settings",
    "Business Settings",
    "Administration",
    "Configure business identity, locale, numbering and categories after confirmation.",
  ],
] as const;
export const sections: Section[] = entries.map(
  ([slug, title, group, description]) => ({
    slug,
    group,
    ...placeholderSchema.parse({ title, description, status: "planned" }),
  }),
);
export const fuelTabs = [
  "Suppliers",
  "Branches",
  "Purchases",
  "Payments",
  "Statements",
] as const;
