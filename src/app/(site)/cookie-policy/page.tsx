import type { Metadata } from "next";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookie policy",
  description: "Cookies this site sets and how to change your choice.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage slug="cookie-policy" />;
}
