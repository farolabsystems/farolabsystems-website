import { notFound } from "next/navigation";
import type { Locale } from "@/website-theme/config/site.config";
import { services } from "@/website-theme/data/services";
import { industries } from "@/website-theme/data/industries";
import { technologies } from "@/website-theme/data/technologies";
import { HomePage } from "@/website-theme/pages/home/HomePage";
import { ServicePage } from "@/website-theme/pages/services/ServicePage";
import { IndustryPage } from "@/website-theme/pages/industries/IndustryPage";
import { TechnologyPage } from "@/website-theme/pages/technologies/TechnologyPage";
import { CaseStudiesPage } from "@/website-theme/pages/case-studies/CaseStudiesPage";
import { CaseStudyPage } from "@/website-theme/pages/case-studies/CaseStudyPage";
import { BlogPage } from "@/website-theme/pages/blog/BlogPage";
import { BlogPostPage } from "@/website-theme/pages/blog/BlogPostPage";
import { AboutPage } from "@/website-theme/pages/about/AboutPage";
import { CareerPage } from "@/website-theme/pages/career/CareerPage";
import { ContactPage } from "@/website-theme/pages/contact/ContactPage";
import { SchedulePage } from "@/website-theme/pages/schedule-meeting/SchedulePage";
import { CollaborationPage } from "@/website-theme/pages/collaboration/CollaborationPage";
import { ConsultationPage } from "@/website-theme/pages/consultation/ConsultationPage";
import { LegalPage } from "@/website-theme/pages/legal/LegalPage";
import { CmsPage } from "@/website-theme/pages/cms/CmsPage";
import { getCaseStudy } from "@/modules/case-studies/case-study.service";
import { getPost } from "@/modules/content/content.service";

export async function RoutedPage({
  locale,
  slug = [],
  search,
}: {
  locale: Locale;
  slug?: string[];
  search?: { page?: string; category?: string };
}) {
  const [head, second] = slug;
  if (!head) return <HomePage locale={locale} />;
  if (head === "about-us" && !second) return <AboutPage locale={locale} />;
  if (head === "career" && !second) return <CareerPage locale={locale} />;
  if (head === "contact" && !second) return <ContactPage locale={locale} />;
  if (head === "schedule-meeting" && !second) return <SchedulePage locale={locale} />;
  if (head === "collaboration" && !second) return <CollaborationPage locale={locale} />;
  if (head === "technical-consultation" && !second) return <ConsultationPage locale={locale} kind="technical" />;
  if (head === "privacy-policy" && !second) return <LegalPage slug="privacy-policy" />;
  if (head === "cookie-policy" && !second) return <LegalPage slug="cookie-policy" />;
  if (head === "case-studies" && !second) return <CaseStudiesPage locale={locale} />;
  if (head === "case-studies" && second) {
    const study = await getCaseStudy(second);
    if (!study) notFound();
    return <CaseStudyPage slug={second} locale={locale} />;
  }
  if (head === "blog" && !second) {
    return (
      <BlogPage
        locale={locale}
        page={Number(search?.page || 1)}
        category={search?.category}
      />
    );
  }
  if (head === "blog" && second) {
    const post = await getPost(second);
    if (!post) notFound();
    return <BlogPostPage slug={second} locale={locale} />;
  }
  if (head === "services" && second && services.some((item) => item.slug === second)) {
    return <ServicePage slug={second} locale={locale} />;
  }
  if (head === "industries" && second && industries.some((item) => item.slug === second)) {
    return <IndustryPage slug={second} locale={locale} />;
  }
  if (head === "technologies" && second && technologies.some((item) => item.slug === second)) {
    return <TechnologyPage slug={second} locale={locale} />;
  }
  if (head === "consultation" && second) return <ConsultationPage locale={locale} kind="advisor" />;
  if (!second) return <CmsPage slug={head} />;
  notFound();
}
