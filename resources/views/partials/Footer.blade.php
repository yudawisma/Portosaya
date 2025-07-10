<!-- ===== Contact Section ===== -->
<section id="contact" class="py-5 bg-light">
  <div class="container">
    <h3 class="text-center mb-4">Kontak Saya</h3>

    <form id="wa-form" class="mx-auto" style="max-width: 600px;">
      <div class="mb-3">
        <label for="name" class="form-label">Nama</label>
        <input type="text" id="name" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" id="email" class="form-control" required>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">Pesan</label>
        <textarea id="message" rows="5" class="form-control" required></textarea>
      </div>
      <button type="submit" class="btn btn-success w-100">Kirim via WhatsApp</button>
    </form>
  </div>
</section>

<script>
  document.getElementById('wa-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('message').value;

    const noWhatsApp = '6281326360206'; // Ganti dengan nomormu, tanpa +
    const text = `Halo, saya ${nama} (%0AEmail: ${email}) ingin menghubungi:%0A${pesan}`;
    const url = `https://wa.me/${noWhatsApp}?text=${text}`;

    window.open(url, '_blank');
  });
</script>


<!-- ===== Footer Section ===== -->
<footer class="bg-dark text-white text-center py-4">
  <div class="container">
    <!-- Sosial Media -->
    <div class="mb-3">
      <a href="https://instagram.com/yudawisma" target="_blank" class="text-white me-3">
        <i class="bi bi-instagram"></i> Instagram
      </a>
      <a href="https://linkedin.com/in/yudawisma" target="_blank" class="text-white me-3">
        <i class="bi bi-linkedin"></i> LinkedIn
      </a>
      <a href="https://github.com/yudawisma" target="_blank" class="text-white me-3">
        <i class="bi bi-github"></i> GitHub
      </a>
      <a href="mailto:yudha@email.com" class="text-white">
        <i class="bi bi-envelope-fill"></i> Email
      </a>
    </div>

    <!-- Copyright -->
    <p class="mb-0">&copy; {{ date('Y') }} Yudha Wisma Wardani. All rights reserved.</p>
  </div>
</footer>
