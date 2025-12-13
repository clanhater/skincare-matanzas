import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCartButton from "@/components/AddToCartButton";
import ProductGallery from "@/components/ProductGallery";
import Accordion from "@/components/Accordion";
import MobileStickyBar from "@/components/MobileStickyBar";
import { formatPrice } from "@/utils/format";
import { Metadata } from "next"; // Importamos tipos para SEO

// 1. GENERACIÓN DE RUTAS ESTÁTICAS (Para velocidad)
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// 2. METADATOS DINÁMICOS (SEO TÉCNICO)
// Esto cambia el título de la pestaña y lo que sale en Google
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  // Título Estratégico: Nombre | Beneficio/Preocupación | Marca
  const title = `${product.name} - Para ${product.concern} | Mi Rutina Matanzas`;
  
  // Descripción: Usamos la del producto, truncada si es muy larga
  const description = product.description.substring(0, 160);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [{ url: product.images[0] }], // La foto sale al compartir en WhatsApp
    },
  };
}

// 3. COMPONENTE DE PÁGINA
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

  // 4. DATOS ESTRUCTURADOS (SCHEMA.ORG) - EL ARMA SECRETA
  // Esto le dice a Google: "Esto es un producto, cuesta tanto y está en stock"
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Mi Rutina Skincare"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://skincare-matanzas.vercel.app/producto/${product.slug}`, // Asegúrate de cambiar esto por tu dominio real
      "priceCurrency": "CUP", // Asumimos Peso Cubano (o cambia a USD)
      "price": product.price,
      "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  return (
    <>
      {/* Inyectamos el Schema Invisible */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />
      
      <main className="min-h-screen pt-24 md:pt-32 pb-32 md:pb-20 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
            
            {/* Galería */}
            <div className="relative md:sticky md:top-32 z-0 md:z-10">
                <ProductGallery images={product.images} name={product.name} />
            </div>

            {/* Información */}
            <div className="space-y-6 md:space-y-8">
              
              <div>
                <span className="text-primary-500 font-medium uppercase tracking-wider text-[10px] md:text-sm bg-white px-3 py-1 rounded-full border border-primary-100">
                  {product.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-serif text-primary-900 mt-4 mb-2 md:mb-4 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-2xl md:text-3xl font-medium text-primary-800 font-sans">
                  {formatPrice(product.price)}
                </p>
              </div>

              <div className="space-y-4">
                {/* H2 Semántico: Ayuda a Google a entender qué es este texto */}
                <h2 className="text-lg font-bold text-primary-900 font-serif">
                  Beneficios para tu piel
                </h2>
                <div className="prose prose-brown text-primary-700 leading-relaxed text-base md:text-lg">
                  <p>{product.description}</p>
                </div>
              </div>

              <div className="hidden md:block py-4">
                <AddToCartButton product={product} />
              </div>

              <div className="pt-4 border-t border-primary-100">
                <Accordion title="Ingredientes y Propiedades">
                  <p className="text-primary-700 leading-relaxed">{product.ingredients}</p>
                </Accordion>

                <Accordion title="Modo de Uso">
                  <p className="text-primary-700 leading-relaxed">{product.usage}</p>
                </Accordion>

                {/* NUEVO: Información de Conservación (Clave en Cuba) */}
                <Accordion title="Conservación y Duración">
                  <div className="space-y-3 text-primary-700">
                    <div>
                        <p className="font-medium text-primary-900 text-xs uppercase tracking-wider">Almacenaje</p>
                        <p>{product.storage}</p>
                    </div>
                    <div>
                        <p className="font-medium text-primary-900 text-xs uppercase tracking-wider">Caducidad estimada</p>
                        <p>{product.expiry}</p>
                    </div>
                    <p className="text-xs text-primary-400 italic mt-2">
                        * Al ser productos naturales Sanem, los colores pueden variar levemente por lote.
                    </p>
                  </div>
                </Accordion>

                <Accordion title="Envíos en Matanzas">
                  <p className="text-primary-700">
                    Coordinamos la entrega directamente a tu ubicación en Matanzas a través de WhatsApp. 
                    Pago en efectivo o transferencia al recibir.
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

      <MobileStickyBar product={product} />
      <Footer />
    </>
  );
}