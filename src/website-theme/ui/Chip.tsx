export function Chip({
  children,
  pressed,
  onClick,
}: {
  children: string;
  pressed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="chip" aria-pressed={pressed} onClick={onClick}>
      {children}
    </button>
  );
}
