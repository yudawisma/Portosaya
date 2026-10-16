
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

    <div class="bento-grid">
        {{-- Featured: SSREPORT --}}
        <article class="project-card project-featured">
            <div class="project-topline">
                <span class="project-category">WEB APPLICATION</span>
                <span class="project-number">01 / 06</span>
            </div>

            <div class="project-art art-ssreport">
                <img src="{{ asset('img/ss.jpg') }}"
                     alt="Tampilan proyek SSREPORT"
                     loading="lazy">
                <span class="art-label">CIVIC TECH / 01</span>
            </div>

            <div class="project-body">
                <div class="project-title-row">
                    <h3>SSREPORT</h3>
                    <span class="project-arrow">↗</span>
                </div>

                <p>
                    Platform pengaduan masyarakat berbasis web.
                    Pengembangan mencakup alur aplikasi, database,
                    pengujian API, dan deployment sesuai kebutuhan proyek.
                </p>

                <div class="tag-list">
                    <span>Laravel</span>
                    <span>Bootstrap</span>
                    <span>MySQL</span>
                </div>

                <a class="text-link" href="#contact">
                    Discuss this project ↗
                </a>
            </div>
        </article>

        {{-- AI Agent --}}
        <article class="project-card">
            <div class="project-topline">
                <span class="project-category">AI & AUTOMATION</span>
                <span class="project-number">02</span>
            </div>

            <div class="project-art art-ai">
                <img src="{{ asset('img/ai-agent.png') }}"
                     alt="Proyek workflow AI Agent"
                     loading="lazy">
            </div>

            <div class="project-body">
                <h3>AI Agent Automation</h3>
                <p>
                    Workflow automation menggunakan n8n, Google Gemini API,
                    dan webhook untuk memproses input multimodal.
                </p>
                <div class="tag-list">
                    <span>n8n</span>
                    <span>Gemini API</span>
                    <span>Webhook</span>
                </div>
            </div>
        </article>

        {{-- BISINDO --}}
        <article class="project-card">
            <div class="project-topline">
                <span class="project-category">COMPUTER VISION</span>
                <span class="project-number">03</span>
            </div>

            <div class="project-art art-bisindo">
                <img src="{{ asset('img/skripsi-bisindo.png') }}"
                     alt="Penelitian pengenalan alfabet BISINDO"
                     loading="lazy">
            </div>

            <div class="project-body">
                <h3>BISINDO Recognition</h3>
                <p>
                    Sistem pengenalan alfabet BISINDO secara real-time
                    dengan integrasi MediaPipe Hands dan CNN.
                </p>
                <div class="project-metric">
                    <strong>73.08%</strong>
                    <span>Akurasi validasi model</span>
                </div>
                <div class="tag-list">
                    <span>Python</span>
                    <span>CNN</span>
                    <span>MediaPipe</span>
                </div>
            </div>
        </article>

        {{-- Certificate Generator --}}
        <article class="project-card">
            <div class="project-topline">
                <span class="project-category">WEB DEVELOPMENT</span>
                <span class="project-number">04</span>
            </div>

            <div class="project-art">
                <img src="{{ asset('img/sert.jpg') }}"
                     alt="Certificate Generator"
                     loading="lazy">
            </div>

            <div class="project-body">
                <h3>Certificate Generator</h3>
                <p>
                    Pengembangan modul frontend aplikasi generator
                    sertifikat bersama tim dalam program virtual internship.
                </p>
                <div class="tag-list">
                    <span>Laravel</span>
                    <span>Bootstrap 5</span>
                    <span>Figma</span>
                </div>
            </div>
        </article>

        {{-- WisaTani --}}
        <article class="project-card">
            <div class="project-topline">
                <span class="project-category">WEB APPLICATION</span>
                <span class="project-number">05</span>
            </div>

            <div class="project-art">
                <img src="{{ asset('img/wt.png') }}"
                     alt="Proyek WisaTani"
                     loading="lazy">
            </div>

            <div class="project-body">
                <h3>WisaTani</h3>
                <p>
                    Perancangan UI responsif dan integrasi komponen
                    frontend dengan RESTful API backend.
                </p>
                <div class="tag-list">
                    <span>Frontend</span>
                    <span>REST API</span>
                    <span>Responsive UI</span>
                </div>
            </div>
        </article>

        {{-- LaporPak --}}
        <article class="project-card">
            <div class="project-topline">
                <span class="project-category">CIVIC / TOURISM</span>
                <span class="project-number">06</span>
            </div>

            <div class="project-art">
                <img src="{{ asset('img/lp.png') }}"
                     alt="Proyek LaporPak"
                     loading="lazy">
            </div>

            <div class="project-body">
                <h3>LaporPak</h3>
                <p>
                    Platform pengaduan berbasis web untuk studi kasus
                    agrowisata dan pariwisata daerah.
                </p>
                <div class="tag-list">
                    <span>Web</span>
                    <span>UI Development</span>
                </div>
            </div>
        </article>
    </div>

    <p class="projects-footnote">
        More work: iQuiz · SIBa · LaporSambah
    </p>
</section>
