// Agrega un botón "descargar" a cada tarjeta y exporta la tarjeta como imagen PNG.

document.querySelectorAll(".swiper-slide .btn-whatsapp").forEach((whatsapp) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn-exportar";
    boton.setAttribute("aria-label", "Descargar tarjeta como imagen");
    boton.innerHTML = '<i class="fa-solid fa-download"></i>';

    // Agrupa los dos botones para que ocupen el mismo lugar en la fila
    const grupo = document.createElement("div");
    grupo.className = "acciones";
    whatsapp.replaceWith(grupo);
    grupo.append(boton, whatsapp);
});

// Un solo escucha para todas las tarjetas (también sirve para las copias de Swiper)
document.addEventListener("click", async (e) => {
    const boton = e.target.closest(".btn-exportar");
    if (!boton) return;

    const tarjeta = boton.closest(".swiper-slide");
    const nombre = tarjeta.querySelector("h3").textContent.trim();

    tarjeta.classList.add("exportando");
    try {
        const imagen = await htmlToImage.toPng(tarjeta, {
            pixelRatio: 2,
            cacheBust: true,
            // Quita la inclinación 3D del carrusel para que salga de frente
            style: { transform: "none", margin: "0" },
            // No incluye los botones ni las sombras de Swiper en la imagen
            filter: (nodo) => {
                const clase = String(nodo.className || "");
                return !clase.includes("acciones") && !clase.includes("swiper-slide-shadow");
            },
        });

        const enlace = document.createElement("a");
        enlace.download = `${nombre}.png`;
        enlace.href = imagen;
        enlace.click();
    } catch (error) {
        console.error("No se pudo exportar la tarjeta:", error);
    } finally {
        tarjeta.classList.remove("exportando");
    }
});