"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { uiCopy, withLocale } from "@/website-theme/config/site.config";

const COOKIE = "cookie_consent";

function readConsent() {
  if (typeof document === "undefined") return "";
  const hit = document.cookie.split("; ").find((part) => part.startsWith(`${COOKIE}=`));
  return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : "";
}

function writeConsent(value: string) {
  document.cookie = `${COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

export function CookieBanner({ locale }: { locale: Locale }) {
  const copy = uiCopy[locale];
  const [visible, setVisible] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    setVisible(readConsent() === "");
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="card cookie-banner"
      style={{ position: "fixed", left: "var(--tc-space-4)", bottom: "var(--tc-space-4)", zIndex: 50 }}
    >
      <h2 id="cookie-title" className="heading-6">
        {copy.cookieTitle}
      </h2>
      <p className="body-sm muted mt-3">
        {copy.cookieBody}{" "}
        <Link href={withLocale(locale, "/cookie-policy")} style={{ color: "var(--tc-primary-active)" }}>
          {copy.cookies}
        </Link>
      </p>
      {custom ? (
        <label className="mt-4 flex items-center gap-2 body-sm">
          <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
          Analytics cookies
        </label>
      ) : null}
      <div className="cookie-actions mt-5">
        <button type="button" className="btn btn-ghost" style={{ border: "1px solid var(--tc-text)" }} onClick={() => setCustom((value) => !value)}>
          {copy.customize}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          style={{ border: "1px solid var(--tc-text)" }}
          onClick={() => {
            writeConsent("rejected");
            setVisible(false);
          }}
        >
          {copy.reject}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            writeConsent(custom ? `custom:${analytics ? "analytics" : "necessary"}` : "all");
            setVisible(false);
          }}
        >
          {custom ? copy.save : copy.accept}
        </button>
      </div>
    </div>
  );
}
