import { Icon } from "@/components/icons/Icon";
import { whatsappLink } from "@/lib/links";

import styles from "./FloatingWhatsApp.module.css";

/** Botão flutuante de WhatsApp (desktop). No celular, a barra fixa assume esse papel. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.float}
      aria-label="Agendar pelo WhatsApp"
    >
      <Icon name="whatsapp" />
    </a>
  );
}
