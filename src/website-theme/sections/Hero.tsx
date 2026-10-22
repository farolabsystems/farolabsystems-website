import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, withLocale } from "@/website-theme/config/site.config";
import { hero, heroCategories } from "@/website-theme/data/home";
import type { CaseStudyRecord } from "@/website-theme/data/types";
import { Button } from "@/website-theme/ui/Button";
import { Container } from "@/website-theme/ui/Container";
import { Eyebrow } from "@/website-theme/ui/Eyebrow";

export function Hero({ locale, cards }: { locale: Locale; cards: CaseStudyRecord[] }) {
  return (
    <section className="section" style={{ paddingTop: "var(--tc-space-8)" }}>
      <Container>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 className="heading-1 max-w-[14em]">{hero.title}</h1>
        <p className="body-lg muted mt-6 max-w-[62ch]">{hero.body}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button href={withLocale(locale, hero.primary.href)}>{hero.primary.label}</Button>
          <Button href={withLocale(locale, hero.secondary.href)} variant="ghost">
            {hero.secondary.label}
          </Button>
        </div>
        <p className="caption mt-6">{hero.support}</p>
      </Container>
      <div className="mt-12 flex gap-4 overflow-x-auto px-[7.5vw] pb-2">
        {cards.map((card, index) => (
          <Link
            key={card.slug}
            href={withLocale(locale, `/case-studies/${card.slug}`)}
            className="card card-lg grid min-w-[260px] flex-1 gap-3"
          >
            <Image src={card.cover} alt="" width={640} height={400} className="h-40 w-full rounded-[var(--tc-radius-sm)] object-cover" />
            <p className="caption">{siteConfig.demoCaseStudyLabel}</p>
            <div className="flex items-end justify-between gap-3">
              <span className="heading-6">{card.title}</span>
              <span className="caption">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <p className="caption">{heroCategories[card.slug] ?? card.industries[0]}</p>
            <p className="body-sm muted">{card.summary}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
