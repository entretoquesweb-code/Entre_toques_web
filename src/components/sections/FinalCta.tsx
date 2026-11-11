import Image from "next/image";

import { Icon } from "@/components/icons/Icon";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { finalCta } from "@/content/home";
import { whatsappLink } from "@/lib/links";

import styles from "./FinalCta.module.css";

export function FinalCta() {
  return (
    <section className={styles.final} aria-labelledby="reserva-titulo">
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src={finalCta.photo.src}
          alt={finalCta.photo.alt}
          fill
          placeholder="blur"
          sizes="100vw"
          className={styles.bg}
        />
      </div>

      <div className={`wrap ${styles.content}`}>
        <Icon name="mark" className={styles.mark} />
        <Eyebrow centered>{finalCta.eyebrow}</Eyebrow>
        <h2 id="reserva-titulo" className={styles.title}>
          {finalCta.title} <em>{finalCta.titleAccent}</em>
        </h2>
        <p className={styles.lead}>{finalCta.lead}</p>
        <div className={styles.ctaWrap} data-cta-anchor="">
          <ButtonLink href={whatsappLink()} external size="lg" icon="whatsapp">
            {finalCta.cta}
          </ButtonLink>
        </div>
        <p className={styles.small}>{finalCta.note}</p>
      </div>
    </section>
  );
}
