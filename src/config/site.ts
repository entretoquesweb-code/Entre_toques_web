/**
 * Dados do negócio: fonte única da verdade do site.
 */

export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly title: string;
  readonly description: string;
  readonly locale: string;
  readonly whatsapp: {
    /** Formato internacional, só dígitos: DDI + DDD + número. */
    readonly number: string;
    /** Como o número aparece escrito no site. */
    readonly display: string;
    /** Mensagem que já vem escrita ao abrir a conversa. */
    readonly defaultMessage: string;
  };
  readonly instagram: { readonly handle: string; readonly url: string };
  /** Só bairro e cidade: o endereço completo não é divulgado no site. */
  readonly address: {
    readonly district: string;
    readonly city: string;
    readonly region: string;
    readonly country: string;
  };
  /** Horário exibido no rodapé. Não há grade fixa: a disponibilidade é combinada pelo WhatsApp. */
  readonly hours: string;
  /** Data da última revisão de conteúdo (sitemap). */
  readonly lastUpdated: string;
}

export const siteConfig = {
  name: "Entre Toques",
  tagline: "Massagem erótica masculina",
  // Título e descrição são o que aparece no resultado do Google: cidade e serviço primeiro.
  title: "Massagem erótica masculina em Dourados (MS) · Entre Toques",
  description:
    "Massagem erótica relaxante para homens em Dourados (MS): relaxamento, sensualidade e prazer, com finalização. Agende pelo WhatsApp.",
  locale: "pt_BR",
  whatsapp: {
    number: "5542991321318",
    display: "(42) 99132-1318",
    defaultMessage: "Olá! Vim através do site e gostaria de agendar um horário.",
  },
  instagram: {
    handle: "@entretoques_dourados",
    url: "https://www.instagram.com/entretoques_dourados/",
  },
  address: {
    district: "Centro",
    city: "Dourados",
    region: "MS",
    country: "BR",
  },
  hours: "Consulte a disponibilidade",
  lastUpdated: "2026-11-09",
} as const satisfies SiteConfig;
