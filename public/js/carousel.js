
(() => {
    'use strict';

    const grid = document.querySelector('.pc-grid');
    if (!grid) return;

    const mq = matchMedia('(max-width: 768px)');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- Kontrol ---------- */
    const bar = document.createElement('div');
    bar.className = 'pc-carousel-ui';
    bar.innerHTML =
        '<button type="button" class="pc-nav pc-prev" aria-label="Proyek sebelumnya">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>' +
        '</button>' +
        '<span class="pc-count" aria-live="polite"></span>' +
        '<button type="button" class="pc-nav pc-next" aria-label="Proyek berikutnya">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>' +
        '</button>';

    grid.insertAdjacentElement('afterend', bar);

    const prev = bar.querySelector('.pc-prev');
    const next = bar.querySelector('.pc-next');
    const count = bar.querySelector('.pc-count');

    /* ---------- Helper ---------- */
    const visible = () =>
        Array.from(grid.querySelectorAll('.pc-card:not([hidden])'));

    const padLeft = () =>
        parseFloat(getComputedStyle(grid).paddingLeft) || 0;

    // Jarak kartu dari posisi "snap" (tepi kiri area konten)
    const offsetOf = (card) =>
        card.getBoundingClientRect().left -
        grid.getBoundingClientRect().left -
        padLeft();

    function currentIndex(list) {
        if (!list.length) return 0;

        // Di ujung kanan, kartu terakhir tidak bisa mencapai posisi snap
        if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4) {
            return list.length - 1;
        }

        let best = 0;
        let min = Infinity;

        list.forEach((card, i) => {
            const d = Math.abs(offsetOf(card));
            if (d < min) { min = d; best = i; }
        });

        return best;
    }

    function goTo(i) {
        const list = visible();
        if (!list.length) return;

        const target = list[Math.max(0, Math.min(list.length - 1, i))];

        grid.scrollTo({
            left: grid.scrollLeft + offsetOf(target),
            behavior: reduce ? 'auto' : 'smooth',
        });
    }

    let raf = 0;

    function update() {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
            const list = visible();
            const i = currentIndex(list);

            count.textContent = `${list.length ? i + 1 : 0} / ${list.length}`;
            prev.disabled = i <= 0;
            next.disabled = i >= list.length - 1;
            bar.hidden = list.length < 2;
        });
    }

    prev.addEventListener('click', () => goTo(currentIndex(visible()) - 1));
    next.addEventListener('click', () => goTo(currentIndex(visible()) + 1));

    grid.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);

    // Filter proyek menyembunyikan kartu lewat atribut `hidden`
    new MutationObserver(update).observe(grid, {
        subtree: true,
        attributes: true,
        attributeFilter: ['hidden'],
    });

    /* ---------- Drag dengan mouse ---------- */
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    grid.addEventListener('pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0 || !mq.matches) return;

        down = true;
        moved = false;
        startX = e.clientX;
        startLeft = grid.scrollLeft;
    });

    addEventListener('pointermove', (e) => {
        if (!down) return;

        const dx = e.clientX - startX;

        if (!moved && Math.abs(dx) > 6) {
            moved = true;
            grid.classList.add('is-dragging');
        }

        if (moved) grid.scrollLeft = startLeft - dx;
    });

    const endDrag = () => {
        if (!down) return;

        down = false;
        grid.classList.remove('is-dragging'); // snap kembali aktif
        update();
    };

    addEventListener('pointerup', endDrag);
    addEventListener('pointercancel', endDrag);

    // Seret bukan klik: jangan buka modal proyek setelah drag
    grid.addEventListener('click', (e) => {
        if (!moved) return;
        e.preventDefault();
        e.stopPropagation();
        moved = false;
    }, true);

    // Cegah gambar/link terseret sebagai file saat drag
    grid.addEventListener('dragstart', (e) => e.preventDefault());

    update();
})();