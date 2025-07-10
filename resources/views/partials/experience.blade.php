<div id="Project" class="py-5" style="background-color: #dcdcdc;">
  <div class="container">
    <h2 class="text-center mb-5">Project Experience</h2>

    <div class="row g-4">

      <!-- iQuiz Card -->
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="{{ asset('img/ss.jpg') }}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="iQuiz">
          <div class="card-body">
            <h5 class="card-title">SSReport</h5>
            <p class="card-text">Website Pengaduan </p>
            <span class="badge bg-primary">Laravel</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalIquiz">Preview</button>
            <!-- <a href="https://github.com/yudawisma/iquiz" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a> -->
          </div>
        </div>
      </div>

      <!-- Buku Java -->
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="{{ asset('img/sert.jpg') }}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="Buku">
          <div class="card-body">
            <h5 class="card-title">Certificate Generate</h5>
            <p class="card-text">Pencetakan Sertifikat</p>
            <span class="badge bg-secondary">Laravel</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalBuku">Preview</button>
            <!-- <a href="https://github.com/yudawisma/toko-buku-java" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a> -->
          </div>
        </div>
      </div>

      <!-- Hackaton -->
      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="{{ asset('img/wt.png') }}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="Buku">
          <div class="card-body">
            <h5 class="card-title">Wisatani</h5>
            <p class="card-text">Platform digital Agrowisata dan wisata</p>
            <span class="badge bg-secondary">Laravel</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalWT">Preview</button>
            <!-- <a href="https://github.com/yudawisma/toko-buku-java" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="{{ asset('img/lp.png') }}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="Buku">
          <div class="card-body">
            <h5 class="card-title">LaporPak</h5>
            <p class="card-text">Pengaduan Masyarakat</p>
            <span class="badge bg-secondary">React</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalLP">Preview</button>
            <!-- <a href="https://github.com/yudawisma/toko-buku-java" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a> -->
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-6 col-lg-4">
        <div class="card h-100 shadow-sm">
          <img src="{{ asset('img/iz.png') }}" class="card-img-top" style="height: 200px; object-fit: cover;" alt="Buku">
          <div class="card-body">
            <h5 class="card-title">Iquiz</h5>
            <p class="card-text">Aplikasi Pembelajaran interaktif dengan AI Agent</p>
            <span class="badge bg-secondary">Flutter</span>
            <span class="badge bg-secondary">Laravel</span>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-primary" data-bs-toggle="modal" data-bs-target="#modalIQ">Preview</button>
            <!-- <a href="https://github.com/yudawisma/toko-buku-java" target="_blank" class="btn btn-sm btn-outline-dark">GitHub</a> -->
          </div>
        </div>
      </div>
    </div>
  </div>

  @include('partials.modals.project-modals') {{-- Modal project --}}
</div>