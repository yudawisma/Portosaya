/* =========================================================
   PROJEK.JS — filter, modal, galeri, keyboard
   Dimuat SETELAH cinematic.js (supaya ScrollTrigger sudah ada).

   Perbaikan dari versi lama:
   1. Klik backdrop memakai event.clientX (sebelumnya target.clientX = undefined)
   2. Slide video YouTube tidak lagi "kosong" setelah pindah slide
   3. Video berhenti saat modal ditutup (sebelumnya suara tetap jalan)
   4. Filter memanggil refresh ScrollTrigger + memastikan kartu tidak tertahan opacity 0
   5. Kartu bisa dibuka lewat keyboard (Enter / Space)
   6. data-lenis-prevent + overscroll-behavior agar modal bisa di-scroll di HP
========================================================= */
(() => {
    'use strict';

    const isTyping = (el) =>
        el &&
        (el.tagName === 'INPUT' ||
            el.tagName === 'TEXTAREA' ||
            el.isContentEditable);

    let refreshTimer = 0;
    const refreshLayout = () => {
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
            else window.dispatchEvent(new Event('resize'));
        }, 60);
    };

    /* ---------- Video YouTube: simpan & pulihkan poster ---------- */
    function resetSlide(slide) {
        if (slide._poster) {
            slide.replaceChildren(...slide._poster);
            slide._poster = null;
        } else {
            const iframe = slide.querySelector('iframe');
            if (iframe) iframe.remove();
        }
    }

    function stopVideos(dialog) {
        dialog.querySelectorAll('[data-youtube]').forEach(resetSlide);
    }

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

        let first = true;

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

            // Kartu yang belum sempat di-reveal GSAP jangan tertahan opacity 0
            if (!first && window.gsap) {
                window.gsap.set(cards, {
                    autoAlpha: 1, x: 0, y: 0, scale: 1, rotateX: 0,
                    clearProps: 'transform,opacity,visibility,transition',
                });
            }
            first = false;

            refreshLayout();
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

    /* ---------- Siapkan semua dialog ---------- */
    document.querySelectorAll('dialog.pm').forEach((dialog) => {
        // Lenis jangan mencuri scroll di dalam modal
        dialog.setAttribute('data-lenis-prevent', '');

        dialog.addEventListener('close', () => {
            stopVideos(dialog);
            document.body.classList.remove('project-modal-open');
        });
    });

    /* ---------- Kartu proyek bisa difokus & dibuka via keyboard ---------- */
    document.querySelectorAll('[data-project-open]').forEach((el) => {
        const native = el.matches('a, button, summary, input');
        if (native) return;

        if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
        if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;

        const el = e.target instanceof Element ? e.target : null;
        if (!el || !el.matches('[data-project-open]')) return;
        if (el.matches('a, button, summary, input')) return;

        e.preventDefault();
        el.click();
    });

    /* ---------- Buka / tutup modal ---------- */
    function closeDialog(dialog) {
        if (typeof dialog.close === 'function' && dialog.open) {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
            stopVideos(dialog);
        }

        document.body.classList.remove('project-modal-open');
    }

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
        // Catatan: koordinat harus dari `event`, bukan dari `target`.
        const dialog = target.closest('dialog.pm');

        if (dialog && target === dialog) {
            const rect = dialog.getBoundingClientRect();

            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!inside) closeDialog(dialog);
        }
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
            // Hentikan video & kembalikan poster + tombol play
            resetSlide(slide);
            slide.querySelectorAll('[data-youtube]').forEach(resetSlide);
        });

        // Pada HP, bawa thumbnail aktif ke tengah baris
        thumb.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
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

        // Simpan isi asli (poster + tombol play) supaya bisa dipulihkan
        slide._poster = Array.from(slide.childNodes);
        slide.replaceChildren(iframe);
    });

    /* ---------- Shortcut keyboard ---------- */
    document.addEventListener('keydown', (e) => {
        const dialog = document.querySelector('dialog.pm[open]');

        // Escape ditangani browser untuk dialog native.
        if (e.key === 'Escape' && dialog) return;

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