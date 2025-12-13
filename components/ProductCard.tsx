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
  const hasSecondImage = product.images.length > 1;

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden border border-primary-100/50 transition-all duration-300 hover:shadow-md hover:border-primary-200">
      
      <Link href={`/producto/${product.slug}`} className="block relative aspect-[1/1] bg-primary-50 overflow-hidden cursor-pointer">
        <Image
          src={product.images[0]}
          alt={`${product.name} - Skincare en Matanzas`}
          fill
          className={`object-cover transition-transform duration-500 ${!hasSecondImage ? "group-hover:scale-105" : ""}`}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {hasSecondImage && (
          <div className="hidden md:block">
            <Image
                src={product.images[1]}
                alt={`Textura de ${product.name}`}
                fill
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                sizes="50vw"
            />
          </div>
        )}
      </Link>

      <div className="p-3">
        <Link href={`/producto/${product.slug}`} className="block cursor-pointer">
            <p className="text-[10px] text-primary-400 font-medium uppercase tracking-wider mb-1">{product.category}</p>
            <h3 className="font-serif text-sm font-medium text-primary-900 leading-tight truncate group-hover:text-primary-600 transition-colors">
                {product.name}
            </h3>
        </Link>

        <div className="flex items-center justify-between mt-2">
          <span className="font-sans text-sm font-semibold text-primary-900">
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={() => addToCart(product)}
            className="w-8 h-8 rounded-full bg-primary-100 text-primary-900 flex items-center justify-center transition-all hover:bg-primary-900 hover:text-white active:scale-90"
            aria-label={`Agregar ${product.name} a mi rutina`}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}