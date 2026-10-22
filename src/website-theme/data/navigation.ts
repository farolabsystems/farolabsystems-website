import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";

export type NavLink = { label: string; href: string; description?: string };

export const portfolioIndustries: NavLink[] = [
  { label: "FinTech", href: '/case-studies?industries_equal=["FinTech"]' },
  { label: "Healthcare", href: '/case-studies?industries_equal=["Healthcare"]' },
  { label: "Logistics", href: '/case-studies?industries_equal=["Logistics"]' },
  { label: "E-commerce", href: '/case-studies?industries_equal=["E-commerce"]' },
  { label: "Education", href: '/case-studies?industries_equal=["Education"]' },
  { label: "SaaS", href: '/case-studies?industries_equal=["SaaS"]' },
];

export const footerColumns = {
  services: [
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "Web Development", href: "/services/web-application-development" },
    { label: "Mobile Development", href: "/services/mobile-app-development" },
    { label: "AI Development", href: "/services/ai-development" },
    { label: "UI/UX Design", href: "/services/ui-ux-product-design" },
    { label: "Cloud & DevOps", href: "/services/cloud-devops" },
    { label: "Product Engineering", href: "/services/product-engineering" },
  ],
  solutions: [
    { label: "Dedicated Teams", href: "/services/dedicated-development-teams" },
    { label: "Team Augmentation", href: "/collaboration" },
    { label: "Product Development", href: "/services/product-engineering" },
    { label: "Digital Transformation", href: "/services/custom-software-development" },
    { label: "AI Automation", href: "/services/ai-development" },
  ],
  industries: [
    { label: "FinTech", href: "/industries/fintech" },
    { label: "Healthcare", href: "/industries/healthcare" },
    { label: "Logistics", href: "/industries/logistics" },
    { label: "E-commerce", href: "/industries/ecommerce" },
    { label: "Education", href: "/industries/education" },
    { label: "SaaS", href: "/industries/saas" },
  ],
  company: [
    { label: "About Us", href: "/about-us" },
    { label: "Career", href: "/career" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Schedule a Meeting", href: "/schedule-meeting" },
  ],
} as const;

export function localizeHref(locale: Locale, href: string) {
  const [path, query] = href.split("?");
  const localized = withLocale(locale, path || "/");
  return query ? `${localized}?${query}` : localized;
}
