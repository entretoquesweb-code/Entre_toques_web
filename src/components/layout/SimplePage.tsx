import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";

import styles from "./SimplePage.module.css";

interface SimplePageProps {
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly children: ReactNode;
}

/** Moldura para páginas de texto (privacidade, 404): mesmo visual, sem o hero. */
export function SimplePage({ eyebrow, title, children }: SimplePageProps) {
  return (
    <section className={styles.page}>
      <div className={`wrap ${styles.inner}`}>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.body}>{children}</div>
      </div>
    </section>
  );
}
