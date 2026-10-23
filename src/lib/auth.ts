import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { ADMIN_COOKIE, adminCookieOptions, authSecret } from "@/lib/auth-shared";

export { ADMIN_COOKIE, adminCookieOptions, authSecret, cookieSecure } from "@/lib/auth-shared";

function secretKey() {
  return new TextEncoder().encode(authSecret());
}

export async function signAdminToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifyAdminToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey());
  return typeof payload.email === "string" ? payload.email : null;
}

export async function setAdminCookie(token: string, request?: Request) {
  const jar = await cookies();
  jar.set(ADMIN_COOKIE, token, adminCookieOptions(request));
}

export async function clearAdminCookie() {
  const jar = await cookies();
  jar.delete(ADMIN_COOKIE);
}

export async function getAdminEmail() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    return await verifyAdminToken(token);
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const email = await getAdminEmail();
  if (!email) {
    throw new Error("UNAUTHORIZED");
  }
  return email;
}
