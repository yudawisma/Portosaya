<section id="contact" class="premium-section contact-section">

    <div class="container">

        <div class="contact-wrapper">

            <div class="contact-intro">

                <span class="section-eyebrow">GET IN TOUCH</span>

                <h2>
                    Let's build something
                    <span>meaningful.</span>
                </h2>

                <p>
                    Have a project, collaboration, or opportunity in mind?
                    Feel free to reach out. I'm always open to discussing
                    interesting ideas and technology.
                </p>


                <div class="contact-details">

                    <a href="mailto:yudha@email.com" class="contact-detail">
                        <div class="contact-detail-icon">
                            <i class="bi bi-envelope"></i>
                        </div>

                        <div>
                            <small>Email</small>
                            <strong>yudha@email.com</strong>
                        </div>
                    </a>


                    <a
                        href="https://wa.me/6281326360206"
                        target="_blank"
                        class="contact-detail"
                    >
                        <div class="contact-detail-icon">
                            <i class="bi bi-whatsapp"></i>
                        </div>

                        <div>
                            <small>WhatsApp</small>
                            <strong>Let's talk</strong>
                        </div>
                    </a>


                    <a
                        href="https://github.com/yudawisma"
                        target="_blank"
                        class="contact-detail"
                    >
                        <div class="contact-detail-icon">
                            <i class="bi bi-github"></i>
                        </div>

                        <div>
                            <small>GitHub</small>
                            <strong>@yudawisma</strong>
                        </div>
                    </a>

                </div>

            </div>


            <div class="contact-form-card">

                <div class="contact-form-header">
                    <span>START A CONVERSATION</span>
                    <h3>Send me a message</h3>
                </div>


                <form id="wa-form">

                    <div class="form-group">

                        <label for="name">Name</label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label for="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label for="message">Message</label>

                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            placeholder="Tell me about your project..."
                            required
                        ></textarea>

                    </div>


                    <button type="submit" class="contact-submit">

                        <span>Send via WhatsApp</span>

                        <i class="bi bi-arrow-up-right"></i>

                    </button>

                </form>

            </div>

        </div>

    </div>

</section>


<script>
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('wa-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {

        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        const phone = '6281326360206';

        const text =
            `Halo Yudha, saya ${name}.%0A%0A` +
            `Email: ${email}%0A%0A` +
            `${message}`;

        window.open(
            `https://wa.me/${phone}?text=${text}`,
            '_blank'
        );

    });

});
</script>