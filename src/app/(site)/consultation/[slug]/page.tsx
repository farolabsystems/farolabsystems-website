import type { Metadata } from "next";

export const dynamic = "force-dynamic";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return [{ slug: "advisor" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return buildMetadata({
    title: "Book a consultation",
    description: "Placeholder consultation page.",
    path: `/consultation/${slug}`,
  });
}

export default function Page() {
  return <ConsultationPage kind="advisor" />;
}
