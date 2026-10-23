import type { Locale } from "@/website-theme/config/site.config";
import { siteConfig, uiCopy } from "@/website-theme/config/site.config";
import { schedulePage } from "@/website-theme/data/contact";
import { PageHero } from "@/website-theme/sections/PageHero";
import { Container } from "@/website-theme/ui/Container";

/** Force Cal.com / cal.id light theme via query param (embed reads `theme`). */
function withCalTheme(url: string, theme: "light" | "dark" = "light") {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("theme", theme);
    return parsed.toString();
  } catch {
    const join = url.includes("?") ? "&" : "?";
    return `${url}${join}theme=${theme}`;
  }
}

export function SchedulePage({ locale = "en" }: { locale?: Locale }) {
  const copy = uiCopy[locale];
  const calUrl = siteConfig.meetingUrl ? withCalTheme(siteConfig.meetingUrl, "light") : "";

  return (
    <>
      <PageHero locale={locale} eyebrow={schedulePage.eyebrow} title={schedulePage.title} body={schedulePage.body} />
      {calUrl ? (
        <section className="section" style={{ paddingTop: 0, paddingBottom: "var(--tc-space-10)" }}>
          <Container>
            <div className="cal-embed">
              <iframe title={copy.schedule} src={calUrl} loading="lazy" allow="camera; microphone; fullscreen; payment" />
            </div>
            <p className="body-sm muted mt-5" style={{ paddingBottom: "var(--tc-space-4)" }}>
              Prefer a new tab?{" "}
              <a href={calUrl} target="_blank" rel="noreferrer noopener" style={{ color: "var(--tc-primary-active)" }}>
                {copy.schedule}
              </a>
            </p>
          </Container>
        </section>
      ) : (
        <section className="section" style={{ paddingTop: 0 }}>
          <Container>
            <div className="card grid gap-3 max-w-[52ch]">
              <p className="body">Calendar booking will open here through Cal.com (cal.id).</p>
              <p className="body-sm muted">
                Set <code>NEXT_PUBLIC_CAL_URL</code> to your Cal booking link when it is ready.
              </p>
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
