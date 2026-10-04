import { notFound } from "next/navigation";
import { PlaceholderPage } from "@/components/placeholder";
import { sections } from "@/lib/navigation";
export const dynamicParams = false;
export function generateStaticParams() {
  return sections
    .filter(({ slug }) => slug)
    .map(({ slug }) => ({ section: slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title:
      sections.find(({ slug }) => slug === section)?.title ?? "Page not found",
  };
}
export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const entry = sections.find(({ slug }) => slug === section);
  if (!entry) notFound();
  return <PlaceholderPage {...entry} fuel={section === "fuel"} />;
}
