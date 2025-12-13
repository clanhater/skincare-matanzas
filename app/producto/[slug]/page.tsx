import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import Accordion from "@/components/Accordion";
import MobileStickyBar from "@/components/MobileStickyBar";
import { formatPrice } from "@/utils/format";

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      
      {/* Padding bottom extra en móvil para la barra fija */}
      <main className="min-h-screen pt-24 md:pt-32 pb-32 md:pb-20 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
            
            {/* 1. Galería */}
            {/* CORRECCIÓN APLICADA AQUÍ: */}
            {/* 'relative' en móvil (se mueve con el scroll) */}
            {/* 'md:sticky' en escritorio (se queda fijo al lado del texto) */}
            <div className="relative md:sticky md:top-32 z-0 md:z-10">
                <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* 2. Información */}
            <div className="space-y-6 md:space-y-8">
              
              <div>
                <span className="text-primary-500 font-medium uppercase tracking-wider text-[10px] md:text-sm bg-white px-3 py-1 rounded-full border border-primary-100">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-serif text-primary-900 mt-4 mb-2 md:mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Precio visible en Desktop */}
                <p className="text-2xl md:text-3xl font-medium text-primary-800 font-sans">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="prose prose-brown text-primary-700 leading-relaxed text-base md:text-lg">
                <p>{product.description}</p>
              </div>

              {/* Botón Grande (Solo Desktop) */}
              <div className="hidden md:block py-4">
                <AddToCartButton product={product} />
              </div>

              {/* Acordeones */}
              <div className="pt-4 border-t border-primary-100">
                <Accordion title="Ingredientes Clave">
                  <p className="mb-2 text-sm text-primary-500 font-medium">Fórmula destacada:</p>
                  <p className="text-primary-700">{product.ingredients}</p>
                </Accordion>

                <Accordion title="Modo de Uso">
                  <p className="text-primary-700">{product.usage}</p>
                </Accordion>

                <Accordion title="Envíos y Entregas">
                  <p className="text-primary-700">
                    Envíos a todo el país. Coordina tu entrega vía WhatsApp al finalizar tu pedido.
                  </p>
                </Accordion>
                
                <div className="mt-6 flex items-center gap-2">
                    <span className="text-xs font-bold text-primary-400 uppercase tracking-widest">Ideal para:</span>
                    <span className="text-sm font-medium text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                        {product.concern}
                    </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* BARRA FIJA MÓVIL */}
      <MobileStickyBar product={product} />

      <Footer />
    </>
  );
}