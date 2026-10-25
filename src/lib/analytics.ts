import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { readFileSync } from "fs";
import path from "path";

export type AnalyticsPoint = { label: string; axis: string; value: number };
export type AnalyticsRow = { label: string; value: string };

export type AnalyticsSnapshot =
  | {
      ok: true;
      activeNow: number;
      totals: { label: string; value: string; note: string }[];
      views: AnalyticsPoint[];
      pages: AnalyticsRow[];
      countries: AnalyticsRow[];
    }
  | { ok: false; message: string };

function credentialsPath() {
  return process.env.GA_CREDENTIALS_PATH || path.join(process.cwd(), "secrets", "ga.json");
}

function propertyName() {
  const id = process.env.GA_PROPERTY_ID?.replace(/^properties\//, "").trim();
  return id ? `properties/${id}` : "";
}

function serviceAccountEmail() {
  try {
    const parsed = JSON.parse(readFileSync(credentialsPath(), "utf8")) as { client_email?: string };
    return parsed.client_email || "the analytics service account";
  } catch {
    return "the analytics service account";
  }
}

function numberValue(value?: string | null) {
  const parsed = Number(value || 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

function formatDuration(seconds: number) {
  const total = Math.round(seconds);
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return minutes ? `${minutes}m ${rest}s` : `${rest}s`;
}

function dayPoint(raw: string, value: number): AnalyticsPoint {
  const match = /^(\d{4})(\d{2})(\d{2})$/.exec(raw);
  if (!match) return { label: raw, axis: raw, value };
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  return {
    label: new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }).format(date),
    axis: String(date.getUTCDate()),
    value,
  };
}

function explain(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("SERVICE_DISABLED") || message.includes("has not been used")) {
    return "Turn on the Google Analytics Data API in the same Google Cloud project as the service account, then reload this page.";
  }
  if (message.includes("sufficient permissions") || message.includes("PERMISSION_DENIED")) {
    return `Add ${serviceAccountEmail()} as a Viewer on the GA4 property, then reload this page.`;
  }
  return "Analytics could not be loaded. Check the property ID and the service account access.";
}

export async function getSiteAnalytics(): Promise<AnalyticsSnapshot> {
  const property = propertyName();
  if (!property) {
    return {
      ok: false,
      message: `Add the numeric GA4 property ID to GA_PROPERTY_ID in .env. It is under Admin, then Property settings. Also add ${serviceAccountEmail()} as a Viewer on that property.`,
    };
  }

  try {
    const client = new BetaAnalyticsDataClient({ keyFilename: credentialsPath() });
    const range = [{ startDate: "27daysAgo", endDate: "today" }];
    const [realtime, totals, daily, pages, countries] = await Promise.all([
      client.runRealtimeReport({ property, metrics: [{ name: "activeUsers" }] }),
      client.runReport({
        property,
        dateRanges: range,
        metrics: [
          { name: "activeUsers" },
          { name: "newUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
          { name: "engagementRate" },
          { name: "averageSessionDuration" },
        ],
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "13daysAgo", endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
      }),
      client.runReport({
        property,
        dateRanges: range,
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 8,
      }),
      client.runReport({
        property,
        dateRanges: range,
        dimensions: [{ name: "country" }],
        metrics: [{ name: "activeUsers" }],
        orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
        limit: 6,
      }),
    ]);

    const metric = totals[0].rows?.[0]?.metricValues ?? [];
    const users = numberValue(metric[0]?.value);
    const newer = numberValue(metric[1]?.value);
    const sessions = numberValue(metric[2]?.value);
    const views = numberValue(metric[3]?.value);
    const engagement = numberValue(metric[4]?.value);
    const duration = numberValue(metric[5]?.value);

    return {
      ok: true,
      activeNow: numberValue(realtime[0].rows?.[0]?.metricValues?.[0]?.value),
      totals: [
        { label: "Users", value: formatCount(users), note: `${formatCount(newer)} new` },
        { label: "Sessions", value: formatCount(sessions), note: "Last 28 days" },
        { label: "Page views", value: formatCount(views), note: "Last 28 days" },
        { label: "Engagement", value: `${Math.round(engagement * 100)}%`, note: `Avg ${formatDuration(duration)}` },
      ],
      views: (daily[0].rows ?? []).map((row) =>
        dayPoint(row.dimensionValues?.[0]?.value || "", numberValue(row.metricValues?.[0]?.value)),
      ),
      pages: (pages[0].rows ?? []).map((row) => ({
        label: row.dimensionValues?.[0]?.value || "/",
        value: formatCount(numberValue(row.metricValues?.[0]?.value)),
      })),
      countries: (countries[0].rows ?? []).map((row) => ({
        label: row.dimensionValues?.[0]?.value || "Unknown",
        value: formatCount(numberValue(row.metricValues?.[0]?.value)),
      })),
    };
  } catch (error) {
    return { ok: false, message: explain(error) };
  }
}
