import type { ReactNode } from "react";
import { connection } from "next/server";
import { SiteChrome } from "@/website-theme/layout/SiteChrome";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  await connection();
  return <SiteChrome>{children}</SiteChrome>;
}
