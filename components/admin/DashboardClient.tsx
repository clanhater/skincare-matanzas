"use client";

import { useState } from "react";
import ProductRow from "@/components/admin/ProductRow";
import { Search, PackageX } from "lucide-react";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardClient({ products }: { products: any[] }) {
  const [query, setQuery] = useState("");

  // Lógica de filtrado en tiempo real
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 mt-8">
      
      {/* Barra de Control: Título + Buscador + Botón Nuevo */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-primary-100">
        
        {/* Contador */}
        <div className="w-full md:w-auto">
          <h2 className="text-2xl font-bold text-gray-800">Inventario</h2>
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">
            {filteredProducts.length} productos encontrados
          </p>
        </div>

        {/* Buscador Rápido (El que faltaba) */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
          />
        </div>
        
        {/* Botón Nuevo */}
        <Link 
          href="/admin/producto/nuevo" 
          className="w-full md:w-auto bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-100 active:scale-95"
        >
          <Plus size={20} />
          <span>Nuevo</span>
        </Link>
      </div>

      {/* Lista de Productos */}
      <div className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-xl border border-dashed border-gray-300">
            <PackageX className="mx-auto text-gray-300 mb-2" size={48} />
            <p className="text-gray-500 font-medium">No se encontraron productos.</p>
            <button onClick={() => setQuery('')} className="text-primary-600 text-sm hover:underline mt-2">
              Limpiar búsqueda
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductRow key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}