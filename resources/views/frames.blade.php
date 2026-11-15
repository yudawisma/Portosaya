<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Frames - Chasing Waterfalls</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/frames.css') }}">
  <script>if(!matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("js")</script>
</head>
<body class="frames-page">
<div class="fr-progress" aria-hidden="true"></div>
<div class="fr-cursor" aria-hidden="true">Lihat</div>

@php
  $total = count($frames);
  $cover = $frames[0]['src'] ?? null;
@endphp

<header class="fr-hero">
  <video class="fr-hero__bg" autoplay muted loop playsinline preload="metadata"
       @if ($cover) poster="{{ asset('img/'.$cover) }}" @endif>
  <source src="{{ asset('video/vd.mp4') }}" type="video/mp4">
</video>

  <nav class="fr-nav" aria-label="Navigasi">
    <a href="{{ url('/') }}" class="fr-nav__brand">Kembali ke portfolio</a>
    <div class="fr-nav__links">
      <a href="{{ url('/') }}">Home</a>
      <a href="#gallery">Gallery</a>
      <a href="{{ url('/#contact') }}">Contact</a>
    </div>
  </nav>

  <div class="fr-hero__body">
    <h1 class="fr-hero__title" data-split>YDX - Sector</h1>
    <p class="fr-hero__sub">WATERFALL SERENITY</p>
    <span class="fr-hero__rule"></span>
  </div>

  <div class="fr-hero__foot">
    <p>Catatan dari air terjun yang pernah saya datangi, satu foto satu cerita.</p>
    <span class="fr-hero__count">{{ sprintf('%02d', $total) }} foto</span>
  </div>
</header>

@php
  $u = fn ($k) => isset($frames[$k]) ? asset('img/'.$frames[$k]['src']) : '';
  $notes = [
    'Suara air selalu lebih besar daripada yang terlihat di foto.',
    'Makin dekat ke air, makin basah kameranya.',
  ];
@endphp

<main id="gallery" class="fr-gallery">
  <section class="fr-intro">
    <p data-words>Aku suka air terjun <span class="fr-pill" style="background-image:url('{{ $u(1) }}')"></span>. Di sana semuanya berhenti sebentar <span class="fr-pill fr-pill--round" style="background-image:url('{{ $u(2) }}')"></span> dan yang terdengar cuma air.</p>
  </section>

  @foreach (collect($frames)->chunk(5) as $set => $chunk)
    <section class="fr-set {{ $set % 2 ? 'is-flip' : '' }}" aria-label="Galeri foto">
      @foreach ($chunk as $i => $f)
        @php
          $caption = trim(($f['place'] ?? '') . (!empty($f['year']) ? ', ' . $f['year'] : ''), ', ');
        @endphp
        <figure class="fr-card">
          <button type="button"
                  data-full="{{ asset('img/'.$f['src']) }}"
                  data-caption="{{ $caption }}"
                  aria-label="Perbesar foto {{ $i + 1 }}">
            <img src="{{ asset('img/'.$f['src']) }}"
                 alt="{{ $caption ?: 'Air terjun, foto '.($i + 1) }}"
                 loading="lazy" decoding="async">
          </button>
          @if ($caption)
            <figcaption>{{ $caption }}</figcaption>
          @endif
        </figure>
      @endforeach
    </section>
    @if (! $loop->last && isset($notes[$set]))
      <p class="fr-note">{{ $notes[$set] }}</p>
    @endif
  @endforeach
</main>

<footer class="fr-footer">
  <p>Air terjun berikutnya belum difoto.</p>
  <a href="{{ url('/') }}">Kembali ke portfolio</a>
</footer>

<div class="fr-lb" id="lightbox" role="dialog" aria-modal="true" aria-label="Pratinjau foto" hidden>
  <button type="button" class="fr-lb__btn fr-lb__close" data-lb="close" aria-label="Tutup">Tutup</button>
  <button type="button" class="fr-lb__btn fr-lb__prev" data-lb="prev" aria-label="Foto sebelumnya">Sebelumnya</button>
  <img alt="">
  <button type="button" class="fr-lb__btn fr-lb__next" data-lb="next" aria-label="Foto berikutnya">Berikutnya</button>
  <p class="fr-lb__cap"></p>
</div>

<script src="{{ asset('js/frames.js') }}" defer></script>
</body>
</html>