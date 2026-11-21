// Lógica del contacto. Se ejecuta cuando components.js inserta el componente.

const CONTACTO = {
    //telefono: "50371514313",          // KALIN
    telefono: "50376302568",          // con código de país, sin + ni espacios (503 = El Salvador)
    telefonoVisible: "+503 7630 2568",
    correo: "fg796041@gmail.com",
    saludo: "Hola, me interesa una puerta del catálogo.",
};

function iniciarContacto() {
    const raiz = document.querySelector(".contacto");
    if (!raiz) return;

    const mensajeBase = encodeURIComponent(CONTACTO.saludo);

    // Botones directos
    raiz.querySelector('[data-canal="whatsapp"]').href =
        `https://wa.me/${CONTACTO.telefono}?text=${mensajeBase}`;
    raiz.querySelector('[data-canal="llamada"]').href = `tel:+${CONTACTO.telefono}`;
    raiz.querySelector('[data-canal="correo"]').href =
        `mailto:${CONTACTO.correo}?subject=${encodeURIComponent("Cotización de puerta")}`;

    // Formulario: arma el mensaje y abre WhatsApp
    const form = raiz.querySelector(".contacto-form");
    const aviso = raiz.querySelector(".contacto-aviso");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const mensaje = form.mensaje.value.trim();

        form.nombre.classList.toggle("campo-error", !nombre);
        form.mensaje.classList.toggle("campo-error", !mensaje);

        if (!nombre || !mensaje) {
            aviso.textContent = "Completa tu nombre y el mensaje.";
            return;
        }

        const texto = `Hola, soy ${nombre}. ${mensaje}`;
        window.open(
            `https://wa.me/${CONTACTO.telefono}?text=${encodeURIComponent(texto)}`,
            "_blank",
            "noopener"
        );
        aviso.textContent = "Abriendo WhatsApp…";
        form.reset();
    });
}

document.addEventListener("componente-listo", (evento) => {
    if (evento.detail.nombre === "contacto") iniciarContacto();
});