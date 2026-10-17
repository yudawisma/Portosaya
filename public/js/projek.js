(() => {
    'use strict';

    const dialogs = document.querySelectorAll('dialog.pm');
    if (!dialogs.length) return;

    const root = document.documentElement;

    /* ---------- Video ---------- */
    function resetVideo(slide) {
        if (!slide || !slide.dataset.youtube) return;
        slide.querySelector('iframe')?.remove();
        slide.classList.remove('is-playing');
    }

    function playVideo(slide) {
        if (slide.querySelector('iframe')) return;

        const iframe = document.createElement('iframe');
        iframe.src =
            'https://www.youtube-nocookie.com/embed/' +
            encodeURIComponent(slide.dataset.youtube) +
            '?autoplay=1&rel=0';
        iframe.title = 'Video demo proyek';
        iframe.allow =
            'accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;

        slide.appendChild(iframe);
        slide.classList.add('is-playing');
    }

    /* ---------- Slide ---------- */
    function showSlide(dialog, index) {
        dialog.querySelectorAll('[data-slide]').forEach((slide) => {
            const active = Number(slide.dataset.slide) === index;
            slide.hidden = !active;
            if (!active) resetVideo(slide);
        });

        dialog.querySelectorAll('[data-thumb]').forEach((thumb) => {
            const active = Number(thumb.dataset.thumb) === index;
            thumb.classList.toggle('is-active', active);
            thumb.setAttribute('aria-current', active ? 'true' : 'false');
        });
    }

    /* ---------- Buka & tutup ---------- */
    function openProject(id) {
        const dialog = document.getElementById('pm-' + id);
        if (!dialog || typeof dialog.showModal !== 'function') return;

        showSlide(dialog, 0);
        dialog.querySelector('.pm-body')?.scrollTo(0, 0);

        dialog.showModal();
        root.classList.add('pm-open');
    }

    dialogs.forEach((dialog) => {
        // Reset video & kunci scroll saat ditutup (Esc, tombol X, atau klik luar)
        dialog.addEventListener('close', () => {
            dialog.querySelectorAll('[data-slide]').forEach(resetVideo);
            if (!document.querySelector('dialog.pm[open]')) {
                root.classList.remove('pm-open');
            }
        });

        // Klik di area gelap (backdrop) menutup modal
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) dialog.close();
        });
    });

    /* ---------- Delegasi klik ---------- */
    document.addEventListener('click', (event) => {
        const opener = event.target.closest('[data-project-open]');
        if (opener) {
            openProject(opener.dataset.projectOpen);
            return;
        }

        const dialog = event.target.closest('dialog.pm');
        if (!dialog) return;

        if (event.target.closest('[data-pm-close]')) {
            dialog.close();
            return;
        }

        const play = event.target.closest('[data-pm-play]');
        if (play) {
            playVideo(play.closest('.pm-slide'));
            return;
        }

        const thumb = event.target.closest('[data-thumb]');
        if (thumb) showSlide(dialog, Number(thumb.dataset.thumb));
    });
})();