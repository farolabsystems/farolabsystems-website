import type { Metadata } from "next";
import { ContactPage } from "@/website-theme/pages/contact/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Tell us what you are trying to solve.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
