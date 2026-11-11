import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy.
 *
 * O site é 100% estático (sem formulários, login, cookies ou scripts de
 * terceiros), então a política libera apenas recursos da própria origem.
 * Em produção os scripts externos levam hash de integridade (SRI, ver
 * `experimental.sri`). `'unsafe-eval'` só existe em desenvolvimento,
 * exigido pelo React para depuração.
 *
 * Se um dia entrar um script de terceiros (analytics, pixel etc.), adicione
 * o domínio exato aqui — nunca use curingas.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // HTTPS obrigatório por 2 anos, incluindo subdomínios.
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "browsing-topics=()",
      "camera=()",
      "display-capture=()",
      "encrypted-media=()",
      "fullscreen=(self)",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "midi=()",
      "payment=()",
      "picture-in-picture=()",
      "publickey-credentials-get=()",
      "screen-wake-lock=()",
      "usb=()",
    ].join(", "),
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactStrictMode: true,
  // Não anuncia a tecnologia do servidor (remove "X-Powered-By: Next.js").
  poweredByHeader: false,
  // Saída enxuta para rodar em contêiner (ver Dockerfile). Ignorado na Vercel.
  output: "standalone",
  experimental: {
    // Subresource Integrity: hash SHA-256 em cada script gerado no build.
    sri: { algorithm: "sha256" },
    // CSS (~40 KB) embutido no HTML: elimina a requisição que bloqueia a
    // renderização. Compensa porque o público chega quase sempre pela 1ª vez
    // (Instagram/WhatsApp), em redes móveis.
    inlineCss: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Só otimiza as imagens do próprio projeto (importadas em src/assets):
    // impede o uso do otimizador para servir arquivos arbitrários.
    localPatterns: [{ pathname: "/_next/static/media/**", search: "" }],
    // Nenhum domínio externo de imagem é permitido.
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
