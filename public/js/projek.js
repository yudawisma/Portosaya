
/* =========================================================
   PROJECT UX — filter, modal, galeri, keyboard
   Pastikan file ini dimuat setelah projek.js.
========================================================= */
(() => {
    'use strict';

    const isTyping = (el) =>
        el &&
        (
            el.tagName === 'INPUT' ||
            el.tagName === 'TEXTAREA' ||
            el.isContentEditable
        );

    /* ---------- Filter proyek ---------- */
    const input = document.getElementById('project-filter');
    const grid = document.querySelector('.bento-grid');
    const count = document.getElementById('project-count');

    if (input && grid) {
        const cards = [...grid.querySelectorAll('.project-card')];
        const empty = document.createElement('p');

        empty.className = 'project-empty';
        empty.hidden = true;
        grid.appendChild(empty);

        const apply = () => {
            const q = input.value.trim().toLowerCase();
            let shown = 0;

            cards.forEach((card) => {
                const match = card.textContent.toLowerCase().includes(q);
                card.hidden = !match;
                if (match) shown++;
            });

            if (count) count.textContent = `${shown} / ${cards.length} proyek`;

            empty.hidden = shown !== 0;
            empty.textContent =
                `Tidak ada proyek untuk "${input.value.trim()}". Coba: Laravel, React, AI.`;
        };

        input.addEventListener('input', apply);

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                input.value = '';
                apply();
                input.blur();
            }
        });

        apply();
    }

    /* ---------- Buka modal proyek ---------- */
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        // Jangan cegah navigasi link eksternal.
        if (target.closest('.pc-links a')) return;

        const opener = target.closest('[data-project-open]');

        if (opener) {
            const id = opener.dataset.projectOpen;
            const dialog = document.getElementById(`pm-${id}`);

            if (!dialog) {
                console.error(`Modal proyek tidak ditemukan: pm-${id}`);
                return;
            }

            if (dialog.open) return;

            if (typeof dialog.showModal === 'function') {
                dialog.showModal();
            } else {
                dialog.setAttribute('open', '');
            }

            document.body.classList.add('project-modal-open');
            return;
        }

        // Tombol tutup modal.
        const closeButton = target.closest('[data-pm-close]');

        if (closeButton) {
            const dialog = closeButton.closest('dialog.pm');
            if (dialog) closeDialog(dialog);
            return;
        }

        // Klik area backdrop dialog native.
        const dialog = target.closest('dialog.pm');

        if (dialog && target === dialog) {
            const rect = dialog.getBoundingClientRect();

            const inside =
                target.clientX >= rect.left &&
                target.clientX <= rect.right &&
                target.clientY >= rect.top &&
                target.clientY <= rect.bottom;

            if (!inside) closeDialog(dialog);
        }
    });

    function closeDialog(dialog) {
        if (typeof dialog.close === 'function' && dialog.open) {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }

        document.body.classList.remove('project-modal-open');
    }

    // Bersihkan status scroll saat dialog ditutup dengan Escape.
    document.querySelectorAll('dialog.pm').forEach((dialog) => {
        dialog.addEventListener('close', () => {
            document.body.classList.remove('project-modal-open');
        });
    });

    /* ---------- Navigasi thumbnail galeri ---------- */
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const thumb = target.closest('[data-thumb]');
        if (!thumb) return;

        const dialog = thumb.closest('dialog.pm');
        if (!dialog) return;

        const index = thumb.dataset.thumb;

        dialog.querySelectorAll('[data-thumb]').forEach((item) => {
            item.classList.toggle('is-active', item === thumb);
        });

        dialog.querySelectorAll('[data-slide]').forEach((slide) => {
            slide.hidden = slide.dataset.slide !== index;

            // Hentikan video ketika berpindah slide.
            const iframe = slide.querySelector('iframe');
            if (iframe) iframe.remove();
        });
    });

    /* ---------- Putar video YouTube di dalam modal ---------- */
    document.addEventListener('click', (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const playButton = target.closest('[data-pm-play]');
        if (!playButton) return;

        const slide = playButton.closest('[data-youtube]');
        if (!slide) return;

        const videoId = slide.dataset.youtube;

        if (!/^[a-zA-Z0-9_-]+$/.test(videoId)) {
            console.error('ID YouTube tidak valid.');
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.src =
            `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
        iframe.title = 'Video demo proyek';
        iframe.allow =
            'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe.allowFullscreen = true;
        iframe.loading = 'lazy';

        iframe.style.width = '100%';
        iframe.style.aspectRatio = '16 / 9';
        iframe.style.border = '0';

        slide.replaceChildren(iframe);
    });

    /* ---------- Shortcut keyboard ---------- */
    document.addEventListener('keydown', (e) => {
        const dialog = document.querySelector('dialog.pm[open]');

        if (e.key === 'Escape' && dialog) {
            // Browser biasanya menutup dialog native dengan Escape.
            return;
        }

        if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
            if (isTyping(document.activeElement)) return;
            if (dialog || !input) return;

            e.preventDefault();
            input.scrollIntoView({ block: 'center', behavior: 'smooth' });
            input.focus();
            return;
        }

        if (!dialog || e.metaKey || e.ctrlKey || e.altKey) return;

        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            const thumbs = [...dialog.querySelectorAll('[data-thumb]')];
            if (thumbs.length < 2) return;

            const current = thumbs.findIndex((t) =>
                t.classList.contains('is-active')
            );

            const step = e.key === 'ArrowRight' ? 1 : -1;
            thumbs[(current + step + thumbs.length) % thumbs.length].click();
            e.preventDefault();
            return;
        }

        if (e.key === 'j' || e.key === 'k') {
            const all = [...document.querySelectorAll('dialog.pm')];
            const index = all.indexOf(dialog);

            if (index < 0 || all.length < 2) return;

            const step = e.key === 'j' ? 1 : -1;
            const next = all[(index + step + all.length) % all.length];

            closeDialog(dialog);

            const opener = document.querySelector(
                `[data-project-open="${next.id.replace(/^pm-/, '')}"]`
            );

            if (opener) opener.click();

            e.preventDefault();
        }
    });
})();
