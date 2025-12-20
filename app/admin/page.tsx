import { prisma } from "@/lib/prisma";
import DashboardClient from "@/components/admin/DashboardClient"; // El componente nuevo
import { LogOut } from "lucide-react";
import { logout } from "./actions";
import { products as localProducts } from "@/data/products";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  let products = [];
  let isOfflineMode = false;

  try {
    products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    console.log("Modo Offline activado");
    isOfflineMode = true;
    products = localProducts.map(p => ({
      ...p,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Header Fijo */}
      <div className="bg-white border-b border-primary-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="font-serif text-lg text-primary-900 font-bold tracking-wide">
              PANEL ADMIN
            </h1>
            {isOfflineMode && <span className="text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Offline</span>}
          </div>
          
          <form action={logout}>
            <button className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-red-600 uppercase tracking-wider transition-colors">
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </form>
        </div>
      </div>

      {/* Aquí cargamos el cliente con buscador */}
      <DashboardClient products={products} />
      
    </div>
  );
}