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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHSBHP97');`,
          }}
        />
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
      <body className="antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MHSBHP97"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
