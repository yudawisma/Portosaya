/* =========================================================
   WORK.JS — ringkas item pengalaman kerja dengan accordion.
   Dimuat SETELAH cinematic.js. Tidak perlu ubah Blade.

   Perbaikan dari versi lama:
   1. Hanya satu item terbuka dalam satu waktu (details name="...")
   2. Refresh ScrollTrigger/Lenis dengan debounce, bukan event resize mentah
   3. Refresh sekali setelah init, karena tinggi halaman berubah
   4. Label hitungan jelas ("4 poin"), bukan angka polos
   5. Komentar sisa "// NAVBAR" dihapus
========================================================= */
(function () {
    'use strict';

    var timer = 0;

    function refreshLayout() {
        clearTimeout(timer);
        timer = setTimeout(function () {
            if (window.lenis && typeof window.lenis.resize === 'function') {
                window.lenis.resize();
            }
            if (window.ScrollTrigger) {
                window.ScrollTrigger.refresh();
            } else {
                window.dispatchEvent(new Event('resize'));
            }
        }, 60);
    }

    function init() {
        // Kolom pertama = Work. Ganti selector jika urutan kolom berubah.
        var items = document.querySelectorAll(
            '#experience .timeline-column:first-child .timeline-item'
        );

        items.forEach(function (item, index) {
            var details = item.querySelector('.experience-details');
            if (!details || item.querySelector('.timeline-more')) return;

            var tags = item.querySelector('.tag-list');
            var count = details.children.length;

            var wrap = document.createElement('details');
            wrap.className = 'timeline-more';
            wrap.name = 'work-accordion'; // eksklusif di browser modern
            if (index === 0) wrap.open = true; // item terbaru terbuka

            var summary = document.createElement('summary');
            summary.innerHTML =
                '<span>Detail &amp; tech stack</span>' +
                (count ? '<em>' + count + ' poin</em>' : '');

            wrap.appendChild(summary);
            wrap.appendChild(details);
            if (tags) wrap.appendChild(tags);
            item.appendChild(wrap);

            // Fallback untuk browser lama yang belum mendukung atribut name
            wrap.addEventListener('toggle', function () {
                if (wrap.open && !('name' in wrap)) {
                    document
                        .querySelectorAll('#experience .timeline-more[open]')
                        .forEach(function (other) {
                            if (other !== wrap) other.open = false;
                        });
                }
                refreshLayout();
            });
        });

        refreshLayout();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();