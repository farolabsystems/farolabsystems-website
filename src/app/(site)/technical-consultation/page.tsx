import type { Metadata } from "next";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technical Consultation | Farolab Systems",
  description: "Discuss architecture, modernization, cloud or product decisions with Farolab Systems and leave with a clearer next step.",
  path: "/technical-consultation",
});

export default function Page() {
  return <ConsultationPage kind="technical" />;
}
