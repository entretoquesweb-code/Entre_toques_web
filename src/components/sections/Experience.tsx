import { Eyebrow } from "@/components/ui/Eyebrow";
import { experience } from "@/content/home";

import styles from "./Experience.module.css";

/** "O que você encontra": a experiência em quatro etapas. */
export function Experience() {
  return (
    <section className={`sec ${styles.exp}`} id="experiencia" aria-labelledby="experiencia-titulo">
      <div className="wrap">
        <div className={styles.head}>
          <Eyebrow centered>{experience.eyebrow}</Eyebrow>
          <h2 id="experiencia-titulo" className={styles.title}>
            {experience.title} <em>{experience.titleAccent}</em>
          </h2>
        </div>

        <ol className={styles.list}>
          {experience.items.map((item, index) => (
            <li key={item} className={styles.item}>
              <span className={styles.n} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.name}>{item}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
