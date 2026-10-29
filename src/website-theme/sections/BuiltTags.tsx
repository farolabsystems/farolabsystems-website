import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";
import { listTechnologies } from "@/modules/catalog/catalog.service";
import { technology } from "@/website-theme/data/home";
import type { TechnologyRecord } from "@/website-theme/data/types";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";
import { Section } from "@/website-theme/ui/Section";
import { TechIcon } from "@/website-theme/ui/TechIcon";

const groupOrder = ["Frontend", "Language", "Backend", "Integration", "Data", "Cloud", "Delivery", "AI"] as const;

function groupTechnologies(items: TechnologyRecord[]) {
  const buckets = new Map<string, TechnologyRecord[]>();
  for (const item of items) {
    const key = item.eyebrow || "Stack";
    const list = buckets.get(key) ?? [];
    list.push(item);
    buckets.set(key, list);
  }

  const ordered = groupOrder
    .filter((label) => buckets.has(label))
    .map((label) => ({ label, items: buckets.get(label)! }));

  for (const [label, list] of buckets) {
    if (!groupOrder.includes(label as (typeof groupOrder)[number])) {
      ordered.push({ label, items: list });
    }
  }
  return ordered;
}

export async function BuiltTags({ locale = "en" }: { locale?: Locale }) {
  const technologies = await listTechnologies();
  const groups = groupTechnologies(technologies);

  return (
    <Section tone="alt" id="technology">
      <Container>
        <div className="tech-stack">
          <div className="section-head">
            <Eyebrow>{technology.eyebrow}</Eyebrow>
            <h2 className="heading-2">{technology.title}</h2>
            <p className="body-lg muted mt-3">{technology.body}</p>
          </div>

          <div className="tech-stack__groups">
            {groups.map((group) => (
              <div key={group.label} className="tech-stack__group">
                <p className="tech-stack__label">{group.label}</p>
                <ul className="tech-wrap">
                  {group.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={withLocale(locale, `/technologies/${item.slug}`)}
                        className="chip tech-chip"
                      >
                        <span className="tech-chip__icon" aria-hidden="true">
                          <TechIcon icon={item.icon} size={20} />
                        </span>
                        <span>{item.navLabel}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
