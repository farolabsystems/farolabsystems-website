import { requireAdmin } from "@/lib/auth";
import { error, json } from "@/lib/http";
import { listLeads } from "@/modules/leads/lead.service";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return error("Unauthorized", 401);
  }
  return json(await listLeads());
}
