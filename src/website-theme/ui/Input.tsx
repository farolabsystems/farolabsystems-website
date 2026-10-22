type Props = {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  error?: string;
  onChange: (value: string) => void;
  multiline?: boolean;
};

export function Input({ id, label, name, type = "text", value, placeholder, error, onChange, multiline }: Props) {
  const fieldClass = error ? "field field-error" : "field";
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="body-sm">{label}</span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          className={fieldClass}
          rows={6}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          className={fieldClass}
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {error ? (
        <span className="body-sm" style={{ color: "var(--tc-danger)" }}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
