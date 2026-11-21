// Arma el enlace de WhatsApp de cada tarjeta con el nombre y el precio del producto.

const WHATSAPP_NUMERO = "50376302568"; // 503 + tu número

document.querySelectorAll(".swiper-slide").forEach((tarjeta) => {
    const enlace = tarjeta.querySelector(".btn-whatsapp");
    if (!enlace) return;

    const nombre = tarjeta.querySelector("h3").textContent.trim();
    const precio = tarjeta.querySelector(".producto-txt span").textContent.trim();

    const mensaje = `Hola, me interesa la puerta: ${nombre} (${precio}).`;
    enlace.href = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;
});