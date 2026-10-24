"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useAdminToast } from "@/components/AdminToast";
import { ConfirmModal } from "@/components/ConfirmModal";

export type AdminColumn = { key: string; label: string };

export type AdminRow = {
  id: string;
  href?: string;
  viewHref?: string;
  search: string;
  status?: "PUBLISHED" | "DRAFT" | "";
  cells: Record<string, string>;
  deleteUrl?: string;
};

const PAGE_SIZE = 8;

export function AdminTable({
  columns,
  rows,
  empty,
}: {
  columns: AdminColumn[];
  rows: AdminRow[];
  empty: string;
}) {
  const router = useRouter();
  const toast = useAdminToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [busy, setBusy] = useState("");
  const [pending, setPending] = useState<AdminRow | null>(null);
  const hasStatus = rows.some((row) => row.status);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      const statusOk = status === "all" || row.status === status;
      const searchOk = !needle || row.search.toLowerCase().includes(needle);
      return statusOk && searchOk;
    });
  }, [query, rows, status]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const slice = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const from = filtered.length === 0 ? 0 : (current - 1) * PAGE_SIZE + 1;
  const to = Math.min(current * PAGE_SIZE, filtered.length);

  async function remove() {
    if (!pending?.deleteUrl) return;
    setBusy(pending.id);
    const response = await fetch(pending.deleteUrl, { method: "DELETE" });
    setBusy("");
    if (!response.ok) {
      toast({ tone: "error", title: "Could not delete", body: "Try again in a moment." });
      return;
    }
    const name = pending.cells.title || "Item";
    setPending(null);
    toast({ tone: "success", title: "Deleted", body: name });
    router.refresh();
  }

  return (
    <div className="admin-table-wrap">
      <div className="admin-filters">
        <input
          className="field"
          value={query}
          placeholder="Search"
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        {hasStatus ? (
          <select
            className="field"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(1);
            }}
          >
            <option value="all">All statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>
        ) : null}
      </div>
      <div className="admin-table-scroll">
        <table className="admin-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.key === "status" || column.key === "origin" ? (
                      <span
                        className={
                          row.status === "PUBLISHED" && column.key === "status"
                            ? "caption admin-status is-live"
                            : row.cells[column.key] === "Auto"
                              ? "caption admin-status is-live"
                              : "caption admin-status"
                        }
                      >
                        {row.cells[column.key] || "—"}
                      </span>
                    ) : (
                      row.cells[column.key] || "—"
                    )}
                  </td>
                ))}
                <td>
                  <div className="admin-row-actions">
                    {row.viewHref ? (
                      <a className="btn btn-ghost admin-mini" href={row.viewHref} target="_blank" rel="noreferrer">
                        <Eye size={15} strokeWidth={1.75} aria-hidden="true" />
                        View
                      </a>
                    ) : null}
                    {row.href ? (
                      <Link className="btn btn-ghost admin-mini" href={row.href}>
                        {row.href.includes("/leads/") ? <Eye size={15} strokeWidth={1.75} aria-hidden="true" /> : <Pencil size={15} strokeWidth={1.75} aria-hidden="true" />}
                        {row.href.includes("/leads/") ? "View" : "Edit"}
                      </Link>
                    ) : null}
                    {row.deleteUrl ? (
                      <button type="button" className="btn btn-ghost admin-mini" disabled={busy === row.id} onClick={() => setPending(row)}>
                        <Trash2 size={15} strokeWidth={1.75} aria-hidden="true" />
                        Delete
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 ? <p className="body muted">{empty}</p> : null}
      <div className="admin-pager">
        <p className="caption">
          {from}–{to} of {filtered.length}
        </p>
        {pages > 1 ? (
          <nav className="admin-pager-buttons" aria-label="Pages">
            {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                className={number === current ? "admin-page is-current" : "admin-page"}
                aria-current={number === current ? "page" : undefined}
                onClick={() => setPage(number)}
              >
                {number}
              </button>
            ))}
          </nav>
        ) : null}
      </div>
      <ConfirmModal
        open={Boolean(pending)}
        title="Delete this item?"
        body={pending ? `“${pending.cells.title || "This item"}” will be removed. This cannot be undone.` : ""}
        busy={Boolean(pending && busy === pending.id)}
        onCancel={() => !busy && setPending(null)}
        onConfirm={() => void remove()}
      />
    </div>
  );
}
