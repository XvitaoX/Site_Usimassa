# Site Usimassa — pasta de deploy

Esta pasta (`site/`) é **autossuficiente**: contém tudo que o site precisa para
funcionar. Basta publicar o conteúdo dela num serviço de hospedagem estática
— não há build, backend, banco de dados ou dependências para instalar.

## Estrutura

```
site/
├── index.html        Página única do site
├── css/style.css      Estilos
├── js/
│   ├── main.js         Interações (menu, formulário, galeria/lightbox, modal de vendedor)
│   └── analytics.js    Camada de eventos (dataLayer, pronta para GTM/GA4)
├── img/               Imagens usadas na página (hero, estrutura, logo, favicons)
│   └── gallery/        As 9 fotos da galeria "Obras" (versões large + thumb, jpg + webp)
├── favicon.ico         Favicon (fallback para navegadores/robôs que pedem /favicon.ico)
├── robots.txt          Libera indexação e aponta para o sitemap
├── sitemap.xml          Mapa do site (1 URL — página única)
└── VERSION.md           Histórico técnico de versões (V1, V2...) do site
```

## Como publicar

Suba o **conteúdo** desta pasta (não a pasta em si) para a raiz do seu
serviço de hospedagem estática (ex.: Netlify, Vercel, GitHub Pages, cPanel,
Hostinger etc.). Não é necessário nenhum passo de build.

## Antes de colocar no ar

Alguns itens dependem da definição do domínio definitivo e de decisões de
negócio — estão listados em `STATUS_PROJETO.md` (na raiz do projeto) e como
comentários `TODO` neste próprio código:

- `index.html`: meta `og:url` e `<link rel="canonical">` (comentados, bloqueados até haver domínio).
- `robots.txt` e `sitemap.xml`: trocar `https://SEU-DOMINIO-AQUI` pelo domínio real.
- Analytics real (GTM/GA4): hoje os eventos só vão para `window.dataLayer` e console (modo debug). Ver `js/analytics.js`.
- CNPJ/razão social e política de privacidade no rodapé — pendente de decisão do cliente.

## Testes

Este projeto foi testado com Chromium automatizado (desktop e mobile) —
sem erros de console, sem rolagem horizontal, galeria/lightbox, formulário,
modal de vendedor e menu mobile funcionando. Detalhes e checklist completo em
`VERSION.md`. Itens que dependem de internet real (mapa incorporado, redirecionamento
para WhatsApp, links externos) precisam de um teste final em navegador/celular físico.
