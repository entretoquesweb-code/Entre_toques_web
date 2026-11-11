/**
 * Variáveis de ambiente lidas no servidor (build e renderização).
 * Validadas aqui para falhar cedo, com mensagem clara, em vez de publicar
 * metadados quebrados.
 */

function resolveSiteUrl(): string {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const candidate =
    process.env.SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : undefined) ??
    "http://localhost:3000";

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error(`SITE_URL inválida: "${candidate}". Exemplo: https://www.entretoques.com.br`);
  }

  const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !isLocal) {
    throw new Error(`SITE_URL deve usar https:// (recebido: "${candidate}").`);
  }

  return url.origin;
}

/** Origem pública do site, sem barra no final. Ex.: https://www.entretoques.com.br */
export const siteUrl = resolveSiteUrl();

/**
 * Código de verificação do Google Search Console (opcional): só o valor do
 * atributo `content` da meta tag que o Search Console fornece.
 */
export const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined;
