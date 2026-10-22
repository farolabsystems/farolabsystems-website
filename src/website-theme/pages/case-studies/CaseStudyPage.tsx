import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { getCaseStudy, listCaseStudies } from "@/modules/case-studies/case-study.service";
import { Markdown } from "@/website-theme/ui/Markdown";
import { Container } from "@/website-theme/ui/Container";
import { StatCounter } from "@/website-theme/ui/StatCounter";
import { JsonLd } from "@/website-theme/ui/JsonLd";
import { absoluteUrl } from "@/lib/seo";

export async function CaseStudyPage({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const study = await getCaseStudy(slug);
  if (!study) notFound();
  const related = (await listCaseStudies()).filter((item) => item.slug !== slug).slice(0, 3);
  return (
    <article className="section" style={{ paddingTop: "var(--tc-space-9)" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl(withLocale(locale, "/")) },
            { "@type": "ListItem", position: 2, name: "Case studies", item: absoluteUrl(withLocale(locale, "/case-studies")) },
            { "@type": "ListItem", position: 3, name: study.title, item: absoluteUrl(withLocale(locale, `/case-studies/${study.slug}`)) },
          ],
        }}
      />
      <Container>
        <p className="caption">{study.industries.join(" · ")} · {study.services.join(" · ")}</p>
        <h1 className="heading-2 mt-3 max-w-[18ch]">{study.title}</h1>
        <p className="body-lg muted mt-4 max-w-[68ch]">{study.summary}</p>
        <Image src={study.cover} alt="" width={1200} height={720} priority className="mt-8 w-full rounded-[var(--tc-radius-card-lg)] object-cover" />
        <div className="mt-8 grid grid-cols-3 gap-4">
          {study.stats.map((stat) => (
            <StatCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
        <div className="mt-10 max-w-[72ch]">
          <Markdown source={study.body} />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {study.gallery.map((src) => (
            <Image key={src} src={src} alt="" width={800} height={520} className="w-full rounded-[var(--tc-radius-card)] object-cover" />
          ))}
        </div>
        <h2 className="heading-4 mt-12">More work</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <Link href={withLocale(locale, `/case-studies/${item.slug}`)} className="card block">
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </article>
  );
}
