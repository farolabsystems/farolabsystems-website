import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { caseStudySchema } from "@/lib/validators";
import { listAdminCaseStudies, saveCaseStudy } from "@/modules/case-studies/case-study.service";

async function guard() {
  try {
    await requireAdmin();
    return null;
  } catch {
    return error("Unauthorized", 401);
  }
}

export async function GET() {
  const denied = await guard();
  if (denied) return denied;
  return json(await listAdminCaseStudies());
}

export async function POST(request: Request) {
  const denied = await guard();
  if (denied) return denied;
  const parsed = caseStudySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return error(parsed.error.issues[0]?.message ?? "Invalid", 422);
  try {
    return json(await saveCaseStudy(parsed.data), 201);
  } catch (cause) {
    console.error(cause);
    return error("Could not save. The slug may already exist.", 409);
  }
}
