"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { formatPrice } from "@/utils/format";
import { Plus } from "lucide-react";

export default function MobileStickyBar({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-primary-100 p-4 z-40 md:hidden safe-area-bottom shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
        
        {/* Precio (Izquierda) */}
        <div className="flex flex-col">
          <span className="text-xs text-primary-500 uppercase tracking-wide font-medium">Total</span>
          <span className="text-xl font-serif text-primary-900 font-bold leading-none">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Botón (Derecha) */}
        <button
          onClick={() => addToCart(product)}
          className="flex-1 bg-primary-900 text-white py-3 px-4 rounded-full font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg shadow-primary-900/20"
        >
          <Plus size={20} />
          <span>Agregar</span>
        </button>
      </div>
    </div>
  );
}