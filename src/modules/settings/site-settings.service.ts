import { siteConfig } from "@/website-theme/config/site.config";
import { prisma } from "@/lib/db";
import type { SiteSettingsInput } from "@/lib/validators";

export const defaultSiteSettings = {
  seoTitle: `${siteConfig.name} | Software Development & Technology Solutions`,
  seoDescription: siteConfig.description,
};

export async function getSiteSettings() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: "site" } });
    if (!row) return defaultSiteSettings;
    return { seoTitle: row.seoTitle, seoDescription: row.seoDescription };
  } catch {
    return defaultSiteSettings;
  }
}

export async function saveSiteSettings(input: SiteSettingsInput) {
  return prisma.siteSetting.upsert({
    where: { id: "site" },
    create: { id: "site", ...input },
    update: input,
  });
}
