import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";
import { products as localProducts } from "@/data/products"; // Datos locales de respaldo

export default async function ProductEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === 'nuevo';
  
  let product = null;
  let isOffline = false;

  if (!isNew) {
    const productId = parseInt(id);
    
    try {
      // 1. Intentar buscar en la DB Real
      product = await prisma.product.findUnique({
        where: { id: productId },
      });
    } catch (error) {
      // 2. Si falla (Cuba/Offline), buscar en archivo local
      console.log("Modo Offline: Buscando en archivo local");
      isOffline = true;
      const found = localProducts.find(p => p.id === productId);
      
      // Adaptamos el tipo local al tipo de la DB (fechas simuladas)
      if (found) {
        product = {
          ...found,
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-primary-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-serif text-xl text-primary-900 font-bold flex items-center gap-2">
            {isNew ? "✨ Nuevo Producto" : "✏️ Editar Producto"}
            {isOffline && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-sans">Modo Diseño</span>}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <ProductForm product={product} isNew={isNew} />
      </div>
    </div>
  );
}