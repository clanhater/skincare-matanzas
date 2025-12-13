"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react'; // Importamos X para cerrar
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { toggleCart, count } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú si el usuario hace scroll o cambia tamaño de ventana
  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  // Lógica de estilo: Blanco si hay scroll O si el menú está abierto
  const navBackground = isScrolled || isMenuOpen 
    ? "bg-white/95 backdrop-blur-md shadow-sm border-primary-100" 
    : "bg-transparent border-transparent";

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${navBackground} py-4`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-10">
          
          {/* 1. Botón Menú Mobile (Izquierda) */}
          <div className="flex items-center sm:hidden z-50">
            {/* Aumentamos p-2 para mejorar zona de toque (Touch Target) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary-900 p-2 -ml-2 transition-transform active:scale-90"
              aria-label="Menú principal"
            >
              {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>

          {/* 2. Logo (Centro en Mobile / Izquierda en Desktop) */}
          {/* Usamos absolute en mobile para asegurar centrado perfecto */}
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0 flex-shrink-0 flex items-center">
            <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-2xl font-bold text-primary-900 tracking-widest"
            >
              UNA TALLA NATURAL
            </Link>
          </div>

          {/* 3. Enlaces Desktop (Ocultos en Mobile) */}
          <div className="hidden sm:flex sm:space-x-8 sm:ml-10">
            <Link href="/" className="text-primary-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Inicio
            </Link>
            <Link href="#catalogo" className="text-primary-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                Catálogo
            </Link>
          </div>

          {/* 4. Carrito (Derecha) */}
          <div className="flex items-center z-50">
            <button 
              onClick={() => {
                toggleCart();
                setIsMenuOpen(false); // Cerrar menú si abre carrito
              }}
              className="relative p-2 -mr-2 text-primary-900 hover:text-primary-600 transition-colors group active:scale-95"
              aria-label="Abrir mi rutina"
            >
              <ShoppingBag size={26} strokeWidth={1.5} />
              {count > 0 && (
                <span className="absolute top-1 right-0 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold leading-none text-white transform bg-primary-900 rounded-full border-2 border-white animate-fade-in">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MENÚ DESPLEGABLE MÓVIL (Cortina) */}
      <div 
        className={`absolute top-full left-0 w-full bg-white border-b border-primary-100 shadow-xl overflow-hidden transition-all duration-500 ease-in-out sm:hidden
        ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pt-6 pb-12 flex flex-col items-center space-y-6 h-screen bg-primary-50/30">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-400 mb-4">Menú</p>
            
            <Link 
                href="/" 
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-3xl text-primary-900 hover:text-primary-600 transition-colors"
            >
                Inicio
            </Link>
            
            <Link 
                href="/#catalogo" 
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-3xl text-primary-900 hover:text-primary-600 transition-colors"
            >
                Catálogo
            </Link>
            
            <Link 
                href="/#filosofia" 
                onClick={() => setIsMenuOpen(false)}
                className="font-serif text-3xl text-primary-900 hover:text-primary-600 transition-colors"
            >
                Filosofía
            </Link>

            {/* Decoración extra para llenar espacio */}
            <div className="pt-12 w-16 border-t border-primary-200"></div>
            <p className="text-primary-500 italic text-sm">
                Tu piel, tu mejor versión.
            </p>
        </div>
      </div>
    </nav>
  );
}