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


// NAVBAR

(function () {
    if (!window.gsap) return;

    const header = document.querySelector('.site-header');
    if (!header) return;

    const items = header.querySelectorAll('.brand, .nav-links a, .nav-contact');
    const menu = document.getElementById('nav-menu');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let hidden = false;
    let lastY = window.scrollY;
    const threshold = 8;
    const showAfter = 80;

    /* ---------- Intro saat halaman dibuka ---------- */
    if (!reduce) {
        gsap.from(header, {
            yPercent: -100,
            duration: 1.1,
            ease: 'expo.out',
            delay: 0.2,
        });

        gsap.from(items, {
            y: -18,
            opacity: 0,
            filter: 'blur(8px)',
            duration: 1,
            ease: 'power3.out',
            stagger: 0.07,
            delay: 0.45,
            clearProps: 'filter,opacity,transform',
        });
    }

    /* ---------- Sembunyikan (scroll ke bawah) ---------- */
    function hide() {
        if (hidden) return;
        hidden = true;
        gsap.killTweensOf([header, items]);

        if (reduce) {
            gsap.set(header, { yPercent: -100 });
            return;
        }

        gsap.to(items, {
            y: -12,
            opacity: 0,
            filter: 'blur(6px)',
            duration: 0.3,
            ease: 'power2.in',
            stagger: { each: 0.03, from: 'end' },
        });

        gsap.to(header, {
            yPercent: -100,
            duration: 0.7,
            ease: 'expo.inOut',
            delay: 0.08,
        });
    }

    /* ---------- Tampilkan (scroll ke atas) ---------- */
    function show() {
        if (!hidden) return;
        hidden = false;
        gsap.killTweensOf([header, items]);

        if (reduce) {
            gsap.set(header, { yPercent: 0 });
            gsap.set(items, { clearProps: 'all' });
            return;
        }

        gsap.to(header, {
            yPercent: 0,
            duration: 0.8,
            ease: 'expo.out',
        });

        gsap.fromTo(items,
            { y: -16, opacity: 0, filter: 'blur(8px)' },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.7,
                ease: 'power3.out',
                stagger: 0.05,
                delay: 0.12,
                clearProps: 'filter,opacity,transform',
            }
        );
    }

    /* ---------- Deteksi arah scroll ---------- */
    function onScroll(y) {
        const menuOpen = menu && menu.classList.contains('is-open');

        if (y < showAfter || menuOpen) {
            show();
        } else if (y > lastY + threshold) {
            hide();
        } else if (y < lastY - threshold) {
            show();
        }
        lastY = y;
    }

    if (window.lenis && typeof window.lenis.on === 'function') {
        window.lenis.on('scroll', ({ scroll }) => onScroll(scroll));
    } else {
        window.addEventListener('scroll', () => onScroll(window.scrollY), { passive: true });
    }
})();

// Hero
(function () {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const hero = document.querySelector('.hero-fx');
    if (!hero) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Potongan miring membesar seiring scroll
    gsap.to(hero, {
        '--cut': '34%',
        ease: 'none',
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });

    // Isi hero naik sedikit & memudar (parallax halus)
    gsap.to('.hero-fx__inner', {
        yPercent: -8,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
        },
    });
})();