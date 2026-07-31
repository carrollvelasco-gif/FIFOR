"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-20 md:py-28 bg-[#2D5A3D] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#A8D5BA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4C5A9]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium mb-4">
            Personalización
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
            Crea una prenda
            <br />
            <span className="text-[#A8D5BA]">única</span> para ti o tu familia
          </h2>
          <p className="mt-4 text-[#F5F0EB]/70 max-w-lg mx-auto text-base leading-relaxed">
            Diseña la camiseta perfecta: elige colores, estampados y texto.
            Una prenda especial que solo existirá una vez.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/personalizar"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-[#A8D5BA] hover:bg-[#8FC4A6] text-[#1A1A1A] h-14 px-8 rounded-none text-base"
            >
              Comenzar diseño
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/catalogo"
              className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-14 px-8 rounded-none text-base border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 border-white/30 text-white hover:bg-white/10"
            >
              Ver colección
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
