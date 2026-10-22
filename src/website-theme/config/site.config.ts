// TODO: Replace with actual company information — email, phone, address, tax number, social profiles, and meeting link.

export type Locale = "en" | "pl";

export const siteConfig = {
  name: "Farolab Systems",
  legalName: "Farolab Systems",
  description:
    "Farolab Systems helps startups and businesses design, build, and scale reliable digital products through software engineering, design, and practical AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@example.com",
  phone: "",
  addressLines: ["TODO: Replace with actual company information"],
  taxNumber: "",
  meetingUrl: "",
  footerHeadline: "Have a project in mind? Let's build it together.",
  footerCta: "Start a project",
  demoCaseStudyLabel: "Demo case study",
  socials: [] as { label: string; href: string }[],
  directories: [] as { label: string; href: string }[],
  founders: [] as { name: string; role: string; initials: string }[],
} as const;

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
