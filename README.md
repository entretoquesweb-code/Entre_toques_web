# Entre Toques · Landing page

Site institucional da **Entre Toques**, massagem relaxante exclusiva para homens.
Uma página única, estática, com agendamento direto pelo WhatsApp.

- **Stack:** Next.js 16 (App Router, Turbopack, Cache Components) · React 19 · TypeScript estrito · CSS Modules
- **Renderização:** 100% estática (HTML gerado no build e servido por CDN)
- **JavaScript no cliente:** só o menu mobile e a barra fixa de agendamento. O resto, inclusive as animações, é HTML/CSS puro.

## Requisitos

- Node.js **24 LTS** (`nvm use` lê o `.nvmrc`). O `package.json` exige `24.x`, a mesma versão usada na Vercel, no CI e no Docker.
- npm 10+

## Comandos

```bash
npm ci              # instala exatamente o que está no package-lock.json
npm run dev         # desenvolvimento em http://localhost:3000
npm run build       # build de produção
npm start           # serve o build de produção
npm run check       # lint + tipos + testes + build (o mesmo que o CI roda)
npm run audit:prod  # auditoria das dependências de produção
```

## Estrutura

```
src/
├─ app/                    # rotas (App Router)
│  ├─ layout.tsx           # HTML base, fontes, metadados, header/footer
│  ├─ page.tsx             # landing page (composição das seções)
│  ├─ politica-de-privacidade/
│  ├─ not-found.tsx        # página 404
│  ├─ robots.ts · sitemap.ts · manifest.ts
│  └─ icon.svg · apple-icon.png · favicon.ico · opengraph-image.jpg
├─ components/
│  ├─ sections/            # Hero, Experience (o que você encontra), FinalCta
│  ├─ layout/              # Header, MobileMenu, Footer, FloatingWhatsApp, MobileStickyCta
│  ├─ ui/                  # ButtonLink, ArrowLink, Eyebrow
│  ├─ brand/ · icons/ · seo/
├─ config/
│  ├─ site.ts              # ★ dados do negócio (WhatsApp, endereço, horários)
│  └─ env.ts               # variáveis de ambiente validadas
├─ content/home.ts         # ★ textos de todas as seções
├─ lib/                    # links do WhatsApp (com testes)
└─ assets/images/          # fotos (otimizadas automaticamente pelo next/image)
```

## Como editar o conteúdo

| Quero mudar... | Arquivo |
| --- | --- |
| WhatsApp, Instagram, endereço, horários | `src/config/site.ts` |
| Textos das seções | `src/content/home.ts` |
| Título e descrição no Google | `src/config/site.ts` (`title` e `description`) |
| Fotos | substitua o arquivo em `src/assets/images/` mantendo o nome |
| Cores e fontes | tokens no topo de `src/app/globals.css` e `src/app/layout.tsx` |

Os botões de agendamento abrem o WhatsApp com a mensagem já escrita.

## ✅ Checklist antes de publicar

- [x] WhatsApp, Instagram, endereço (só o bairro: Centro) e horários (sob consulta),
      em `src/config/site.ts`
- [ ] Fotos do espaço real (as atuais são de banco de imagens)
- [ ] Revisão da política de privacidade pela assessoria jurídica
- [ ] Variável `SITE_URL` com o domínio definitivo

## Deploy

**Vercel (recomendado):** importe o repositório e defina `SITE_URL` (ex.:
`https://www.entretoques.com.br`). Sem ela, o domínio de produção do projeto na
Vercel é usado automaticamente. Os cabeçalhos de segurança já vêm do `next.config.ts`.

**Hospedagem própria (VPS, Coolify, Render etc.):** use o `Dockerfile`:

```bash
docker build --build-arg SITE_URL=https://www.entretoques.com.br -t entre-toques .
docker run -d -p 3000:3000 --read-only --tmpfs /app/.next/cache:uid=1001,gid=1001 \
  --tmpfs /tmp --cap-drop ALL --security-opt no-new-privileges entre-toques
```

Coloque um proxy com HTTPS na frente (Caddy, Nginx, Traefik ou Cloudflare) e repasse
o cabeçalho `Accept` para o otimizador de imagens servir AVIF/WebP.

## SEO local (Dourados/MS)

**No código:** título e descrição com serviço e cidade, "Dourados · MS" no topo da
página, os termos que as pessoas buscam no próprio texto (massagem erótica, relaxante,
toques sensuais, finalização), dados estruturados `DaySpa` com endereço e área
atendida, sitemap, robots, canonical e imagem de compartilhamento.

**Fora do código (é o que mais pesa em busca local):**

- [x] Dados reais em `src/config/site.ts`. Nome, endereço (Centro, Dourados) e
      telefone precisam ser idênticos no site, no Google e nos perfis externos
- [ ] Domínio próprio na Vercel + variável `SITE_URL`
- [ ] [Google Search Console](https://search.google.com/search-console): verificar o
      site (DNS ou variável `GOOGLE_SITE_VERIFICATION`, ver `.env.example`), enviar o
      `sitemap.xml` e pedir a indexação da página inicial
- [ ] Perfil da Empresa no Google (Maps) como massagem, com fotos e descrição sem
      conteúdo sexual explícito (proibido pelas políticas do Google); pedir avaliações
- [ ] Perfis em sites de anúncio da região apontando para o site
- [ ] Google Ads não é opção: a política de "atos sexuais remunerados" proíbe
      anúncios de massagem íntima e acompanhantes

## Segurança

Detalhes em [SECURITY.md](SECURITY.md). Resumo das decisões:

- **Superfície mínima:** sem backend, banco, formulários, cookies, analytics ou scripts
  de terceiros. As fontes são baixadas no build e servidas pelo próprio domínio.
- **Cabeçalhos HTTP** (`next.config.ts`): CSP, HSTS com preload, anti-clickjacking,
  `nosniff`, `Referrer-Policy`, `Permissions-Policy` bloqueando câmera, microfone etc.,
  COOP/CORP e remoção do `X-Powered-By`.
- **CSP e `'unsafe-inline'` em scripts — decisão testada:** o Next.js injeta o payload
  do React (RSC) em scripts inline. Testamos a política estrita (`script-src 'self'` com
  SRI): 34 scripts são bloqueados e a página para de funcionar. A única alternativa é
  usar nonce por requisição, o que força renderização dinâmica em toda visita (sem CDN,
  mais lento e mais caro) e é incompatível com Cache Components. Como o site não tem
  nenhuma entrada de usuário (não há vetor de injeção), mantivemos o site estático, com
  todo o resto da CSP fechado e **Subresource Integrity** nos scripts externos. Se um dia
  houver login, formulário ou script de terceiros, migre para nonce
  (guia: `node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md`).
- **Otimizador de imagens travado:** só aceita imagens do próprio projeto; URLs externas,
  arquivos arbitrários e qualidades fora da lista retornam 400.
- **Cadeia de suprimentos:** versões exatas, `ignore-scripts=true` no `.npmrc`,
  `overrides` corrigindo a vulnerabilidade do `minimatch` (GHSA-g3hv-75wg-m249) nas
  ferramentas de lint, `npm audit` no CI e Dependabot com cooldown de 5 dias.
- **CI:** GitHub Actions fixadas por SHA de commit, permissão só de leitura.

### Recomendações no GitHub (configurações do repositório)

- Proteger a branch `main` exigindo o CI verde e revisão de PR
- Ativar *Dependabot alerts* e *Private vulnerability reporting*
- Ativar *Secret scanning* e *Push protection* (se disponíveis no plano)

## Imagens

Fotos de banco de imagens (licença Unsplash: uso comercial livre, sem exigência de
atribuição), usadas como ilustração até o ensaio do espaço real:

| Arquivo | Fonte |
| --- | --- |
| hero-homem.jpg | https://unsplash.com/photos/hCTLx7QrE-w |
| cta-vela.jpg | https://unsplash.com/photos/Pg2jm-PMVWs |

A imagem de compartilhamento (`src/app/opengraph-image.jpg`, 1200×630) é uma arte
montada com a `hero-homem.jpg`, a logo e o título da página: se trocar a foto ou o
título, gere a arte de novo.
