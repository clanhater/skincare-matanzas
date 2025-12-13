"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  
  // Verificamos si hay una segunda imagen disponible
  const hasSecondImage = product.images.length > 1;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-primary-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      
      {/* 1. SECCIÓN DE IMAGEN */}
      <Link href={`/producto/${product.slug}`} className="block relative aspect-[4/5] bg-primary-50 overflow-hidden cursor-pointer">
        
        {/* Imagen 1 (Principal): Se muestra siempre */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={`object-cover transition-transform duration-700 ${
            !hasSecondImage ? "group-hover:scale-105" : ""
          }`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Imagen 2 (Textura): CAMBIO -> Solo se carga/muestra en pantallas medianas hacia arriba (md:block) */}
        {/* En celular (hidden) ahorramos datos y evitamos interacciones raras */}
        {hasSecondImage && (
          <div className="hidden md:block">
            <Image
                src={product.images[1]}
                alt={`${product.name} textura`}
                fill
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="(max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        
        {/* Etiqueta Flotante */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] md:text-xs font-medium text-primary-900 uppercase tracking-wider z-10 shadow-sm">
          {product.category}
        </div>
      </Link>

      {/* 2. INFORMACIÓN */}
      <div className="p-4 flex flex-col gap-2">
        
        <Link href={`/producto/${product.slug}`} className="block cursor-pointer">
            <div>
                <p className="text-[10px] md:text-xs text-primary-500 font-medium mb-1 uppercase tracking-wide">
                    {product.concern}
                </p>
                <h3 className="font-serif text-lg md:text-xl text-primary-900 leading-tight group-hover:text-primary-600 transition-colors">
                    {product.name}
                </h3>
            </div>
        </Link>

        {/* 3. ACCIÓN */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-primary-50">
          <span className="font-sans text-lg font-semibold text-primary-900">
            {formatPrice(product.price)}
          </span>
          
          {/* CAMBIO: Botón más grande (w-11 h-11 = 44px) para mejor zona táctil en móvil */}
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-12 h-12 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center transition-all hover:bg-primary-900 hover:text-white hover:scale-110 active:scale-95 shadow-sm"
            aria-label={`Agregar ${product.name} a mi rutina`}
          >
            <Plus size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}