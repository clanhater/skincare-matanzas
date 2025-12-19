"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, X } from "lucide-react";
import { smartSearch } from "@/utils/search"; // <--- Importamos la lógica inteligente

export default function CatalogClient() {
  const searchParams = useSearchParams();
  
  // Estados
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeConcern, setActiveConcern] = useState("Todas");
  const [query, setQuery] = useState("");

  // EFECTO DE SINCRONIZACIÓN (LA CLAVE DEL ARREGLO)
  // Escucha cambios en la URL. Si buscas en el Navbar, esto actualiza el catálogo.
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const cat = searchParams.get('categoria') || 'Todas';
    
    setQuery(q);
    if (cat !== 'Todas') setActiveCategory(cat);
  }, [searchParams]);

  // Listas de filtros (Memorizadas)
  const categories = useMemo(() => ["Todas", ...new Set(products.map(p => p.category))], []);
  const concerns = useMemo(() => ["Todas", ...new Set(products.map(p => p.concern))], []);

  // Lógica de Filtrado MEJORADA
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.inStock) // Solo productos en stock
      .filter(p => {
        // 1. Búsqueda Inteligente
        // Combinamos todo el texto del producto en una sola cadena para buscar ahí
        const productSearchableText = `${p.name} ${p.description} ${p.concern} ${p.category}`;
        const matchesQuery = query === '' || smartSearch(productSearchableText, query);

        // 2. Filtros de Categoría
        const matchesCategory = activeCategory === "Todas" || p.category === activeCategory;
        const matchesConcern = activeConcern === "Todas" || p.concern === activeConcern;

        return matchesQuery && matchesCategory && matchesConcern;
      });
  }, [query, activeCategory, activeConcern]);

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('Todas');
    setActiveConcern('Todas');
    // Limpiamos la URL visualmente también (opcional, pero limpio)
    window.history.pushState(null, '', '/catalogo');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-primary-900">Catálogo de Productos</h1>
        <p className="text-primary-500 mt-2 h-6 font-medium">
          {query ? `Resultados para "${query}"` : `Mostrando ${filteredProducts.length} productos`}
        </p>
      </div>

      {/* Barra de Herramientas (Filtros) */}
      <div className="sticky top-20 bg-primary-50/95 backdrop-blur-md z-30 py-4 mb-8 border-b border-primary-100/50 shadow-sm md:shadow-none">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Scroll Horizontal Categorías */}
          <div className="w-full md:flex-1 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 w-max mx-auto md:mx-0 pb-2 md:pb-0 px-2">
              {categories.map(cat => (
                <button 
                  key={cat} 
                  onClick={() => {
                    setActiveCategory(cat);
                    // Si cambia categoría, tal vez quiera ver todo de esa categoría, no filtrado por preocupación
                    if(cat === 'Todas') setActiveConcern('Todas'); 
                  }} 
                  className={`px-4 py-2 text-xs rounded-full font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-primary-900 text-white shadow-md transform scale-105' 
                      : 'bg-white text-primary-700 border border-primary-100 hover:border-primary-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dropdown y Botón Limpiar */}
          <div className="flex gap-3 w-full md:w-auto px-2 justify-center md:justify-end">
            <div className="relative w-full md:w-56">
              <select 
                value={activeConcern} 
                onChange={e => setActiveConcern(e.target.value)} 
                className="w-full appearance-none bg-white pl-4 pr-10 py-2.5 text-xs rounded-full font-semibold text-primary-700 border border-primary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer shadow-sm"
              >
                <option value="Todas">🔍 Filtrar por necesidad...</option>
                {concerns.filter(c => c !== 'Todas').map(con => (
                  <option key={con} value={con}>{con}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none" />
            </div>

            {(query || activeCategory !== 'Todas' || activeConcern !== 'Todas') && (
              <button 
                onClick={clearFilters} 
                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-500 rounded-full text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid de Resultados */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20 animate-fade-in">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-primary-200 mx-4">
          <span className="text-4xl block mb-4 opacity-50">🍃</span>
          <h3 className="text-xl font-serif text-primary-900">No encontramos coincidencias</h3>
          <p className="text-primary-500 text-sm mt-2 max-w-xs mx-auto">
            Prueba buscando "jabón", "acné" o limpia los filtros para ver todo.
          </p>
          <button 
            onClick={clearFilters}
            className="mt-6 text-primary-900 font-bold underline underline-offset-4 hover:text-primary-600"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}