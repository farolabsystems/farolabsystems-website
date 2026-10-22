"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { nationalDigits, phoneCountries, phoneCountry, phonePlaceholder } from "@/lib/phone";

type Props = {
  country: string;
  number: string;
  error?: string;
  onCountry: (iso: string) => void;
  onNumber: (digits: string) => void;
};

export function PhoneField({ country, number, error, onCountry, onNumber }: Props) {
  const labelId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const selected = phoneCountry(country) ?? phoneCountries()[0];
  const maxLength = selected?.lengths.length ? Math.max(...selected.lengths) : 15;

  const options = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return phoneCountries();
    return phoneCountries().filter((item) => {
      const code = `+${item.callingCode}`;
      return (
        item.name.toLowerCase().includes(query) ||
        item.iso.toLowerCase().includes(query) ||
        code.includes(query) ||
        item.callingCode.includes(query)
      );
    });
  }, [search]);

  useEffect(() => {
    if (!open) return;
    searchRef.current?.focus();
    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(iso: string) {
    onCountry(iso);
    onNumber(nationalDigits(iso, number));
    setOpen(false);
    setSearch("");
  }

  return (
    <div className={open ? "phone-label is-open grid gap-2" : "phone-label grid gap-2"}>
      <span id={labelId} className="body-sm">
        Phone number
      </span>
      <div ref={rootRef} className={error ? "phone-field is-error" : "phone-field"}>
        <button
          type="button"
          className="phone-code"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`Country code ${selected?.name ?? "India"} +${selected?.callingCode ?? "91"}`}
          onClick={() => setOpen((current) => !current)}
        >
          <span>+{selected?.callingCode ?? "91"}</span>
          <span aria-hidden="true">▾</span>
        </button>
        {open ? (
          <div className="phone-menu">
            <input
              ref={searchRef}
              className="field phone-search"
              value={search}
              placeholder="Search country or code"
              aria-label="Search country code"
              onChange={(event) => setSearch(event.target.value)}
            />
            <div id={listId} role="listbox" aria-label="Country codes">
              {options.map((item) => (
                <button
                  key={item.iso}
                  type="button"
                  role="option"
                  aria-selected={item.iso === selected?.iso}
                  className="phone-option"
                  onClick={() => choose(item.iso)}
                >
                  <span className="phone-option-iso">{item.iso}</span>
                  <span className="phone-option-name">{item.name}</span>
                  <span className="phone-option-code">+{item.callingCode}</span>
                </button>
              ))}
              {options.length === 0 ? <p className="body-sm muted phone-empty">No countries match.</p> : null}
            </div>
          </div>
        ) : null}
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className="phone-number"
          aria-labelledby={labelId}
          aria-invalid={Boolean(error)}
          placeholder={phonePlaceholder(selected?.iso)}
          maxLength={maxLength}
          value={number}
          onChange={(event) => onNumber(nationalDigits(selected?.iso, event.target.value))}
        />
      </div>
      {error ? (
        <span className="body-sm" style={{ color: "var(--tc-danger)" }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
