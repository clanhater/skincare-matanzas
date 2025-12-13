export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    category: 'Limpieza' | 'Hidratación' | 'Tratamiento' | 'Protección';
    concern: 'Acné' | 'Manchas' | 'Anti-edad' | 'Sensible' | 'Todas';
    description: string;
    ingredients: string;
    usage: string;
    images: string[];
    inStock: boolean;
}