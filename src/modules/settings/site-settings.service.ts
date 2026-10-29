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

export async function getBlogCronEnabled() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: "site" } });
    if (!row) return true;
    return row.blogCronEnabled;
  } catch {
    return true;
  }
}

export async function setBlogCronEnabled(enabled: boolean) {
  const current = await getSiteSettings();
  return prisma.siteSetting.upsert({
    where: { id: "site" },
    create: {
      id: "site",
      seoTitle: current.seoTitle,
      seoDescription: current.seoDescription,
      blogCronEnabled: enabled,
    },
    update: { blogCronEnabled: enabled },
  });
}

export async function saveSiteSettings(input: SiteSettingsInput) {
  return prisma.siteSetting.upsert({
    where: { id: "site" },
    create: { id: "site", ...input },
    update: input,
  });
}
