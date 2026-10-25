import type { NavLink } from "@/website-theme/data/navigation";
import type { ServiceMenuItem } from "@/website-theme/data/service-menu";
import type { IndustryRecord, ServiceRecord } from "@/website-theme/data/types";

export type SiteNav = {
  services: ServiceRecord[];
  industries: IndustryRecord[];
  serviceMenu: ServiceMenuItem[];
  portfolioMenu: ServiceMenuItem[];
  portfolioIndustries: NavLink[];
  featuredStudies: { title: string; slug: string }[];
};
