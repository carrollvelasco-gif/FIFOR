"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/constants";

const categoryImages = [
  "/productos/mujer/banner-mujer.jpg",
  "/productos/hombre/banner-hombre.jpg",
  "/productos/ninos/banner-ninos.jpg",
  "/productos/en-familia/banner-en-familia.jpg",
  "/productos/accesorios/banner-accesorios.jpg",
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Categorías
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
            Explora por sección
          </h2>
          <p className="mt-3 text-muted-foreground max-w-md mx-auto">
            Encuentra tu estilo en cada temporada
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/catalogo?categoria=${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden border border-[#D4C5A9]/20">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${categoryImages[index]})`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                    <h3 className="text-sm md:text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center text-xs text-white/70 group-hover:text-white transition-colors mt-1">
                      Ver más <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
