# Política de segurança

## Como reportar uma vulnerabilidade

Não abra issue pública. Use o canal privado do GitHub:
**Security → Report a vulnerability** neste repositório. Respondemos em até 5 dias úteis.

## Versões suportadas

Apenas a versão em produção (branch `main`) recebe correções.

## Medidas adotadas

| Camada | Proteção |
| --- | --- |
| Arquitetura | Site 100% estático: sem banco de dados, formulários, login, cookies ou scripts de terceiros |
| Cabeçalhos HTTP | CSP restritiva, HSTS (2 anos, preload), `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP/CORP, sem `X-Powered-By` |
| Scripts | Subresource Integrity (SHA-256) em todos os scripts do build |
| Imagens | Otimizador restrito às imagens do projeto (`localPatterns`), sem domínios externos, qualidades permitidas fixas |
| Links externos | WhatsApp/Instagram com `rel="noopener noreferrer"`; mensagens sempre codificadas com `encodeURIComponent` |
| Dados estruturados | JSON-LD gerado só da configuração interna, com `<` escapado |
| Dependências | Versões exatas, lockfile, `npm ci`, `ignore-scripts`, `npm audit` no CI, Dependabot com cooldown de 5 dias |
| CI | Ações fixadas por SHA de commit, permissões só de leitura, sem credenciais persistidas |
| Contêiner | Imagem base fixada por digest, usuário sem privilégios (uid 1001), sem npm no runtime, compatível com sistema de arquivos somente leitura e `--cap-drop ALL` |
