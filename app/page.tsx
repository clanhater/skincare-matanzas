import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Home() {
  // Seleccionamos solo 8 productos destacados para la Home
  const featuredProducts = products.filter(p => p.inStock).slice(0, 8);
  const categories = [
      { name: "Jabones", img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600" },
      { name: "Serums", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600" },
      { name: "Aceites", img: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=600" },
      { name: "Cabello", img: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?q=80&w=600" },
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
                    <Link key={cat.name} href={`/catalogo?categoria=${cat.name}`} className="group relative aspect-[4/5] rounded-xl overflow-hidden">
                        <Image src={cat.img} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h3 className="text-white text-2xl font-serif">{cat.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Sección "Productos Destacados" */}
        <section id="catalogo" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-serif text-primary-900">Nuestros Destacados</h2>
                    <p className="text-primary-500 mt-2">Una selección especial de los favoritos de nuestros clientes.</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
                <div className="mt-16 text-center">
                    <Link href="/catalogo" className="inline-flex items-center gap-2 bg-primary-900 text-white px-8 py-4 rounded-full font-medium transition-transform hover:scale-105">
                        Ver todo el catálogo <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}