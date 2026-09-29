# V1 — Usimassa (primeira versão)

- **Construído por:** Claude, em 22/08/2026, a pedido direto do Victor.
- **Fonte de conteúdo:** `docs/marketing/03_Direcao_de_Marketing_Primeira_Landing_Page_Usimassa.docx` (marketing aprovado em 22/08/2026).
- **Stack:** HTML + CSS + JS puros (sem build step, sem framework, sem backend). Site de página única com navegação por âncoras.
- **Fotos:** já otimizadas (JPG + WebP, cortadas conforme direção de marketing seção 6). A foto de frota (`frota.jpg`) veio espelhada no arquivo original e foi corrigida.
- **Formulário de orçamento:** roda 100% no navegador, monta a mensagem e abre o WhatsApp do vendedor escolhido (Paulo ou Wilson, mesmo peso). Não há envio de e-mail nem armazenamento de dados em servidor.
- **Eventos de mensuração:** já implementados em `js/analytics.js`, empurrando para `window.dataLayer` (padrão GTM/GA4). Nenhum dado pessoal é enviado. Falta apenas conectar uma ferramenta analítica real — a camada de eventos já existe e funciona em modo debug (console).
- **Mapa:** embed público do Google Maps (sem chave de API). Em ambientes sem acesso à internet, o iframe não carrega — isso é esperado e não é um bug do código.
- **Pendências que NÃO bloqueiam esta versão local, mas bloqueiam a publicação definitiva** (conforme o próprio documento de marketing): domínio definitivo, conexão real de Analytics, decisão sobre CNPJ/razão social e política de privacidade no rodapé.
- **Para abrir:** basta abrir `index.html` em um navegador. Não precisa de servidor.

## Checklist de QA já verificado nesta versão

- [x] Sem erros de console (desktop e mobile)
- [x] Sem rolagem horizontal no mobile
- [x] Menu mobile (hambúrguer) abre e fecha corretamente
- [x] Formulário valida os 3 campos antes de continuar
- [x] Mensagem do WhatsApp gerada exatamente conforme o modelo aprovado (seção 5.2 do documento de marketing)
- [x] Paulo e Wilson aparecem com o mesmo peso visual em todos os pontos de contato
- [x] Telefone da empresa (18) 3221-6276 aparece só como texto, sem link
- [x] Eventos de analytics disparam sem enviar dado pessoal
- [ ] Teste em navegador/celular real (recomendado antes de aprovar definitivamente — esta verificação usou Chromium automatizado)
- [ ] Teste do mapa com acesso real à internet

## Correções da auditoria comercial (26/08/2026, `docs/marketing/04_Auditoria_Comercial_V1_Ajustes_para_Claude.md`)

**V1 ainda não aprovada** — Codex apontou 2 correções obrigatórias e 4 ajustes de acessibilidade. Todos aplicados e testados abaixo (via Chromium automatizado, sem acesso real à internet).

### 3.1 Contatos diretos de Paulo e Wilson agora preenchem mensagem
- `href` de "Falar com Paulo"/"Falar com Wilson" na seção Contato agora inclui `?text=` com "Olá, vim pelo site da Usimassa e gostaria de orientação para minha obra." (acentuação/URL-encoding conferidos).
- Testado: clique dispara `lp_cta_click` → `lp_whatsapp_select` → `lp_whatsapp_redirect`, nessa ordem, sem nenhum dado pessoal nos parâmetros.
- Peso visual de Paulo e Wilson permanece idêntico; números não foram alterados.

### 3.2 Contraste dos controles do WhatsApp corrigido
- `--whatsapp` mudou de `#25d366` (contraste 1,98:1 — reprovado) para `#075E54` (contraste medido: **7,67:1** com branco, bate exatamente com o valor da auditoria).
- Hover/active `#054942` — contraste **10,3:1**.
- Aplicado de forma consistente em `.btn-whatsapp`, `.vendor-btn` (modal) e `.wa-float` (botão flutuante), que usam a mesma variável CSS.

### 4. Acessibilidade
1. **Modal de vendedores:** ao abrir, o foco vai para o botão de fechar; `Tab`/`Shift+Tab` ficam presos dentro do modal (testado: alternar até o fim e voltar ao início); `Esc` fecha e devolve o foco ao elemento que abriu o modal (testado); `aria-labelledby="vendor-modal-title"` associa o diálogo ao título.
2. **Menu mobile:** `aria-expanded` no botão alterna `false`/`true` corretamente (testado em viewport mobile); `aria-controls="main-nav-list"` aponta para o `<ul>` do menu.
3. **Erro do formulário:** `#form-error` agora tem `role="alert"` e `aria-live="assertive"`; os 3 campos têm `aria-describedby="form-error"`; ao submeter incompleto, o foco vai automaticamente para o primeiro campo vazio (testado).
4. **Imagens:** todas as tags `<img>` do hero, da seção Estrutura e da galeria de Obras agora têm `width`/`height` intrínsecos (evita layout shift durante o carregamento).

### Reteste completo (registrado conforme pedido na seção 5 da auditoria)
- [x] Contatos diretos de Paulo e Wilson com mensagem preenchida
- [x] Sequência `lp_cta_click` → `lp_whatsapp_select` → `lp_whatsapp_redirect`
- [x] Contraste final dos controles do WhatsApp (7,67:1, calculado programaticamente)
- [x] Navegação por teclado no menu, formulário e modal (incluindo focus trap)
- [x] Fechamento do modal com Esc e retorno do foco ao elemento de origem
- [x] Formulário incompleto (foco vai ao campo vazio) e completo (abre modal com mensagem correta)
- [x] Desktop e celular, sem rolagem horizontal ou sobreposição
- [ ] Mapa, WhatsApp e links externos em ambiente com acesso à internet real — **não testável neste ambiente** (rede do sandbox do Claude é restrita a uma lista de domínios permitidos); precisa ser confirmado pelo Codex ou por Victor com internet normal.

## V2 — Galeria, animações e faixa de impacto (09-10/09/2026, `docs/marketing/05_Direcao_de_Marketing_V2_Galeria_Animacoes.md`)

**V2 construída por Claude, aditiva sobre a V1.** Textos, ordem das seções, provas comerciais, peso igual de Paulo/Wilson, contatos, mensagens de WhatsApp e correções de acessibilidade da V1 foram preservados integralmente. **Ainda não aprovada** — segue para nova auditoria comercial e visual do Codex, conforme o item 6 da direção de marketing.

### Fotos e tratamento de imagem
- 9 fotos curadas a partir de `imagens/Novas Imagens/` (23 fotos originais), seguindo exatamente a seleção priorizada da seção 3.2 do documento: `fotos (2)`, `(16)`, `(9)`, `(8)`, `(3)`, `(22)`, `(14)`, `(13)` e `(18)`.
- Categorias representadas: Frota (2 fotos), Estrutura própria (3 fotos), Bombeamento (1), Concretagem em obra (1), Controle de resistência (1) e Operação (1) — todas as 5 categorias exigidas estão presentes.
- Originais preservados em `imagens/Novas Imagens/`; versões tratadas geradas em `site/img/gallery/` (tamanhos `large` até 1600px e `thumb` até 640px, cada um em JPG + WebP).
- **Regra do telefone antigo (seção 3.6):** verifiquei visualmente as 9 fotos selecionadas. O número `(18) 3221-6780` aparecia legível em 3 delas (`g2-estrutura`, `g8-operacao`, `g9-estrutura-3`) e ficou visível de forma parcial/fora de foco em uma quarta (`g5-resistencia`). Apliquei desfoque localizado (opção 3 da regra) só na região do número, preservando o resto de cada foto — conferido visualmente após o tratamento, número ilegível nas 4 fotos.
- Nenhuma foto com pessoa identificável sem autorização foi incluída (segui a lista de exclusões da seção 3.3 do documento).
- Nenhum enquadramento, cor ou elemento foi gerado por IA — apenas corte, redimensionamento e desfoque localizado sobre as fotos reais.
- **Achado extra (fora do escopo original da V2, corrigido pela mesma regra 3.6):** ao revisar a página completa, percebi que duas fotos já usadas na V1 — `img/hero.jpg` (topo do site) e `img/estrutura.jpg` (seção Estrutura) — também mostravam o telefone antigo `(18) 3221-6780` legível, e isso nunca tinha sido notado antes. Apliquei o mesmo tratamento de desfoque localizado nessas duas fotos e regenerei as versões `hero-960`, `estrutura-800` (JPG + WebP) a partir das versões corrigidas. Nenhum outro elemento dessas fotos foi alterado.
- **Observação de limpeza (não bloqueia a V2):** as fotos antigas da galeria da V1 (`frota.jpg`, `bombeamento.jpg`, `obra-ampla.jpg`, `operacao.jpg`, `presenca-local.jpg` e as versões `-800`) não são mais referenciadas por nenhum HTML/CSS depois da troca para a galeria V2 — continuam na pasta `site/img/` mas não aparecem mais na página publicada. Pelo menos `frota.jpg` e `bombeamento.jpg` também têm o telefone antigo legível. Como não são exibidas, não violam a regra 3.6, mas sinalizo para o Codex/Victor decidirem se querem que eu apague esses arquivos órfãos numa próxima rodada.

### Galeria
- Composição inicial: 1 foto em destaque + 8 miniaturas (grade responsiva: 4 colunas no desktop, 3 no tablet, 2 no mobile).
- Clique ou tecla Enter/Espaço em qualquer foto abre a galeria ampliada (lightbox) dentro da própria página — nenhum arquivo bruto abre em outra aba.
- Lightbox com navegação por setas (anterior/próxima), legenda, botão fechar, fecha com `Esc`, devolve o foco ao elemento que abriu, e prende `Tab`/`Shift+Tab` dentro do diálogo (testado).
- Sem carrossel automático.

### Faixa de impacto
- Inserida depois da seção "Nossa história" e antes de "Como pedir" (mantendo a galeria antes e o formulário de orçamento depois, conforme pedido; a seção História já existia nesse intervalo e foi preservada em sua posição).
- Título, texto de apoio e botão exatamente como aprovados no documento. Botão leva até a área de orçamento e dispara `lp_cta_click` com `cta_id=v2-impact-orcamento`, `secao=impacto`, `destino=como-pedir` (testado).

### Animações e transições
- Entrada suave do hero no carregamento (fade + leve deslocamento, ~700ms, uma única vez).
- Revelação discreta de títulos, cartões (soluções, estrutura, contato) e fotos da galeria durante a rolagem, via `IntersectionObserver`, com deslocamento de 20px e ~500ms de duração, cada uma disparando apenas uma vez; itens dentro da mesma grade têm atraso escalonado de ~80ms entre si.
- Ampliação sutil (`scale 1.03`) ao passar o cursor sobre as fotos da galeria.
- Nenhum carrossel automático, contador, piscar de texto ou pulsação do botão de WhatsApp.
- `prefers-reduced-motion: reduce` testado: todos os elementos aparecem direto, sem animação, e o scroll suave é desativado.

### Eventos novos (mantendo os da V1 sem alteração)
- `lp_gallery_open` (imagem_id, categoria, posicao), `lp_gallery_navigate` (imagem_id, direcao), `lp_gallery_close` (imagem_id) — implementados em `js/analytics.js` e testados via Chromium (ordem e parâmetros conferidos, nenhum dado pessoal enviado).
- `lp_cta_click` do novo botão da faixa de impacto usa o `cta_id`/`secao`/`destino` exigidos pela seção 6 do documento.

### Reteste completo desta rodada (Chromium automatizado, desktop 1440px + mobile 390px)
- [x] Sem erros de console (desktop e mobile)
- [x] Sem rolagem horizontal (desktop e mobile)
- [x] Galeria abre por clique, por Enter/Espaço (teclado) e por toque (mobile)
- [x] Lightbox: foco vai para o botão fechar ao abrir; `Tab`/`Shift+Tab` preso dentro do diálogo; `Esc` fecha e devolve o foco ao item de origem; setas `←`/`→` navegam e dispararam `lp_gallery_navigate`
- [x] Eventos `lp_gallery_open`/`lp_gallery_navigate`/`lp_gallery_close` disparando na ordem esperada, sem dado pessoal
- [x] Faixa de impacto: botão rola até "Como pedir" e dispara `lp_cta_click` com os parâmetros corretos
- [x] `prefers-reduced-motion: reduce`: todas as animações somem, conteúdo aparece direto
- [x] Menu mobile, formulário e modal de vendedores da V1 continuam funcionando sem regressão
- [ ] Mapa, WhatsApp e links externos em ambiente com internet real — mesma limitação já registrada na V1, segue pendente de confirmação pelo Codex ou por Victor.
- [ ] Teste em navegador/celular real (esta rodada também usou apenas Chromium automatizado).
