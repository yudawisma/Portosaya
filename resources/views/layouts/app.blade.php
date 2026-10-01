<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Yudha Wisma Wardani | Portfolio</title>

    <!-- Bootstrap CSS -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
    >

    <!-- Bootstrap Icons -->
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        rel="stylesheet"
    >

    <script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>

    <!-- AOS -->
    <link
        rel="stylesheet"
        href="https://unpkg.com/aos@next/dist/aos.css"
    >

    <!-- Swiper -->
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"
    >

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
    >

    <!-- Custom CSS -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">

    <style>
        html {
            scroll-behavior: smooth;
        }
    </style>

</head>

<body>

    {{-- Navbar --}}
    @include('partials.navbar')

    {{-- Main Content --}}
    <main>
        @yield('content')
    </main>

    {{-- Footer --}}
    @include('partials.footer')


    <!-- Bootstrap JS -->
    <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
    </script>

    <!-- AOS -->
    <script src="https://unpkg.com/aos@next/dist/aos.js"></script>

    <script>
        AOS.init({
            duration: 800,
            once: true
        });
    </script>

    <!-- Swiper -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <!-- Custom JS -->
    <script src="{{ asset('js/script.js') }}"></script>

</body>

</html>