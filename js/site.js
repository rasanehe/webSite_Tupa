document.addEventListener("DOMContentLoaded", () => {

    // Aktivoi nav-link oikealle sivulle
    const page = document.body.dataset.page;
    if (page) {
        const active = document.querySelector(`.nav-link-custom[data-nav="${page}"]`);
        if (active) active.classList.add("is-active");
    }

    // Modal yhteydenottolomake
    document.body.insertAdjacentHTML("beforeend", `
        <div class="modal fade" id="contactModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered contact-modal-dialog">
                <div class="modal-content contact-modal-content">

                    <div class="modal-header border-0">
                        <h5 class="modal-title">Yhteydenotto</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>

                    <div class="modal-body">
                        <form id="contactForm" novalidate>
                            <div class="mb-3">
                                <label class="form-label">Nimi</label>
                                <input type="text" class="form-control" id="name" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Yhteystiedot</label>
                                <input type="text" class="form-control" id="contact" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Viesti</label>
                                <textarea class="form-control" id="message" rows="5" required></textarea>
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Lähetä</button>
                            </div>
                        </form>

                        <div id="contactSuccess" class="text-center d-none">
                            <h4 class="mb-3">Kiitos yhteydenotostasi!</h4>
                            <p>Vastaamme sinulle mahdollisimman pian.</p>
                            <button type="button" class="btn btn-outline-light mt-3"
                            data-bs-dismiss="modal"> Sulje
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `);

    // Avaa modal
    document.querySelectorAll(".nav-contact, .open-contact").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById("contactModal"));
            modal.show();
        });
    });

    // Lomakkeen lähetys
    document.addEventListener("submit", (e) => {
        if (e.target.id === "contactForm") {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const contact = document.getElementById("contact").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !contact || !message) {
                alert("Täytä kaikki kentät ennen lähettämistä.");
                return;
            }

            // Piilota lomake
            document.getElementById("contactForm").classList.add("d-none");

            // Näytä kiitosviesti
            document.getElementById("contactSuccess").classList.remove("d-none");
        }
        //kiitosviestin sulku, uusi lomake
        document.getElementById("contactModal").addEventListener("hidden.bs.modal", () => {
            const form = document.getElementById("contactForm");
            const success = document.getElementById("contactSuccess");

            form.reset();
            form.classList.remove("d-none");
            success.classList.add("d-none");
        });
    });

});