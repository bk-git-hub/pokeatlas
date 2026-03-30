import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <div className={["ui-eyebrow", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
