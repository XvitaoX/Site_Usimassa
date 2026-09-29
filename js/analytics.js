/**
 * Camada de eventos — Usimassa V1/V2
 * Baseado na seção 7 de "Direção de marketing da primeira landing page" e na
 * seção 6 de "Direção de Marketing V2 — Galeria e Animações".
 *
 * Nenhum dado pessoal (nome, telefone, endereço, texto digitado, tipo de obra
 * ou aplicação) é enviado aqui. Somente estado da interação, origem, ponto da
 * página e vendedor escolhido.
 *
 * Enquanto o Analytics definitivo não está configurado (ver STATUS_PROJETO.md),
 * os eventos vão para window.dataLayer (padrão GTM/GA4) e para o console em
 * modo debug, para que a camada já exista pronta para conectar depois.
 */
(function (window) {
  "use strict";

  window.dataLayer = window.dataLayer || [];

  var DEBUG = true; // trocar para false quando o Analytics real estiver conectado

  function track(eventName, params) {
    var payload = Object.assign({ event: eventName }, params || {});
    window.dataLayer.push(payload);
    if (DEBUG && window.console && console.debug) {
      console.debug("[usimassa:event]", payload);
    }
  }

  window.usimassaAnalytics = {
    ctaClick: function (ctaId, secao, destino, posicao) {
      track("lp_cta_click", { cta_id: ctaId, secao: secao, destino: destino, posicao: posicao });
    },
    formStart: function (secao, origem) {
      track("lp_form_start", { secao: secao, origem_sessao: origem || null });
    },
    formSubmit: function () {
      track("lp_form_submit", { campos_preenchidos: 3 });
    },
    whatsappSelect: function (vendedor, pontoDeEntrada, variante) {
      track("lp_whatsapp_select", { vendedor: vendedor, ponto_de_entrada: pontoDeEntrada, variante_da_mensagem: variante });
    },
    whatsappRedirect: function (vendedor, pontoDeEntrada, variante, utm) {
      track("lp_whatsapp_redirect", Object.assign({
        vendedor: vendedor, ponto_de_entrada: pontoDeEntrada, variante: variante
      }, utm || {}));
    },
    mapClick: function (secao, destino) {
      track("lp_map_click", { secao: secao, destino: destino });
    },
    instagramClick: function (secao, destino) {
      track("lp_instagram_click", { secao: secao, destino: destino });
    },
    emailClick: function (secao, destino) {
      track("lp_email_click", { secao: secao, destino: destino });
    },
    galleryOpen: function (imagemId, categoria, posicao) {
      track("lp_gallery_open", { imagem_id: imagemId, categoria: categoria, posicao: posicao });
    },
    galleryNavigate: function (imagemId, direcao) {
      track("lp_gallery_navigate", { imagem_id: imagemId, direcao: direcao });
    },
    galleryClose: function (imagemId) {
      track("lp_gallery_close", { imagem_id: imagemId });
    }
  };
})(window);
