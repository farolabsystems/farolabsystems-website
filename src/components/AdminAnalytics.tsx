import { AdminChart } from "@/components/AdminChart";
import type { AnalyticsRow, AnalyticsSnapshot } from "@/lib/analytics";

function Rows({ title, note, rows, valueLabel }: { title: string; note: string; rows: AnalyticsRow[]; valueLabel: string }) {
  return (
    <section className="admin-chart">
      <div>
        <h2 className="heading-6">{title}</h2>
        <p className="body-sm muted mt-1">{note}</p>
      </div>
      {rows.length ? (
        <div className="admin-table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{title}</th>
                <th>{valueLabel}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="body-sm muted">No data for this period yet.</p>
      )}
    </section>
  );
}

export function AdminAnalytics({ data }: { data: AnalyticsSnapshot }) {
  if (!data.ok) {
    return (
      <section className="admin-chart">
        <h2 className="heading-6">Analytics</h2>
        <p className="body-sm mt-2">{data.message}</p>
      </section>
    );
  }

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="heading-5">Analytics</h2>
        <p className="body-sm muted mt-1">{data.activeNow} active now. Other numbers are the last 28 days.</p>
      </div>
      <div className="admin-stats">
        {data.totals.map((item) => (
          <div key={item.label} className="admin-stat">
            <p className="caption">{item.label}</p>
            <p className="heading-4">{item.value}</p>
            <p className="body-sm muted">{item.note}</p>
          </div>
        ))}
      </div>
      <AdminChart title="Daily page views" note="Page views over the last 14 days." points={data.views} />
      <div className="admin-charts">
        <Rows title="Pages" note="Most viewed paths." rows={data.pages} valueLabel="Views" />
        <Rows title="Countries" note="Where the users are." rows={data.countries} valueLabel="Users" />
      </div>
    </section>
  );
}
