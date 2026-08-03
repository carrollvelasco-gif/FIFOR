export const SITE_CONFIG = {
  name: "FIFOR",
  tagline: "",
  description:
    "FIFOR es una tienda online especializada en prendas, accesorios y productos personalizados de alta calidad.",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  locale: "es-MX",
  social: {
    instagram: "https://instagram.com/fifor",
    facebook: "https://facebook.com/fifor",
    tiktok: "https://tiktok.com/@fifor",
  },
  email: "hola@fifor.mx",
  phone: "302 804 3427",
  whatsapp: "573028043427",
  address: "Bucaramanga, Santander, Colombia",
  shipping: {
    freeFrom: 999,
    standard: 99,
    express: 199,
  },
} as const;

export const CATEGORIES = [
  { name: "Mujer", slug: "mujer", image: "" },
  { name: "Hombre", slug: "hombre", image: "" },
  { name: "Niños", slug: "ninos", image: "" },
  { name: "En Familia", slug: "en-familia", image: "" },
  { name: "Accesorios", slug: "accesorios", image: "" },
] as const;

export const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Personaliza", href: "/personalizar" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
] as const;
