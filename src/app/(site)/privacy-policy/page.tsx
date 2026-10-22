import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy | ELYVANTA",
  description: "How ELYVANTA collects, uses and stores personal data submitted through this website contact form.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
