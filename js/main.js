/**
 * Usimassa V1/V2 — comportamento da página
 * Regras de origem: docs/marketing/03_Direcao_de_Marketing_Primeira_Landing_Page_Usimassa.docx
 * V2 (galeria, animações, faixa de impacto): docs/marketing/05_Direcao_de_Marketing_V2_Galeria_Animacoes.md
 */
(function () {
  "use strict";

  var VENDORS = {
    paulo: { name: "Paulo", phone: "5518981735194" },
    wilson: { name: "Wilson", phone: "5518996267788" }
  };

  // ---------- Dados da galeria V2 (mesma ordem dos botões .gallery-item no HTML) ----------
  var GALLERY_ITEMS = [
    { id: "g1-frota", categoria: "Frota", legenda: "Frota própria de caminhões-betoneira",
      alt: "Cinco caminhões-betoneira da Usimassa estacionados lado a lado no pátio da usina",
      large: "img/gallery/g1-frota-large.jpg", largeWebp: "img/gallery/g1-frota-large.webp" },
    { id: "g2-estrutura", categoria: "Estrutura própria", legenda: "Estrutura da usina em Presidente Prudente",
      alt: "Dois silos da Usimassa com caminhões-betoneira carregando ao amanhecer",
      large: "img/gallery/g2-estrutura-large.jpg", largeWebp: "img/gallery/g2-estrutura-large.webp" },
    { id: "g3-bombeamento", categoria: "Bombeamento", legenda: "Bombeamento em concretagem",
      alt: "Caminhão-bomba da Usimassa operando dentro de galpão em obra industrial",
      large: "img/gallery/g3-bombeamento-large.jpg", largeWebp: "img/gallery/g3-bombeamento-large.webp" },
    { id: "g4-concretagem", categoria: "Concretagem em obra", legenda: "Aplicação de concreto na obra",
      alt: "Concreto sendo aplicado por mangote em piso de obra, com trabalhador ao fundo",
      large: "img/gallery/g4-concretagem-large.jpg", largeWebp: "img/gallery/g4-concretagem-large.webp" },
    { id: "g5-resistencia", categoria: "Controle de resistência", legenda: "Corpos de prova para acompanhamento da resistência",
      alt: "Três corpos de prova cilíndricos de concreto sobre bloco, com caminhão-betoneira desfocado ao fundo",
      large: "img/gallery/g5-resistencia-large.jpg", largeWebp: "img/gallery/g5-resistencia-large.webp" },
    { id: "g6-frota-2", categoria: "Frota", legenda: "Parte da frota de caminhões-betoneira",
      alt: "Fila com sete caminhões-betoneira da Usimassa estacionados em dia nublado",
      large: "img/gallery/g6-frota-2-large.jpg", largeWebp: "img/gallery/g6-frota-2-large.webp" },
    { id: "g7-estrutura-2", categoria: "Estrutura própria", legenda: "Silo e estrutura de armazenamento da usina",
      alt: "Silo alto da Usimassa ao lado de caminhão-tanque, com céu azul ao fundo",
      large: "img/gallery/g7-estrutura-2-large.jpg", largeWebp: "img/gallery/g7-estrutura-2-large.webp" },
    { id: "g8-operacao", categoria: "Operação", legenda: "Operação em galpão coberto",
      alt: "Caminhão-betoneira da Usimassa dentro de galpão coberto durante concretagem",
      large: "img/gallery/g8-operacao-large.jpg", largeWebp: "img/gallery/g8-operacao-large.webp" },
    { id: "g9-estrutura-3", categoria: "Estrutura própria", legenda: "Carregamento na usina",
      alt: "Caminhão-betoneira sendo carregado junto aos silos da usina Usimassa ao entardecer",
      large: "img/gallery/g9-estrutura-3-large.jpg", largeWebp: "img/gallery/g9-estrutura-3-large.webp" }
  ];

  var MESSAGE_TEMPLATES = {
    orcamento: function (d) {
      return "Olá, vim pelo site da Usimassa e gostaria de solicitar um orçamento.\n\n" +
        "Tipo de obra: " + d.tipo_obra + "\n" +
        "Aplicação: " + d.aplicacao + "\n" +
        "Cidade/endereço da obra: " + d.cidade_endereco + "\n\n" +
        "Podem me orientar sobre o concreto ou a argamassa mais adequado para esta obra?";
    },
    contato_rapido: function () {
      return "Olá, vim pelo site da Usimassa e gostaria de orientação para minha obra.";
    },
    orientacao: function () {
      return "Olá, vim pelo site da Usimassa e gostaria de saber qual concreto ou argamassa é mais adequado para minha obra.";
    },
    bombeamento: function (d) {
      return "Olá, vim pelo site da Usimassa e gostaria de verificar a possibilidade de bombeamento para uma obra em " + d.cidade_bairro + ".";
    }
  };

  // ---------- UTM (preservados na sessão, nunca na mensagem visível) ----------
  function readUtm() {
    var params = new URLSearchParams(window.location.search);
    var utm = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign")
    };
    var hasAny = utm.utm_source || utm.utm_medium || utm.utm_campaign;
    if (hasAny) {
      sessionStorage.setItem("usimassa_utm", JSON.stringify(utm));
      return utm;
    }
    try {
      var stored = sessionStorage.getItem("usimassa_utm");
      if (stored) return JSON.parse(stored);
    } catch (e) { /* ignore */ }
    return {};
  }
  var utmData = readUtm();

  // ---------- Menu mobile ----------
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Scroll suave para CTAs de rolagem ----------
  function scrollToId(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll("[data-scroll-to]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-scroll-to");
      var ctaId = btn.getAttribute("data-cta-id") || target;
      var secao = btn.getAttribute("data-secao") || "";
      window.usimassaAnalytics.ctaClick(ctaId, secao, target, btn.getAttribute("data-posicao") || "");
      scrollToId(target);
      if (target === "como-pedir") {
        var firstField = document.getElementById("tipo_obra");
        if (firstField) setTimeout(function () { firstField.focus(); }, 500);
      }
    });
  });

  // ---------- Modal de escolha de vendedor ----------
  var modal = document.getElementById("vendor-modal");
  var modalBox = modal.querySelector(".modal-box");
  var currentContext = null;
  var lastFocusedBeforeModal = null;

  function getFocusableInModal() {
    return Array.prototype.slice.call(
      modalBox.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  }

  function openVendorModal(variant, data, ctaId, secao) {
    currentContext = { variant: variant, data: data || {}, ctaId: ctaId, secao: secao };
    lastFocusedBeforeModal = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    var focusables = getFocusableInModal();
    if (focusables.length) focusables[0].focus();
  }
  function closeVendorModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    currentContext = null;
    if (lastFocusedBeforeModal && typeof lastFocusedBeforeModal.focus === "function") {
      lastFocusedBeforeModal.focus();
    }
    lastFocusedBeforeModal = null;
  }
  modal.querySelector(".modal-close").addEventListener("click", closeVendorModal);
  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeVendorModal();
  });
  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") {
      closeVendorModal();
      return;
    }
    // Prende o foco (focus trap) dentro do modal enquanto ele está aberto
    if (e.key === "Tab") {
      var focusables = getFocusableInModal();
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  modal.querySelectorAll(".vendor-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!currentContext) return;
      var vendorKey = btn.getAttribute("data-vendor");
      var vendor = VENDORS[vendorKey];
      var template = MESSAGE_TEMPLATES[currentContext.variant];
      var message = template(currentContext.data);
      var ctx = currentContext;

      window.usimassaAnalytics.whatsappSelect(vendor.name, ctx.secao, ctx.variant);
      window.usimassaAnalytics.whatsappRedirect(vendor.name, ctx.secao, ctx.variant, utmData);

      var url = "https://wa.me/" + vendor.phone + "?text=" + encodeURIComponent(message);
      closeVendorModal();
      window.open(url, "_blank", "noopener");
    });
  });

  // Botões que abrem o modal diretamente (sem formulário)
  document.querySelectorAll("[data-open-vendor]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var variant = btn.getAttribute("data-open-vendor");
      var secao = btn.getAttribute("data-secao") || "";
      var ctaId = btn.getAttribute("data-cta-id") || variant;
      window.usimassaAnalytics.ctaClick(ctaId, secao, "whatsapp", btn.getAttribute("data-posicao") || "");

      var data = {};
      if (variant === "bombeamento") {
        var cidadeField = document.getElementById("cidade_endereco");
        data.cidade_bairro = (cidadeField && cidadeField.value.trim()) || "minha região";
      }
      openVendorModal(variant, data, ctaId, secao);
    });
  });

  // Contatos diretos de Paulo/Wilson na seção de Contato (já sabem o vendedor,
  // não passam pelo modal). O href já tem a mensagem codificada como fallback;
  // aqui só registramos os eventos na ordem exigida antes da navegação.
  document.querySelectorAll("[data-direct-vendor]").forEach(function (link) {
    link.addEventListener("click", function () {
      var vendorKey = link.getAttribute("data-direct-vendor");
      var vendor = VENDORS[vendorKey];
      var secao = link.getAttribute("data-secao") || "contato";
      var ctaId = link.getAttribute("data-cta-id") || ("contato-" + vendorKey);
      window.usimassaAnalytics.ctaClick(ctaId, secao, "whatsapp", "contato");
      window.usimassaAnalytics.whatsappSelect(vendor.name, secao, "contato_direto");
      window.usimassaAnalytics.whatsappRedirect(vendor.name, secao, "contato_direto", utmData);
      // navegação segue pelo href normal do link (target="_blank")
    });
  });

  // ---------- Formulário "Como pedir orçamento" ----------
  var form = document.getElementById("quote-form");
  var formStarted = false;
  var formError = document.getElementById("form-error");

  ["tipo_obra", "aplicacao", "cidade_endereco"].forEach(function (id) {
    var field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("focus", function () {
      if (!formStarted) {
        formStarted = true;
        window.usimassaAnalytics.formStart("como-pedir", document.referrer || "direto");
      }
    });
  });

  function formValues() {
    return {
      tipo_obra: document.getElementById("tipo_obra").value.trim(),
      aplicacao: document.getElementById("aplicacao").value.trim(),
      cidade_endereco: document.getElementById("cidade_endereco").value.trim()
    };
  }
  function formIsComplete(v) {
    return v.tipo_obra && v.aplicacao && v.cidade_endereco;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var values = formValues();
    if (!formIsComplete(values)) {
      formError.classList.add("show");
      var firstEmpty = ["tipo_obra", "aplicacao", "cidade_endereco"]
        .map(function (id) { return document.getElementById(id); })
        .find(function (f) { return !f.value.trim(); });
      if (firstEmpty) firstEmpty.focus();
      return;
    }
    formError.classList.remove("show");
    window.usimassaAnalytics.formSubmit();
    openVendorModal("orcamento", values, "form-como-pedir", "como-pedir");
  });

  // Botão "Solicitar orçamento" da seção de contato: se o formulário já
  // está preenchido, abre a escolha direto; senão, rola até o formulário.
  var contactCta = document.getElementById("contact-cta");
  if (contactCta) {
    contactCta.addEventListener("click", function () {
      var values = formValues();
      window.usimassaAnalytics.ctaClick("contact-cta", "contato", formIsComplete(values) ? "whatsapp" : "como-pedir", "contato");
      if (formIsComplete(values)) {
        openVendorModal("orcamento", values, "contact-cta", "contato");
      } else {
        scrollToId("como-pedir");
        setTimeout(function () {
          var firstEmpty = ["tipo_obra", "aplicacao", "cidade_endereco"]
            .map(function (id) { return document.getElementById(id); })
            .find(function (f) { return !f.value.trim(); });
          if (firstEmpty) firstEmpty.focus();
        }, 500);
      }
    });
  }

  // ---------- Galeria ampliada (lightbox) — V2 ----------
  var galleryLightbox = document.getElementById("gallery-lightbox");
  if (galleryLightbox) {
    var lightboxImage = document.getElementById("lightbox-image");
    var lightboxCaption = document.getElementById("lightbox-caption");
    var lightboxClose = document.getElementById("lightbox-close");
    var lightboxPrev = document.getElementById("lightbox-prev");
    var lightboxNext = document.getElementById("lightbox-next");
    var galleryButtons = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
    var lightboxIndex = -1;
    var lastFocusedBeforeLightbox = null;

    function renderLightboxItem(index) {
      var item = GALLERY_ITEMS[index];
      if (!item) return;
      // Troca a fonte da imagem; navegadores sem suporte a WebP caem para o <img src> normal.
      lightboxImage.src = item.large;
      lightboxImage.alt = item.alt;
      lightboxCaption.textContent = item.categoria + " — " + item.legenda;
    }

    function openLightbox(index, posicao) {
      lightboxIndex = index;
      lastFocusedBeforeLightbox = document.activeElement;
      renderLightboxItem(index);
      galleryLightbox.classList.add("open");
      galleryLightbox.setAttribute("aria-hidden", "false");
      lightboxClose.focus();
      window.usimassaAnalytics.galleryOpen(GALLERY_ITEMS[index].id, GALLERY_ITEMS[index].categoria, posicao);
    }

    function closeLightbox() {
      if (lightboxIndex < 0) return;
      window.usimassaAnalytics.galleryClose(GALLERY_ITEMS[lightboxIndex].id);
      galleryLightbox.classList.remove("open");
      galleryLightbox.setAttribute("aria-hidden", "true");
      lightboxIndex = -1;
      if (lastFocusedBeforeLightbox && typeof lastFocusedBeforeLightbox.focus === "function") {
        lastFocusedBeforeLightbox.focus();
      }
      lastFocusedBeforeLightbox = null;
    }

    function navigateLightbox(direction) {
      if (lightboxIndex < 0) return;
      var total = GALLERY_ITEMS.length;
      lightboxIndex = (lightboxIndex + direction + total) % total;
      renderLightboxItem(lightboxIndex);
      window.usimassaAnalytics.galleryNavigate(GALLERY_ITEMS[lightboxIndex].id, direction > 0 ? "proxima" : "anterior");
    }

    function getFocusableInLightbox() {
      return Array.prototype.slice.call(
        galleryLightbox.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
      ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
    }

    galleryButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var index = parseInt(btn.getAttribute("data-index"), 10);
        openLightbox(index, index === 0 ? "destaque" : "miniatura");
      });
    });

    lightboxClose.addEventListener("click", closeLightbox);
    lightboxPrev.addEventListener("click", function () { navigateLightbox(-1); });
    lightboxNext.addEventListener("click", function () { navigateLightbox(1); });
    galleryLightbox.addEventListener("click", function (e) {
      if (e.target === galleryLightbox) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!galleryLightbox.classList.contains("open")) return;
      if (e.key === "Escape") {
        closeLightbox();
        return;
      }
      if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
        return;
      }
      if (e.key === "ArrowRight") {
        navigateLightbox(1);
        return;
      }
      if (e.key === "Tab") {
        var focusables = getFocusableInLightbox();
        if (!focusables.length) return;
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ---------- Animações discretas de entrada/rolagem — V2 ----------
  // Respeita prefers-reduced-motion: quando ativo, os elementos aparecem direto, sem animação.
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("reveal-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  // ---------- Mapa, Instagram, e-mail ----------
  var mapLink = document.getElementById("map-link");
  if (mapLink) {
    mapLink.addEventListener("click", function () {
      window.usimassaAnalytics.mapClick("contato", "google-maps");
    });
  }
  var igLink = document.getElementById("instagram-link");
  if (igLink) {
    igLink.addEventListener("click", function () {
      window.usimassaAnalytics.instagramClick("contato", "instagram");
    });
  }
  var emailLink = document.getElementById("email-link");
  if (emailLink) {
    emailLink.addEventListener("click", function () {
      window.usimassaAnalytics.emailClick("contato", "email");
    });
  }
})();
