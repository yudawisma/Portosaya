@php
    $certificates = [
        ['image' => 'IBM1.jpg',      'title' => 'IBM Certificate'],
        ['image' => 'IBM2.jpeg',     'title' => 'IBM Certificate'],
        ['image' => 'IBM3.jpeg',     'title' => 'IBM Certificate'],
        ['image' => 'Dicodiing.jpg', 'title' => 'Dicoding Certificate'],
        ['image' => 'cp.jpg',        'title' => 'Certification'],
        ['image' => 'coppa.jpg',     'title' => 'COPPA'],
        ['image' => 'dc2.jpg',       'title' => 'Certification'],
        ['image' => 'bi.jpg',        'title' => 'Certification'],
        ['image' => 'intern.jpg',    'title' => 'Internship'],
        ['image' => 'rh.jpg',        'title' => 'Certification'],
        ['image' => 'gpa.jpg',       'title' => 'Achievement'],
        ['image' => 'max.jpg',       'title' => 'Certification'],
    ];

    $certItems = collect($certificates)->map(fn ($c) => [
        'src'   => asset('img/' . $c['image']),
        'title' => $c['title'],
    ])->values();
@endphp

<section id="certificate" class="premium-section certificate-section">
    <div class="container">

        <div class="section-heading text-center">
            <span class="section-eyebrow">CERTIFICATIONS</span>
            <h2 class="section-title">
                Certificates & <span>Achievements</span>
            </h2>
            <p class="section-description mx-auto">
                A collection of certifications, achievements, and learning experiences
                that support my journey in technology and software development.
            </p>
        </div>

        <div class="certificate-slider-wrapper">
            <div class="swiper certificateSwiper">
                <div class="swiper-wrapper">

                    @foreach ($certificates as $certificate)
                        <div class="swiper-slide">
                            <div class="certificate-card">

                                <div class="certificate-image">
                                    <img
                                        src="{{ asset('img/' . $certificate['image']) }}"
                                        alt="{{ $certificate['title'] }}"
                                        loading="lazy">

                                    <div class="certificate-overlay">
                                        <button
                                            type="button"
                                            class="certificate-view"
                                            data-cert-open="{{ $loop->index }}">
                                            <i class="bi bi-arrows-fullscreen"></i>
                                            View Certificate
                                        </button>
                                    </div>
                                </div>

                                <div class="certificate-info">
                                    <span>Certificate</span>
                                    <h3>{{ $certificate['title'] }}</h3>
                                </div>

                            </div>
                        </div>
                    @endforeach

                </div>

                <div class="swiper-pagination"></div>

                <div class="certificate-navigation">
                    <button type="button" class="certificate-prev" aria-label="Sebelumnya">
                        <i class="bi bi-arrow-left"></i>
                    </button>
                    <button type="button" class="certificate-next" aria-label="Berikutnya">
                        <i class="bi bi-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>

    </div>
</section>


{{-- Lightbox Sertifikat --}}
<dialog class="cert-lb" id="certLightbox"
        aria-label="Pratinjau sertifikat"
        data-lenis-prevent
        data-items="{{ json_encode($certItems) }}">
    <div class="cert-lb-shell">

        <header class="cert-lb-header">
            <div>
                <span class="cert-lb-count" id="certLbCount"></span>
                <h3 class="cert-lb-title" id="certLbTitle"></h3>
            </div>
            <button type="button" class="pm-close" data-cert-close aria-label="Tutup">
                <i class="bi bi-x-lg"></i>
            </button>
        </header>

        <div class="cert-lb-stage">
            <img id="certLbImage" src="" alt="">
        </div>

        <footer class="cert-lb-footer">
            <button type="button" class="button button-secondary" data-cert-prev>
                <i class="bi bi-arrow-left"></i> Sebelumnya
            </button>
            <span class="cert-lb-hint">Gunakan tombol ← → di keyboard</span>
            <button type="button" class="button button-secondary" data-cert-next>
                Berikutnya <i class="bi bi-arrow-right"></i>
            </button>
        </footer>

    </div>
</dialog>


<script>
document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Swiper ---------- */
    let certificateSwiper = null;

    if (typeof Swiper !== 'undefined') {
        certificateSwiper = new Swiper('.certificateSwiper', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,

            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },

            pagination: {
                el: '.certificateSwiper .swiper-pagination',
                clickable: true,
            },

            navigation: {
                nextEl: '.certificate-next',
                prevEl: '.certificate-prev',
            },

            breakpoints: {
                576:  { slidesPerView: 2 },
                992:  { slidesPerView: 3 },
                1200: { slidesPerView: 3 }
            }
        });
    }

    /* ---------- Lightbox ---------- */
    const lightbox = document.getElementById('certLightbox');
    if (!lightbox) return;

    const items = JSON.parse(lightbox.dataset.items || '[]');
    const image = document.getElementById('certLbImage');
    const title = document.getElementById('certLbTitle');
    const count = document.getElementById('certLbCount');
    const root  = document.documentElement;

    let current = 0;

    function show(index) {
        if (!items.length) return;

        current = (index + items.length) % items.length; // berputar
        const item = items[current];

        image.src = item.src;
        image.alt = item.title;
        title.textContent = item.title;
        count.textContent =
            String(current + 1).padStart(2, '0') + ' / ' +
            String(items.length).padStart(2, '0');
    }

    function open(index) {
        if (typeof lightbox.showModal !== 'function') return;

        show(index);
        lightbox.showModal();
        root.classList.add('pm-open');
        certificateSwiper?.autoplay?.stop();
    }

    document.addEventListener('click', function (event) {
        const opener = event.target.closest('[data-cert-open]');
        if (opener) {
            open(Number(opener.dataset.certOpen));
            return;
        }

        if (!event.target.closest('#certLightbox')) return;

        if (event.target.closest('[data-cert-close]')) lightbox.close();
        else if (event.target.closest('[data-cert-prev]')) show(current - 1);
        else if (event.target.closest('[data-cert-next]')) show(current + 1);
        else if (event.target === lightbox) lightbox.close(); // klik area gelap
    });

    lightbox.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft')  show(current - 1);
        if (event.key === 'ArrowRight') show(current + 1);
    });

    lightbox.addEventListener('close', function () {
        image.src = '';
        if (!document.querySelector('dialog[open]')) {
            root.classList.remove('pm-open');
        }
        certificateSwiper?.autoplay?.start();
    });
});
</script>