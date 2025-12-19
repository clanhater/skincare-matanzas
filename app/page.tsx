import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredIds = [3, 27, 26, 81, 83, 89, 77, 61, 62, 63, 35, 32];

  // Filtramos la base de datos para obtener solo esos productos
  const featuredProducts = products.filter(p => featuredIds.includes(p.id));
  const categories = [
      { name: "Cremas", img: "https://assets.olaclick.app/companies/products/images/800/d1536821-b7a2-40e4-8e4a-f1382e94f936.jpeg" },
      { name: "Serums", img: "https://assets.olaclick.app/companies/products/images/800/a79357a9-6d00-4693-ad66-00bc94a39d57.png" },
      { name: "Aceites", img: "https://assets.olaclick.app/companies/products/images/800/b84ffa1d-e2f4-48f7-87d9-877887f48611.png" },
      { name: "Cabello", img: "https://assets.olaclick.app/companies/products/images/800/2bae74fc-8ba5-47b1-b692-41c35965d497.png" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-primary-50">
        <Hero />
        
        {/* Sección "Explorar por Categoría" */}
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-serif text-primary-900">Explora por Categoría</h2>
                <p className="text-primary-500 mt-2">Encuentra exactamente lo que necesitas.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {categories.map(cat => (
                    <Link key={cat.name} href={`/catalogo?categoria=${cat.name}`} className="group relative aspect-[4/5] rounded-xl overflow-hidden shadow-sm">
                        <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-serif font-bold tracking-wide drop-shadow-md">{cat.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Sección "Nuestros Favoritos" (Los 12 productos) */}
        <section id="catalogo" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-primary-900">Nuestros Favoritos</h2>
                    <p className="text-primary-500 mt-2">Los productos más amados por nuestros clientes en Matanzas.</p>
                </div>
                {/* Grid ajustado para mostrar los 12 productos cómodamente */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="mt-16 text-center">
                    <Link href="/catalogo" className="inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 shadow-lg shadow-primary-900/20">
                        Ver catálogo completo ({products.length}) <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}