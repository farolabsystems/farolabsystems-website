import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie Policy | ELYVANTA",
  description: "Which cookies the ELYVANTA website uses, why they are set, and how you can accept or reject them.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
