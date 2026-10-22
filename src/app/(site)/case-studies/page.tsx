import type { Metadata } from "next";
import { CaseStudiesPage } from "@/website-theme/pages/case-studies/CaseStudiesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Case studies",
  description: "Selected product work across industries and services.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPage />;
}
