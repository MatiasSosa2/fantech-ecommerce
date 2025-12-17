export function buildWhatsAppMessage(items, total) {
  if (!items || items.length === 0) {
    return encodeURIComponent("Hola, me gustaría hacer una compra. (Carrito vacío)");
  }
  const lines = [
    "Hola, me gustaría finalizar esta compra:",
    "",
    ...items.map((it, i) => `${i + 1}. ${it.name} x${it.quantity} — $${(it.price).toLocaleString('es-AR')} c/u`),
    "",
    `Total: $${total.toLocaleString('es-AR')}`,
  ];
  return encodeURIComponent(lines.join("\n"));
}

export function openWhatsAppWithCart(items, total, phoneNumber = "") {
  const text = buildWhatsAppMessage(items, total);
  const base = phoneNumber ? `https://wa.me/${phoneNumber}` : `https://wa.me/`;
  const url = `${base}?text=${text}`;
  if (typeof window !== 'undefined') {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
