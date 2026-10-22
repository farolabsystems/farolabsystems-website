import Link from "next/link";
import { listAdminCaseStudies } from "@/modules/case-studies/case-study.service";

export const dynamic = "force-dynamic";

export default async function CaseStudiesAdminPage() {
  const studies = await listAdminCaseStudies();
  return (
    <div className="grid gap-4">
      <div className="admin-toolbar">
        <h1 className="heading-4">Case studies</h1>
        <Link className="btn" href="/admin/case-studies/new">
          New case study
        </Link>
      </div>
      <ul className="admin-list">
        {studies.map((study) => (
          <li key={study.id}>
            <Link className="admin-item" href={`/admin/case-studies/${study.id}`}>
              <span className="admin-item-media">{study.cover ? <img src={study.cover} alt="" /> : null}</span>
              <span className="admin-item-copy">
                <span className="body">{study.title}</span>
                <span className={study.status === "PUBLISHED" ? "caption admin-status is-live" : "caption admin-status"}>
                  {study.status === "PUBLISHED" ? "Published" : "Draft"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {studies.length === 0 ? <p className="body muted">No case studies yet.</p> : null}
    </div>
  );
}
