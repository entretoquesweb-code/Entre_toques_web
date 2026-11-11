"use client";

import { useEffect, useState } from "react";

import { ButtonLink } from "@/components/ui/ButtonLink";

import styles from "./MobileStickyCta.module.css";

interface MobileStickyCtaProps {
  readonly href: string;
}

/**
 * Barra fixa de agendamento no celular. Fica escondida enquanto algum botão
 * principal de agendamento (marcado com `data-cta-anchor`) está visível,
 * para não duplicar a chamada na tela.
 */
export function MobileStickyCta({ href }: MobileStickyCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const anchors = document.querySelectorAll("[data-cta-anchor]");
    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) onScreen.add(entry.target);
        else onScreen.delete(entry.target);
      }
      setVisible(onScreen.size === 0);
    });

    anchors.forEach((anchor) => observer.observe(anchor));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.bar} data-visible={visible} inert={!visible}>
      <ButtonLink href={href} external icon="whatsapp" className={styles.btn}>
        Agendar pelo WhatsApp
      </ButtonLink>
    </div>
  );
}
