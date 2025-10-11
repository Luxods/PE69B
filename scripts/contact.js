document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Merci pour votre message ! Nous vous répondrons bientôt 😊");
            form.reset();
        });
    }
});
