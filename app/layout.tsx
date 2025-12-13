import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; 

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const lato = Lato({ weight: ["300", "400", "700"], subsets: ["latin"], variable: "--font-lato", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL('https://skincare-matanzas.vercel.app'), // Tu URL

  title: {
    default: "Una Talla Natural | Productos Salem en Matanzas",
    template: "%s | Una Talla Natural"
  },
  
  description: "Tienda oficial de Una Talla Natural en Matanzas. Catálogo completo de productos Salem: cuidado facial, corporal y capilar. Pedidos por WhatsApp.",
  
  keywords: [
    "productos salem cuba", 
    "una talla natural", 
    "skincare matanzas", 
    "salem cosmética natural", 
    "serums salem", 
    "belleza natural cuba"
  ],
  
  authors: [{ name: "Una Talla Natural" }],
  
  openGraph: {
    title: "Una Talla Natural | Catálogo Salem Matanzas",
    description: "Lo mejor de la cosmética Salem cerca de ti. Distribuidor en Matanzas.",
    locale: 'es_ES',
    type: 'website',
    siteName: 'Una Talla Natural',
    images: [
      {
        url: '/opengraph-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Catálogo de Skincare en Matanzas',
      },
    ],
  },
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