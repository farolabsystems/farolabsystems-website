import type { Metadata } from "next";
import { CareerPage } from "@/website-theme/pages/career/CareerPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Career",
  description: "Open roles and how to apply.",
  path: "/career",
});

export default function Page() {
  return <CareerPage />;
}
