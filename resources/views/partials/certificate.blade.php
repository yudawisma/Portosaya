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

                    @php
                        $certificates = [
                            ['image' => 'IBM1.jpg', 'title' => 'IBM Certificate'],
                            ['image' => 'IBM2.jpeg', 'title' => 'IBM Certificate'],
                            ['image' => 'IBM3.jpeg', 'title' => 'IBM Certificate'],
                            ['image' => 'Dicodiing.jpg', 'title' => 'Dicoding Certificate'],
                            ['image' => 'cp.jpg', 'title' => 'Certification'],
                            ['image' => 'coppa.jpg', 'title' => 'COPPA'],
                            ['image' => 'dc2.jpg', 'title' => 'Certification'],
                            ['image' => 'bi.jpg', 'title' => 'Certification'],
                            ['image' => 'intern.jpg', 'title' => 'Internship'],
                            ['image' => 'rh.jpg', 'title' => 'Certification'],
                            ['image' => 'gpa.jpg', 'title' => 'Achievement'],
                            ['image' => 'max.jpg', 'title' => 'Certification'],
                        ];
                    @endphp

                    @foreach ($certificates as $certificate)
                        <div class="swiper-slide">
                            <div class="certificate-card">

                                <div class="certificate-image">
                                    <img
                                        src="{{ asset('img/' . $certificate['image']) }}"
                                        alt="{{ $certificate['title'] }}"
                                        loading="lazy"
                                    >

                                    <div class="certificate-overlay">
                                        <button
                                            type="button"
                                            class="certificate-view"
                                            data-bs-toggle="modal"
                                            data-bs-target="#certificateModal"
                                            data-image="{{ asset('img/' . $certificate['image']) }}"
                                            data-title="{{ $certificate['title'] }}"
                                        >
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
                    <button class="certificate-prev">
                        <i class="bi bi-arrow-left"></i>
                    </button>

                    <button class="certificate-next">
                        <i class="bi bi-arrow-right"></i>
                    </button>
                </div>

            </div>

        </div>

    </div>
</section>


{{-- Certificate Modal --}}
<div class="modal fade certificate-modal" id="certificateModal" tabindex="-1">
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">

            <button
                type="button"
                class="certificate-modal-close"
                data-bs-dismiss="modal"
            >
                <i class="bi bi-x-lg"></i>
            </button>

            <div class="modal-body">
                <img
                    id="certificateModalImage"
                    src=""
                    alt="Certificate"
                >
            </div>

        </div>
    </div>
</div>


<script>
document.addEventListener('DOMContentLoaded', function () {

    const certificateSwiper = new Swiper('.certificateSwiper', {
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
            576: {
                slidesPerView: 2
            },

            992: {
                slidesPerView: 3
            },

            1200: {
                slidesPerView: 3
            }
        }
    });


    document.querySelectorAll('.certificate-view').forEach(button => {

        button.addEventListener('click', function () {

            const image = this.dataset.image;
            const title = this.dataset.title;

            document.getElementById('certificateModalImage').src = image;
            document.getElementById('certificateModalImage').alt = title;

        });

    });

});
</script>