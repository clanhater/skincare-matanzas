"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

// Prop para que el modal pueda cerrarse al buscar
interface SearchBarProps {
  onSearch?: () => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return; // No buscar si está vacío

    // Redirigir a la página de catálogo con el parámetro de búsqueda
    router.push(`/catalogo?q=${query}`);

    // Si se pasó la función onSearch (desde el modal), la llamamos para que se cierre
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar jabón, serum, acné..."
          className="w-full pl-5 pr-14 py-4 border-2 border-primary-200 rounded-full text-lg text-primary-900 placeholder-primary-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          autoFocus // Pone el cursor aquí automáticamente al abrir
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary-900 text-white rounded-full flex items-center justify-center hover:bg-primary-800 transition-colors active:scale-95"
          aria-label="Buscar producto"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}