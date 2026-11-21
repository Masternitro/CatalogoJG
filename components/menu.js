// Lógica del menú: marca cuál sección está activa.
// Se ejecuta cuando components.js termina de insertar el menú en la página.

const SECCION_POR_DEFECTO = "catalogo"; // lo que se ve al abrir la página

function iniciarMenu() {
    const enlaces = document.querySelectorAll(".menu-item[data-seccion]");

    // Las opciones deshabilitadas no hacen nada al hacer clic
    document.querySelectorAll(".menu-item.deshabilitado").forEach((enlace) => {
        enlace.addEventListener("click", (e) => e.preventDefault());
    });

    if (!enlaces.length) return;

    function activar(id) {
        enlaces.forEach((enlace) => {
            const esActivo = enlace.dataset.seccion === id;
            enlace.classList.toggle("activo", esActivo);
            if (esActivo) {
                enlace.setAttribute("aria-current", "page");
            } else {
                enlace.removeAttribute("aria-current");
            }
        });
    }

    // 1) Estado inicial
    const idInicial = location.hash.replace("#", "");
    const existe = [...enlaces].some((e) => e.dataset.seccion === idInicial);
    activar(existe ? idInicial : SECCION_POR_DEFECTO);

    // 2) Al hacer clic en una opción
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => activar(enlace.dataset.seccion));
    });

    // 3) Al hacer scroll: activa la sección que cruza el centro de la pantalla
    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) activar(entrada.target.id);
            });
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    enlaces.forEach((enlace) => {
        const seccion = document.getElementById(enlace.dataset.seccion);
        if (seccion) observador.observe(seccion);
    });
}

document.addEventListener("componente-listo", (evento) => {
    if (evento.detail.nombre === "menu") iniciarMenu();
});