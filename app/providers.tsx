"use client";

import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar"; // Importamos el Sidebar aquí

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartSidebar /> {/* El Sidebar vive aquí, disponible en toda la app */}
    </CartProvider>
  );
}