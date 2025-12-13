"use client";

import Image from "next/image";
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/format";
import { generateWhatsAppLink } from "@/utils/whatsapp";

export default function CartSidebar() {
  const { items, isCartOpen, toggleCart, removeFromCart, clearCart, total } = useCart();

  const handleCheckout = () => {
    const link = generateWhatsAppLink(items, total);
    window.open(link, "_blank");
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      
      {/* 1. Overlay (Fondo oscuro) */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in transition-opacity"
        onClick={toggleCart}
      />

      {/* 2. Panel Lateral */}
      {/* CAMBIO: 'w-full' en móvil para ocupar todo el ancho. 'md:max-w-md' en escritorio para ser sidebar. */}
      <div className="relative w-full md:max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-primary-100 flex justify-between items-center bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-primary-50 p-2 rounded-full text-primary-900">
                <ShoppingBag size={20} strokeWidth={2} />
            </div>
            <div>
                <h2 className="font-serif text-xl text-primary-900 leading-none">Mi Rutina</h2>
                <p className="text-xs text-primary-500 mt-1">{items.length} productos seleccionados</p>
            </div>
          </div>
          <button 
            onClick={toggleCart} 
            className="p-2 hover:bg-primary-50 rounded-full transition-colors text-primary-400 hover:text-primary-900"
          >
            <X size={26} />
          </button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
              <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center text-primary-300">
                <ShoppingBag size={48} strokeWidth={1} />
              </div>
              <div>
                <h3 className="text-lg font-serif text-primary-900 mb-2">Tu rutina está vacía</h3>
                <p className="text-primary-500 text-sm max-w-[200px] mx-auto">
                  Explora nuestro catálogo para encontrar el cuidado ideal para ti.
                </p>
              </div>
              <button 
                onClick={toggleCart}
                className="bg-primary-900 text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-primary-800 transition-colors"
              >
                Explorar Productos
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button 
                  onClick={clearCart}
                  className="text-xs text-red-400 hover:text-red-600 flex items-center gap-1 font-medium transition-colors px-2 py-1 hover:bg-red-50 rounded"
                >
                  <Trash2 size={12} />
                  Vaciar carrito
                </button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex gap-4 group bg-white">
                  {/* Imagen */}
                  <div className="relative w-24 h-28 bg-primary-50 rounded-xl overflow-hidden flex-shrink-0 border border-primary-100">
                    <Image 
                      src={item.images[0]} 
                      alt={item.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="font-medium text-primary-900 line-clamp-2 leading-tight text-base">
                            {item.name}
                        </h3>
                        <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-primary-300 hover:text-red-500 transition-colors p-1 -mt-1 -mr-1"
                        >
                            <X size={18} />
                        </button>
                      </div>
                      <p className="text-xs text-primary-500 mt-1 bg-primary-50 inline-block px-2 py-0.5 rounded-full">
                        {item.category}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                        <div className="flex items-center gap-3 bg-primary-50 rounded-full px-3 py-1">
                            <span className="text-xs font-bold text-primary-900">x{item.quantity}</span>
                        </div>
                        <div className="text-base font-bold text-primary-900">
                            {formatPrice(item.price * item.quantity)}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer (Checkout) */}
        {items.length > 0 && (
          // CAMBIO: pb-8 md:pb-6 para dar espacio en móviles (Safe Area)
          <div className="p-6 border-t border-primary-100 bg-primary-50 space-y-4 pb-8 md:pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-20">
            
            {/* Resumen */}
            <div className="space-y-2 mb-2">
                <div className="flex justify-between items-center text-primary-600 text-sm">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-serif text-primary-900 font-bold border-t border-primary-200 pt-3">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
                </div>
            </div>
            
            {/* Botón WhatsApp Optimizado */}
            <button 
              onClick={handleCheckout}
              className="group w-full bg-[#25D366] text-white py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 hover:bg-[#20bd5a] transition-all transform active:scale-[0.98] shadow-lg shadow-green-200"
            >
              <span>Pedir por WhatsApp</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            {/* Trust Badges */}
            <div className="flex justify-center items-center gap-2 text-[10px] text-primary-400">
                <ShieldCheck size={12} />
                <span>Pago seguro acordado en el chat</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}