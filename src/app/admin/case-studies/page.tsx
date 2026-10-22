import Link from "next/link";
import { listAdminCaseStudies } from "@/modules/case-studies/case-study.service";

export const dynamic = "force-dynamic";

export default async function CaseStudiesAdminPage() {
  const studies = await listAdminCaseStudies();
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="heading-4">Case studies</h1>
        <Link className="btn" href="/admin/case-studies/new">
          New case study
        </Link>
      </div>
      <ul className="grid gap-2">
        {studies.map((study) => (
          <li key={study.id}>
            <Link className="card block" href={`/admin/case-studies/${study.id}`}>
              <span className="body">{study.title}</span>
              <span className="caption ml-3">{study.status}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
