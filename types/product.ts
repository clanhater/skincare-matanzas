export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    category: 'Jabones' | 'Aceites' | 'Serums' | 'Cremas' | 'Cabello' | 'Geles' | 'Tratamiento' | 'Otros';
    concern: string;
    description: string;
    ingredients: string;
    usage: string;
    storage: string;
    expiry: string;
    images: string[];
    inStock: boolean;
}