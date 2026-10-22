import type { Metadata } from "next";
import { CollaborationPage } from "@/website-theme/pages/collaboration/CollaborationPage";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Technology Partnership Models | ELYVANTA",
  description: "Dedicated teams, team augmentation, full product development and technology consulting from ELYVANTA.",
  path: "/collaboration",
});

export default function Page() {
  return <CollaborationPage />;
}
