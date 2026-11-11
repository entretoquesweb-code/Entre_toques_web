/**
 * Conteúdo da landing page. Textos e listas ficam aqui, separados dos
 * componentes, para facilitar ajustes.
 *
 * Os textos seguem o roteiro enviado pela cliente.
 */
import type { StaticImageData } from "next/image";

import ctaVela from "@/assets/images/cta-vela.jpg";
import heroHomem from "@/assets/images/hero-homem.jpg";

export interface Photo {
  readonly src: StaticImageData;
  /** Texto alternativo. Use "" apenas para imagens puramente decorativas. */
  readonly alt: string;
  /** Enquadramento (CSS object-position). */
  readonly position?: string;
}

export const navLinks = [
  { href: "/#experiencia", label: "A experiência" },
  { href: "/#contato", label: "Contato" },
] as const;

/* ------------------------------------------------------------------ HERO */

export const hero = {
  /** A cidade visível no topo também ajuda nas buscas locais. */
  eyebrow: "Dourados · MS",
  titleLines: ["Massagem erótica", "relaxante"],
  titleAccent: "para homens.",
  lead: "Relaxamento, sensualidade e prazer em uma experiência individual e reservada.",
  cta: "Agende seu horário pelo WhatsApp",
  photo: { src: heroHomem, alt: "Homem relaxando de olhos fechados" } satisfies Photo,
};

/* ----------------------------------------------------------- EXPERIÊNCIA */

export const experience = {
  eyebrow: "O que você encontra",
  title: "Uma experiência",
  titleAccent: "completa.",
  items: ["Massagem relaxante", "Massagem erótica", "Toques sensuais", "Finalização"],
};

/* ------------------------------------------------------------- CTA FINAL */

export const finalCta = {
  eyebrow: "Agendamento",
  title: "Seu momento",
  titleAccent: "começa aqui.",
  lead: "Escolha seu atendimento e consulte a disponibilidade de horários.",
  cta: "Agendar pelo WhatsApp",
  note: "Atendimento com hora marcada",
  photo: { src: ctaVela, alt: "" } satisfies Photo,
};

export const footerAbout = "Atendimento individual.";
