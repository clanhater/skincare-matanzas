export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    category: 'Jabones' | 'Aceites' | 'Serums' | 'Cremas' | 'Cabello' | 'Geles' | 'Otros';
    concern: string; // Ej: "Acné", "Manchas", "Caída del cabello"
    description: string;
    ingredients: string; // "Información" en el PDF
    usage: string;       // "Modo de uso"
    storage: string;     // NUEVO: "Forma de almacenaje"
    expiry: string;      // NUEVO: "Tiempo de duración"
    images: string[];
    inStock: boolean;
}