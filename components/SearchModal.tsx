"use client";

import SearchBar from "./SearchBar";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-start pt-20 sm:pt-32">
      {/* Fondo oscuro que cierra el modal al hacer clic */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Panel de búsqueda */}
      <div 
        className="relative z-10 w-11/12 max-w-xl p-4 bg-white rounded-2xl shadow-2xl animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del panel
      >
        <SearchBar onSearch={onClose} />
      </div>
    </div>
  );
}