"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, analyticsAllowed, readConsent } from "@/website-theme/layout/cookie-consent";

const GA_ID = "G-PRHJ1BRZ02";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const skipFirstView = useRef(true);

  useEffect(() => {
    const sync = () => setEnabled(analyticsAllowed(readConsent()));
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (skipFirstView.current) {
      skipFirstView.current = false;
      return;
    }
    const pagePath = `${window.location.pathname}${window.location.search}`;
    window.gtag?.("config", GA_ID, { page_path: pagePath });
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
