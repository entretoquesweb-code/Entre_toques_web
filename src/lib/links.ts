import { siteConfig } from "@/config/site";

import { buildWhatsAppUrl } from "./whatsapp";

/** Link do WhatsApp da Entre Toques com a mensagem (padrão ou personalizada). */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage): string {
  return buildWhatsAppUrl(siteConfig.whatsapp.number, message);
}

/** Junta classes CSS ignorando valores vazios. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
