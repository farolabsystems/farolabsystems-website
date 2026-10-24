import { caseStudies } from "@/website-theme/data/case-studies";
import { industries } from "@/website-theme/data/industries";
import type { ServiceMenuItem } from "@/website-theme/data/service-menu";
import { services } from "@/website-theme/data/services";

export const portfolioMenu: ServiceMenuItem[] = industries.map((industry) => {
  const study = caseStudies.find((item) => item.industries.includes(industry.filter));
  const relatedServices = (study?.services ?? [])
    .map((name) => services.find((service) => service.filter === name))
    .filter((service) => service !== undefined)
    .map((service) => ({ href: `/services/${service.slug}`, label: service.navLabel }));

  return {
    href: `/industries/${industry.slug}`,
    label: industry.navLabel,
    title: industry.title,
    summary: industry.summary,
    technologies: [
      ...(study ? [{ href: `/case-studies/${study.slug}`, label: study.title }] : []),
      ...relatedServices,
    ],
  };
});
