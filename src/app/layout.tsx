import type { Metadata } from "next";
import { siteConfig } from "@/website-theme/config/site.config";
import { getSiteSettings } from "@/modules/settings/site-settings.service";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: settings.seoTitle,
      template: "%s",
    },
    description: settings.seoDescription,
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
