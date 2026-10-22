import type { Metadata } from "next";
import { CaseStudiesPage } from "@/website-theme/pages/case-studies/CaseStudiesPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Demo Case Studies | Farolab Systems",
  description: "Concept projects that show how Farolab Systems approaches product design and software engineering. These are not client engagements.",
  path: "/case-studies",
});

export default function Page() {
  return <CaseStudiesPage />;
}
