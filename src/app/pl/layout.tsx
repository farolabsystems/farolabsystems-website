import type { ReactNode } from "react";
import { SiteFrame } from "@/website-theme/layout/SiteFrame";

export const dynamic = "force-dynamic";

export default async function PolishLayout({ children }: { children: ReactNode }) {
  return <SiteFrame>{children}</SiteFrame>;
}
