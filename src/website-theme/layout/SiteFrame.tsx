import type { ReactNode } from "react";
import { connection } from "next/server";
import { listCaseStudies } from "@/modules/case-studies/case-study.service";
import { listIndustries, listServices, listTechnologies } from "@/modules/catalog/catalog.service";
import { buildPortfolioMenu } from "@/website-theme/data/portfolio-menu";
import { buildServiceMenu } from "@/website-theme/data/service-menu";
import { SiteChrome } from "@/website-theme/layout/SiteChrome";

export async function SiteFrame({ children }: { children: ReactNode }) {
  await connection();
  const [services, industries, technologies, studies] = await Promise.all([
    listServices(),
    listIndustries(),
    listTechnologies(),
    listCaseStudies(),
  ]);
  return (
    <SiteChrome
      nav={{
        services,
        industries,
        serviceMenu: buildServiceMenu(services, technologies),
        portfolioMenu: buildPortfolioMenu(industries, services, studies),
        portfolioIndustries: industries.map((industry) => ({
          label: industry.navLabel,
          href: `/case-studies?industries_equal=${encodeURIComponent(JSON.stringify([industry.filter]))}`,
        })),
        featuredStudies: studies
          .filter((study) => study.featured)
          .slice(0, 2)
          .map((study) => ({ title: study.title, slug: study.slug })),
      }}
    >
      {children}
    </SiteChrome>
  );
}
