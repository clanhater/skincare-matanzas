import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // CAMBIA ESTO por tu dominio real de Vercel
  const baseUrl = 'https://skincare-matanzas.vercel.app';

  return {
    rules: {
      userAgent: '*', // Permitir a todos los robots
      allow: '/',     // Permitir leer todo
      disallow: '/private/', // (Opcional) Si tuvieras algo privado
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}