import type { ReactNode } from "react";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <main className="app-shell">
      <div className="app-container">{children}</div>
    </main>
  );
}
