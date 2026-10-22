import type { Metadata } from "next";
import { ContactPage } from "@/website-theme/pages/contact/ContactPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact ELYVANTA | Start Your Technology Project",
  description: "Tell ELYVANTA about your product, an existing system, or a technology challenge. We will reply with a practical next step.",
  path: "/contact",
});

export default function Page() {
  return <ContactPage />;
}
