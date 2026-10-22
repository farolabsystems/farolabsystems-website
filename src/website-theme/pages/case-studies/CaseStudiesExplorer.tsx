"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { siteConfig } from "@/website-theme/config/site.config";
import { industryFilters, serviceFilters } from "@/website-theme/data/taxonomy";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { CoverImage } from "@/website-theme/ui/CoverImage";

function readList(params: URLSearchParams, key: string) {
  const raw = params.get(key);
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [raw];
  }
  return [];
}

export function CaseStudiesExplorer({ locale, studies }: { locale: Locale; studies: CaseStudyRecord[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const industries = readList(params, "industries_equal");
  const services = readList(params, "services_equal");

  const visible = useMemo(
    () =>
      studies.filter((study) => {
        const industryOk = industries.length === 0 || study.industries.some((item) => industries.includes(item));
        const serviceOk = services.length === 0 || study.services.some((item) => services.includes(item));
        return industryOk && serviceOk;
      }),
    [studies, industries, services],
  );

  function update(key: "industries_equal" | "services_equal", value: string) {
    const current = new URLSearchParams(params.toString());
    const list = readList(current, key);
    const next = list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
    if (next.length) current.set(key, JSON.stringify(next));
    else current.delete(key);
    const query = current.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <p className="caption" style={{ letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
          Industry
        </p>
        <div className="flex flex-wrap gap-2">
          {industryFilters.map((filter) => (
            <button key={filter} type="button" className="chip" aria-pressed={industries.includes(filter)} onClick={() => update("industries_equal", filter)}>
              {filter}
            </button>
          ))}
        </div>
        <p className="caption mt-2" style={{ letterSpacing: "var(--tc-tracking-eyebrow)", textTransform: "uppercase" }}>
          Service
        </p>
        <div className="flex flex-wrap gap-2">
          {serviceFilters.map((filter) => (
            <button key={filter} type="button" className="chip" aria-pressed={services.includes(filter)} onClick={() => update("services_equal", filter)}>
              {filter}
            </button>
          ))}
        </div>
      </div>
      <p className="body-sm muted">{visible.length} projects</p>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <li key={study.slug}>
            <Link href={withLocale(locale, `/case-studies/${study.slug}`)} className="card grid gap-3">
              <div className="media-frame">
                <CoverImage src={study.cover} alt={study.title} sizes="(max-width: 768px) 100vw, 360px" />
              </div>
              <p className="caption">{siteConfig.demoCaseStudyLabel}</p>
              <h2 className="heading-6">{study.title}</h2>
              <p className="body-sm muted">{study.summary}</p>
              <p className="caption">{study.industries.join(" · ")}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
