import { notFound } from "next/navigation";
import { StyleGuidePage } from "@/website-theme/pages/styleguide/StyleGuidePage";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return <StyleGuidePage />;
}
