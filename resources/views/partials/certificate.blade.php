<div class="position-relative d-flex flex-column align-items-center justify-content-center min-vh-100" style="background: linear-gradient(135deg, #f1f1f1, #eaeaea)">
  <div class="container text-center py-5">
    <h2 class="fw-bold mb-4">🎓 Sertifikat Saya</h2>

    <div class="swiper mySwiper" style="padding-bottom: 50px;">
      <div class="swiper-wrapper">
        @foreach (['IBM1.jpg', 'IBM2.jpeg', 'IBM3.jpeg', 'Dicodiing.jpg', 'cp.jpg', 'coppa.jpg', 'dc2.jpg', 'IBM1.jpg','bi.jpg', 'intern.jpg', 'rh.jpg', 'gpa.jpg','max.jpg' ] as $img)
          <div class="swiper-slide">
            <img src="{{ asset('img/' . $img) }}" class="img-fluid rounded shadow" style="max-height: 250px; object-fit: contain;" />
          </div>
        @endforeach
      </div>
      <!-- Optional pagination & navigation -->
      <div class="swiper-pagination mt-3"></div>
    </div>
  </div>
</div>
