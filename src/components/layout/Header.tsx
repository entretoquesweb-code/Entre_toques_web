import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { navLinks } from "@/content/home";
import { whatsappLink } from "@/lib/links";

import styles from "./Header.module.css";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const whatsapp = whatsappLink();

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          <Logo />
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink
          href={whatsapp}
          external
          variant="line"
          size="sm"
          icon="whatsapp"
          className={styles.cta}
          aria-label="Agendar pelo WhatsApp"
        >
          Agendar
        </ButtonLink>

        <div className={styles.mobileActions}>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.round}
            aria-label="Agendar pelo WhatsApp"
          >
            <Icon name="whatsapp" />
          </a>
          <MobileMenu links={navLinks} whatsappHref={whatsapp} />
        </div>
      </div>
    </header>
  );
}
