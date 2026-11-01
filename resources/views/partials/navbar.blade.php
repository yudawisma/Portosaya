<header class="site-header">
    <nav class="nav-shell" aria-label="Navigasi utama">

        <a href="#home" class="brand-link" aria-label="Kembali ke Home">
            <img
                class="brand"
                src="{{ asset('img/Y.png') }}"
                alt="Logo Yudha Wisma">
        </a>

        <button
            class="nav-toggle"
            type="button"
            aria-label="Buka navigasi"
            aria-expanded="false"
            aria-controls="nav-menu">
            <span></span>
            <span></span>
        </button>

        <div class="nav-menu" id="nav-menu">
            <div class="nav-links">
                <a href="#home">Home</a>
                <a href="#projects">Projects</a>
                <!-- <a href="#about">About</a> -->
                <a href="#skills">Skills</a>
                <a href="#experience">Experience</a>
                <a href="#certificate">Certificates</a>
            </div>

            <div class="nav-right">
                <div class="lang" data-lang>
                    <button type="button" class="lang__btn" data-lang-toggle
                        aria-haspopup="menu" aria-expanded="false"
                        aria-label="Pilih bahasa / Choose language">
                        <i class="fa-solid fa-globe" aria-hidden="true"></i>
                        <span data-lang-label>ID</span>
                    </button>

                    <div class="lang__menu" role="menu" data-lang-menu>
                        <button type="button" class="lang__opt" role="menuitemradio" data-lang-set="id">
                            <span>Indonesia</span><span class="lang__code">ID</span>
                        </button>
                        <button type="button" class="lang__opt" role="menuitemradio" data-lang-set="en">
                            <span>English</span><span class="lang__code">EN</span>
                        </button>
                    </div>
                </div>

                <a href="#contact" class="nav-contact">Contact ↗</a>
            </div>
        </div>

    </nav>
</header>