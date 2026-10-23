// TODO: Replace with actual company information — email, phone, address, tax number, social profiles.
// Schedule a meeting uses Cal.com / cal.id via NEXT_PUBLIC_CAL_URL when that value is set.

export type Locale = "en" | "pl";

const PRODUCTION_ORIGIN = "https://farolabsystem.com";

function configuredOrigin() {
  const value = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");
  return value || "http://localhost:3000";
}

function isLocalOrigin(value: string) {
  try {
    const host = new URL(value).hostname;
    return host === "localhost" || host === "127.0.0.1";
  } catch {
    return true;
  }
}

/** Public origin used in the sitemap, canonical URLs, and Open Graph. */
export function siteOrigin() {
  const configured = configuredOrigin();
  if (process.env.NODE_ENV === "production" && isLocalOrigin(configured)) return PRODUCTION_ORIGIN;
  return configured;
}

export const siteConfig = {
  name: "Farolab Systems",
  legalName: "Farolab Systems",
  description:
    "Farolab Systems helps startups and businesses design, build, and scale reliable digital products through software engineering, design, and practical AI.",
  url: siteOrigin(),
  email: "hey@farolabsystem.com",
  phone: "",
  addressLines: ["Vijay Nagar, Scheme No 54", "Indore, Madhya Pradesh 452010"],
  taxNumber: "",
  /** Cal.com / cal.id booking link, e.g. https://cal.com/your-team/30min */
  meetingUrl: process.env.NEXT_PUBLIC_CAL_URL?.trim() || "",
  meetingProvider: "cal.com" as const,
  footerHeadline: "Have a project in mind? Let's build it together.",
  footerCta: "Start a project",
  demoCaseStudyLabel: "Case study",
  socials: [] as { label: string; href: string }[],
  directories: [] as { label: string; href: string }[],
  founders: [] as { name: string; role: string; initials: string }[],
};

export const uiCopy = {
  en: {
    services: "Services",
    portfolio: "Portfolio",
    about: "About",
    blog: "Blog",
    career: "Career",
    contact: "Contact us",
    seeAll: "See all",
    language: "Site language",
    cookieTitle: "We value your privacy",
    cookieBody:
      "We use cookies to run the site and remember your choices. Read the cookie policy for the details.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
    save: "Save choices",
    localeNote: "",
    schedule: "Schedule a meeting",
    privacy: "Privacy policy",
    cookies: "Cookie policy",
    scrollTop: "Back to top",
    startProject: "Start a project",
  },
  pl: {
    services: "Usługi",
    portfolio: "Portfolio",
    about: "O nas",
    blog: "Blog",
    career: "Kariera",
    contact: "Kontakt",
    seeAll: "Zobacz wszystkie",
    language: "Język strony",
    cookieTitle: "Szanujemy Twoją prywatność",
    cookieBody:
      "Używamy plików cookie, aby strona działała i żeby zapamiętać Twoje wybory. Szczegóły są w polityce cookies.",
    accept: "Akceptuj wszystkie",
    reject: "Odrzuć wszystkie",
    customize: "Dostosuj",
    save: "Zapisz wybór",
    localeNote: "Polskie tłumaczenie treści jest przygotowane jako struktura. Tekst merytoryczny pozostaje po angielsku.",
    schedule: "Umów spotkanie",
    privacy: "Polityka prywatności",
    cookies: "Polityka cookies",
    scrollTop: "Do góry",
    startProject: "Zacznij projekt",
  },
} as const;

export function withLocale(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  if (normalized === "/") return "/pl";
  return `/pl${normalized}`;
}
