@php
/*
|--------------------------------------------------------------------------
| DATA PROYEK
|--------------------------------------------------------------------------
| Field wajib : id (unik), card, title, heading, category, description, gallery
| Field opsional (ada fallback otomatis): cover, summary, tags, tech,
|                metric, youtube, design, github, live
|
| gallery : isi sebanyak yang kamu mau. Foto juga otomatis diambil dari
|           folder public/img/projects/{id}/  (urut berdasarkan nama file)
| youtube : link YouTube apa saja (watch?v=, youtu.be, shorts) atau ID 11 karakter
| design  : link Figma / Stitch / Behance / Dribbble
| card    : true = tampil sebagai kartu, false = hanya di baris "Karya lain"
*/
$projects = [

    [
        'id' => 'bisindo',
        'card' => true,
        'title' => 'BISINDO Recognition',
        'heading' => 'Real-Time BISINDO Alphabet Recognition System',
        'category' => 'Computer Vision · Skripsi',
        'cover' => 'img/projects/bisindo/A.png',
        'summary' => 'Pengenalan alfabet Bahasa Isyarat Indonesia secara real-time melalui webcam, memakai MediaPipe Hands dan CNN.',
        'description' => 'Proyek skripsi yang berfokus pada perancangan dan implementasi sistem pengenalan alfabet BISINDO secara real-time melalui webcam. MediaPipe Hands digunakan untuk mendeteksi landmark tangan dan membantu preprocessing citra ke dalam Region of Interest (ROI). Citra hasil preprocessing digunakan untuk melatih model CNN yang mengklasifikasikan 26 kelas alfabet.',
        'metric' => ['73.08%', 'Validation accuracy'],
        'tags' => ['Python', 'MediaPipe', 'CNN', 'OpenCV'],
        'tech' => ['Python', 'TensorFlow / Keras', 'MediaPipe Hands', 'OpenCV', 'Convolutional Neural Network', 'Real-Time Recognition'],
        'gallery' => [],
        // 'youtube' => 'https://youtu.be/XXXXXXXXXXX',
        // 'github'  => 'https://github.com/yudawisma/bisindo',
    ],
    [
        'id' => 'lapor-brebes',
        'card' => true,
        'title' => 'Lapor Brebes',
        'heading' => 'Lapor Brebes — Public Complaint Platform',
        'category' => 'Fullstack · Civic Tech',
        'cover' => 'img/projects/lapor-brebes/1.png',
        'summary' => 'Platform pengaduan masyarakat Kabupaten Brebes: lapor tanpa akun, lacak tiket, dan pantau tindak lanjut.',
        'description' => 'Lapor Brebes membantu warga menyampaikan laporan tanpa harus membuat akun, melacak status tiket pengaduan, serta memantau tindak lanjutnya. Mencakup dashboard admin untuk verifikasi dan disposisi, peta sebaran pengaduan, serta statistik kinerja Organisasi Perangkat Daerah (OPD). Antarmuka responsif untuk desktop dan seluler.',
        'tags' => ['React', 'Laravel', 'Inertia', 'UI/UX'],
        'tech' => ['React', 'Laravel', 'Inertia', 'Stitch', 'User Flow', 'Dashboard Design', 'Data Visualization', 'Responsive Design'],
        'gallery' => [],
        // Foto tambahan: taruh di public/img/projects/lapor-brebes-uiux/ (1.png, 2.png, ...)
        // 'youtube' => 'https://youtu.be/XXXXXXXXXXX',
        // 'design'  => 'https://www.figma.com/design/xxxx',
        // 'github'  => 'https://github.com/yudawisma/lapor-brebes',
        // 'live'    => 'https://lapor-brebes.example.com',
    ],
    [
        'id' => 'ssreport',
        'card' => true,
        'title' => 'SSREPORT',
        'heading' => 'Srengseng Sawah Report',
        'category' => 'Web Application · Civic Tech',
        'cover' => 'img/projects/ssreport/55.png',
        'summary' => 'Platform pengaduan warga berbasis web, dari alur aplikasi, database, dan pengujian API sampai deployment.',
        'description' => 'Website pengaduan masyarakat untuk membantu warga menyampaikan aspirasi dan laporan secara online. Pengembangan mencakup antarmuka, backend, revisi fitur, dan deployment.',
        'tags' => ['Laravel', 'Bootstrap', 'MySQL'],
        'tech' => ['Laravel', 'Bootstrap', 'MySQL', 'Full-Stack Development'],
        'gallery' => [],
        'live'    => 'https://ssreport.my.id',
    ],
    [
        'id' => 'ai-agent',
        'card' => true,
        'title' => 'AI Agent Automation',
        'heading' => 'AI Agent & Workflow Automation',
        'category' => 'AI & Automation',
        'cover' => 'img/projects/ai-agent/2.png',
        'summary' => 'Chatbot dengan workflow n8n, Google Gemini API, dan webhook untuk memproses teks, audio, dan transkripsi suara.',
        'description' => 'Pengembangan chatbot AI yang memanfaatkan model AI dan workflow automation untuk memproses percakapan teks, audio, serta transkripsi suara.',
        'tags' => ['n8n', 'Gemini API', 'Webhook'],
        'tech' => ['AI Agent', 'Google Gemini', 'n8n', 'Webhook', 'Automation'],
        'gallery' => [],
    ],
    [
        'id' => 'siba',
        'card' => true,
        'title' => 'SIBa',
        'heading' => 'Sistem Informasi Manajemen Sekolah Ibu Bahagia',
        'category' => 'Information System · Web',
        'cover' => 'img/projects/siba/1.png',
        'summary' => 'Website manajemen Sekolah Ibu Bahagia: struktur organisasi, kurikulum, acara, aktivitas, dan pesan pengunjung.',
        'description' => 'Sistem Informasi Manajemen Sekolah Ibu Bahagia (SIBa) di Desa Sirampog, Kabupaten Brebes. Mendukung pengelolaan struktur organisasi dan kurikulum secara digital, acara dan aktivitas, form kontak pengunjung, serta dashboard statistik interaktif. Dikembangkan dengan Laravel 10 dan Bootstrap 5 memakai metode Waterfall.',
        'tags' => ['Laravel 10', 'Bootstrap 5', 'MySQL', 'Chart.js'],
        'tech' => ['Laravel 10', 'PHP', 'Bootstrap 5', 'MySQL', 'Chart.js', 'Role-Based Access Control'],
        'gallery' => [],
    ],
    [
        'id' => 'certificate',
        'card' => true,
        'title' => 'Certificate Generator',
        'heading' => 'Certificate Generator',
        'category' => 'Web Development · Internship',
        'cover' => 'img/sert.jpg',
        'summary' => 'Modul frontend aplikasi generator sertifikat digital, dikerjakan bersama tim di program virtual internship.',
        'description' => 'Aplikasi web untuk membantu proses pembuatan sertifikat digital berdasarkan data peserta secara lebih praktis. Saya mengerjakan modul frontend bersama tim dalam program virtual internship.',
        'tags' => ['Laravel', 'Bootstrap 5', 'Figma'],
        'tech' => ['Laravel', 'Bootstrap 5', 'Figma'],
        'gallery' => [],
        // 'design' => 'https://www.figma.com/design/xxxx',
    ],
    [
        'id' => 'wisatani',
        'card' => true,
        'title' => 'WisaTani',
        'heading' => 'WisaTani',
        'category' => 'Agriculture & Tourism',
        'cover' => 'img/wt.png',
        'summary' => 'UI responsif dan integrasi komponen frontend dengan RESTful API untuk platform agrowisata.',
        'description' => 'Platform digital yang menggabungkan informasi agrowisata, produk pertanian, dan kegiatan edukasi. Saya merancang UI responsif dan mengintegrasikan komponen frontend dengan RESTful API backend.',
        'tags' => ['Laravel', 'REST API', 'Responsive UI'],
        'tech' => ['Laravel', 'Frontend', 'REST API', 'Responsive UI'],
        'gallery' => [],    
    ],
    [
        'id' => 'laporpak',
        'card' => true,
        'title' => 'LaporPak',
        'heading' => 'LaporPak',        
        'category' => 'Civic · Tourism',
        'cover' => 'img/projects/laporpak/lp.png',
        'summary' => 'Platform pengaduan berbasis web untuk studi kasus agrowisata dan pariwisata daerah.',
        'description' => 'Aplikasi pelaporan masyarakat dengan antarmuka web dan fitur pengelolaan laporan untuk membantu pencatatan serta pemantauan laporan.',
        'tags' => ['React',  'Express.js'],
        'tech' => ['React',  'Express.js'],
        'gallery' => [],
    ],
    [
        'id' => 'iquiz',
        'card' => true,
        'title' => 'iQuiz',
        'heading' => 'iQuiz',
        'cover' => 'img/projects/iquiz/qu.png',
        'category' => 'Mobile Application',
        'summary' => 'Aplikasi kuis edukatif berbasis Flutter dengan backend Laravel ',
        'description' => 'Aplikasi kuis edukatif berbasis Flutter dengan backend Laravel  untuk mendukung pengalaman belajar yang interaktif.',
        'tech' => ['Flutter', 'Laravel'],
        'gallery' => [],
    ],

    // ---- Hanya muncul di baris "Karya lain" ----
    [
        'id' => 'laporsambah',
        'card' => false,
        'title' => 'LaporSambah',
        'heading' => 'LaporSambah — Bank Sampah',
        'category' => 'Environmental Web App',
        'description' => 'Platform web untuk mendukung pengelolaan bank sampah. (Sesuaikan dengan fitur yang benar-benar ada, misalnya pencatatan setoran, data nasabah, atau transaksi.)',
        'tech' => ['Web Development', 'Bank Sampah'],
        'gallery' => [],
    ],
];

/*
| Normalisasi: buang id dobel, isi field yang kosong dengan fallback
| supaya Blade tidak error "Undefined array key".
*/
$projects = collect($projects)
    ->unique('id')
    ->map(function ($p) {
        $tech = $p['tech'] ?? [];

        // 1) Foto otomatis dari public/img/projects/{id}/
        $folder = public_path('img/projects/' . $p['id']);
        $auto = [];
        if (is_dir($folder)) {
            $auto = collect(\Illuminate\Support\Facades\File::files($folder))
                ->filter(fn ($f) => in_array(strtolower($f->getExtension()), ['png', 'jpg', 'jpeg', 'webp']))
                ->sortBy(fn ($f) => $f->getFilename(), SORT_NATURAL | SORT_FLAG_CASE)
                ->map(fn ($f) => 'img/projects/' . $p['id'] . '/' . $f->getFilename())
                ->values()
                ->all();
        }
        $gallery = array_values(array_unique(array_merge($p['gallery'] ?? [], $auto)));

        // 2) Video: terima ID ATAU link YouTube apa saja (watch?v=, youtu.be, shorts)
        $yt = $p['youtube'] ?? null;
        if ($yt && preg_match('~(?:youtu\.be/|v=|embed/|shorts/)([A-Za-z0-9_-]{11})~', $yt, $m)) {
            $yt = $m[1];
        }
        $yt = ($yt && preg_match('/^[A-Za-z0-9_-]{11}$/', $yt)) ? $yt : null;

        // 3) Link desain: pilih ikon sesuai domain
        $design = $p['design'] ?? null;
        $designIcon = 'fa-solid fa-pen-ruler';
        if ($design) {
            $host = strtolower((string) parse_url($design, PHP_URL_HOST));
            if (str_contains($host, 'figma'))        $designIcon = 'fa-brands fa-figma';
            elseif (str_contains($host, 'behance'))  $designIcon = 'fa-brands fa-behance';
            elseif (str_contains($host, 'dribbble')) $designIcon = 'fa-brands fa-dribbble';
        }

        return array_merge(
            ['metric' => null, 'github' => null, 'live' => null, 'design' => null],
            $p,
            [
                'youtube'     => $yt,
                'design'      => $design,
                'design_icon' => $designIcon,
                'gallery'     => $gallery,
                'tech'        => $tech,
                'cover'       => $p['cover'] ?? ($gallery[0] ?? 'img/placeholder.png'),
                'summary'     => $p['summary'] ?? \Illuminate\Support\Str::limit($p['description'] ?? '', 130),
                'tags'        => $p['tags'] ?? array_slice($tech, 0, 3),
            ]
        );
    })
    ->values();

$cards = $projects->where('card', true)->values();
$more = $projects->where('card', false)->values();
@endphp

<section class="section container" id="projects">
    <div class="section-heading">
        <div>
            <p class="eyebrow">Selected work</p>
            <h2>Projects that solve<br><span>real problems.</span></h2>
        </div>
        <p class="section-intro">
            {{ $projects->count() }} proyek dari software development, AI automation,
            dan computer vision. Klik kartu untuk melihat screenshot dan detail teknis.
        </p>
    </div>

    {{-- ================= KARTU ================= --}}
    <div class="bento-grid pc-grid">
        @foreach ($cards as $p)
        <article class="project-card pc-card" data-project-open="{{ $p['id'] }}">

            <div class="project-art pc-shot">
                <div class="pc-chrome" aria-hidden="true">
                    <i></i><i></i><i></i>
                    <span>{{ $p['id'] }}</span>
                </div>
                <img src="{{ asset($p['cover']) }}"
                    alt="Tampilan proyek {{ $p['title'] }}"
                    loading="lazy">

                @if (! empty($p['youtube']))
                <span class="art-badge"><i class="fa-solid fa-play"></i> Video demo</span>
                @endif
            </div>

            <div class="pc-body">
                <div class="pc-meta">
                    <span class="pc-cat">{{ $p['category'] }}</span>
                    <span class="pc-status {{ ! empty($p['live']) ? 'is-live' : '' }}">
                        {{ ! empty($p['live']) ? 'Live' : (! empty($p['github']) ? 'Open source' : 'Case study') }}
                    </span>
                </div>

                <h3>{{ $p['title'] }}</h3>
                <p>{{ $p['summary'] }}</p>

                @if (! empty($p['metric']))
                <div class="project-metric">
                    <strong>{{ $p['metric'][0] }}</strong>
                    <span>{{ $p['metric'][1] }}</span>
                </div>
                @endif

                <div class="tag-list">
                    @foreach ($p['tags'] as $tag)
                    <span>{{ trim($tag) }}</span>
                    @endforeach
                </div>

                <div class="pc-foot">
                    <span class="pc-links">
                        @if (! empty($p['github']))<a href="{{ $p['github'] }}" target="_blank" rel="noopener noreferrer" aria-label="Source code {{ $p['title'] }}"><i class="fa-brands fa-github"></i></a>@endif
                        @if (! empty($p['design']))<a href="{{ $p['design'] }}" target="_blank" rel="noopener noreferrer" aria-label="Desain {{ $p['title'] }}"><i class="{{ $p['design_icon'] }}"></i></a>@endif
                        @if (! empty($p['live']))<a href="{{ $p['live'] }}" target="_blank" rel="noopener noreferrer" aria-label="Live site {{ $p['title'] }}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>@endif
                    </span>
                    <button type="button" class="project-detail-btn pc-open" data-project-open="{{ $p['id'] }}">
                        Lihat detail <i class="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </article>
        @endforeach
    </div>

    @if ($more->isNotEmpty())
    <p class="projects-footnote">
        <span>Karya lain</span>
        @foreach ($more as $m)
        <button type="button" class="footnote-link" data-project-open="{{ $m['id'] }}">{{ $m['title'] }}</button>
        @endforeach
    </p>
    @endif

    {{-- ================= MODAL DETAIL ================= --}}
    @foreach ($projects as $p)
    @php
    $slides = [];
    if (! empty($p['youtube'])) {
        $slides[] = ['type' => 'video', 'id' => $p['youtube']];
    }
    foreach ($p['gallery'] as $img) {
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
                            aria-label="{{ $s['type'] === 'video' ? 'Video demo' : 'Gambar ' . ($i + 1) }}">
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
                        <span>{{ trim($t) }}</span>
                        @endforeach
                    </div>

                    @if (! empty($p['youtube']) || ! empty($p['design']) || ! empty($p['github']) || ! empty($p['live']))
                    <div class="pm-actions">
                        @if (! empty($p['youtube']))
                        <a class="button button-primary"
                            href="https://www.youtube.com/watch?v={{ $p['youtube'] }}"
                            target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-youtube"></i> Tonton demo
                        </a>
                        @endif
                        @if (! empty($p['design']))
                        <a class="button button-secondary" href="{{ $p['design'] }}"
                            target="_blank" rel="noopener noreferrer">
                            <i class="{{ $p['design_icon'] }}"></i> Lihat desain
                        </a>
                        @endif
                        @if (! empty($p['live']))
                        <a class="button button-secondary" href="{{ $p['live'] }}"
                            target="_blank" rel="noopener noreferrer">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i> Live site
                        </a>
                        @endif
                        @if (! empty($p['github']))
                        <a class="button button-secondary" href="{{ $p['github'] }}"
                            target="_blank" rel="noopener noreferrer">
                            <i class="fa-brands fa-github"></i> Source code
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