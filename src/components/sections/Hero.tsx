import Image from "next/image";
import { Fragment } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { hero } from "@/content/home";
import { whatsappLink } from "@/lib/links";

import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.media}>
        <Image
          src={hero.photo.src}
          alt={hero.photo.alt}
          fill
          loading="eager"
          fetchPriority="high"
          placeholder="blur"
          sizes="100vw"
          className={styles.bg}
        />
      </div>
      <div className={styles.shade} aria-hidden="true" />

      <div className={`wrap ${styles.content}`}>
        <Eyebrow>{hero.eyebrow}</Eyebrow>
        <h1 id="hero-title" className={styles.title}>
          {hero.titleLines.map((line) => (
            <Fragment key={line}>
              {line}
              <br />
            </Fragment>
          ))}
          <em>{hero.titleAccent}</em>
        </h1>
        <p className={styles.lead}>{hero.lead}</p>
        <div className={styles.ctas} data-cta-anchor="">
          <ButtonLink href={whatsappLink()} external icon="whatsapp">
            {hero.cta}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
