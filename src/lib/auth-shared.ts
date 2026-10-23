export const ADMIN_COOKIE = "admin_token";

/** Keep in sync everywhere — one fallback so sign/verify never disagree. */
export function authSecret() {
  return process.env.AUTH_SECRET?.trim() || "dev-secret-change-me";
}

/** Prefer public site URL / proxy proto over NODE_ENV so HTTP hosts still get a usable cookie. */
export function cookieSecure(request?: Request) {
  const forced = process.env.COOKIE_SECURE?.trim().toLowerCase();
  if (forced === "true" || forced === "1") return true;
  if (forced === "false" || forced === "0") return false;

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim() ?? "";
  if (site.startsWith("https://")) return true;
  if (site.startsWith("http://")) return false;

  if (request) {
    const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    if (forwarded === "https") return true;
    if (forwarded === "http") return false;
    try {
      if (new URL(request.url).protocol === "https:") return true;
    } catch {
      /* ignore */
    }
  }

  return process.env.NODE_ENV === "production";
}

export function adminCookieOptions(request?: Request) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: cookieSecure(request),
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}
