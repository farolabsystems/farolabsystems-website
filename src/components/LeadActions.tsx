"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/website-theme/ui/Button";

export function LeadActions({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Delete this inquiry?")) return;
    setBusy(true);
    const response = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!response.ok) return;
    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <div>
      <Button type="button" variant="ghost" disabled={busy} onClick={() => void remove()}>
        Delete inquiry
      </Button>
    </div>
  );
}
