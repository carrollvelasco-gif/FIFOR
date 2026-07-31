"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProductCard } from "@/components/product/product-card";
import { products } from "@/lib/products-data";
import { cn } from "@/lib/utils";

const categories = [
  { label: "Todos", slug: "" },
  { label: "Mujer", slug: "mujer" },
  { label: "Hombre", slug: "hombre" },
  { label: "Niños", slug: "ninos" },
  { label: "En Familia", slug: "en-familia" },
  { label: "Accesorios", slug: "accesorios" },
];

const subcategoriasEnFamilia = [
  { label: "Todas", slug: "" },
  { label: "Mamá e Hija", slug: "mama-e-hija" },
  { label: "Mamá e Hijo", slug: "mama-e-hijo" },
  { label: "Papá e Hijo", slug: "papa-e-hijo" },
  { label: "Papá e Hija", slug: "papa-e-hija" },
  { label: "Parejas", slug: "parejas" },
  { label: "Toda la Familia", slug: "toda-la-familia" },
];

export default function CatalogoPage() {
  const [activeCategory, setActiveCategory] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState("");

  const filtered = useMemo(() => {
    let result = activeCategory
      ? products.filter((p) => p.category.slug === activeCategory)
      : products;
    if (activeCategory === "en-familia" && activeSubcategory) {
      result = result.filter((p) => p.subcategory === activeSubcategory);
    }
    return result;
  }, [activeCategory, activeSubcategory]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveSubcategory("");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[40vh] min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src={
              activeCategory === "en-familia"
                ? "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=1600&q=80"
                : "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80"
            }
            alt={activeCategory === "en-familia" ? "En Familia FIFOR" : "Catálogo FIFOR"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {activeCategory === "en-familia" ? (
              <>
                <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
                  En Familia
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                  Viste momentos inolvidables
                </h1>
                <p className="text-white/70 mt-2 max-w-lg">
                  Encuentra camisetas diseñadas para compartir con quienes más quieres. Diseños para mamá, papá, hijos, parejas y toda la familia.
                </p>
              </>
            ) : (
              <>
                <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
                  Colecciones
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2">
                  Catálogo
                </h1>
                <p className="text-white/70 mt-2 max-w-md">
                  Descubre nuestra colección de prendas diseñadas para toda la familia
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-sm transition-all duration-200",
                activeCategory === cat.slug
                  ? "bg-[#2D5A3D] text-white"
                  : "bg-[#F5F0EB] text-muted-foreground hover:bg-[#F5F0EB] hover:text-foreground",
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {activeCategory === "en-familia" && (
          <div className="flex flex-wrap gap-2 mb-8">
            {subcategoriasEnFamilia.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setActiveSubcategory(sub.slug)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-sm transition-all duration-200 border",
                  activeSubcategory === sub.slug
                    ? "bg-[#2D5A3D]/10 text-[#2D5A3D] border-[#2D5A3D]/30"
                    : "bg-white text-muted-foreground border-[#D4C5A9]/30 hover:border-[#D4C5A9]/60",
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No hay productos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
