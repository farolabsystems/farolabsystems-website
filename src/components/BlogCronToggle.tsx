"use client";

import { useState } from "react";
import { useAdminToast } from "@/components/AdminToast";
import { Button } from "@/website-theme/ui/Button";

export function BlogCronToggle({ enabled: initial }: { enabled: boolean }) {
  const toast = useAdminToast();
  const [enabled, setEnabled] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function toggle() {
    const next = !enabled;
    setBusy(true);
    const response = await fetch("/api/admin/blog/cron", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });
    setBusy(false);
    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      toast({ tone: "error", title: "Could not update cron", body: body?.error });
      return;
    }
    setEnabled(next);
    toast({
      tone: "success",
      title: next ? "Auto posts on" : "Auto posts off",
      body: next
        ? "Four posts a day will publish at 8:00, 13:00, 17:00 and 21:00 IST."
        : "The scheduler will stay quiet until you turn it back on.",
    });
  }

  return (
    <Button type="button" variant="ghost" disabled={busy} onClick={() => void toggle()} aria-pressed={enabled}>
      {busy ? "Updating…" : enabled ? "Auto posts: On" : "Auto posts: Off"}
    </Button>
  );
}
