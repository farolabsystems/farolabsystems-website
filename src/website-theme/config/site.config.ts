// TODO: replace with our own — every brand string in this file is a placeholder.

export type Locale = "en" | "pl";

export const siteConfig = {
  name: "COMPANY_NAME",
  legalName: "COMPANY_NAME",
  description:
    "We design and build custom web, mobile, and internal software for teams that have outgrown spreadsheets and rented tools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "inquiry@example.com",
  phone: "+00 000 000 000",
  addressLines: ["ADDRESS_LINE_1", "ADDRESS_LINE_2"],
  taxNumber: "TAX_NUMBER",
  copyright: "COMPANY_NAME",
  codedWith: "We code with care and coffee",
  reviewLabel: "DIRECTORY",
  reviewScore: "0.0",
  reviewCount: "00 reviews",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
    { label: "GitHub", href: "https://github.com" },
  ],
  directories: [
    { label: "Clutch", href: "https://clutch.co" },
    { label: "GoodFirms", href: "https://www.goodfirms.co" },
    { label: "Upwork", href: "https://www.upwork.com" },
  ],
  founders: [
    { name: "FOUNDER_ONE", role: "Co-founder", initials: "F1" },
    { name: "FOUNDER_TWO", role: "Co-founder", initials: "F2" },
  ],
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
      "We use cookies to run the site, remember your choices, and understand which pages help. Read the cookie policy for the details.",
    accept: "Accept all",
    reject: "Reject all",
    customize: "Customize",
    save: "Save choices",
    localeNote: "",
    schedule: "Schedule a meeting",
    freelancer: "Join us as a freelancer",
    privacy: "Privacy policy",
    cookies: "Cookie policy",
    scrollTop: "Back to top",
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
    freelancer: "Dołącz jako freelancer",
    privacy: "Polityka prywatności",
    cookies: "Polityka cookies",
    scrollTop: "Do góry",
  },
} as const;

export function withLocale(locale: Locale, path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized;
  if (normalized === "/") return "/pl";
  return `/pl${normalized}`;
}
