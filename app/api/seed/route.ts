import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Crearemos este archivo en el paso 3
import { products } from '@/data/products';

export async function GET() {
  try {
    // 1. Borrar datos viejos para no duplicar (opcional, por seguridad inicial)
    // await prisma.product.deleteMany({}); 

    // 2. Insertar los productos del archivo JSON a la DB
    // Usamos un bucle porque createMany a veces tiene limites en versiones free
    let count = 0;
    for (const product of products) {
      // Verificamos si ya existe por el slug para no duplicar
      const exists = await prisma.product.findUnique({
        where: { slug: product.slug }
      });

      if (!exists) {
        await prisma.product.create({
          data: {
            name: product.name,
            slug: product.slug,
            price: product.price,
            category: product.category,
            concern: product.concern,
            description: product.description,
            ingredients: product.ingredients,
            usage: product.usage,
            storage: product.storage,
            expiry: product.expiry,
            images: product.images,
            inStock: product.inStock,
          }
        });
        count++;
      }
    }

    return NextResponse.json({ 
      message: '¡Base de datos sembrada con éxito! 🌱', 
      productsAdded: count 
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al sembrar la DB' }, { status: 500 });
  }
}