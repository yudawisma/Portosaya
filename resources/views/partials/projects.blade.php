@php
/*
|--------------------------------------------------------------------------
| DATA PROYEK
|--------------------------------------------------------------------------
| youtube : isi dengan ID video saja (bagian setelah ?v=), contoh 'dQw4w9WgXcQ'
| github  : URL repo, isi null jika tidak ada
| live    : URL website yang sudah online, isi null jika tidak ada
| gallery : daftar screenshot (path di dalam folder public/)
| card    : true = tampil sebagai kartu, false = hanya di bagian "More work"
*/
$projects = [
    [
        'id'       => 'ssreport',
        'card'     => true,
        'featured' => true,
        'title'    => 'SSREPORT',
        'heading'  => 'Srengseng Sawah Report',
        'category' => 'WEB APPLICATION',
        'label'    => 'CIVIC TECH / 01',
        'cover'    => 'img/ss.jpg',
        'summary'  => 'Platform pengaduan masyarakat berbasis web. Pengembangan mencakup alur aplikasi, database, pengujian API, dan deployment sesuai kebutuhan proyek.',
        'description' => 'Website pengaduan masyarakat untuk membantu warga menyampaikan aspirasi dan laporan secara online. Pengembangan mencakup antarmuka, backend, revisi fitur, dan deployment.',
        'tags'     => ['Laravel', 'Bootstrap', 'MySQL'],
        'tech'     => ['Laravel', 'Bootstrap', 'MySQL', 'Full-Stack Development'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/ssr.png', 'img/ss.jpg'],
    ],
    [
        'id'       => 'ai-agent',
        'card'     => true,
        'title'    => 'AI Agent Automation',
        'heading'  => 'AI Agent & Workflow Automation',
        'category' => 'AI & AUTOMATION',
        'cover'    => 'img/ai-agent.png',
        'summary'  => 'Workflow automation menggunakan n8n, Google Gemini API, dan webhook untuk memproses input multimodal.',
        'description' => 'Pengembangan chatbot AI yang memanfaatkan model AI dan workflow automation untuk memproses percakapan teks, audio, serta transkripsi suara.',
        'tags'     => ['n8n', 'Gemini API', 'Webhook'],
        'tech'     => ['AI Agent', 'Google Gemini', 'n8n', 'Webhook', 'Automation'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/ai-agent.png'],
    ],
    [
        'id'       => 'bisindo',
        'card'     => true,
        'title'    => 'BISINDO Recognition',
        'heading'  => 'Sistem Pengenalan Alfabet BISINDO secara Real-Time',
        'category' => 'COMPUTER VISION',
        'cover'    => 'img/skripsi-bisindo.png',
        'summary'  => 'Sistem pengenalan alfabet BISINDO secara real-time dengan integrasi MediaPipe Hands dan CNN.',
        'description' => 'Proyek skripsi untuk mengenali alfabet Bahasa Isyarat Indonesia (BISINDO) melalui webcam. Sistem mengintegrasikan MediaPipe Hands untuk deteksi tangan dan Convolutional Neural Network (CNN) untuk klasifikasi alfabet.',
        'metric'   => ['73.08%', 'Akurasi validasi model'],
        'tags'     => ['Python', 'CNN', 'MediaPipe'],
        'tech'     => ['Python', 'MediaPipe Hands', 'CNN', 'OpenCV', 'Computer Vision'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/skripsi-bisindo.png'],
    ],
    [
        'id'       => 'certificate',
        'card'     => true,
        'title'    => 'Certificate Generator',
        'heading'  => 'Certificate Generator',
        'category' => 'WEB DEVELOPMENT',
        'cover'    => 'img/sert.jpg',
        'summary'  => 'Pengembangan modul frontend aplikasi generator sertifikat bersama tim dalam program virtual internship.',
        'description' => 'Aplikasi web untuk membantu proses pembuatan sertifikat digital berdasarkan data peserta secara lebih praktis. Saya mengerjakan modul frontend bersama tim dalam program virtual internship.',
        'tags'     => ['Laravel', 'Bootstrap 5', 'Figma'],
        'tech'     => ['Laravel', 'Bootstrap 5', 'Figma'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/template.jpg', 'img/sert.jpg'],
    ],
    [
        'id'       => 'wisatani',
        'card'     => true,
        'title'    => 'WisaTani',
        'heading'  => 'WisaTani',
        'category' => 'AGRICULTURE & TOURISM',
        'cover'    => 'img/wt.png',
        'summary'  => 'Perancangan UI responsif dan integrasi komponen frontend dengan RESTful API backend.',
        'description' => 'Platform digital yang menggabungkan informasi agrowisata, produk pertanian, dan kegiatan edukasi. Saya merancang UI responsif dan mengintegrasikan komponen frontend dengan RESTful API backend.',
        'tags'     => ['Frontend', 'REST API', 'Responsive UI'],
        'tech'     => ['Laravel', 'Frontend', 'REST API', 'Responsive UI'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/agr.png', 'img/wt.png'],
    ],
    [
        'id'       => 'laporpak',
        'card'     => true,
        'title'    => 'LaporPak',
        'heading'  => 'LaporPak',
        'category' => 'CIVIC / TOURISM',
        'cover'    => 'img/lp.png',
        'summary'  => 'Platform pengaduan berbasis web untuk studi kasus agrowisata dan pariwisata daerah.',
        'description' => 'Aplikasi pelaporan masyarakat dengan antarmuka web dan fitur pengelolaan laporan untuk membantu proses pencatatan serta pemantauan laporan.',
        'tags'     => ['Web', 'UI Development'],
        'tech'     => ['React', 'TypeScript', 'Express.js'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/dlp.png', 'img/lp.png'],
    ],

    // ---- Hanya muncul di baris "More work" ----
    [
        'id'       => 'iquiz',
        'card'     => false,
        'title'    => 'iQuiz',
        'heading'  => 'iQuiz',
        'category' => 'MOBILE APPLICATION',
        'description' => 'Aplikasi kuis edukatif berbasis Flutter dengan backend Laravel dan integrasi AI Agent untuk mendukung pengalaman pembelajaran interaktif.',
        'tech'     => ['Flutter', 'Laravel', 'AI Agent'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/qu.png'],
    ],
    [
        'id'       => 'siba',
        'card'     => false,
        'title'    => 'SIBa',
        'heading'  => 'SIBa',
        'category' => 'COMMUNITY PLATFORM',
        'description' => 'Website untuk mendukung kegiatan organisasi dan pembelajaran masyarakat.',
        'tech'     => ['Bootstrap', 'Laravel'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/sb.jpg'],
    ],
    [
        'id'       => 'laporsambah',
        'card'     => false,
        'title'    => 'LaporSambah',
        'heading'  => 'LaporSambah — Bank Sampah',
        'category' => 'ENVIRONMENTAL WEB APP',
        'description' => 'Platform berbasis web untuk mendukung pengelolaan bank sampah. Sesuaikan deskripsi ini dengan fitur yang benar-benar ada, misalnya pencatatan setoran sampah, data nasabah, atau pengelolaan transaksi.',
        'tech'     => ['Web Development', 'Bank Sampah'],
        'youtube'  => null,
        'github'   => null,
        'live'     => null,
        'gallery'  => ['img/laporsambah.png'],
    ],
];

$cards = array_values(array_filter($projects, fn ($p) => $p['card']));
$more  = array_values(array_filter($projects, fn ($p) => ! $p['card']));
@endphp

<section class="section container" id="projects">
    <div class="section-heading">
        <div>
            <p class="eyebrow">02 / SELECTED WORK</p>
            <h2>Projects that solve<br><span>real problems.</span></h2>
        </div>
        <p class="section-intro">
            Pilihan proyek yang merepresentasikan pengalaman saya
            dalam software development, AI automation, dan computer vision.
        </p>
    </div>

    {{-- ================= KARTU ================= --}}
    <div class="bento-grid">
        @foreach ($cards as $p)
            <article
                class="project-card {{ ! empty($p['featured']) ? 'project-featured' : '' }}"
                data-project-open="{{ $p['id'] }}">

                <div class="project-topline">
                    <span class="project-category">{{ $p['category'] }}</span>
                    <span class="project-number">
                        {{ str_pad($loop->iteration, 2, '0', STR_PAD_LEFT) }}{{ $loop->first ? ' / ' . str_pad(count($cards), 2, '0', STR_PAD_LEFT) : '' }}
                    </span>
                </div>

                <div class="project-art">
                    <img src="{{ asset($p['cover']) }}"
                         alt="Tampilan proyek {{ $p['title'] }}"
                         loading="lazy">

                    @if (! empty($p['youtube']))
                        <span class="art-badge"><i class="fa-solid fa-play"></i> VIDEO DEMO</span>
                    @endif

                    @if (! empty($p['label']))
                        <span class="art-label">{{ $p['label'] }}</span>
                    @endif
                </div>

                <div class="project-body">
                    <div class="project-title-row">
                        <h3>{{ $p['title'] }}</h3>
                        <span class="project-arrow">↗</span>
                    </div>

                    <p>{{ $p['summary'] }}</p>

                    @if (! empty($p['metric']))
                        <div class="project-metric">
                            <strong>{{ $p['metric'][0] }}</strong>
                            <span>{{ $p['metric'][1] }}</span>
                        </div>
                    @endif

                    <div class="tag-list">
                        @foreach ($p['tags'] as $tag)
                            <span>{{ $tag }}</span>
                        @endforeach
                    </div>

                    <button type="button" class="text-link project-detail-btn"
                            data-project-open="{{ $p['id'] }}">
                        Lihat detail ↗
                    </button>
                </div>
            </article>
        @endforeach
    </div>

    <p class="projects-footnote">
        More work:
        @foreach ($more as $m)
            <button type="button" class="footnote-link" data-project-open="{{ $m['id'] }}">{{ $m['title'] }}</button>@if (! $loop->last) · @endif
        @endforeach
    </p>

    {{-- ================= MODAL DETAIL ================= --}}
    @foreach ($projects as $p)
        @php
            $slides = [];
            if (! empty($p['youtube'])) {
                $slides[] = ['type' => 'video', 'id' => $p['youtube']];
            }
            foreach ($p['gallery'] ?? [] as $img) {
                $slides[] = ['type' => 'image', 'src' => $img];
            }
        @endphp

        <dialog class="pm" id="pm-{{ $p['id'] }}"
                aria-labelledby="pm-title-{{ $p['id'] }}" data-lenis-prevent>
            <div class="pm-shell">
                <header class="pm-header">
                    <div>
                        <span class="pm-label">{{ $p['category'] }}</span>
                        <h3 class="pm-title" id="pm-title-{{ $p['id'] }}">{{ $p['title'] }}</h3>
                    </div>
                    <button type="button" class="pm-close" data-pm-close aria-label="Tutup">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </header>

                <div class="pm-body" data-lenis-prevent>
                    {{-- MEDIA --}}
                    <div class="pm-media">
                        <div class="pm-stage">
                            @foreach ($slides as $i => $s)
                                @if ($s['type'] === 'video')
                                    <div class="pm-slide pm-slide-video" data-slide="{{ $i }}"
                                         data-youtube="{{ $s['id'] }}" {{ $i > 0 ? 'hidden' : '' }}>
                                        <img src="https://img.youtube.com/vi/{{ $s['id'] }}/hqdefault.jpg"
                                             alt="Thumbnail video demo {{ $p['title'] }}">
                                        <button type="button" class="pm-play" data-pm-play
                                                aria-label="Putar video demo {{ $p['title'] }}">
                                            <i class="fa-solid fa-play"></i>
                                        </button>
                                    </div>
                                @else
                                    <div class="pm-slide" data-slide="{{ $i }}" {{ $i > 0 ? 'hidden' : '' }}>
                                        <img src="{{ asset($s['src']) }}"
                                             alt="Screenshot {{ $p['title'] }}"
                                             loading="lazy">
                                    </div>
                                @endif
                            @endforeach
                        </div>

                        @if (count($slides) > 1)
                            <div class="pm-thumbs">
                                @foreach ($slides as $i => $s)
                                    <button type="button"
                                            class="pm-thumb {{ $i === 0 ? 'is-active' : '' }} {{ $s['type'] === 'video' ? 'is-video' : '' }}"
                                            data-thumb="{{ $i }}"
                                            aria-label="{{ $s['type'] === 'video' ? 'Video demo' : 'Gambar ' . $i }}">
                                        <img src="{{ $s['type'] === 'video'
                                            ? 'https://img.youtube.com/vi/' . $s['id'] . '/default.jpg'
                                            : asset($s['src']) }}" alt="" loading="lazy">
                                        @if ($s['type'] === 'video')
                                            <i class="fa-solid fa-play"></i>
                                        @endif
                                    </button>
                                @endforeach
                            </div>
                        @endif
                    </div>

                    {{-- INFO --}}
                    <div class="pm-info">
                        <h4>{{ $p['heading'] }}</h4>
                        <p>{{ $p['description'] }}</p>

                        @if (! empty($p['metric']))
                            <div class="project-metric">
                                <strong>{{ $p['metric'][0] }}</strong>
                                <span>{{ $p['metric'][1] }}</span>
                            </div>
                        @endif

                        <div class="tag-list pm-tags">
                            @foreach ($p['tech'] as $t)
                                <span>{{ $t }}</span>
                            @endforeach
                        </div>

                        @if (! empty($p['youtube']) || ! empty($p['github']) || ! empty($p['live']))
                            <div class="pm-actions">
                                @if (! empty($p['youtube']))
                                    <a class="button button-primary"
                                       href="https://www.youtube.com/watch?v={{ $p['youtube'] }}"
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fa-brands fa-youtube"></i> Tonton Demo
                                    </a>
                                @endif
                                @if (! empty($p['live']))
                                    <a class="button button-secondary" href="{{ $p['live'] }}"
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fa-solid fa-arrow-up-right-from-square"></i> Live Site
                                    </a>
                                @endif
                                @if (! empty($p['github']))
                                    <a class="button button-secondary" href="{{ $p['github'] }}"
                                       target="_blank" rel="noopener noreferrer">
                                        <i class="fa-brands fa-github"></i> Source Code
                                    </a>
                                @endif
                            </div>
                        @endif
                    </div>
                </div>
            </div>
        </dialog>
    @endforeach
</section>