import { services } from "@/website-theme/data/services";
import { technologies } from "@/website-theme/data/technologies";

const related: Record<string, string[]> = {
  "custom-software-development": ["typescript", "node-js", "python", "postgresql", "rest-apis", "docker"],
  "web-application-development": ["react", "next-js", "typescript", "javascript", "node-js", "postgresql"],
  "mobile-app-development": ["react", "typescript", "javascript", "node-js", "rest-apis", "postgresql"],
  "ai-development": ["openai", "gemini", "python", "ai-apis", "llm-integrations", "fastapi"],
  "ui-ux-product-design": ["react", "next-js", "typescript", "javascript"],
  "cloud-devops": ["aws", "microsoft-azure", "docker", "ci-cd", "redis"],
  "product-engineering": ["react", "next-js", "node-js", "typescript", "postgresql", "docker"],
  "dedicated-development-teams": ["react", "node-js", "python", "typescript", "aws", "docker"],
  "support-and-maintenance": ["docker", "ci-cd", "aws", "postgresql", "node-js", "redis"],
};

export type ServiceMenuItem = {
  href: string;
  label: string;
  title: string;
  summary: string;
  technologies: { href: string; label: string }[];
};

export function buildServiceMenu(
  serviceList: typeof services = services,
  technologyList: typeof technologies = technologies,
): ServiceMenuItem[] {
  return serviceList.map((service) => ({
    href: `/services/${service.slug}`,
    label: service.navLabel,
    title: service.title,
    summary: service.summary,
    technologies: (related[service.slug] ?? [])
      .map((slug) => technologyList.find((item) => item.slug === slug))
      .filter((item) => item !== undefined)
      .map((item) => ({ href: `/technologies/${item.slug}`, label: item.navLabel })),
  }));
}

export const serviceMenu: ServiceMenuItem[] = buildServiceMenu();
