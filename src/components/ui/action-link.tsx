import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ActionLinkVariant = "primary" | "secondary" | "subtle";

const variantClassNames: Record<ActionLinkVariant, string> = {
  primary: "cta-link cta-link-primary",
  secondary: "cta-link cta-link-secondary",
  subtle: "cta-link cta-link-subtle",
};

type ActionLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  variant?: ActionLinkVariant;
};

export function ActionLink({
  children,
  className,
  variant = "primary",
  ...props
}: ActionLinkProps) {
  const combinedClassName = [variantClassNames[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link {...props} className={combinedClassName}>
      {children}
    </Link>
  );
}
