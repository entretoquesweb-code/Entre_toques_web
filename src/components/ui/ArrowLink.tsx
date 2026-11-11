import type { ReactNode } from "react";

import { Icon } from "@/components/icons/Icon";

import styles from "./ArrowLink.module.css";

interface ArrowLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly className?: string;
}

/** Link textual com seta, usado para navegação interna entre seções. */
export function ArrowLink({ href, children, className }: ArrowLinkProps) {
  return (
    <a href={href} className={className ? `${styles.link} ${className}` : styles.link}>
      {children}
      <Icon name="arrow" className={styles.icon} />
    </a>
  );
}
