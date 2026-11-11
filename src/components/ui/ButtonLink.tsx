import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/icons/Icon";
import { cx } from "@/lib/links";

import styles from "./ButtonLink.module.css";

interface ButtonLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: "gold" | "line" | "dark";
  readonly size?: "sm" | "md" | "lg";
  readonly icon?: IconName;
  /** Abre em nova aba com rel="noopener noreferrer" (links externos). */
  readonly external?: boolean;
  readonly className?: string;
  readonly id?: string;
  readonly "aria-label"?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "gold",
  size = "md",
  icon,
  external = false,
  className,
  id,
  "aria-label": ariaLabel,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      id={id}
      aria-label={ariaLabel}
      className={cx(styles.btn, styles[variant], styles[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {icon ? <Icon name={icon} className={styles.icon} /> : null}
      {children}
    </a>
  );
}
