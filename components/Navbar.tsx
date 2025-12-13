"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SearchModal from './SearchModal'; // Importamos el nuevo modal

export default function Navbar() {
  const { toggleCart, count } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <--- NUEVO ESTADO PARA EL BUSCADOR

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const closeMenu = () => setIsMenuOpen(false);
    window.addEventListener('resize', closeMenu);
    return () => window.removeEventListener('resize', closeMenu);
  }, []);

  const navBackground = isScrolled || isMenuOpen || isSearchOpen 
    ? "bg-white/95 backdrop-blur-md shadow-sm border-primary-100" 
    : "bg-transparent border-transparent";

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${navBackground} py-4`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-10">
            
            {/* Izquierda: Menú Hamburguesa */}
            <div className="flex-1 flex justify-start sm:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-primary-900 p-2 -ml-2"
                aria-label="Menú principal"
              >
                {isMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Centro: Logo (Acrónimo en móvil, completo en desktop) */}
            <div className="flex-1 flex justify-center sm:justify-start">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="font-serif font-bold text-primary-900 tracking-widest uppercase">
                {/* SOLUCIÓN AL NOMBRE LARGO */}
                <span className="sm:hidden text-2xl">UTN</span>
                <span className="hidden sm:inline-block sm:text-xl md:text-2xl">Una Talla Natural</span>
              </Link>
            </div>

            {/* Centro (Desktop): Enlaces */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link href="/" className="text-primary-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">Inicio</Link>
              <Link href="/catalogo" className="text-primary-900 hover:text-primary-600 px-3 py-2 text-sm font-medium">Catálogo</Link>
            </div>

            {/* Derecha: Buscador y Carrito */}
            <div className="flex-1 flex justify-end items-center gap-1">
              {/* NUEVO BOTÓN BUSCADOR */}
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="relative p-2 text-primary-900 hover:text-primary-600 transition-colors"
                aria-label="Buscar productos"
              >
                <Search size={24} strokeWidth={1.5} />
              </button>

              <button 
                onClick={() => {
                  toggleCart();
                  setIsMenuOpen(false);
                }}
                className="relative p-2 text-primary-900 hover:text-primary-600"
                aria-label="Abrir mi rutina"
              >
                <ShoppingBag size={24} strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute top-1 right-0 w-5 h-5 text-[10px] font-bold text-white bg-primary-900 rounded-full flex items-center justify-center border-2 border-white">
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
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}