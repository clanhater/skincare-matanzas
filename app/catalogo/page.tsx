import { Suspense } from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogClient from '@/components/CatalogClient';
import CatalogLoading from '@/components/CatalogLoading';

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 md:pt-32 bg-primary-50">
        {/* Aquí está la magia: Suspense */}
        {/* Next.js renderizará el 'fallback' en el servidor */}
        {/* y esperará a que el navegador renderice CatalogClient */}
        <Suspense fallback={<CatalogLoading />}>
          <CatalogClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}