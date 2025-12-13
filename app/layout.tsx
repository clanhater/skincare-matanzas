import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });

export const metadata: Metadata = {
  // 1. Título Optimizado: Marca | Rubro | Ubicación
  title: {
    default: "Mi Rutina Skincare | Cuidado Facial en Matanzas, Cuba",
    template: "%s | Mi Rutina Skincare" // Esto permite que otras páginas cambien la primera parte
  },
  
  // 2. Descripción que vende y ubica
  description: "Catálogo de productos de skincare y rutinas faciales en Matanzas. Serums, hidratantes y limpiadores. Pedidos por WhatsApp con entrega local.",
  
  // 3. Palabras clave (Keywords)
  keywords: ["skincare cuba", "productos belleza matanzas", "cuidado facial", "serum vitamina c", "rutina piel grasa", "tienda skincare matanzas"],
  
  // 4. Autores y Creador
  authors: [{ name: "Tu Nombre o Marca" }],
  creator: "Tu Marca",
  
  // 5. Configuración para Robots (Permitir que Google lea todo)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 6. Open Graph (Cómo se ve cuando compartes el link en WhatsApp/Facebook/Telegram)
  // ¡Esto es vital en Cuba donde todo se mueve por redes sociales!
  openGraph: {
    title: "Mi Rutina Skincare | Productos en Matanzas",
    description: "Descubre tu rutina ideal. Catálogo de productos disponibles con entrega en Matanzas.",
    locale: 'es_ES', // O es_CO, es_MX, pero es_ES es estándar
    type: 'website',
    siteName: 'Mi Rutina Skincare',
    // images: ['/images/og-image.jpg'], // (Opcional: Si creas una imagen promocional de 1200x630px y la pones en public)
  },
  
  // 7. Verificación de Google (Aquí pondremos el código que te de GSC más adelante)
  verification: {
    google: "wDYhxaAR7MoqHfODWtivNAE4nLoIICGPFwkpJTcsWBw", // Lo llenaremos después
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable} antialiased bg-primary-50 text-primary-900`}>
        {/* Envolvemos la app con los Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}