"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Product } from "@prisma/client";

// Acción 1: Cambiar Stock (Interruptor)
export async function toggleProductStock(id: number, currentStatus: boolean) {
  try {
    await prisma.product.update({
      where: { id },
      data: { inStock: !currentStatus },
    });
    // Esto refresca la página automáticamente para ver el cambio
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al actualizar stock" };
  }
}

// Acción 2: Borrar Producto
export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Error al eliminar producto" };
  }
}

// Acción 3: Cerrar Sesión
export async function logout() {
  // Borrar la cookie
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

// Acción 4: Guardar Producto (Crear o Actualizar)
export async function saveProduct(data: FormData) {
  // Convertimos el FormData a un objeto usable
  const productData = {
    name: data.get("name") as string,
    slug: data.get("slug") as string,
    price: parseFloat(data.get("price") as string),
    category: data.get("category") as string,
    concern: data.get("concern") as string,
    description: data.get("description") as string,
    ingredients: data.get("ingredients") as string,
    usage: data.get("usage") as string,
    storage: data.get("storage") as string,
    expiry: data.get("expiry") as string,
    images: [data.get("image1") as string, data.get("image2") as string].filter(Boolean), // Filtramos vacíos
    inStock: data.get("inStock") === "on",
  };

  const id = data.get("id");

  try {
    if (id && id !== "nuevo") {
      // ACTUALIZAR existente
      await prisma.product.update({
        where: { id: parseInt(id as string) },
        data: productData,
      });
    } else {
      // CREAR nuevo
      await prisma.product.create({
        data: productData,
      });
    }

    revalidatePath("/admin");
    revalidatePath("/catalogo");
    revalidatePath("/"); // Actualizar home por si es destacado
    return { success: true };
    
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al guardar en la base de datos." };
  }
}