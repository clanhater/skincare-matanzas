"use client";

import Image from "next/image";
import { Edit, Trash2, Power } from "lucide-react";
import { formatPrice } from "@/utils/format";
import { toggleProductStock, deleteProduct } from "@/app/admin/actions";
import Link from "next/link";

type AdminProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  images: string[];
  inStock: boolean;
};

// Función para asignar colores según el plan
const getCategoryColor = (cat: string) => {
  switch (cat) {
    case "Jabones": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Aceites": return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Serums": return "bg-purple-100 text-purple-700 border-purple-200";
    case "Cremas": return "bg-pink-100 text-pink-700 border-pink-200";
    case "Cabello": return "bg-orange-100 text-orange-800 border-orange-200";
    case "Geles": return "bg-cyan-100 text-cyan-700 border-cyan-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

export default function ProductRow({ product }: { product: AdminProduct }) {
  
  const handleToggle = async () => {
    await toggleProductStock(product.id, product.inStock);
  };

  const handleDelete = async () => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      await deleteProduct(product.id);
    }
  };

  return (
    <div className={`bg-white p-3 rounded-xl shadow-sm border flex items-center gap-4 transition-all hover:shadow-md ${!product.inStock ? 'opacity-60 bg-gray-50' : 'border-primary-100'}`}>
      
      {/* Foto: Miniatura redonda (según requisito) */}
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 border border-gray-100">
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-400">Sin foto</div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        {/* Nombre en negrita */}
        <h3 className="font-bold text-gray-900 truncate text-sm md:text-base">{product.name}</h3>
        
        {/* Categoría con Color */}
        <div className="flex">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${getCategoryColor(product.category)}`}>
            {product.category}
            </span>
        </div>

        {/* Precio Formato Moneda */}
        <span className="text-sm font-bold text-gray-600 font-mono">
            {formatPrice(product.price)}
        </span>
      </div>

      {/* Acciones */}
      <div className="flex items-center gap-2 border-l pl-3 border-gray-100">
        {/* Switch iPhone Style */}
        <button
          onClick={handleToggle}
          className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors ${
            product.inStock ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            product.inStock ? 'translate-x-4' : 'translate-x-0'
          }`} />
        </button>

        <Link
          href={`/admin/producto/${product.id}`}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Edit size={18} />
        </Link>

        <button
          onClick={handleDelete}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}