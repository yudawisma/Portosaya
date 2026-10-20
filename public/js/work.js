/* Work & Projects: ringkas item dengan accordion.
   Taruh sebelum </body> (atau di file JS utama), tanpa ubah Blade. */
(function () {
    function init() {
        var items = document.querySelectorAll(
            "#experience .timeline-column:first-child .timeline-item"
        );

        items.forEach(function (item, index) {
            var details = item.querySelector(".experience-details");
            if (!details || item.querySelector(".timeline-more")) return;

            var tags = item.querySelector(".tag-list");
            var count = details.children.length;

            var wrap = document.createElement("details");
            wrap.className = "timeline-more";
            if (index === 0) wrap.open = true; // item terbaru terbuka

            var summary = document.createElement("summary");
            summary.innerHTML = "<span>Detail &amp; tech stack</span><em>" + count + "</em>";

            wrap.appendChild(summary);
            wrap.appendChild(details);
            if (tags) wrap.appendChild(tags);
            item.appendChild(wrap);

            // Beri tahu smooth-scroll (Lenis/ScrollTrigger) bahwa tinggi halaman berubah
            wrap.addEventListener("toggle", function () {
                window.dispatchEvent(new Event("resize"));
            });
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();

// NAVBAR
