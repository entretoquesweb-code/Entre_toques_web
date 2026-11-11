import { Icon } from "@/components/icons/Icon";
import { siteConfig } from "@/config/site";
import { cx } from "@/lib/links";

import styles from "./Logo.module.css";

interface LogoProps {
  readonly className?: string;
}

/** Símbolo "( • )" — dois toques e o cliente no centro — com o nome da marca. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cx(styles.logo, className)}>
      <Icon name="mark" className={styles.mark} />
      <span className={styles.word}>
        <span className={styles.name}>{siteConfig.name}</span>
        <span className={styles.tag}>{siteConfig.tagline}</span>
      </span>
    </span>
  );
}
