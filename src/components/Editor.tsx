"use client";

export function Editor({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="body-sm">{label}</span>
      <textarea id={id} className="field" rows={16} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
