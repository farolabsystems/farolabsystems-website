import type { Metadata } from "next";
import { CollaborationPage } from "@/website-theme/pages/collaboration/CollaborationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Freelance collaboration",
  description: "Join a client project as a freelancer.",
  path: "/collaboration",
});

export default function Page() {
  return <CollaborationPage />;
}
