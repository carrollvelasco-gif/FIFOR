"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-[#F5F0EB] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#F5F0EB] via-[#F5F0EB]/70 to-[#F5F0EB]/90 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/10 z-[1]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#A8D5BA]/20 rounded-full blur-3xl z-[1]" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D4C5A9]/20 rounded-full blur-3xl z-[1]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm tracking-[0.3em] uppercase text-white font-medium mb-4 bg-[#2D5A3D]/60 backdrop-blur-sm px-4 py-1.5 rounded-sm"
          >
            Colección Verano 2026
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
          >
            Estilo que
            <br />
            <span className="text-[#A8D5BA]">une</span> a la
            <br />
            familia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base md:text-lg text-white/80 max-w-lg leading-relaxed"
          >
            Descubre FIFOR: moda con diseño elegante y minimalista para
            mujer, hombre y niños. Prendas que abrazan tu estilo de vida.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/catalogo"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-[#A8D5BA] hover:bg-[#8FC4A6] text-[#1A1A1A] h-14 px-8 rounded-none text-base"
            >
              Explorar colección
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/personalizar"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-14 px-8 rounded-none text-base border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
            >
              Personaliza tu prenda
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-8 text-sm text-white/70"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#A8D5BA]" />
              <span>Envío gratis desde $999</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-[2px] bg-[#A8D5BA]" />
              <span>Pago seguro</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
