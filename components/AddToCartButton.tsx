"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/types/product";
import { Plus } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => addToCart(product)}
      className="w-full bg-primary-900 text-white py-4 rounded-full font-medium text-lg hover:bg-primary-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
    >
      <Plus size={20} />
      Agregar a mi Rutina
    </button>
  );
}