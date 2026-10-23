import { runDailyBlog } from "@/modules/blog/generate-blog";

const marker = globalThis as typeof globalThis & { __blogSchedule?: boolean };

function timeZone() {
  return process.env.BLOG_CRON_TZ?.trim() || "Asia/Kolkata";
}

function msUntilNoon(zone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date());
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
  let seconds = (12 - read("hour")) * 3600 - read("minute") * 60 - read("second");
  if (seconds <= 0) seconds += 24 * 3600;
  return seconds * 1000;
}

function arm() {
  const zone = timeZone();
  const delay = msUntilNoon(zone);
  const timer = setTimeout(() => {
    void runDailyBlog().catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Daily blog failed";
      console.error(`[blog] ${message}`);
    });
    arm();
  }, delay);
  timer.unref();
}

export function startDailyBlogSchedule() {
  if (marker.__blogSchedule) return;
  marker.__blogSchedule = true;
  const zone = timeZone();
  console.log(`[blog] daily post scheduled for 12:00 ${zone}`);
  arm();
}
