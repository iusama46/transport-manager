import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/placeholder";
import { fuelTabs } from "@/lib/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return fuelTabs.map((tab) => ({ tab: tab.toLowerCase() }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  return {
    title: `Fuel ${fuelTabs.find((title) => title.toLowerCase() === tab) ?? "Management"}`,
  };
}
export default async function FuelTab({
  params,
}: {
  params: Promise<{ tab: string }>;
}) {
  const { tab } = await params;
  const title = fuelTabs.find((item) => item.toLowerCase() === tab);
  if (!title) notFound();
  return (
    <PlaceholderPage
      title={`Fuel ${title}`}
      description="Planned fuel supplier and branch workflows, including branch payments and central supplier payments allocated to individual purchases."
      status="planned"
      fuel
      activeTab={title}
    />
  );
}
