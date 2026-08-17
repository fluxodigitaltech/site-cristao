/* =========================================================================
   CRISTÃO FIT — interações (vanilla JS, zero dependências)
   Foco em CRO (FLU-44): WhatsApp rastreável com mensagem pré-preenchida,
   CTA sempre acessível, e efeitos que valorizam sem atrapalhar a conversão.
   ========================================================================= */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Link de WhatsApp rastreável (mensagem por intenção + UTM) ----
     Cada botão manda o atendente já sabendo o que a pessoa quer. Antes todos
     abriam o mesmo texto de "1ª aula grátis", inclusive o botão de Planos: o
     time recebia dezenas de mensagens iguais e tinha que descobrir na conversa
     o que a pessoa procurava. Agora o próprio botão diz. */
  var WA_NUMERO = '5511943797718';

  var WA_MSGS = {
    aula:        'Oi! Vi o site da Cristão Fit e quero agendar minha 1ª aula grátis. Quais horários vocês têm?',
    planos:      'Oi! Vi o site da Cristão Fit e quero saber os planos e valores para começar a treinar.',
    matricula:   'Oi! Quero fazer minha matrícula na Cristão Fit. Pode me passar os planos e as condições?',
    kids:        'Oi! Vi o site e quero saber como funciona o Espaço Kids enquanto eu treino.',
    programa:    'Oi! Quero saber como funciona o Programa 12 semanas da Cristão Fit.',
    modalidades: 'Oi! Quero saber quais modalidades e horários vocês têm na Cristão Fit.',
    totalpass:   'Oi! Quero saber como funciona o TotalPass na Cristão Fit.'
  };

  function hrefWa(intencao) {
    var chave = WA_MSGS[intencao] ? intencao : 'aula';
    var utm = 'utm_source=site&utm_medium=cta&utm_campaign=vendas&utm_content=' + chave;
    return 'https://wa.me/' + WA_NUMERO + '?text=' +
      encodeURIComponent(WA_MSGS[chave] + '\n\n(' + utm + ')');
  }

  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', hrefWa(el.getAttribute('data-wa')));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  /* ---- 2. Header condensa ao rolar ------------------------------------ */
  var header = document.getElementById('header');
  var toTop = document.getElementById('toTop');
  var onScroll = function () {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    if (toTop) toTop.classList.toggle('show', y > 640);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 3. Menu mobile ------------------------------------------------- */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  var isOpen = function () { return document.body.classList.contains('menu-open'); };
  var closeMenu = function (returnFocus) {
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    if (returnFocus) toggle.focus();
  };
  var openMenu = function () {
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fechar menu');
    var first = links.querySelector('a');
    if (first) first.focus();
  };
  if (toggle) {
    toggle.addEventListener('click', function () {
      isOpen() ? closeMenu(true) : openMenu();
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { closeMenu(false); });
    });
    // tocar na área do overlay (fora dos links) fecha o menu
    links.addEventListener('click', function (e) { if (e.target === links) closeMenu(true); });
    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closeMenu(true); return; }
      if (e.key === 'Tab') {
        var f = links.querySelectorAll('a');
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---- 4. Voltar ao topo ---------------------------------------------- */
  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' });
    });
  }

  /* ---- 5. Reveal on scroll (IntersectionObserver) --------------------- */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- 6. Contadores animados ----------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');
  var animateCount = function (el) {
    var isStatic = el.getAttribute('data-static');
    if (isStatic) { el.textContent = isStatic; return; }
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1100, start = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { el.textContent = prefix + target + suffix; return; }
    var step = function (ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---- 7. Nav ativa conforme a seção visível -------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navA = document.querySelectorAll('.nav-links a[href^="#"]');
  if ('IntersectionObserver' in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navA.forEach(function (a) {
            a.classList.toggle('active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { so.observe(s); });
  }

  /* ---- 8. Ano no rodapé ----------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- 9b. Facade do mapa: carrega o Google Maps só ao clicar --------- */
  var mapFacade = document.getElementById('mapFacade');
  if (mapFacade) {
    mapFacade.addEventListener('click', function () {
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=Av.+Sat%C3%A9lite,+457+Jardim+Santa+B%C3%A1rbara+SP&output=embed';
      iframe.title = 'Mapa da Cristão Fit: Av. Satélite, 457, Jardim Santa Bárbara';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      mapFacade.replaceWith(iframe);
    });
  }

  /* ---- 9. Spotlight nos cards + nudge do WhatsApp (só sem reduced-motion) */
  if (!RM) {
    document.querySelectorAll('.card').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
    var wa = document.querySelector('.wa-float');
    if (wa) {
      setInterval(function () {
        wa.classList.add('expand');
        setTimeout(function () { wa.classList.remove('expand'); }, 2600);
      }, 9000);
    }
  }

})();
