import type { Metadata } from "next";
import { CareerPage } from "@/website-theme/pages/career/CareerPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers at Farolab Systems | Software Engineering Jobs",
  description: "Join Farolab Systems to work on modern software, learn with a cross-functional team, and build products that matter.",
  path: "/career",
});

export default function Page() {
  return <CareerPage />;
}
