"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useAdminToast } from "@/components/AdminToast";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/website-theme/ui/Button";

export function LeadActions({ id, title = "this inquiry" }: { id: string; title?: string }) {
  const router = useRouter();
  const toast = useAdminToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function remove() {
    setBusy(true);
    const response = await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    setBusy(false);
    if (!response.ok) {
      toast({ tone: "error", title: "Could not delete" });
      return;
    }
    toast({ tone: "success", title: "Inquiry deleted" });
    router.push("/admin/leads");
    router.refresh();
  }

  return (
    <div>
      <Button type="button" variant="ghost" disabled={busy} onClick={() => setOpen(true)}>
        <Trash2 size={16} strokeWidth={1.75} aria-hidden="true" />
        Delete inquiry
      </Button>
      <ConfirmModal
        open={open}
        title="Delete this inquiry?"
        body={`“${title}” will be removed. This cannot be undone.`}
        busy={busy}
        onCancel={() => !busy && setOpen(false)}
        onConfirm={() => void remove()}
      />
    </div>
  );
}
