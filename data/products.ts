import { Product } from "@/types/product";

export const products: Product[] = [
    {
        id: 1,
        name: "Serum Radiance Vitamina C",
        slug: "serum-radiance-vitamina-c",
        price: 25000,
        category: "Tratamiento",
        concern: "Manchas",
        description: "Un potente antioxidante que ilumina tu piel desde la primera aplicación. Su fórmula estable previene la oxidación y combate los radicales libres, unificando el tono de la piel progresivamente.",
        ingredients: "Vitamina C pura 15% (Ácido L-Ascórbico), Ácido Hialurónico de bajo peso molecular, Vitamina E, Ferulic Acid.",
        usage: "Aplica 3-4 gotas sobre la piel limpia y seca por la mañana. Distribuye con suaves toques hasta su absorción. Es indispensable usar protector solar después.",
        images: [
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1515688594390-b649af70d282?auto=format&fit=crop&q=80&w=600"
        ],
        inStock: true
    },
    {
        id: 2,
        name: "Crema Hidratante Nube",
        slug: "crema-hidratante-nube",
        price: 18500,
        category: "Hidratación",
        concern: "Sensible",
        description: "Hidratación profunda con textura ligera como una nube. Formulada para reparar la barrera cutánea sin dejar sensación grasa. Ideal para climas húmedos o pieles mixtas.",
        ingredients: "Ceramidas NP/AP/EOP, Agua Termal Mineralizante, Pantenol (Vitamina B5), Escualano Vegetal.",
        usage: "Úsala mañana y noche como último paso de tu rutina (o antes del protector solar en el día). Aplica una cantidad del tamaño de una almendra en rostro y cuello.",
        images: [
            "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1556228720-1957be979e2c?auto=format&fit=crop&q=80&w=600"
        ],
        inStock: true
    },
    {
        id: 3,
        name: "Limpiador pH Balanceado",
        slug: "limpiador-ph-balanceado",
        price: 15000,
        category: "Limpieza",
        concern: "Acné",
        description: "Un gel espumoso suave que elimina impurezas, exceso de grasa y maquillaje ligero sin dañar la barrera de la piel. Mantiene el pH fisiológico para evitar la resequedad.",
        ingredients: "Ácido Salicílico 0.5% (Exfoliante suave), Extracto de Té Verde, Aloe Vera, Zinc PCA.",
        usage: "Humedece tu rostro con agua tibia. Masajea una pequeña cantidad de gel sobre la piel durante 60 segundos. Enjuaga con abundante agua.",
        images: [
            "https://images.unsplash.com/photo-1556228720-1957be979e2c?auto=format&fit=crop&q=80&w=600"
        ],
        inStock: true
    },
    {
        id: 4,
        name: "Tónico Exfoliante Glow",
        slug: "tonico-exfoliante-glow",
        price: 22000,
        category: "Tratamiento",
        concern: "Manchas",
        description: "Tónico suave con ácidos AHA que renueva la superficie de la piel, eliminando células muertas y revelando una piel más luminosa y suave.",
        ingredients: "Ácido Glicólico 5%, Agua de Rosas, Ginseng.",
        usage: "Usar solo en la rutina de noche, 2 o 3 veces por semana. Aplicar con un algodón sobre la piel limpia evitando el contorno de ojos.",
        images: [
            "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600"
        ],
        inStock: true
    }
];