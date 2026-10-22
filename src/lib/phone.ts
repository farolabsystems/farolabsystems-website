import {
  Metadata,
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  type CountryCode,
} from "libphonenumber-js/max/es6";

type NumberingPlanWithTypes = {
  possibleLengths(): number[] | undefined;
  type(kind: "MOBILE"): { possibleLengths(): number[] | undefined } | undefined;
};

export type PhoneCountry = {
  iso: CountryCode;
  name: string;
  callingCode: string;
  lengths: number[];
};

const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

let catalog: PhoneCountry[] | null = null;

function mobileLengths(iso: CountryCode): number[] {
  const metadata = new Metadata();
  metadata.selectNumberingPlan(iso);
  const plan = metadata.numberingPlan as NumberingPlanWithTypes | undefined;
  const mobile = plan?.type("MOBILE")?.possibleLengths();
  const lengths = mobile && mobile.length ? mobile : plan?.possibleLengths();
  return [...(lengths ?? [])].sort((left, right) => left - right);
}

export function phoneCountries(): PhoneCountry[] {
  if (catalog) return catalog;
  catalog = getCountries()
    .map((iso) => ({
      iso,
      name: regionNames.of(iso) ?? iso,
      callingCode: getCountryCallingCode(iso),
      lengths: mobileLengths(iso),
    }))
    .sort((left, right) => {
      if (left.iso === "IN") return -1;
      if (right.iso === "IN") return 1;
      return left.name.localeCompare(right.name);
    });
  return catalog;
}

export function phoneCountry(iso: string | undefined): PhoneCountry | undefined {
  if (!iso || !isSupportedCountry(iso)) return undefined;
  return phoneCountries().find((country) => country.iso === iso);
}

export function nationalDigits(iso: string | undefined, raw: string): string {
  const country = phoneCountry(iso);
  const max = country?.lengths.length ? Math.max(...country.lengths) : 15;
  let digits = raw.replace(/\D/g, "");
  const code = country?.callingCode;
  if (code && digits.startsWith(code)) {
    const rest = digits.slice(code.length);
    if (country.lengths.includes(rest.length) || digits.length > max) digits = rest;
  }
  return digits.slice(0, max);
}

export function phoneLengthMessage(lengths: number[]): string {
  if (lengths.length === 1) return `Enter a ${lengths[0]}-digit number`;
  if (lengths.length > 1) return `Enter ${lengths[0]} to ${lengths[lengths.length - 1]} digits`;
  return "Enter a valid number for the selected country";
}

export function phonePlaceholder(iso: string | undefined): string {
  const lengths = phoneCountry(iso)?.lengths ?? [];
  if (lengths.length === 1) return `${lengths[0]} digits`;
  if (lengths.length > 1) return `${lengths[0]}–${lengths[lengths.length - 1]} digits`;
  return "Mobile number";
}

export function phoneIssue(country: string | undefined, phone: string | undefined): string | null {
  const raw = phone ?? "";
  if (!raw.replace(/\D/g, "")) return null;
  const selected = phoneCountry(country);
  if (!selected) return "Select a country code";
  const digits = nationalDigits(selected.iso, raw);
  if (!selected.lengths.includes(digits.length)) return phoneLengthMessage(selected.lengths);
  return null;
}

export function formatStoredPhone(country: string | undefined, phone: string | undefined): string {
  const digits = nationalDigits(country, phone ?? "");
  const selected = phoneCountry(country);
  if (!digits || !selected) return "";
  return `+${selected.callingCode} ${digits}`;
}
