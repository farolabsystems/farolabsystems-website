import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy policy",
  description: "How we handle personal data sent through this site.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
