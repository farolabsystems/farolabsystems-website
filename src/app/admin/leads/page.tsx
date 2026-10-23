import { AdminTable, type AdminRow } from "@/components/AdminTable";
import { listLeads } from "@/modules/leads/lead.service";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await listLeads();
  const rows: AdminRow[] = leads.map((lead) => ({
    id: lead.id,
    href: `/admin/leads/${lead.id}`,
    deleteUrl: `/api/admin/leads/${lead.id}`,
    search: `${lead.firstName} ${lead.lastName} ${lead.email} ${lead.company} ${lead.message}`,
    cells: {
      when: lead.createdAt.toISOString().slice(0, 16).replace("T", " "),
      name: `${lead.firstName} ${lead.lastName}`.trim(),
      email: lead.email,
      company: lead.company || "—",
      looking: lead.startingFrom || "—",
    },
  }));
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="heading-4">Inquiries</h1>
        <p className="body-sm muted mt-1">Messages sent from the contact form.</p>
      </div>
      <AdminTable
        columns={[
          { key: "when", label: "When" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "company", label: "Company" },
          { key: "looking", label: "Looking for" },
        ]}
        rows={rows}
        empty="No inquiries yet."
      />
    </div>
  );
}
