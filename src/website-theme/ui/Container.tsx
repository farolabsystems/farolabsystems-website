import type { ReactNode } from "react";

export function Container({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return <div className={wide ? "container-wide" : "container"}>{children}</div>;
}
