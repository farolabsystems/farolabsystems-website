import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig } from "@/website-theme/config/site.config";
import { caseStudiesSection, homeFaqs } from "@/website-theme/data/home";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { listPosts } from "@/modules/content/content.service";
import { absoluteUrl } from "@/lib/seo";
import { Hero } from "@/website-theme/sections/Hero";
import { StartingPoint } from "@/website-theme/sections/StartingPoint";
import { WhatMakesUsDifferent } from "@/website-theme/sections/WhatMakesUsDifferent";
import { CaseStudiesSlider } from "@/website-theme/sections/CaseStudiesSlider";
import { WorkingTogether } from "@/website-theme/sections/WorkingTogether";
import { ForStartups } from "@/website-theme/sections/ForStartups";
import { Industries } from "@/website-theme/sections/Industries";
import { BuiltTags } from "@/website-theme/sections/BuiltTags";
import { Testimonial } from "@/website-theme/sections/Testimonial";
import { BlogTeaser } from "@/website-theme/sections/BlogTeaser";
import { Faq } from "@/website-theme/sections/Faq";
import { CtaBanner } from "@/website-theme/sections/CtaBanner";
import { LetsTalk } from "@/website-theme/sections/LetsTalk";
import { JsonLd } from "@/website-theme/ui/JsonLd";

const heroSlugs = caseStudiesSection.slugs;

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
          legalName: siteConfig.legalName,
          url: siteConfig.url,
          logo: absoluteUrl("/assets/brand/logo.png"),
          image: absoluteUrl("/assets/og.png"),
          email: siteConfig.email,
          description: siteConfig.description,
          address: {
            "@type": "PostalAddress",
            streetAddress: siteConfig.addressLines[0],
            addressLocality: "Indore",
            addressRegion: "Madhya Pradesh",
            postalCode: "452010",
            addressCountry: "IN",
          },
          sameAs: siteConfig.socials.map((item) => item.href),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          description: siteConfig.description,
          publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
          inLanguage: ["en", "pl"],
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
      <StartingPoint locale={locale} />
      <WhatMakesUsDifferent />
      <CaseStudiesSlider locale={locale} studies={studies} />
      <WorkingTogether />
      <ForStartups />
      <Industries locale={locale} studies={studies} />
      <BuiltTags locale={locale} />
      <Testimonial />
      <BlogTeaser locale={locale} posts={posts.slice(0, 3)} />
      <Faq locale={locale} items={homeFaqs} />
      <CtaBanner
        locale={locale}
        title="Ready to build the next release?"
        body="Tell us the product goal. We will help you shape the first useful slice of work."
      />
      <LetsTalk />
    </>
  );
}
