/**
 * Montagem segura de links do WhatsApp (wa.me).
 *
 * Funções puras, sem dependências: testadas com o runner nativo do Node
 * (`npm test`).
 */

/** E.164 sem o "+": 10 a 15 dígitos, sem zero à esquerda. */
const PHONE_PATTERN = /^[1-9]\d{9,14}$/;

/** Remove máscara e valida o número. Lança erro se for inválido. */
export function normalizePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_PATTERN.test(digits)) {
    throw new Error(
      "Número de WhatsApp inválido: use o formato internacional, só com dígitos (ex.: 5511999999999).",
    );
  }
  return digits;
}

/**
 * Gera o link oficial `https://wa.me/<número>?text=<mensagem>`.
 * A mensagem é sempre codificada com `encodeURIComponent`, então nenhum
 * caractere do texto consegue alterar a URL.
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${normalizePhone(phone)}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
