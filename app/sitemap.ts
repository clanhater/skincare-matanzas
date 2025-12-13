import { MetadataRoute } from 'next';
import { products } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
  // CAMBIA ESTO por tu dominio real de Vercel
  const baseUrl = 'https://skincare-matanzas.vercel.app';

  // 1. Definir rutas estáticas
  const routes = [
    '',
    '#catalogo',
    '#nosotros',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1,
  }));

  // 2. Generar rutas dinámicas para cada producto
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/producto/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...routes, ...productRoutes];
}