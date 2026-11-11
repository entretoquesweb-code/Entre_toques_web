import type { Metadata } from "next";

import { SimplePage } from "@/components/layout/SimplePage";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <SimplePage
      eyebrow="Erro 404"
      title={
        <>
          Esta página <em>não existe.</em>
        </>
      }
    >
      <p>O endereço pode ter mudado ou foi digitado errado. Que tal voltar ao início?</p>
      <p>
        <ArrowLink href="/">Voltar ao início</ArrowLink>
      </p>
    </SimplePage>
  );
}
