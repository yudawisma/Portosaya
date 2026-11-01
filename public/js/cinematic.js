/* =========================================================
   CINEMATIC.JS — GSAP + ScrollTrigger + Lenis
   Pengganti cinematic.js lama. Tidak perlu ubah HTML.

   Isi:
   01. Dasar (progress bar, status navbar)         [selalu jalan]
   02. Smooth scroll (Lenis)
   03. Loader / intro sinematik
   04. Hero: split huruf 3D, parallax mouse + scroll
   05. Heading per kata, reveal kartu, timeline, counter
   06. Kartu: spotlight + tilt 3D
   07. Skills: marquee berkecepatan scroll + bola tag 3D
   08. Navbar pintar, anchor, modal, kursor, magnet
   ========================================================= */
(() => {
    "use strict";

    /* ---------- Matikan fitur dengan mengganti jadi false ---------- */
    const FEATURES = {
        loader: true,
        grain: true,
        cursor: true,
        magnetic: true,
        sphere: true,
        marquee: true,
        skew: true,
    };

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    const make = (tag, cls, text) => {
        const n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    };

    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

    /* =====================================================
       01. DASAR — selalu jalan, tanpa GSAP
       ===================================================== */
    function baseline() {
        const bar = $(".scroll-progress");
        const header = $(".site-header");
        const hero = $("#home") || $(".hero-fx");
        const cuts = $$(".cut-fx");

        const update = () => {
            if (bar) {
                const max = root.scrollHeight - innerHeight;
                bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
            }

            if (header) {
                // ada hero: solid setelah hero lewat. Tanpa hero: solid setelah scroll sedikit
                const passed = hero
                    ? hero.getBoundingClientRect().bottom <=
                      header.offsetHeight + 1
                    : scrollY > 20;
                header.classList.toggle("is-scrolled", passed);
            }

            if (hero) {
                const p = Math.min(1, Math.max(0, scrollY / hero.offsetHeight));
                hero.style.setProperty("--cut", (p * 34).toFixed(2) + "%");
            }

            cuts.forEach((el) => {
                const r = el.getBoundingClientRect();
                const p = 1 - Math.min(1, Math.max(0, r.bottom / innerHeight));
                el.style.setProperty(
                    "--cut",
                    (p * innerHeight * 0.34).toFixed(1) + "px",
                );
            });
        };

        addEventListener("scroll", update, { passive: true });
        addEventListener("resize", update);
        update();
    }

    /* =====================================================
       HELPER: pecah teks
       ===================================================== */
    // Kata dibungkus topeng (.cine-w > i). Struktur <span>/<br> tetap utuh.
    function splitWords(el) {
        if (!el || el.dataset.split) return [];
        el.dataset.split = "words";

        const inners = [];
        const walk = (node) => {
            Array.from(node.childNodes).forEach((child) => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach((part) => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(" "));
                            return;
                        }
                        const w = make("span", "cine-w");
                        const i = make("i", "", part);
                        w.appendChild(i);
                        frag.appendChild(w);
                        inners.push(i);
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1 && child.tagName !== "BR") {
                    walk(child);
                }
            });
        };

        walk(el);
        return inners;
    }

    // Huruf per huruf (untuk nama raksasa di hero)
    function splitChars(el) {
        if (!el || el.dataset.split) return [];
        el.dataset.split = "chars";

        const text = el.textContent;
        el.textContent = "";
        el.classList.add("is-split");

        return Array.from(text).map((ch) => {
            const s = make("span", "cine-ch", ch === " " ? "\u00A0" : ch);
            s.setAttribute("aria-hidden", "true");
            el.appendChild(s);
            return s;
        });
    }

    /* =====================================================
       BOOT
       ===================================================== */
    function boot() {
        baseline();

        if (reduce || !window.gsap || !window.ScrollTrigger) {
            requestAnimationFrame(() => root.classList.remove("cine-pre"));
            return;
        }

        cinematic();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

    /* =====================================================
       CINEMATIC (butuh GSAP + ScrollTrigger)
       ===================================================== */
    function cinematic() {
        const gsap = window.gsap;
        const ScrollTrigger = window.ScrollTrigger;

        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.config({ ignoreMobileResize: true });

        root.classList.add("cine");

        const S = { vel: 0, dir: 1, modal: false, introDone: false };
        const safe = (fn) => {
            try {
                fn();
            } catch (err) {
                console.error("[cinematic]", err);
            }
        };

        if (FEATURES.grain)
            document.body.appendChild(make("div", "cine-grain"));

        /* ---------- 02. Lenis ---------- */
        let lenis = null;
        if (window.Lenis) {
            lenis = new window.Lenis({
                duration: 1.15,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                syncTouch: false,
            });
            window.lenis = lenis;
            lenis.on("scroll", ScrollTrigger.update);
            gsap.ticker.add((time) => lenis.raf(time * 1000));
            gsap.ticker.lagSmoothing(0);
            lenis.stop(); // dikunci sampai intro selesai
        }

        /* ---------- Siapkan hero & loader ---------- */
        const hero = prepareHero();
        const loader = FEATURES.loader ? buildLoader() : null;
        root.classList.remove("cine-pre");

        (async () => {
            const first = (() => {
                try {
                    const seen = sessionStorage.getItem("cine-seen");
                    sessionStorage.setItem("cine-seen", "1");
                    return !seen;
                } catch (_) {
                    return true;
                }
            })();

            await runLoader(loader, first);

            const exit = exitLoader(loader);
            gsap.delayedCall(0.7, () => hero && hero.timeline.play());
            if (!hero) {
                finishIntro();
            }
            await exit;
        })();

        function finishIntro() {
            if (S.introDone) return;
            S.introDone = true;
            root.classList.add("cine-ready");
            if (lenis) lenis.start();
            window.dispatchEvent(new Event("cine:intro"));
            ScrollTrigger.refresh();
        }

        // Pengaman: jangan sampai halaman macet kalau ada yang gagal
        gsap.delayedCall(10, () => {
            if (S.introDone) return;
            const l = $(".cine-loader");
            if (l) l.remove();
            gsap.set(".hero-fx *", {
                clearProps: "opacity,visibility,transform",
            });
            finishIntro();
        });

        /* ---------- Inisialisasi sisanya ---------- */
        safe(initScrollVelocity);
        safe(initHeroScroll);
        safe(initHeroMouse);
        safe(initHeadings);
        safe(initReveals);
        safe(initTimeline);
        safe(initGlow);
        safe(initCards);
        safe(initCounters);
        safe(initMarquee);
        safe(initSphere);
        safe(initNav);
        safe(initAnchors);
        safe(initModals);
        safe(initCursor);
        safe(initMagnetic);
        safe(initSkew);

        addEventListener("load", () => ScrollTrigger.refresh());
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => ScrollTrigger.refresh());
        }

        function initHeroScroll() {
            if (!hero) return;

            const trig = {
                trigger: hero.el,
                start: "top top",
                end: "bottom top",
                scrub: true,
            };

            gsap.to(".hero-fx__inner", {
                yPercent: -10,
                opacity: 0.25,
                ease: "none",
                scrollTrigger: trig,
            });

            if (hero.photos.length) {
                gsap.to(hero.photos, {
                    yPercent: 12,
                    ease: "none",
                    scrollTrigger: trig,
                });
            }

            const name = $(".hero-fx__name", hero.el);
            if (name) {
                gsap.to(name, {
                    scale: 0.88,
                    transformOrigin: "0% 100%",
                    ease: "none",
                    scrollTrigger: trig,
                });
            }
        }

        /* =================================================
           03. LOADER
           ================================================= */
        function buildLoader() {
            const l = make("div", "cine-loader");
            l.setAttribute("aria-hidden", "true");
            l.innerHTML =
                '<div class="cine-loader__top"><span>YUDHA WISMA WARDANI, S.KOM</span>' +
                `<span>PORTFOLIO ${new Date().getFullYear()}</span></div>` +
                '<div class="cine-loader__count"><span data-n>000</span><em>%</em></div>' +
                '<div class="cine-loader__bottom"><span>SOFTWARE ENGINEER</span>' +
                "<span>BREBES, JAWA TENGAH</span></div>" +
                '<i class="cine-loader__bar"></i>';
            document.body.appendChild(l);
            return l;
        }

        async function runLoader(l, full) {
            if (!l) return;

            const num = $("[data-n]", l);
            const bar = $(".cine-loader__bar", l);
            const state = { p: 0 };

            const render = () => {
                num.textContent = String(Math.round(state.p)).padStart(3, "0");
                bar.style.transform = `scaleX(${state.p / 100})`;
            };
            const to = (p, d, ease) =>
                new Promise((res) => {
                    gsap.to(state, {
                        p,
                        duration: d,
                        ease,
                        onUpdate: render,
                        onComplete: res,
                    });
                });

            const loaded = new Promise((res) => {
                if (document.readyState === "complete") res();
                else addEventListener("load", res, { once: true });
                setTimeout(res, 5000);
            });

            await to(88, full ? 1.7 : 0.7, "power2.inOut");
            await loaded;
            await to(100, 0.35, "power1.out");
        }

        function exitLoader(l) {
            return new Promise((res) => {
                if (!l) return res();

                gsap.timeline({
                    onComplete: () => {
                        l.remove();
                        res();
                    },
                })
                    .to(
                        $(".cine-loader__count", l),
                        {
                            yPercent: -40,
                            opacity: 0,
                            duration: 0.7,
                            ease: "power3.in",
                        },
                        0,
                    )
                    .to(
                        l,
                        {
                            clipPath: "inset(0 0 100% 0)",
                            duration: 1.15,
                            ease: "expo.inOut",
                        },
                        0.25,
                    );
            });
        }

        /* =================================================
           04. HERO
           ================================================= */
        function prepareHero() {
            const el = $(".hero-fx");
            if (!el) return null;

            const h1 = $(".hero-fx__name", el);
            if (h1)
                h1.setAttribute(
                    "aria-label",
                    h1.textContent.replace(/\s+/g, " ").trim(),
                );

            const first = $(".hero-fx__first", el);
            const last = $(".hero-fx__last", el);
            const introP = $(".hero-fx__intro p", el);
            const header = $(".site-header");

            const p = {
                el,
                chars: first ? splitChars(first) : [],
                lastWords: last ? splitWords(last) : [],
                introWords: introP ? splitWords(introP) : [],
                photos: $$(
                    ".hero-fx__photo-wrap, .hero-fx__photo-real, .hero-fx__photo-blurmask, .hero-fx > .hero-fx__photo",
                    el,
                ),
                items: $$(
                    ".hero-fx__cta, .hero-fx__card, .hero-fx__resume, .hero-fx__meta, .hero-fx__focus li",
                    el,
                ),
                plus: $$(".hero-fx__plus", el),
                navItems: header
                    ? $$(
                          ".brand-link, .brand, .nav-links a, .nav-contact",
                          header,
                      )
                    : [],
                header,
            };

            p.timeline = buildIntro(p);
            return p;
        }

        function buildIntro(p) {
            const tl = gsap.timeline({
                paused: true,
                defaults: { ease: "expo.out" },
            });
            const T = 0.2; // semua mulai bersamaan

            if (p.photos.length) {
                tl.fromTo(
                    p.photos,
                    { scale: 1.35, autoAlpha: 0 },
                    { scale: 1.08, autoAlpha: 1, duration: 2.4 },
                    0,
                );
            }

            if (p.chars.length) {
                tl.from(
                    p.chars,
                    {
                        yPercent: 125,
                        rotationX: -85,
                        autoAlpha: 0,
                        transformPerspective: 700,
                        transformOrigin: "50% 100%",
                        duration: 1.4,
                        stagger: 0.05,
                    },
                    T,
                );
            }

            if (p.lastWords.length) {
                tl.from(
                    p.lastWords,
                    {
                        yPercent: 115,
                        rotate: 5,
                        autoAlpha: 0,
                        duration: 1.2,
                        stagger: 0.09,
                    },
                    T,
                );
            }

            if (p.introWords.length) {
                tl.from(
                    p.introWords,
                    {
                        yPercent: 115,
                        rotate: 3,
                        autoAlpha: 0,
                        duration: 1,
                        stagger: 0.02,
                    },
                    T,
                );
            }

            if (p.items.length) {
                tl.fromTo(
                    p.items,
                    { autoAlpha: 0, y: 26 },
                    { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.05 },
                    T,
                );
            }

            if (p.plus.length) {
                tl.fromTo(
                    p.plus,
                    { autoAlpha: 0, scale: 0, rotate: 90 },
                    {
                        autoAlpha: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 1.2,
                        ease: "back.out(2)",
                        stagger: 0.1,
                    },
                    T,
                );
            }

            if (p.header) {
                tl.from(p.header, { yPercent: -100, duration: 1.2 }, T);
                if (p.navItems.length) {
                    tl.from(
                        p.navItems,
                        {
                            y: -16,
                            opacity: 0,
                            duration: 0.9,
                            stagger: 0.05,
                            clearProps: "opacity,transform",
                        },
                        T,
                    );
                }
            }

            tl.add(() => finishIntro(), 1.4);
            return tl;
        }
        // Parallax mouse: tiap lapisan bergerak dengan kedalaman berbeda
        function initHeroMouse() {
            if (!hero || !fine) return;

            const layers = [];
            const add = (els, depth) =>
                els.forEach((el) => {
                    layers.push({
                        depth,
                        x: gsap.quickTo(el, "x", {
                            duration: 1.2,
                            ease: "power3.out",
                        }),
                        y: gsap.quickTo(el, "y", {
                            duration: 1.2,
                            ease: "power3.out",
                        }),
                    });
                });

            add(hero.photos, -26);
            add($$(".hero-fx__name", hero.el), 12);
            add(hero.plus, 38);
            add($$(".hero-fx__card", hero.el), -10);

            hero.el.addEventListener(
                "pointermove",
                (e) => {
                    if (e.pointerType !== "mouse") return;
                    const nx = e.clientX / innerWidth - 0.5;
                    const ny = e.clientY / innerHeight - 0.5;
                    layers.forEach((l) => {
                        l.x(nx * l.depth);
                        l.y(ny * l.depth * 0.6);
                    });
                },
                { passive: true },
            );
        }

        /* =================================================
           Kecepatan scroll (dipakai marquee & skew)
           ================================================= */
        function initScrollVelocity() {
            ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    S.dir = self.direction || S.dir;
                    S.vel = self.getVelocity();
                },
            });
        }

        /* =================================================
           05. HEADING, REVEAL, TIMELINE, COUNTER
           ================================================= */
        function initHeadings() {
            const reveal = (host, title, small, intro) => {
                const words = title ? splitWords(title) : [];
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: host,
                        start: "top 86%",
                        end: "max",
                        once: true,
                    },
                    defaults: { ease: "expo.out" },
                });

                if (words.length)
                    tl.from(
                        words,
                        {
                            yPercent: 115,
                            rotate: 5,
                            duration: 1.15,
                            stagger: 0.07,
                        },
                        0,
                    );
                if (small)
                    tl.from(small, { autoAlpha: 0, y: 14, duration: 0.8 }, 0);
                if (intro)
                    tl.from(
                        intro,
                        { autoAlpha: 0, y: 22, duration: 0.95 },
                        0.25,
                    );
            };

            $$(".section-heading").forEach((h) => {
                reveal(
                    h,
                    $("h2", h),
                    $(".eyebrow, .section-eyebrow", h),
                    $(".section-intro, .section-description", h),
                );
            });

            $$(".contact-panel h2").forEach((h) => reveal(h, h, null, null));
        }

        function initReveals() {
            const clear = "transform,opacity,visibility,transition";

            const batch = (sel, from) => {
                const els = $$(sel);
                if (!els.length) return;

                // 'transition: none' supaya CSS transition tidak menahan animasi GSAP
                gsap.set(els, { autoAlpha: 0, transition: "none", ...from });

                ScrollTrigger.batch(els, {
                    start: "top 91%",
                    end: "max",
                    once: true,
                    onEnter: (items) =>
                        gsap.to(items, {
                            autoAlpha: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                            rotateX: 0,
                            duration: 1.1,
                            ease: "expo.out",
                            stagger: 0.1,
                            clearProps: clear,
                            overwrite: true,
                        }),
                });
            };

            batch(".pc-card, .project-card", {
                y: 70,
                rotateX: -6,
                transformPerspective: 900,
            });
            batch(".skill-card", { y: 60 });
            batch(".about-main, .about-side", { y: 50 });
            batch(".timeline-column", { y: 50 });
            batch(".certificate-slider-wrapper", { y: 60 });
            batch(".contact-panel", { y: 60, scale: 0.96 });

            // Screenshot proyek: zoom-out pelan saat kartu muncul
            $$(".pc-shot > img").forEach((img) => {
                gsap.set(img, { scale: 1.3, transition: "none" });
                ScrollTrigger.create({
                    trigger: img.closest(".pc-card") || img,
                    start: "top 90%",
                    end: "max",
                    once: true,
                    onEnter: () =>
                        gsap.to(img, {
                            scale: 1,
                            duration: 1.9,
                            ease: "expo.out",
                            clearProps: "transform,transition",
                        }),
                });
            });

            // Chip teknologi muncul satu-satu
            $$(".skill-card").forEach((card) => {
                const chips = $$(".tech-item", card);
                if (!chips.length) return;
                gsap.set(chips, { autoAlpha: 0, y: 12, transition: "none" });
                ScrollTrigger.create({
                    trigger: card,
                    start: "top 85%",
                    end: "max",
                    once: true,
                    onEnter: () =>
                        gsap.to(chips, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.7,
                            ease: "power3.out",
                            stagger: 0.035,
                            delay: 0.25,
                            clearProps: clear,
                        }),
                });
            });

            // Daftar di About
            $$(".about-side").forEach((side) => {
                const li = $$("li", side);
                if (!li.length) return;
                gsap.set(li, { autoAlpha: 0, x: -18 });
                ScrollTrigger.create({
                    trigger: side,
                    start: "top 85%",
                    end: "max",
                    once: true,
                    onEnter: () =>
                        gsap.to(li, {
                            autoAlpha: 1,
                            x: 0,
                            duration: 0.8,
                            ease: "power3.out",
                            stagger: 0.08,
                            delay: 0.3,
                            clearProps: "transform,opacity,visibility",
                        }),
                });
            });
        }

        // Garis timeline "tergambar" mengikuti scroll (CSS membaca --p)
        function initTimeline() {
            $$(".timeline-grid .timeline-item").forEach((item) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top 78%",
                    end: "bottom 55%",
                    onEnter: () => item.classList.add("is-in"),
                    onUpdate: (self) => {
                        item.style.setProperty("--p", self.progress.toFixed(3));
                        if (self.progress > 0) item.classList.add("is-in");
                    },
                });
            });
        }

        // Cahaya latar section bergeser mengikuti scroll (CSS membaca --gy)
        function initGlow() {
            const secs = new Set(
                $$(
                    "#skills, .skills-section, #certificate, .certificate-section, #contact, #about, #experience",
                ),
            );
            secs.forEach((sec) => {
                ScrollTrigger.create({
                    trigger: sec,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) =>
                        sec.style.setProperty(
                            "--gy",
                            (self.progress * 100).toFixed(1) + "%",
                        ),
                });
            });
        }

        function initCounters() {
            $$(".pc-card .project-metric strong").forEach((s) => {
                const m = s.textContent.trim().match(/^([\d.,]+)(.*)$/);
                if (!m) return;

                const raw = m[1].replace(",", ".");
                const target = parseFloat(raw);
                if (Number.isNaN(target)) return;

                const dec = (raw.split(".")[1] || "").length;
                const suffix = m[2];
                const o = { v: 0 };

                s.textContent = (0).toFixed(dec) + suffix;

                ScrollTrigger.create({
                    trigger: s,
                    start: "top 92%",
                    end: "max",
                    once: true,
                    onEnter: () =>
                        gsap.to(o, {
                            v: target,
                            duration: 2.2,
                            ease: "power3.out",
                            onUpdate: () => {
                                s.textContent = o.v.toFixed(dec) + suffix;
                            },
                        }),
                });
            });
        }

        /* =================================================
           06. KARTU: spotlight + tilt 3D
           ================================================= */
        function initCards() {
            const spot =
                ".skill-card, .pc-card, .about-main, .about-side, .timeline-column, .contact-panel, .certificate-card";
            const tilt =
                ".skill-card, .pc-card, .certificate-card, .about-side";

            $$(spot).forEach((el) => el.classList.add("fx-spot"));
            if (fine) $$(tilt).forEach((el) => el.classList.add("fx-tilt"));

            let active = null;
            const reset = (el) => {
                el.style.setProperty("--rx", "0deg");
                el.style.setProperty("--ry", "0deg");
            };

            document.addEventListener(
                "pointermove",
                (e) => {
                    if (e.pointerType !== "mouse") return;

                    const card =
                        e.target instanceof Element
                            ? e.target.closest(".fx-spot")
                            : null;
                    if (active && active !== card) reset(active);
                    active = card;
                    if (!card) return;

                    const r = card.getBoundingClientRect();
                    const x = e.clientX - r.left;
                    const y = e.clientY - r.top;

                    card.style.setProperty("--mx", x + "px");
                    card.style.setProperty("--my", y + "px");

                    if (card.classList.contains("fx-tilt")) {
                        card.style.setProperty(
                            "--ry",
                            ((x / r.width - 0.5) * 10).toFixed(2) + "deg",
                        );
                        card.style.setProperty(
                            "--rx",
                            ((0.5 - y / r.height) * 8).toFixed(2) + "deg",
                        );
                    }
                },
                { passive: true },
            );

            document.addEventListener(
                "pointerleave",
                () => {
                    if (active) reset(active);
                },
                true,
            );
        }

        /* =================================================
           07. SKILLS: marquee + bola tag 3D
           ================================================= */
        function techNames(sec) {
            return Array.from(
                new Set(
                    $$(".tech-item", sec)
                        .map((n) => n.textContent.replace(/\s+/g, " ").trim())
                        .filter(Boolean),
                ),
            );
        }

        function initMarquee() {
            const sec = $(".skills-section") || $("#skills");
            if (!sec || !FEATURES.marquee) return;

            let words = ["Software Development", "AI Agent"];
            words = words.filter((v, i, a) => a.indexOf(v) === i).slice(0, 14);
            if (words.length < 8) words = words.concat(words);

            const band = make("div", "cine-marquee");
            band.setAttribute("aria-hidden", "true");
            const track = make("div", "cine-marquee__track");

            const group = () => {
                const g = make("div", "cine-marquee__group");
                words.forEach((w) =>
                    g.appendChild(make("span", "cine-marquee__item", w)),
                );
                return g;
            };

            track.append(group(), group());
            band.appendChild(track);
            ($(".container", sec) || sec).appendChild(band);

            const tween = gsap.to(track, {
                xPercent: -50,
                ease: "none",
                duration: Math.max(20, words.length * 2.4),
                repeat: -1,
            });

            // makin kencang saat scroll, arah ikut arah scroll
            gsap.ticker.add(() => {
                const boost = Math.min(Math.abs(S.vel) / 280, 6);
                const target = S.dir * (1 + boost);
                tween.timeScale(
                    tween.timeScale() + (target - tween.timeScale()) * 0.08,
                );
            });
        }

        function initSphere() {
            return;

            const names = techNames(sec).slice(0, 28);
            if (names.length < 8) return;

            const box = make("div", "cine-sphere");
            box.setAttribute("aria-hidden", "true");

            const tags = names.map((n) => {
                const t = make("span", "cine-sphere__tag", n);
                box.appendChild(t);
                return t;
            });
            box.appendChild(
                make("span", "cine-sphere__hint", "DRAG TO ROTATE"),
            );

            const grid = $(".skills-grid", sec);
            if (grid) grid.after(box);
            else ($(".container", sec) || sec).appendChild(box);

            // titik tersebar merata di permukaan bola (spiral Fibonacci)
            const N = tags.length;
            const pts = tags.map((_, i) => {
                const y = 1 - (i / (N - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const phi = i * Math.PI * (3 - Math.sqrt(5));
                return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
            });

            let ax = 0.3,
                ay = 0,
                spinX = 0,
                spinY = 0.004;
            let R = 0,
                drag = false,
                lx = 0,
                ly = 0,
                visible = false,
                hover = null;

            const size = () => {
                R = box.clientWidth * 0.36;
            };
            size();
            addEventListener("resize", size);

            box.addEventListener("pointerdown", (e) => {
                drag = true;
                lx = e.clientX;
                ly = e.clientY;
                try {
                    box.setPointerCapture(e.pointerId);
                } catch (_) {}
            });
            box.addEventListener("pointermove", (e) => {
                if (drag) {
                    spinY = (e.clientX - lx) * 0.006;
                    spinX = -(e.clientY - ly) * 0.006;
                    lx = e.clientX;
                    ly = e.clientY;
                } else if (e.pointerType === "mouse") {
                    const r = box.getBoundingClientRect();
                    hover = { x: (e.clientX - r.left) / r.width - 0.5 };
                }
            });
            const up = () => {
                drag = false;
            };
            box.addEventListener("pointerup", up);
            box.addEventListener("pointercancel", up);
            box.addEventListener("pointerleave", () => {
                hover = null;
            });

            new IntersectionObserver(([e]) => {
                visible = e.isIntersecting;
            }).observe(box);

            const draw = () => {
                const cx = Math.cos(ax),
                    sx = Math.sin(ax);
                const cy = Math.cos(ay),
                    sy = Math.sin(ay);

                tags.forEach((t, i) => {
                    const p = pts[i];
                    const x1 = p.x * cy + p.z * sy;
                    const z1 = -p.x * sy + p.z * cy;
                    const y2 = p.y * cx - z1 * sx;
                    const z2 = p.y * sx + z1 * cx;
                    const depth = (z2 + 1) / 2;

                    t.style.transform = `translate(-50%, -50%) translate3d(${(x1 * R).toFixed(1)}px, ${(y2 * R).toFixed(1)}px, 0) scale(${(0.62 + 0.5 * depth).toFixed(3)})`;
                    t.style.opacity = (0.18 + 0.82 * depth).toFixed(2);
                    t.style.zIndex = String(Math.round(depth * 100));
                    t.classList.toggle("is-front", z2 > 0.55);
                });
            };

            draw();

            gsap.ticker.add(() => {
                if (!visible) return;

                if (drag) {
                    spinY *= 0.8;
                    spinX *= 0.8;
                } else {
                    const base = 0.004 + (hover ? hover.x * 0.01 : 0);
                    spinY += (base - spinY) * 0.04;
                    spinX += (0 - spinX) * 0.06;
                    ax += (0.3 - ax) * 0.01;
                }

                ay += spinY;
                ax = clamp(ax + spinX, -1.1, 1.1);
                draw();
            });
        }

        /* =================================================
           Kemiringan halus saat scroll cepat
           ================================================= */
        function initSkew() {
            if (!FEATURES.skew) return;

            const targets = $$(
                ".pc-grid, .skills-grid, .certificate-slider-wrapper",
            );
            if (!targets.length) return;

            const setters = targets.map((el) =>
                gsap.quickTo(el, "skewY", {
                    duration: 0.5,
                    ease: "power3.out",
                }),
            );

            gsap.ticker.add(() => {
                const v = clamp(S.vel / -420, -1.3, 1.3);
                setters.forEach((s) => s(v));
            });
        }

        /* =================================================
           08. NAVBAR, ANCHOR, MODAL, KURSOR, MAGNET
           ================================================= */
        function initNav() {
            const header = $(".site-header");
            if (!header) return;

            const menu = $("#nav-menu");
            let hidden = false,
                dir = 0,
                acc = 0,
                lastY = scrollY;

            const hide = () => {
                if (hidden) return;
                hidden = true;
                gsap.to(header, {
                    yPercent: -100,
                    duration: 0.7,
                    ease: "expo.inOut",
                    overwrite: "auto",
                });
            };
            const show = () => {
                if (!hidden) return;
                hidden = false;
                gsap.to(header, {
                    yPercent: 0,
                    duration: 0.8,
                    ease: "expo.out",
                    overwrite: "auto",
                });
            };

            addEventListener(
                "scroll",
                () => {
                    const y = scrollY;
                    const dy = y - lastY;
                    lastY = y;

                    if (Math.sign(dy) !== dir) {
                        dir = Math.sign(dy);
                        acc = 0;
                    }
                    acc += Math.abs(dy);

                    const open = menu && menu.classList.contains("is-open");
                    if (y < 80 || open) return show();

                    if (dir > 0 && acc > 40) hide();
                    else if (dir < 0 && acc > 20) show();
                },
                { passive: true },
            );

            // tautan menu aktif mengikuti section
            $$('.nav-links a[href^="#"]').forEach((link) => {
                let sec = null;
                try {
                    sec = $(link.getAttribute("href"));
                } catch (_) {
                    return;
                }
                if (!sec || link.getAttribute("href") === "#home") return;

                ScrollTrigger.create({
                    trigger: sec,
                    start: "top 55%",
                    end: "bottom 55%",
                    onToggle: (self) =>
                        link.classList.toggle("is-active", self.isActive),
                });
            });
        }

        function initAnchors() {
            document.addEventListener("click", (e) => {
                if (
                    e.defaultPrevented ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey
                )
                    return;
                const a =
                    e.target instanceof Element
                        ? e.target.closest('a[href^="#"]')
                        : null;
                if (!a) return;

                const id = a.getAttribute("href");
                let target = null;

                if (id === "#" || id === "#home") {
                    target = 0;
                } else {
                    try {
                        target = $(id);
                    } catch (_) {
                        return;
                    }
                    if (!target) return;
                }

                e.preventDefault();

                if (lenis)
                    lenis.scrollTo(target, {
                        offset: target === 0 ? 0 : -72,
                        duration: 1.5,
                    });
                else if (target === 0) scrollTo({ top: 0, behavior: "smooth" });
                else target.scrollIntoView({ behavior: "smooth" });
            });
        }

        // Kunci scroll halaman saat modal terbuka + sembunyikan kursor custom
        function initModals() {
            const sync = () => {
                const open = !!$("dialog[open]");
                S.modal = open;
                root.classList.toggle("pm-open", open);
                root.classList.toggle("cine-cursor-off", open);
                if (lenis && S.introDone) open ? lenis.stop() : lenis.start();
            };

            new MutationObserver(sync).observe(document.body, {
                subtree: true,
                attributes: true,
                attributeFilter: ["open"],
            });
        }

        function initCursor() {
            if (!fine || !FEATURES.cursor) return;

            const dot = make("i", "cine-cur-dot");
            const ring = make("i", "cine-cur-ring");
            ring.appendChild(make("b"));
            const tag = make("span", "cine-cur-tag");
            document.body.append(ring, dot, tag);

            root.classList.add("cine-cursor");

            let tx = -100,
                ty = -100,
                rx = -100,
                ry = -100,
                on = false;
            let lanyard = false,
                label = "";

            const apply = (link) => {
                const text = lanyard ? "DRAG" : label;
                ring.classList.toggle("is-link", link && !text);
                ring.classList.toggle("has-label", !!text);
                tag.textContent = text;
                tag.classList.toggle("is-on", !!text);
            };

            addEventListener(
                "pointermove",
                (e) => {
                    if (e.pointerType !== "mouse") return;

                    tx = e.clientX;
                    ty = e.clientY;
                    if (!on) {
                        on = true;
                        rx = tx;
                        ry = ty;
                        [dot, ring, tag].forEach((n) =>
                            n.classList.add("is-on-base"),
                        );
                    }

                    const t = e.target instanceof Element ? e.target : null;
                    if (!t) return;

                    const link = !!t.closest(
                        'a, button, summary, [role="button"], [data-cursor]',
                    );

                    label = "";
                    if (!link) {
                        if (t.closest(".pc-card")) label = "VIEW";
                        else if (t.closest(".certificate-card")) label = "ZOOM";
                        else if (t.closest(".cine-sphere")) label = "DRAG";
                    }
                    apply(link);
                },
                { passive: true },
            );

            addEventListener("lanyard:hover", (e) => {
                lanyard = !!e.detail;
                apply(false);
            });
            addEventListener("lanyard:drag", (e) =>
                ring.classList.toggle("is-down", !!e.detail),
            );

            document.addEventListener("mouseleave", () => {
                [dot, ring, tag].forEach((n) =>
                    n.classList.remove("is-on-base"),
                );
                on = false;
            });

            gsap.ticker.add(() => {
                rx += (tx - rx) * 0.2;
                ry += (ty - ry) * 0.2;
                dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
                ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
                tag.style.transform = `translate3d(${rx + 26}px, ${ry + 18}px, 0)`;
            });
        }

        function initMagnetic() {
            if (!fine || !FEATURES.magnetic) return;

            $$(
                ".button, .nav-contact, .hero-fx__cta, .hero-fx__resume, .back-to-top, .contact-email",
            ).forEach((el) => {
                const xTo = gsap.quickTo(el, "x", {
                    duration: 0.6,
                    ease: "power3.out",
                });
                const yTo = gsap.quickTo(el, "y", {
                    duration: 0.6,
                    ease: "power3.out",
                });

                el.addEventListener("pointermove", (e) => {
                    if (e.pointerType !== "mouse") return;
                    const r = el.getBoundingClientRect();
                    xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
                    yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
                });
                el.addEventListener("pointerleave", () => {
                    xTo(0);
                    yTo(0);
                });
            });
        }
    }
})();
