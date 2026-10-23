import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ADMIN_COOKIE, authSecret } from "@/lib/auth-shared";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", request.url));
  try {
    await jwtVerify(token, new TextEncoder().encode(authSecret()));
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export const config = { matcher: ["/admin/:path*"] };
