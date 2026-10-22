import type { Metadata } from "next";
import { ContactPage } from "@/website-theme/pages/contact/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact Farolab Systems | Start Your Technology Project",
  description: "Tell Farolab Systems about your product, an existing system, or a technology challenge. We will reply with a practical next step.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
