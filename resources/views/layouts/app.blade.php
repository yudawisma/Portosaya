<!DOCTYPE html>
<html lang="id" class="cine-pre">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#F5F7F5">
    <meta name="description" content="Portofolio Yudha Wisma Wardani — Software Development, AI Automation, dan Computer Vision.">

    <title>@yield('title', 'Yudha Wisma Wardani — Software Engineer')</title>
    <script src="{{ asset('js/projek.js') }}" defer></script>
    <script src="{{ asset('js/work.js') }}" defer></script>
    <script src="{{ asset('js/hooks.js') }}" defer></script>
    <script src="{{ asset('js/carousel.js') }}" defer></script>

   <noscript>
    <style>
        html.cine-pre .hero-fx,
        html.cine-pre .site-header { visibility: visible !important; }
        html.cine-pre, html.cine-pre body { background: #fffdf9 !important; }
    </style>
</noscript>


    <!-- FONT KHUSUS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&display=swap" rel="stylesheet">

    <link
        rel="stylesheet"
        href="https://unpkg.com/lenis@1.3.26/dist/lenis.css">

    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
    {{-- Three.js untuk lanyard 3D --}}
    <script type="module" src="{{ asset('js/lanyard3d.js') }}"></script>
    @stack('scripts')
    @stack('styles')

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

    <script
        src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js">
    </script>
</head>

<body>
    <div class="scroll-progress" aria-hidden="true"></div>
    <div
        class="lanyard-3d"
        id="lanyard3d"
        aria-label="Lanyard foto interaktif yang bisa ditarik">
    </div>
    @include('partials.navbar')

    <main id="main-content">
        @yield('content')
    </main>

    @include('partials.footer')

    {{-- GSAP --}}
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15/dist/ScrollTrigger.min.js"></script>

    {{-- Lenis --}}
    <script src="https://unpkg.com/lenis@1.3.26/dist/lenis.min.js"></script>

    {{-- Custom cinematic animation --}}
    <script src="{{ asset('js/cinematic.js') }}"></script>

    @stack('scripts')
</body>

</html>