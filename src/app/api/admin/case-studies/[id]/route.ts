import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { caseStudySchema } from "@/lib/validators";
import { deleteCaseStudy, getAdminCaseStudy, saveCaseStudy } from "@/modules/case-studies/case-study.service";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return error("Unauthorized", 401);
  }
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await context.params;
  const row = await getAdminCaseStudy(id);
  if (!row) return error("Not found", 404);
  return json(row);
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await context.params;
  const parsed = caseStudySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Invalid", 422);
  try {
    return json(await saveCaseStudy(parsed.data, id));
  } catch (cause) {
    console.error(cause);
    return error("Could not save", 409);
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await context.params;
  await deleteCaseStudy(id);
  return json({ ok: true });
}
