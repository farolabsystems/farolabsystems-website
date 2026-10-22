import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig } from "@/website-theme/config/site.config";
import { homeFaqs } from "@/website-theme/data/home";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { listPosts } from "@/modules/content/content.service";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/website-theme/sections/Hero";
import { TrustedBy } from "@/website-theme/sections/TrustedBy";
import { StartingPoint } from "@/website-theme/sections/StartingPoint";
import { ForStartups } from "@/website-theme/sections/ForStartups";
import { WhatMakesUsDifferent } from "@/website-theme/sections/WhatMakesUsDifferent";
import { Industries } from "@/website-theme/sections/Industries";
import { BuiltTags } from "@/website-theme/sections/BuiltTags";
import { CaseStudiesSlider } from "@/website-theme/sections/CaseStudiesSlider";
import { Testimonial } from "@/website-theme/sections/Testimonial";
import { BlogTeaser } from "@/website-theme/sections/BlogTeaser";
import { WorkingTogether } from "@/website-theme/sections/WorkingTogether";
import { Faq } from "@/website-theme/sections/Faq";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { JsonLd } from "@/website-theme/ui/JsonLd";

const heroSlugs = ["trava", "beat-the-street", "sans"];

export async function HomePage({ locale = "en" }: { locale?: Locale }) {
  const [studies, posts] = await Promise.all([listCaseStudies(), listPosts()]);
  const cards = heroSlugs
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study) => study !== undefined);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
          email: siteConfig.email,
          logo: absoluteUrl("/icon.svg"),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: homeFaqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <Hero locale={locale} cards={cards} />
      <TrustedBy />
      <StartingPoint locale={locale} />
      <ForStartups />
      <WhatMakesUsDifferent />
      <Industries locale={locale} studies={studies} />
      <BuiltTags />
      <CaseStudiesSlider locale={locale} studies={studies} />
      <Testimonial />
      <BlogTeaser locale={locale} posts={posts.slice(0, 3)} />
      <WorkingTogether />
      <Faq locale={locale} items={homeFaqs} />
      <LetsTalk />
    </>
  );
}
