import { BLOG_SLOTS, type BlogSlot } from "@/modules/blog/slots";

const marker = globalThis as typeof globalThis & { __blogSchedule?: boolean };

function cronUrl() {
  const port = process.env.PORT?.trim() || "3000";
  return `http://127.0.0.1:${port}/api/cron/daily-blog`;
}

async function triggerDailyBlog(slot: BlogSlot) {
  const secret = process.env.CRON_SECRET?.trim();
  if (!secret) {
    console.error("[blog] CRON_SECRET is not set, so the scheduled post was skipped");
    return;
  }
  const response = await fetch(cronUrl(), {
    method: "POST",
    headers: { authorization: `Bearer ${secret}`, "content-type": "application/json" },
    body: JSON.stringify({ slot }),
  });
  if (!response.ok) {
    const text = await response.text();
    console.error(`[blog] scheduled post failed (${response.status}) ${text.slice(0, 300)}`);
  }
}

function timeZone() {
  return process.env.BLOG_CRON_TZ?.trim() || "Asia/Kolkata";
}

function zonedClock(zone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date());
  const read = (type: string) => Number(parts.find((part) => part.type === type)?.value || 0);
  return read("hour") * 3600 + read("minute") * 60 + read("second");
}

function nextSlot(zone: string) {
  const now = zonedClock(zone);
  for (const slot of BLOG_SLOTS) {
    const target = slot * 3600;
    if (target > now) return { slot, delay: (target - now) * 1000 };
  }
  return { slot: BLOG_SLOTS[0], delay: (24 * 3600 - now + BLOG_SLOTS[0] * 3600) * 1000 };
}

function arm() {
  const zone = timeZone();
  const next = nextSlot(zone);
  const timer = setTimeout(() => {
    void triggerDailyBlog(next.slot).catch((error: unknown) => {
      const message = error instanceof Error ? error.message : "Scheduled blog failed";
      console.error(`[blog] ${message}`);
    });
    arm();
  }, Math.max(next.delay, 1000));
  timer.unref();
}

export function startDailyBlogSchedule() {
  if (marker.__blogSchedule) return;
  marker.__blogSchedule = true;
  const zone = timeZone();
  console.log(`[blog] four posts scheduled at 08:00, 13:00, 17:00 and 21:00 ${zone}`);
  arm();
}
