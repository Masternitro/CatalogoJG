// Cargador de componentes reutilizables.
// Busca cada <div data-component="nombre"></div> y le inserta components/nombre.html
// Sirve igual para el menú, el sidebar o cualquier componente futuro.

// Calcula la ruta de la carpeta "components" a partir de la ubicación de este script,
// así funciona aunque la página esté dentro de otra carpeta (por ejemplo views/).
const RUTA_COMPONENTES = new URL("../components/", document.currentScript.src);

async function cargarComponentes() {
    const huecos = document.querySelectorAll("[data-component]");

    await Promise.all(
        [...huecos].map(async (hueco) => {
            const nombre = hueco.dataset.component;
            try {
                const respuesta = await fetch(new URL(`${nombre}.html`, RUTA_COMPONENTES));
                if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`);

                hueco.innerHTML = await respuesta.text();

                // Avisa a quien lo necesite (por ejemplo menu.js) que ya está listo
                hueco.dispatchEvent(
                    new CustomEvent("componente-listo", { bubbles: true, detail: { nombre } })
                );
            } catch (error) {
                console.error(`No se pudo cargar el componente "${nombre}":`, error);
            }
        })
    );
}

cargarComponentes();
