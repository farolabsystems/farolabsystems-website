import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { deleteLead, getLead } from "@/modules/leads/lead.service";

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
  const row = await getLead(id);
  if (!row) return error("Not found", 404);
  return json(row);
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const denied = await guard();
  if (denied) return denied;
  const { id } = await context.params;
  await deleteLead(id);
  return json({ ok: true });
}
