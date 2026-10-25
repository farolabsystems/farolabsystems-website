import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "@/website-theme/data/services";
import { getService } from "@/modules/catalog/catalog.service";
import { ServicePage } from "@/website-theme/pages/services/ServicePage";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  return buildMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${slug}` });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  return <ServicePage service={service} />;
}
