import { siteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";

/**
 * Dados estruturados (schema.org) do negócio para o Google.
 * O JSON é serializado com "<" escapado, conforme a recomendação do Next.js,
 * para impedir que algum texto feche a tag <script>.
 */
export function LocalBusinessJsonLd() {
  const { address, instagram, whatsapp } = siteConfig;

  const data = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    "@id": `${siteUrl}/#negocio`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image.jpg`,
    telephone: `+${whatsapp.number}`,
    // Sem rua, CEP nem horário fixo: o site só divulga bairro e cidade, e os
    // horários são combinados pelo WhatsApp. Melhor omitir do que publicar dado falso.
    address: {
      "@type": "PostalAddress",
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    areaServed: { "@type": "City", name: address.city },
    sameAs: [instagram.url],
  };

  return (
    <script
      type="application/ld+json"
      // Conteúdo 100% interno (config do site) e escapado.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
