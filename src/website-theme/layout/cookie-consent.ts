export const CONSENT_COOKIE = "cookie_consent";
export const CONSENT_EVENT = "cookie-consent";

export function readConsent() {
  if (typeof document === "undefined") return "";
  const hit = document.cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  return hit ? decodeURIComponent(hit.split("=").slice(1).join("=")) : "";
}

export function writeConsent(value: string) {
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function analyticsAllowed(value: string) {
  return value === "all" || value === "custom:analytics";
}
