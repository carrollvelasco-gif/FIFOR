export interface ProductData {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  description: string;
  images: string[];
  categoryId: string;
  category: { name: string; slug: string };
  subcategory?: string;
  sizes: string[];
  colors: string[];
  stock: number;
  material: string | null;
  isFeatured: boolean;
}

export const products: ProductData[] = [
  {
    id: "1",
    name: "Camiseta Verano",
    slug: "camiseta-verano",
    price: 31900,
    compareAtPrice: 42900,
    description:
      "Camiseta de manga corta con corte relajado. Confeccionada en algodón suave y fresco, ideal para los días cálidos. Combina perfecto con jeans, shorts o faldas. Disponible en varios colores.",
    images: [
      "/productos/mujer/camiseta-verano.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "mujer",
    category: { name: "Mujer", slug: "mujer" },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanco", "Rosa", "Celeste"],
    stock: 15,
    material: "Algodón",
    isFeatured: true,
  },
  {
    id: "2",
    name: "Camiseta Lino Blanca",
    slug: "camiseta-lino-blanca",
    price: 45900,
    compareAtPrice: null,
    description:
      "Camiseta de lino 100% natural con corte clásico. Tejido transpirable que brinda frescura y comodidad. Perfecta para looks casuales y elegantes.",
    images: [
      "/productos/hombre/camiseta-lino-blanca.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "hombre",
    category: { name: "Hombre", slug: "hombre" },
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Blanco", "Beige"],
    stock: 10,
    material: "Lino",
    isFeatured: true,
  },
  {
    id: "3",
    name: "Camiseta Estampada Roja",
    slug: "camiseta-estampada-roja",
    price: 25900,
    compareAtPrice: null,
    description:
      "Camiseta con estampado floral en tonos rojos. Corte femenino con mangas cortas. Ideal para darle un toque de color a tu guardarropa.",
    images: [
      "/productos/mujer/camiseta-estam-roja.jpeg",
      "/placeholder.svg",
    ],
    categoryId: "mujer",
    category: { name: "Mujer", slug: "mujer" },
    sizes: ["XS", "S", "M", "L"],
    colors: ["Rojo", "Blanco"],
    stock: 20,
    material: "Algodón",
    isFeatured: true,
  },
  {
    id: "4",
    name: "Camiseta Negra Estampada",
    slug: "camiseta-negra-estampada",
    price: 49900,
    compareAtPrice: null,
    description:
      "Camiseta negra con estampado minimalista. Corte regular en algodón de alta calidad. Un básico versátil para cualquier ocasión.",
    images: [
      "/productos/hombre/camiseta-negra-estam.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "hombre",
    category: { name: "Hombre", slug: "hombre" },
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Negro"],
    stock: 12,
    material: "Algodón",
    isFeatured: true,
  },
  {
    id: "5",
    name: "Camiseta Niño Estampado Azul",
    slug: "camiseta-nino-estampado-azul",
    price: 19900,
    compareAtPrice: null,
    description:
      "Camiseta infantil con estampado divertido en azul. Confeccionada en algodón orgánico suave para la piel de los más pequeños. Ideal para jugar y estar cómodo.",
    images: [
      "/productos/ninos/camiseta-estampado-azul.jpeg",
      "/placeholder.svg",
    ],
    categoryId: "ninos",
    category: { name: "Niños", slug: "ninos" },
    sizes: ["6", "8", "10", "12", "14"],
    colors: ["Azul", "Gris"],
    stock: 25,
    material: "Algodón orgánico",
    isFeatured: true,
  },
  {
    id: "6",
    name: "Camiseta Estampada Verano",
    slug: "camiseta-estampada-verano",
    price: 45900,
    compareAtPrice: null,
    description:
      "Camiseta de verano con estampado tropical. Corte ligero y fresco. Perfecta para días de playa, paseos o reuniones casuales.",
    images: [
      "/productos/mujer/camiseta-estampada-verano.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "mujer",
    category: { name: "Mujer", slug: "mujer" },
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanco", "Verde"],
    stock: 8,
    material: "Algodón",
    isFeatured: true,
  },
  {
    id: "7",
    name: "Camiseta Niña Estampada",
    slug: "camiseta-nina-estampada",
    price: 19900,
    compareAtPrice: 25900,
    description:
      "Camiseta para niña con estampado colorido. Algodón suave y transpirable. Corte cómodo para jugar y moverse libremente.",
    images: [
      "/productos/ninos/camiseta-estampada.jpeg",
      "/placeholder.svg",
    ],
    categoryId: "ninos",
    category: { name: "Niños", slug: "ninos" },
    sizes: ["6", "8", "10", "12", "14"],
    colors: ["Rosa", "Blanco", "Morado"],
    stock: 18,
    material: "Algodón",
    isFeatured: true,
  },
  {
    id: "8",
    name: "Vela Aromática",
    slug: "vela-aromatica",
    price: 19900,
    compareAtPrice: null,
    description:
      "Vela aromática artesanal con fragancia a vainilla y sándalo. Hecha con cera de soja natural. Quema limpia y duradera. Ideal para crear ambientes acogedores.",
    images: [
      "/productos/accesorios/vela-aromatica.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "accesorios",
    category: { name: "Accesorios", slug: "accesorios" },
    sizes: ["Única"],
    colors: ["Beige", "Blanco"],
    stock: 30,
    material: "Cera de soja",
    isFeatured: true,
  },
  {
    id: "9",
    name: "Bolso Bandolera Cuero",
    slug: "bolso-bandolera-cuero",
    price: 89900,
    compareAtPrice: 119900,
    description:
      "Bolso bandolera en cuero genuino con acabado premium. Compartimento principal con cierre. Correa ajustable. Ideal para el día a día con estilo.",
    images: [
      "/productos/accesorios/bolso-bandolera.jpeg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    categoryId: "accesorios",
    category: { name: "Accesorios", slug: "accesorios" },
    sizes: ["Única"],
    colors: ["Negro", "Café"],
    stock: 6,
    material: "Cuero genuino",
    isFeatured: false,
  },
  {
    id: "10",
    name: "Reloj Minimalista",
    slug: "reloj-minimalista",
    price: 129900,
    compareAtPrice: null,
    description:
      "Reloj con diseño minimalista y correa de cuero. Esfera blanca con detalles dorados. Resistente al agua. Un accesorio elegante para cualquier ocasión.",
    images: [
      "/productos/accesorios/reloj-minimalista.jpeg",
      "/placeholder.svg",
    ],
    categoryId: "accesorios",
    category: { name: "Accesorios", slug: "accesorios" },
    sizes: ["Única"],
    colors: ["Dorado", "Plateado"],
    stock: 0,
    material: "Acero inoxidable",
    isFeatured: false,
  },
  {
    id: "11",
    name: "Camiseta Coordinada Mam\u00E1 e Hija",
    slug: "camiseta-coordinada-mama-e-hija",
    price: 49900,
    compareAtPrice: null,
    description:
      "Set coordinado de camisetas para mam\u00E1 e hija. Dise\u00F1o exclusivo FIFOR con estampado de coraz\u00F3n a juego. Confeccionadas en algod\u00F3n suave. Incluye tallas para adulto y ni\u00F1a.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "mama-e-hija",
    sizes: ["S", "M", "L", "XL", "6", "8", "10", "12"],
    colors: ["Blanco", "Rosa", "Gris"],
    stock: 10,
    material: "Algod\u00F3n",
    isFeatured: true,
  },
  {
    id: "12",
    name: "Camiseta Coordinada Mam\u00E1 e Hijo",
    slug: "camiseta-coordinada-mama-e-hijo",
    price: 49900,
    compareAtPrice: null,
    description:
      "Set coordinado de camisetas para mam\u00E1 e hijo. Dise\u00F1o divertido con estampado de cohete a juego. Algod\u00F3n de alta calidad para toda la familia.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "mama-e-hijo",
    sizes: ["S", "M", "L", "XL", "6", "8", "10", "12"],
    colors: ["Blanco", "Azul", "Gris"],
    stock: 8,
    material: "Algod\u00F3n",
    isFeatured: false,
  },
  {
    id: "13",
    name: "Camiseta Coordinada Pap\u00E1 e Hijo",
    slug: "camiseta-coordinada-papa-e-hijo",
    price: 51900,
    compareAtPrice: null,
    description:
      "Set coordinado de camisetas para pap\u00E1 e hijo. Estampado de bal\u00F3n de f\u00FAtbol a juego. Perfectas para ver el partido o jugar juntos. Algod\u00F3n transpirable.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "papa-e-hijo",
    sizes: ["M", "L", "XL", "2XL", "6", "8", "10", "12"],
    colors: ["Blanco", "Azul Marino", "Gris"],
    stock: 12,
    material: "Algod\u00F3n",
    isFeatured: false,
  },
  {
    id: "14",
    name: "Camiseta Coordinada Pap\u00E1 e Hija",
    slug: "camiseta-coordinada-papa-e-hija",
    price: 51900,
    compareAtPrice: null,
    description:
      "Set coordinado de camisetas para pap\u00E1 e hija. Dise\u00F1o con estampado de estrella a juego. C\u00F3modas y frescas para cualquier plan en familia.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "papa-e-hija",
    sizes: ["M", "L", "XL", "2XL", "6", "8", "10", "12"],
    colors: ["Blanco", "Rosa", "Gris"],
    stock: 9,
    material: "Algod\u00F3n",
    isFeatured: false,
  },
  {
    id: "15",
    name: "Camiseta Coordinada Parejas",
    slug: "camiseta-coordinada-parejas",
    price: 69900,
    compareAtPrice: 84900,
    description:
      "Set coordinado de camisetas para pareja. Dise\u00F1o exclusivo que forma una imagen completa cuando est\u00E1n juntos. Algod\u00F3n premium. Incluye dos camisetas.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "parejas",
    sizes: ["S", "M", "L", "XL", "2XL"],
    colors: ["Blanco", "Negro"],
    stock: 15,
    material: "Algod\u00F3n premium",
    isFeatured: true,
  },
  {
    id: "16",
    name: "Camiseta Coordinada Toda la Familia",
    slug: "camiseta-coordinada-toda-la-familia",
    price: 89900,
    compareAtPrice: 109900,
    description:
      "Pack familiar de camisetas coordinadas para toda la familia. Incluye tallas para adulto y ni\u00F1os. Dise\u00F1o \u00FAnico FIFOR que une a la familia. Algod\u00F3n de la mejor calidad.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    categoryId: "en-familia",
    category: { name: "En Familia", slug: "en-familia" },
    subcategory: "toda-la-familia",
    sizes: ["S", "M", "L", "XL", "6", "8", "10", "12", "14"],
    colors: ["Blanco", "Gris", "Azul"],
    stock: 6,
    material: "Algod\u00F3n",
    isFeatured: true,
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  categoryId: string,
  currentSlug: string,
  limit = 4
): ProductData[] {
  return products
    .filter((p) => p.categoryId === categoryId && p.slug !== currentSlug)
    .slice(0, limit);
}

export function getFeaturedProducts(): ProductData[] {
  return products.filter((p) => p.isFeatured);
}
