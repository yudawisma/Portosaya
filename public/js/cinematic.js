(() => {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const reducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        const progressBar = document.querySelector('.scroll-progress');

        // Progress indicator tetap bekerja tanpa GSAP.
        if (progressBar) {
            const updateProgress = () => {
                const scrollable =
                    document.documentElement.scrollHeight - window.innerHeight;

                const progress = scrollable > 0
                    ? window.scrollY / scrollable
                    : 0;

                progressBar.style.transform = `scaleX(${progress})`;
            };

            window.addEventListener('scroll', updateProgress, {
                passive: true
            });

            updateProgress();
        }

        // Jangan hentikan fungsi dasar website jika CDN gagal.
        if (reducedMotion || !window.gsap || !window.ScrollTrigger) {
            return;
        }

        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);

        // Smooth scrolling dengan Lenis.
        let lenis = null;

        if (window.Lenis) {
            lenis = new window.Lenis({
                duration: 1.05,
                smoothWheel: true,
                syncTouch: false,
                anchors: true
            });

            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);
        }

        // Progress bar cinematic.
        if (progressBar) {
            gsap.set(progressBar, {
                scaleX: 0,
                transformOrigin: 'left center'
            });

            gsap.to(progressBar, {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 0.2
                }
            });
        }

        // HERO — reveal bertahap.
        const hero = document.querySelector('.hero-section');

        if (hero) {
            const heroItems = [
                hero.querySelector('.eyebrow'),
                hero.querySelector('.hero-greeting'),
                hero.querySelector('.hero-title'),
                hero.querySelector('h1'),
                hero.querySelector('.hero-degree'),
                hero.querySelector('.hero-description'),
                hero.querySelector('.hero-actions'),
                hero.querySelector('.hero-links')
            ].filter(Boolean);

            // Hindari elemen yang sama dianimasikan dua kali.
            const uniqueHeroItems = [...new Set(heroItems)];

            if (uniqueHeroItems.length) {
                gsap.fromTo(uniqueHeroItems, {
                    autoAlpha: 0,
                    y: 24
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    delay: 0.12,
                    clearProps: 'transform'
                });
            }

            const heroVisual = hero.querySelector('.hero-visual');

            if (heroVisual) {
                gsap.fromTo(heroVisual, {
                    autoAlpha: 0,
                    y: 30,
                    scale: 0.98
                }, {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.1,
                    delay: 0.25,
                    ease: 'power3.out',
                    clearProps: 'transform'
                });
            }
        }

        // SECTION HEADING — muncul saat section memasuki viewport.
        gsap.utils.toArray('.section-heading').forEach((heading) => {
            gsap.fromTo(heading, {
                autoAlpha: 0,
                y: 28
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'transform',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 86%',
                    once: true
                }
            });
        });

        // Stagger reveal untuk kartu.
        const revealGroups = [
            '.project-card',
            '.skill-card',
            '.timeline-item',
            '.certificateSwiper .swiper-slide',
            '.about-main',
            '.about-side',
            '.contact-panel'
        ];

        revealGroups.forEach((selector) => {
            gsap.utils.toArray(selector).forEach((element) => {
                gsap.fromTo(element, {
                    autoAlpha: 0,
                    y: 24
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.72,
                    ease: 'power2.out',
                    clearProps: 'transform',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 91%',
                        once: true
                    }
                });
            });
        });

        // Reveal elemen kecil di dalam kartu Skills.
        gsap.utils.toArray('.skills-section .tech-item').forEach((item) => {
            gsap.fromTo(item, {
                autoAlpha: 0,
                y: 8
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out',
                clearProps: 'transform',
                scrollTrigger: {
                    trigger: item.closest('.skill-card'),
                    start: 'top 88%',
                    once: true
                }
            });
        });

        // Parallax sangat lembut pada visual hero.
        const visual = document.querySelector('.hero-visual');

        if (visual && window.matchMedia('(min-width: 801px)').matches) {
            gsap.to(visual, {
                y: 18,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.7
                }
            });
        }

        // Zoom gambar proyek saat hover.
        document.querySelectorAll('.project-card').forEach((card) => {
            const image = card.querySelector('.project-art img');

            if (!image) return;

            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.035,
                    duration: 0.65,
                    ease: 'power2.out',
                    overwrite: true
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.65,
                    ease: 'power2.out',
                    overwrite: true
                });
            });
        });

        // Refresh setelah gambar selesai dimuat.
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    });
})();