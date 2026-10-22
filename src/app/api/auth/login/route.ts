import { compare } from "bcryptjs";
import { prisma } from "@/lib/db";
import { setAdminCookie, signAdminToken } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { loginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return error("Invalid login", 422);
  const user = await prisma.adminUser.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  if (!user) return error("Invalid login", 401);
  const ok = await compare(parsed.data.password, user.passwordHash);
  if (!ok) return error("Invalid login", 401);
  const token = await signAdminToken(user.email);
  await setAdminCookie(token);
  return json({ ok: true });
}
