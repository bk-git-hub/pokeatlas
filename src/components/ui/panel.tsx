import type { ComponentPropsWithoutRef, ReactNode } from "react";

type PanelProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  tone?: "section" | "card" | "soft";
};

const toneClassName = {
  section: "ui-panel ui-panel--section",
  card: "ui-panel ui-panel--card",
  soft: "ui-panel ui-panel--soft",
} as const;

export function Panel({
  children,
  className,
  tone = "section",
  ...props
}: PanelProps) {
  return (
    <div
      className={[toneClassName[tone], className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
