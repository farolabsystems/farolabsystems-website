import { contactSchema } from "@/lib/validators";
import { clientIp, error, json, rateLimit } from "@/lib/http";
import { createLead } from "@/modules/leads/lead.service";
import { sendLeadEmail } from "@/modules/mail/mailer";

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!rateLimit(ip)) return error("Too many messages. Try again later.", 429);

  const body: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return json({ error: "Check the form", fieldErrors }, 422);
  }

  if (parsed.data.company_website) return json({ ok: true });

  try {
    await createLead(parsed.data, ip);
    try {
      await sendLeadEmail(parsed.data);
    } catch (mailError) {
      console.error(mailError);
    }
    return json({ ok: true });
  } catch (cause) {
    console.error(cause);
    return error("Something went wrong while submitting the form. Please try again.", 500);
  }
}
