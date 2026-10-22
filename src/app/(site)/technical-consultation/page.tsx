import type { Metadata } from "next";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technical consultation",
  description: "Bring an architecture question or an estimate you want a second look at.",
  path: "/technical-consultation",
});

export default function Page() {
  return <ConsultationPage kind="technical" />;
}
