import { CartItem } from "@/context/CartContext";
import { formatPrice } from "./format";

// CONFIGURACIÓN: Tu número aquí (sin +)
export const PHONE_NUMBER = "5351339780"; 

export const generateWhatsAppLink = (items: CartItem[], total: number) => {
  // 1. Saludo
  let message = `Hola *Una Talla Natural* 🌿, estoy interesada en estos productos Sanem:\n\n`;

  // 2. Iterar productos
  items.forEach((item) => {
    // Formato: • Nombre del producto (x1) - $ Precio
    message += `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}\n`;
  });

  // 3. Total y Despedida
  message += `\n*Total estimado: ${formatPrice(total)}*`;
  message += `\n\nQuedo pendiente para coordinar el pago y el envío. ¡Gracias! ✨`;

  // 4. Codificar URL
  const encodedMessage = encodeURIComponent(message);
  
  // 5. Retornar enlace completo
  return `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`;
};