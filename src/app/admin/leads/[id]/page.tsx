import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadActions } from "@/components/LeadActions";
import { getLead } from "@/modules/leads/lead.service";

export const dynamic = "force-dynamic";

export default async function LeadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const rows = [
    ["When", lead.createdAt.toISOString().slice(0, 16).replace("T", " ")],
    ["Name", `${lead.firstName} ${lead.lastName}`.trim()],
    ["Email", lead.email],
    ["Phone", lead.phone || "—"],
    ["Company", lead.company || "—"],
    ["Looking for", lead.startingFrom || "—"],
    ["Budget", lead.budget || "—"],
    ["Timeline", lead.timeline || "—"],
    ["Newsletter", lead.newsletter ? "Yes" : "No"],
  ];
  return (
    <div className="grid max-w-3xl gap-4">
      <Link href="/admin/leads" className="text-link body-sm w-fit">
        Back to inquiries
      </Link>
      <h1 className="heading-4">Inquiry</h1>
      <dl className="admin-detail">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="caption">{label}</dt>
            <dd className="body">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="card">
        <p className="caption">Message</p>
        <p className="body mt-2 whitespace-pre-wrap">{lead.message}</p>
      </div>
      <LeadActions id={lead.id} title={`${lead.firstName} ${lead.lastName}`.trim() || lead.email} />
    </div>
  );
}
