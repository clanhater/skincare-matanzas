"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Save, ArrowLeft, Link as LinkIcon, Info, Layers, Beaker, Package } from "lucide-react";
import { saveProduct } from "@/app/admin/actions";
import Link from "next/link";

interface ProductFormProps {
  product?: any;
  isNew: boolean;
}

export default function ProductForm({ product, isNew }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Estado local para manejo visual inmediato
  const [name, setName] = useState(product?.name || "");
  const [slug, setSlug] = useState(product?.slug || "");
  const [image1, setImage1] = useState(product?.images?.[0] || "");
  const [image2, setImage2] = useState(product?.images?.[1] || "");

  // Generador automático de Slug (URL amigable)
  useEffect(() => {
    if (isNew) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setSlug(generatedSlug);
    }
  }, [name, isNew]);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    
    // Llamamos a la Server Action
    const result = await saveProduct(formData);

    if (result.success) {
      alert("✅ Producto guardado correctamente");
      router.push("/admin");
      router.refresh();
    } else {
      alert("❌ Error: " + (result.error || "No se pudo guardar (¿Estás en modo local?)"));
      setLoading(false);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-8 animate-fade-in-up">
      <input type="hidden" name="id" value={product?.id || "nuevo"} />

      {/* --- SECCIÓN 1: IDENTIDAD Y PRECIO --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-6 border-b border-primary-50 pb-4">
          <Info className="text-primary-400" size={20} />
          <h2 className="text-lg font-bold text-primary-900">Información Principal</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del Producto</label>
            <input 
              name="name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all text-lg font-medium"
              placeholder="Ej: Jabón de Avena Sanem"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Slug (URL)</label>
            <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-1">/producto/</span>
                <input 
                name="slug"
                type="text" 
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:bg-white focus:ring-1 focus:ring-primary-500 outline-none font-mono text-gray-600"
                />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Precio (CUP)</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input 
                name="price"
                type="number" 
                required
                defaultValue={product?.price}
                className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-1 focus:ring-primary-500 outline-none font-medium"
                />
            </div>
          </div>
        </div>
      </div>

      {/* --- SECCIÓN 2: CLASIFICACIÓN --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-6 border-b border-primary-50 pb-4">
          <Layers className="text-primary-400" size={20} />
          <h2 className="text-lg font-bold text-primary-900">Clasificación</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Categoría</label>
                <select 
                    name="category"
                    defaultValue={product?.category || "Jabones"}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none bg-white cursor-pointer"
                >
                    <option value="Jabones">🧼 Jabones</option>
                    <option value="Aceites">💧 Aceites</option>
                    <option value="Serums">🧪 Serums</option>
                    <option value="Cremas">🧴 Cremas</option>
                    <option value="Cabello">💇‍♀️ Cabello</option>
                    <option value="Geles">🧊 Geles</option>
                    <option value="Tratamiento">🩹 Tratamiento</option>
                    <option value="Otros">✨ Otros</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Preocupación / Necesidad</label>
                <input 
                    name="concern"
                    type="text" 
                    required
                    defaultValue={product?.concern}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                    placeholder="Ej: Acné, Manchas, Piel Seca"
                />
            </div>
        </div>
      </div>

      {/* --- SECCIÓN 3: IMÁGENES --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-6 border-b border-primary-50 pb-4">
          <LinkIcon className="text-primary-400" size={20} />
          <h2 className="text-lg font-bold text-primary-900">Imágenes (URLs)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Imagen 1 */}
            <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase">Imagen Principal</label>
                <input 
                    name="image1"
                    type="text" 
                    value={image1}
                    onChange={(e) => setImage1(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                    placeholder="https://..."
                />
                <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
                    {image1 ? (
                        <Image src={image1} alt="Preview 1" fill className="object-cover" />
                    ) : (
                        <span className="text-gray-300 text-xs">Vista previa</span>
                    )}
                </div>
            </div>

            {/* Imagen 2 */}
            <div className="space-y-3">
                <label className="block text-xs font-bold text-gray-500 uppercase">Imagen Secundaria (Textura)</label>
                <input 
                    name="image2"
                    type="text" 
                    value={image2}
                    onChange={(e) => setImage2(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                    placeholder="https://..."
                />
                <div className="relative w-full aspect-square bg-gray-50 rounded-xl overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
                    {image2 ? (
                        <Image src={image2} alt="Preview 2" fill className="object-cover" />
                    ) : (
                        <span className="text-gray-300 text-xs">Vista previa</span>
                    )}
                </div>
            </div>
        </div>
      </div>

      {/* --- SECCIÓN 4: DETALLES --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-6 border-b border-primary-50 pb-4">
          <Beaker className="text-primary-400" size={20} />
          <h2 className="text-lg font-bold text-primary-900">Detalles Técnicos</h2>
        </div>

        <div className="space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Descripción Comercial</label>
                <textarea 
                    name="description"
                    rows={3}
                    required
                    defaultValue={product?.description}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Ingredientes / Propiedades</label>
                    <textarea 
                        name="ingredients"
                        rows={4}
                        required
                        defaultValue={product?.ingredients}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Modo de Uso</label>
                    <textarea 
                        name="usage"
                        rows={4}
                        required
                        defaultValue={product?.usage}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                    />
                </div>
            </div>
        </div>
      </div>

      {/* --- SECCIÓN 5: LOGÍSTICA --- */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-primary-100">
        <div className="flex items-center gap-2 mb-6 border-b border-primary-50 pb-4">
          <Package className="text-primary-400" size={20} />
          <h2 className="text-lg font-bold text-primary-900">Logística</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Almacenaje</label>
                <input 
                    name="storage"
                    type="text" 
                    defaultValue={product?.storage || "Lugar fresco"}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                />
            </div>
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Caducidad</label>
                <input 
                    name="expiry"
                    type="text" 
                    defaultValue={product?.expiry || "6 meses"}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none"
                />
            </div>
            
            <div className="flex items-center gap-3 bg-green-50 p-3 rounded-xl border border-green-100">
                <input 
                    name="inStock"
                    type="checkbox" 
                    id="stockToggle"
                    defaultChecked={product?.inStock ?? true}
                    className="w-5 h-5 text-primary-900 rounded focus:ring-primary-500 border-gray-300"
                />
                <label htmlFor="stockToggle" className="text-sm font-bold text-green-800 cursor-pointer">
                    Producto Disponible (Stock)
                </label>
            </div>
        </div>
      </div>

      {/* --- BARRA DE ACCIÓN FLOTANTE --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-lg z-40 flex justify-center gap-4">
        <Link 
            href="/admin" 
            className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
            <ArrowLeft size={20} />
            Cancelar
        </Link>
        
        <button 
            type="submit" 
            disabled={loading}
            className="px-8 py-3 rounded-full bg-primary-900 text-white font-bold hover:bg-primary-800 transition-all shadow-lg hover:shadow-primary-900/30 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {loading ? (
                <span>Guardando...</span>
            ) : (
                <>
                    <Save size={20} />
                    Guardar Producto
                </>
            )}
        </button>
      </div>
      
      {/* Espaciador para que la barra flotante no tape contenido */}
      <div className="h-20"></div>
    </form>
  );
}