"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types/product';

// CartItem hereda automáticamente 'images' y 'usage' de Product
export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void; // <--- Agregamos esta utilidad extra
  isCartOpen: boolean;
  toggleCart: () => void;
  total: number;
  count: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Cargar del LocalStorage (RF-07 adelantado)
  useEffect(() => {
    const savedCart = localStorage.getItem('mi-rutina-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al cargar el carrito", error);
        localStorage.removeItem('mi-rutina-cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // 2. Guardar en LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('mi-rutina-cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  // Agregar
  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Eliminar un producto
  const removeFromCart = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
  };

  // Vaciar todo (Nuevo)
  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Cálculos
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, isCartOpen, toggleCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}