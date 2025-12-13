"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronDown, X } from "lucide-react";

export default function CatalogClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('categoria') || 'Todas';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeConcern, setActiveConcern] = useState("Todas");
  const [query, setQuery] = useState(initialQuery);

  const categories = useMemo(() => ["Todas", ...new Set(products.map(p => p.category))], []);
  const concerns = useMemo(() => ["Todas", ...new Set(products.map(p => p.concern))], []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => p.inStock)
      .filter(p => {
        const queryLower = query.toLowerCase();
        const matchesQuery = queryLower === '' || p.name.toLowerCase().includes(queryLower) || p.description.toLowerCase().includes(queryLower) || p.concern.toLowerCase().includes(queryLower);
        const matchesCategory = activeCategory === "Todas" || p.category === activeCategory;
        const matchesConcern = activeConcern === "Todas" || p.concern === activeConcern;
        return matchesQuery && matchesCategory && matchesConcern;
      });
  }, [query, activeCategory, activeConcern]);

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('Todas');
    setActiveConcern('Todas');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-primary-900">Catálogo de Productos</h1>
        <p className="text-primary-500 mt-2 h-5">
          {query ? `Resultados para "${query}"` : "Explora nuestra colección completa"}
        </p>
      </div>

      <div className="sticky top-20 bg-primary-50/80 backdrop-blur-md z-30 py-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="w-full md:w-auto overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 w-max mx-auto md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-4 py-2 text-xs rounded-full font-semibold whitespace-nowrap ${activeCategory === cat ? 'bg-primary-900 text-white' : 'bg-white text-primary-700'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <select value={activeConcern} onChange={e => setActiveConcern(e.target.value)} className="w-full appearance-none bg-white px-4 py-2 text-xs rounded-full font-semibold text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
              {concerns.map(con => <option key={con} value={con}>{con === 'Todas' ? 'Todas las necesidades' : con}</option>)}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-400 pointer-events-none" />
          </div>
          {(query || activeCategory !== 'Todas' || activeConcern !== 'Todas') && (
            <button onClick={clearFilters} className="text-xs text-red-500 flex items-center gap-1">
              <X size={14} /> Limpiar
            </button>
          )}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pb-20">
          {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="text-lg font-serif">No se encontraron productos</h3>
          <p className="text-primary-400 text-sm">Intenta con otros filtros o una búsqueda diferente.</p>
        </div>
      )}
    </div>
  );
}