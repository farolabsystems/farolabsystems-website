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
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PRHJ1BRZ02" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PRHJ1BRZ02');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
