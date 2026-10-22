import { listLeads } from "@/modules/leads/lead.service";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await listLeads();
  return (
    <div className="grid gap-4">
      <h1 className="heading-4">Leads</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["When", "Name", "Email", "Starting", "Message"].map((heading) => (
                <th key={heading} className="body-sm" style={{ padding: "var(--tc-space-3)", borderBottom: "1px solid var(--tc-border)" }}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td className="body-sm" style={{ padding: "var(--tc-space-3)" }}>
                  {lead.createdAt.toISOString().slice(0, 16).replace("T", " ")}
                </td>
                <td className="body-sm" style={{ padding: "var(--tc-space-3)" }}>
                  {lead.firstName}
                </td>
                <td className="body-sm" style={{ padding: "var(--tc-space-3)" }}>
                  {lead.email}
                </td>
                <td className="body-sm" style={{ padding: "var(--tc-space-3)" }}>
                  {lead.startingFrom || "—"}
                </td>
                <td className="body-sm" style={{ padding: "var(--tc-space-3)", maxWidth: "360px" }}>
                  {lead.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 ? <p className="body muted mt-4">No enquiries yet.</p> : null}
      </div>
    </div>
  );
}
