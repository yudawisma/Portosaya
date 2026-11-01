/* =========================================================
   LANG SWITCHER  (ID <-> EN)
   - Bahasa sumber situs : Indonesia
   - Terjemahan otomatis : mesin Google Translate (tanpa tampilan bawaannya)
   - Script Google hanya dimuat saat pengunjung memilih English,
     jadi tidak membebani pengunjung berbahasa Indonesia.
   - Pilihan disimpan di localStorage ("site-lang").
   ========================================================= */
(() => {
    'use strict';

    const SOURCE = 'id';
    const KEY = 'site-lang';

    /* Bagian yang TIDAK boleh diterjemahkan (nama, istilah teknis, email, dll) */
    const NO_TRANSLATE = [
        '.brand',
        '.hero-fx__name',
        '.lang',
        '.tag-list',
        '.tech-list',
        '.tech-item',
        '.pc-chrome',
        '.pc-body h3',
        '.pm-title',
        '.footnote-link',
        '.contact-email',
        '.timeline-date',
        '.cine-marquee',
        'code',
        'pre',
    ];

    const root = document.documentElement;

    const store = {
        get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } },
        set(v) { try { localStorage.setItem(KEY, v); } catch (e) { /* abaikan */ } },
    };

    /* Bahasa aktif: dari <head> (inline script) -> localStorage -> bahasa sumber */
    let lang = root.dataset.lang || store.get() || SOURCE;
    if (lang !== 'en') lang = SOURCE;
    root.dataset.lang = lang;
    root.lang = lang;

    /* ---------- Cookie yang dibaca mesin Google ---------- */
    function setGoogCookie(value) {
        const host = location.hostname;
        const expire = value ? '' : ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        const domains = host.includes('.') ? [null, host, '.' + host] : [null];
        domains.forEach((d) => {
            document.cookie = `googtrans=${value};path=/${d ? ';domain=' + d : ''}${expire}`;
        });
    }

    /* ---------- Muat mesin terjemahan (hanya untuk English) ---------- */
    function loadGoogle() {
        const holder = document.createElement('div');
        holder.id = 'google_translate_element';
        holder.className = 'gt-holder';
        document.body.appendChild(holder);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: SOURCE, includedLanguages: 'en,id', autoDisplay: false },
                'google_translate_element'
            );
        };

        const s = document.createElement('script');
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        s.async = true;
        document.head.appendChild(s);
    }

    /* ---------- Tandai elemen yang tidak diterjemahkan ---------- */
    function markNoTranslate() {
        document.querySelectorAll(NO_TRANSLATE.join(',')).forEach((el) => {
            el.setAttribute('translate', 'no');
            el.classList.add('notranslate');
        });
    }

    /* ---------- Terjemahan manual: <p data-en="English text"> ----------
       Elemen dengan atribut data-en memakai teks Inggris buatanmu sendiri
       dan TIDAK diterjemahkan mesin (hasilnya lebih rapi untuk kalimat penting). */
    function applyManual() {
        document.querySelectorAll('[data-en]').forEach((el) => {
            el.setAttribute('translate', 'no');
            el.classList.add('notranslate');
            if (lang === 'en') el.innerHTML = el.dataset.en;
        });
    }

    /* ---------- Ganti bahasa ---------- */
    function setLang(next) {
        if (next === lang) return;
        store.set(next);
        setGoogCookie(next === 'en' ? `/${SOURCE}/en` : '');
        location.reload();
    }

    /* ---------- UI: satu klik langsung ganti bahasa ---------- */
    function initUI() {
        const btn = document.querySelector('.lang [data-lang-toggle]');
        if (!btn) return;

        btn.querySelectorAll('[data-code]').forEach((c) => {
            c.classList.toggle('is-on', c.dataset.code === lang);
        });

        const next = lang === 'en' ? 'id' : 'en';
        const text = next === 'en' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia';
        btn.setAttribute('aria-label', text);
        btn.title = text;

        btn.addEventListener('click', () => setLang(next));
    }

    /* ---------- Jalankan ---------- */
    function init() {
        markNoTranslate();
        applyManual();
        initUI();

        if (lang === 'en') {
            setGoogCookie(`/${SOURCE}/en`);
            loadGoogle();
        } else {
            setGoogCookie('');
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();