import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Quitamos cualquier padding o margin del main para que el Hero toque el borde superior */}
      <main className="min-h-screen bg-primary-50">
        <Hero />
        <Catalog />
      </main>
      <Footer />
    </>
  );
}