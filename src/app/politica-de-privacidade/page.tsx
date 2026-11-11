import type { Metadata } from "next";

import { SimplePage } from "@/components/layout/SimplePage";
import { siteConfig } from "@/config/site";
import { whatsappLink } from "@/lib/links";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como a Entre Toques trata dados pessoais, em conformidade com a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// Modelo base: revisar com a assessoria jurídica da cliente antes de publicar.
export default function PrivacyPage() {
  return (
    <SimplePage
      eyebrow="Transparência"
      title={
        <>
          Política de <em>privacidade</em>
        </>
      }
    >
      <p>
        Esta política explica como a <strong>{siteConfig.name}</strong> trata dados pessoais,
        em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>Este site não coleta seus dados</h2>
      <p>
        O site é apenas informativo: não tem formulários, cadastro, cookies de rastreamento,
        ferramentas de publicidade nem scripts de terceiros. Navegar por ele não exige que
        você informe nenhum dado pessoal.
      </p>

      <h2>Agendamento pelo WhatsApp</h2>
      <p>
        Ao tocar em um botão de agendamento, você é direcionado ao WhatsApp, serviço da Meta,
        que segue a própria política de privacidade. As informações que você compartilhar na
        conversa (como nome, telefone e preferência de horário) são usadas exclusivamente para
        agendar e prestar o atendimento, e não são vendidas nem repassadas a terceiros.
      </p>

      <h2>Registros técnicos</h2>
      <p>
        Como qualquer site, a hospedagem pode registrar dados técnicos de acesso (endereço IP,
        data e horário), usados somente para segurança e funcionamento, pelo prazo previsto no
        Marco Civil da Internet.
      </p>

      <h2>Seus direitos</h2>
      <p>Você pode, a qualquer momento, solicitar:</p>
      <ul>
        <li>confirmação e acesso aos dados que temos sobre você;</li>
        <li>correção de dados incompletos ou desatualizados;</li>
        <li>exclusão das conversas e dados de agendamento.</li>
      </ul>

      <h2>Contato</h2>
      <p>
        Para qualquer solicitação sobre os seus dados, fale com a gente pelo{" "}
        <a href={whatsappLink("Olá! Tenho uma solicitação sobre os meus dados pessoais.")} target="_blank" rel="noopener noreferrer">
          WhatsApp
        </a>
        .
      </p>

      <p>Última atualização: novembro de 2026.</p>
    </SimplePage>
  );
}
