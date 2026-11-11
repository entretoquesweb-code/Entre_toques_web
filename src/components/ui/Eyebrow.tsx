import type { ReactNode } from "react";

import { cx } from "@/lib/links";

import styles from "./Eyebrow.module.css";

interface EyebrowProps {
  readonly children: ReactNode;
  /** Linha dos dois lados (títulos centralizados). */
  readonly centered?: boolean;
  /** Tom escuro, para fundos claros. */
  readonly onLight?: boolean;
}

/** Rótulo pequeno em caixa alta que antecede os títulos das seções. */
export function Eyebrow({ children, centered = false, onLight = false }: EyebrowProps) {
  return (
    <p className={cx(styles.eyebrow, centered && styles.centered, onLight && styles.onLight)}>
      {children}
    </p>
  );
}
