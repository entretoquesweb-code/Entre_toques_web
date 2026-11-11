import { cacheLife } from "next/cache";
import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Icon } from "@/components/icons/Icon";
import { siteConfig } from "@/config/site";
import { footerAbout } from "@/content/home";
import { whatsappLink } from "@/lib/links";

import styles from "./Footer.module.css";

/** Ano atual capturado no HTML estático (Cache Components exige "use cache" para datas). */
async function CurrentYear() {
  "use cache";
  cacheLife("max");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  const { address, hours, instagram, whatsapp } = siteConfig;

  return (
    <footer className={styles.footer} id="contato">
      <div className="wrap">
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.brand}>
              <Logo />
            </Link>
            <p className={styles.about}>{footerAbout}</p>
            <div className={styles.social}>
              <a href={instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Entre Toques">
                <Icon name="instagram" />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Entre Toques">
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>

          <div>
            <h2 className={styles.title}>Contato</h2>
            <ul className={styles.list}>
              <li>
                <Icon name="whatsapp" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  {whatsapp.display}
                </a>
              </li>
              <li>
                <Icon name="instagram" />
                <a href={instagram.url} target="_blank" rel="noopener noreferrer">
                  {instagram.handle}
                </a>
              </li>
              <li>
                <Icon name="pin" />
                <span>
                  {address.district}, {address.city} ({address.region})
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className={styles.title}>Horários</h2>
            <p className={styles.text}>{hours}</p>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>
            © <CurrentYear /> {siteConfig.name} · {siteConfig.tagline}. Todos os direitos reservados.
          </span>
          <Link href="/politica-de-privacidade">Política de privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
