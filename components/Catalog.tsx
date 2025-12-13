"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { X } from "lucide-react";

export default function Catalog() {
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeConcern, setActiveConcern] = useState("Todas");

  // Extraemos listas únicas
  const categories = ["Todas", ...new Set(products.map((p) => p.category))];
  const concerns = ["Todas", ...new Set(products.map((p) => p.concern))];

  // Lógica de Filtrado
  const filteredProducts = products
    .filter(product => product.inStock)
    .filter((product) => {
        const matchCategory = activeCategory === "Todas" || product.category === activeCategory;
        const matchConcern = activeConcern === "Todas" || product.concern === activeConcern;
        return matchCategory && matchConcern;
    });

  const clearFilters = () => {
    setActiveCategory("Todas");
    setActiveConcern("Todas");
  };

  return (
    <section id="catalogo" className="py-16 md:py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
      
      {/* Encabezado */}
      <div className="text-center mb-8 md:mb-12 space-y-3">
        <h2 className="text-3xl md:text-4xl font-serif text-primary-900">Nuestra Colección</h2>
        <p className="text-primary-600 text-sm md:text-base max-w-2xl mx-auto">
          Rutinas diseñadas para potenciar tu belleza natural.
        </p>
      </div>

      {/* ZONA DE FILTROS */}
      <div className="flex flex-col items-center gap-6 mb-12">
        
        {/* Nivel 1: Categorías (Scroll Horizontal en Móvil / Centrado en Desktop) */}
        {/* El -mx-4 permite que el scroll llegue al borde de la pantalla en móviles */}
        <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-3 w-max mx-auto md:w-full md:flex-wrap md:justify-center pb-2">
            {categories.map((category) => (
                <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap
                    ${
                    activeCategory === category
                        ? "bg-primary-900 text-white border-primary-900 shadow-lg scale-105"
                        : "bg-white text-primary-600 border-primary-100 hover:border-primary-300 hover:bg-primary-50"
                    }
                `}
                >
                {category}
                </button>
            ))}
            </div>
        </div>

        {/* Nivel 2: Preocupación (Scroll Horizontal Sutil) */}
        <div className="w-full max-w-3xl border-t border-primary-100 pt-6 flex flex-col items-center gap-3">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-primary-400 font-bold">
            ¿Qué busca tu piel?
          </span>
          
          <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex gap-2 w-max mx-auto md:w-full md:flex-wrap md:justify-center">
                {concerns.map((concern) => (
                <button
                    key={concern}
                    onClick={() => setActiveConcern(concern)}
                    className={`px-4 py-2 rounded-full text-xs transition-all whitespace-nowrap
                    ${
                        activeConcern === concern
                        ? "bg-secondary-500 text-white shadow-md font-bold"
                        : "bg-secondary-100 text-primary-700 hover:bg-secondary-200"
                    }
                    `}
                >
                    {concern}
                </button>
                ))}
            </div>
          </div>
        </div>

        {/* Botón de Limpiar */}
        {(activeCategory !== "Todas" || activeConcern !== "Todas") && (
            <button 
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition-colors mt-2 animate-fade-in"
            >
                <X size={14} />
                Limpiar filtros
            </button>
        )}
      </div>

      {/* RESULTADOS (GRID) */}
      {/* grid-cols-1 en móvil (Lujo/Detalle) -> sm:grid-cols-2 (Tablet) -> lg:grid-cols-3 (Desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Estado Vacío */
        <div className="text-center py-20 bg-white/50 rounded-2xl border border-dashed border-primary-200 mx-4">
          <span className="text-4xl block mb-2">🔍</span>
          <h3 className="text-lg font-serif text-primary-900">Sin resultados</h3>
          <p className="text-primary-500 text-sm mb-4">
             Prueba combinando otros filtros.
          </p>
          <button 
            onClick={clearFilters}
            className="text-primary-900 font-bold underline underline-offset-4"
          >
            Ver todo
          </button>
        </div>
      )}
    </section>
  );
}