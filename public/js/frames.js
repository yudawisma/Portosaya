/* ===== Frames lightbox: public/js/frames.js ===== */
(function () {
  var lb = document.getElementById('lightbox');
  if (!lb) return;

    /* video hero: diam jika gerak dibatasi, jeda saat keluar layar */
  var vid = document.querySelector('video.fr-hero__bg');
  if (vid) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      vid.removeAttribute('autoplay');
      vid.pause();
    } else if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { var p = vid.play(); if (p) p.catch(function () {}); }
          else vid.pause();
        });
      }).observe(vid.parentNode);
    }
  }

  var shots = [].slice.call(document.querySelectorAll('.fr-card button'));
  var img = lb.querySelector('img');
  var cap = lb.querySelector('.fr-lb__cap');
  var current = 0;
  var opener = null;

  function show(n) {
    current = (n + shots.length) % shots.length;
    var b = shots[current];
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = b.getAttribute('data-full');
    img.alt = b.getAttribute('data-caption') || '';
    var label = (current + 1) + ' / ' + shots.length;
    var c = b.getAttribute('data-caption');
    cap.textContent = c ? label + '  |  ' + c : label;
  }

  function open(n) {
    opener = document.activeElement;
    show(n);
    lb.hidden = false;
    document.body.classList.add('is-locked');
    lb.querySelector('.fr-lb__close').focus();
  }

  function close() {
    lb.hidden = true;
    img.removeAttribute('src');
    document.body.classList.remove('is-locked');
    if (opener) opener.focus();
  }

  shots.forEach(function (b, i) {
    b.addEventListener('click', function () { open(i); });
  });

  lb.addEventListener('click', function (e) {
    var act = e.target.getAttribute('data-lb');
    if (act === 'close' || e.target === lb) close();
    else if (act === 'prev') show(current - 1);
    else if (act === 'next') show(current + 1);
  });

  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(current - 1);
    else if (e.key === 'ArrowRight') show(current + 1);
  });

  /* geser di layar sentuh */
  var startX = null;
  lb.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  /* ===== efek ringan, hanya jika gerak tidak dibatasi ===== */
  if (document.documentElement.classList.contains('js')) {
    var title = document.querySelector('[data-split]');
    if (title) {
      var t = title.textContent.trim();
      title.setAttribute('aria-label', t);
      title.classList.add('is-split');
      title.innerHTML = t.split('').map(function (ch, i) {
        return '<span aria-hidden="true" style="--i:' + i + '">' + ch + '</span>';
      }).join('');
    }

    var intro = document.querySelector('[data-words]');
    if (intro) {
      var n = 0;
      [].slice.call(intro.childNodes).forEach(function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            var s = document.createElement('span');
            s.className = 'w';
            s.style.setProperty('--i', n++);
            s.textContent = part;
            frag.appendChild(s);
          });
          intro.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          node.classList.add('w');
          node.style.setProperty('--i', n++);
        }
      });
    }

    var targets = [].slice.call(document.querySelectorAll('.fr-card, .fr-intro, .fr-note, .fr-footer'));
    if ('IntersectionObserver' in window) {
      var seen = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('is-in'); seen.unobserve(e.target); }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
      targets.forEach(function (el) { seen.observe(el); });
    } else {
      targets.forEach(function (el) { el.classList.add('is-in'); });
    }

    var cur = document.querySelector('.fr-cursor');
    if (cur && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      document.addEventListener('pointermove', function (e) {
        cur.style.transform = 'translate3d(' + e.clientX + 'px,' + e.clientY + 'px,0)';
      }, { passive: true });
      shots.forEach(function (b) {
        b.addEventListener('pointerenter', function () { cur.classList.add('is-on'); });
        b.addEventListener('pointerleave', function () { cur.classList.remove('is-on'); });
      });
    }
  }

  /* parallax halus: foto bergeser pelan di dalam bentuknya */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var hero = document.querySelector('.fr-hero__bg');
  var bar = document.querySelector('.fr-progress');
  var ticking = false;
  function drift() {
    var vh = window.innerHeight;
    if (hero) hero.style.translate = '0 ' + Math.min(window.scrollY, vh) * 0.12 + 'px';
    if (bar) bar.style.transform = 'scaleX(' + Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - vh)) + ')';
    shots.forEach(function (b) {
      var r = b.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = (r.top + r.height / 2 - vh / 2) / vh;
      b.firstElementChild.style.translate = '0 ' + (p * -r.height * 0.07) + 'px';
    });
    ticking = false;
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(drift); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  drift();
})();