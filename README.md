# Cristão Fit — Site Institucional / Landing de Conversão

Site estático (HTML + CSS + JS, **zero dependências de build**) construído sobre o
*Pacote Estratégico Consolidado FLU-47* da Fluxo Digital Tech. Rápido, otimizado para
SEO local e desenhado para uma única conversão: **agendar a 1ª aula grátis no WhatsApp**.

> **Norte da marca:** _“Cuidar do corpo é cuidar do templo — e ninguém precisa fazer isso sozinho.”_
> Âncora de tudo: **ambiente cristão + Espaço Kids + acompanhamento próximo.**

---

## 📁 Estrutura

```
site/
├── index.html            # Página única (todas as seções + JSON-LD)
├── robots.txt            # Libera indexação + aponta o sitemap
├── sitemap.xml           # Sitemap (1 URL — atualizar ao criar /blog)
├── site.webmanifest      # PWA / ícone
└── assets/
    ├── css/styles.css    # Design system (paleta oficial FLU-40)
    ├── js/main.js        # WhatsApp rastreável, reveal, menu, contadores
    └── img/
        ├── favicon.svg   # Ícone (cruz verde-neon sobre preto)
        ├── og-image.svg  # Fonte da imagem social
        └── og-image.png  # 1200×630 (usada nas metatags OG/Twitter)
```

## 🎨 Identidade (travada no PDF — FLU-40)

| Cor | HEX | Uso |
|---|---|---|
| Verde-neon Vida | `#7CEE1B` | CTA, gráficos, dados (neon puro) |
| Verde-texto | `#A6F55C` | Textos verdes longos/pequenos (menos vibração) |
| Preto Propósito | `#0F110C` | Fundo dominante (levemente elevado p/ conforto visual) |
| Cinza-escuro Estrutura | `#191C13` | Cards, painéis |
| Branco Clareza | `#F3F5EE` | Texto principal (morno, não ofusca) |
| Verde-vida (apoio) | `#5FD843` | Acento P3 (Método) |
| Coral-família (apoio) | `#E0765A` | Acento P2 (Espaço Kids) |

> **Passe de conforto visual:** o preto puro foi levemente elevado e o branco amornado para reduzir a vibração do neon (feedback do cliente). O verde da marca `#7CEE1B` foi preservado em CTAs/gráficos; textos verdes usam o tom suavizado `#A6F55C`.

Tipografia: **Poppins** (principal — títulos e corpo) · **Fraunces** (versículo/devocional).

## 🔍 SEO já implementado (FLU-37)

- `<title>` e `<h1>` conforme o plano on-page do pacote.
- Meta description + keywords do nicho (academia cristã / gospel / espaço kids / 12 semanas).
- **JSON-LD `ExerciseGym`** com NAP, horário, `sameAs` (Instagram) e amenities (Espaço Kids, gospel, TotalPass).
- **JSON-LD `FAQPage`** (elegível a rich results).
- Open Graph + Twitter Card com imagem 1200×630.
- `canonical`, `robots.txt`, `sitemap.xml`, `site.webmanifest`.

## 🚀 Como visualizar / publicar

Abra `index.html` no navegador, ou sirva a pasta:

```bash
cd site && python3 -m http.server 8080   # http://localhost:8080
```

Deploy: qualquer host estático (Netlify, Vercel, Cloudflare Pages, EasyPanel, hospedagem simples).
Publique o conteúdo de `site/` na raiz do domínio.

## 🔒 Segurança & performance no deploy (headers)

O Lighthouse "Best Practices" pede headers HTTP que **só o servidor** entrega (não dá para pôr no HTML). Já vêm prontos:

- **`_headers`** — Netlify e Cloudflare Pages (copiado automaticamente na publicação).
- **`.htaccess`** — Apache / cPanel / hospedagem tradicional (inclui compressão gzip e cache).

Ambos configuram: **CSP** (libera Google Fonts + Maps), **HSTS**, **COOP**, **X-Frame-Options**, `X-Content-Type-Options`, `Referrer-Policy` e `Permissions-Policy`, além de **cache** dos assets.
Observações: o HSTS começa em 180 dias — suba para 1 ano + `preload` após validar o HTTPS. Em Vercel, traduza o `_headers` para `vercel.json` (`headers`).

## 🖼️ Performance de imagem

O logo é servido via `<picture>`: **WebP** (~15 KB) para navegadores modernos e **PNG** (~31 KB) de fallback, dimensionado para o tamanho real de exibição. Favicon em SVG + PNG (32px e 180px apple-touch).

---

## ⚠️ ANTES DE IR AO AR — pendências do cliente (PDF: "A CONFIRMAR")

Estes itens vêm marcados como **a confirmar** no pacote estratégico. **Não publique sem resolver:**

1. **Município / CEP exatos.** O site usa `São Paulo/SP` como *placeholder* no schema e “Jardim Santa Bárbara” no texto. O prefixo (11) 4561 sugere ABC/Mauá; há Jd. Santa Bárbara em Guarulhos e na capital. → Corrigir em `index.html` (JSON-LD `addressLocality`, `<title>`, textos) assim que confirmado.
2. **SSL do domínio `cristaofit.com.br`.** HTTPS quebrado derruba ranqueamento e conversão — pré-requisito de tudo (SEO, pixel, tráfego).
3. **Google Meu Negócio** ainda como “Academy UP Health” → reivindicar e renomear (preservar avaliações), sem criar ficha nova.
4. **Preços/planos:** o site **não exibe valores** de propósito (guard-rail do pacote) e direciona para o WhatsApp. Só publique tabela após confirmação do cliente.
5. **“98% em 315 avaliações”:** **não** foi usado no site (fonte não confirmada). Só cite com fonte validada.
6. **Modalidades e horários:** listados conforme o dossiê (a confirmar). Ajuste a grade real e os fins de semana.
7. **Autorização de imagem** de alunos e crianças antes de trocar as ilustrações por fotos reais do Espaço Kids.
8. **Redirect 301** de `upsaudeacademia.com.br` → páginas equivalentes do novo domínio.
9. **Coordenadas de geolocalização.** O botão "Traçar rota" e o `hasMap` do schema já funcionam por endereço. Ao confirmar lat/long exatos, adicione no `<head>` `geo.position`/`ICBM` e o bloco `geo` (GeoCoordinates) no JSON-LD — reforça o SEO local no mapa.

## 🔧 Ajustes rápidos (onde mexer)

- **Número/mensagem do WhatsApp:** `assets/js/main.js` → `WA_NUMERO`, `WA_MSG`, `UTM`.
- **Cidade/endereço/horário:** `index.html` (bloco JSON-LD + seção *Onde estamos* + FAQ).
- **Domínio de produção:** buscar `cristaofit.com.br` no `index.html`, `robots.txt`, `sitemap.xml`.
- **Logo:** `assets/img/logo-dark.*` (WebP + PNG). Regenere ambos se trocar a arte.
- **Coordenadas do mapa:** ver item 9 acima.

## 🌱 Próximos passos sugeridos (SEO de conteúdo — FLU-37)

O pacote lista 10 pautas de blog (academia cristã, corpo é templo, espaço kids, 12 semanas…).
Criar `/blog` com esses artigos reaproveitando as copies do calendário editorial amplia a
frente orgânica de cauda longa. Estrutura pronta para receber (é só adicionar URLs ao `sitemap.xml`).

---
_Feito com propósito · base: Pacote Estratégico Cristão Fit (FLU-33 → FLU-47), Fluxo Digital Tech._
