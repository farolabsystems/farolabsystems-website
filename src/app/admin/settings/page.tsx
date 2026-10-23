import { SettingsForm } from "@/components/SettingsForm";
import { getSiteSettings } from "@/modules/settings/site-settings.service";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSiteSettings();
  return (
    <div className="grid gap-4">
      <div>
        <h1 className="heading-4">SEO</h1>
        <p className="body-sm muted mt-1 max-w-[62ch]">
          This is the default title and description search engines use for the homepage. Posts, pages, and case studies keep their own listings.
        </p>
      </div>
      <SettingsForm initial={settings} />
    </div>
  );
}
