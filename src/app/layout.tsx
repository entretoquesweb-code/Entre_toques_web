// CSS global primeiro: os CSS Modules dos componentes vêm depois e podem sobrescrevê-lo.
import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";

import { IconSprite } from "@/components/icons/Icon";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyCta } from "@/components/layout/MobileStickyCta";
import { googleSiteVerification, siteUrl } from "@/config/env";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/links";

// Fontes baixadas no build e servidas pelo próprio site (sem chamadas ao Google em produção).
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  formatDetection: { telephone: false, email: false, address: false },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    // suppressHydrationWarning: extensões de navegador injetam atributos no <html>
    // antes da hidratação (ex.: xk-injected). Vale só para os atributos desta tag,
    // que aqui são fixos; erros reais nos componentes filhos continuam aparecendo.
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${serif.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <IconSprite />
        <Header />
        <main id="conteudo" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
        <MobileStickyCta href={whatsappLink()} />
      </body>
    </html>
  );
}
