import type { Locale } from "@/website-theme/config/site.config";
import { withLocale } from "@/website-theme/config/site.config";

export type NavLink = { label: string; href: string; description?: string };

export const portfolioIndustries: NavLink[] = [
  { label: "eCommerce", href: '/case-studies?industries_equal=["eCommerce"]' },
  { label: "Travel & Hospitality", href: '/case-studies?industries_equal=["Travel & Hospitality"]' },
  { label: "Artificial Intelligence", href: '/case-studies?industries_equal=["Artificial Intelligence"]' },
  { label: "EdTech", href: '/case-studies?industries_equal=["EdTech"]' },
  { label: "Startups", href: '/case-studies?industries_equal=["Startups"]' },
];

export const footerColumns = {
  services: [
    { label: "Custom Software Development", href: "/services/custom-software-development" },
    { label: "Web App Development", href: "/services/web-app-development" },
    { label: "Mobile App Development", href: "/services/cross-platform-mobile-app-development" },
    { label: "Enterprise App Development", href: "/services/business-app-development" },
    { label: "AI Development", href: "/services/ai-development" },
    { label: "UX/UI Design", href: "/services/ux-ui-product-design" },
    { label: "Support & Maintenance", href: "/services/support-and-maintenance" },
  ],
  outstaffing: [
    { label: "Dedicated team", href: "/services/offshore-software-development" },
    { label: "Team augmentation", href: "/collaboration" },
    { label: "Staff augmentation", href: "/services/support-and-maintenance" },
  ],
  industries: [
    { label: "Travel & Hospitality", href: "/industries/travel-software-development" },
    { label: "eCommerce", href: "/industries/ecommerce" },
    { label: "Logistics", href: "/industries/logistics-digital-solutions-development" },
    { label: "Real Estate", href: "/industries/real-estate-digital-solutions-development" },
    { label: "Fintech", href: "/industries/fintech" },
    { label: "Startups", href: "/industries/digital-solutions-for-startups" },
  ],
  caseStudies: [
    { label: "Trava", href: "/case-studies/trava" },
    { label: "Plannin", href: "/case-studies/plannin" },
    { label: "Beat the Street", href: "/case-studies/beat-the-street" },
    { label: "Paymi", href: "/case-studies/paymi" },
    { label: "Deutsche Bildung", href: "/case-studies/deutsche-bildung" },
    { label: "Buzzin", href: "/case-studies/buzzin" },
    { label: "More", href: "/case-studies" },
  ],
} as const;

export function localizeHref(locale: Locale, href: string) {
  const [path, query] = href.split("?");
  const localized = withLocale(locale, path || "/");
  return query ? `${localized}?${query}` : localized;
}
