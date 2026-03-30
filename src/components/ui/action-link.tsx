import Link from "next/link";
import type { ReactNode } from "react";

type ActionLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "secondary" | "inline";
};

const variantClassName = {
  primary: "ui-action ui-action--primary",
  secondary: "ui-action ui-action--secondary",
  inline: "ui-action ui-action--inline",
} as const;

export function ActionLink({
  children,
  href,
  className,
  variant = "primary",
}: ActionLinkProps) {
  return (
    <Link
      className={[variantClassName[variant], className].filter(Boolean).join(" ")}
      href={href}
    >
      {children}
    </Link>
  );
}
