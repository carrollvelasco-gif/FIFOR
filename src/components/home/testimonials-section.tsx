"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Cliente verificada",
    avatar: "MG",
    rating: 5,
    text: "La calidad de las prendas superó mis expectativas. Los diseños son elegantes, minimalistas y la tela es muy suave. Compré para mi hija y para mí. Sin duda volveré a comprar.",
  },
  {
    id: 2,
    name: "Ana Martínez",
    role: "Cliente verificada",
    avatar: "AM",
    rating: 5,
    text: "FIFOR se ha vuelto nuestra tienda favorita. Ropa moderna, minimalista y de gran calidad para toda la familia. Mi esposo, mi hijo y yo encontramos nuestro estilo.",
  },
  {
    id: 3,
    name: "Laura Sánchez",
    role: "Cliente verificada",
    avatar: "LS",
    rating: 5,
    text: "El proceso de personalización fue increíble. Pude diseñar una camiseta única para mi hijo. El resultado fue hermoso y llegó antes de lo esperado. Volveré a pedir para mí.",
  },
  {
    id: 4,
    name: "Carmen López",
    role: "Cliente verificada",
    avatar: "CL",
    rating: 4,
    text: "Muy buena calidad en todos los productos. Los acabados son impecables y los colores se mantienen después de varios lavados. Ideal para vestir a la familia con estilo.",
  },
];

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F0EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
            Lo que dicen nuestros clientes
          </h2>
        </motion.div>

        <div className="relative max-w-2xl mx-auto">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-center px-4"
              >
                <Quote className="w-10 h-10 text-[#A8D5BA] mx-auto mb-6 opacity-60" />
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed italic">
                  &ldquo;{testimonials[current].text}&rdquo;
                </p>
                <div className="flex justify-center gap-1 mt-6">
                  {Array.from({ length: testimonials[current].rating }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-[#D4C5A9] text-[#D4C5A9]"
                      />
                    )
                  )}
                </div>
                <div className="mt-4">
                  <div className="w-12 h-12 rounded-full bg-[#A8D5BA] flex items-center justify-center mx-auto">
                    <span className="text-sm font-bold text-white">
                      {testimonials[current].avatar}
                    </span>
                  </div>
                  <p className="font-semibold text-sm mt-3">
                    {testimonials[current].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-2 rounded-full border border-[#D4C5A9] hover:bg-white transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    i === current ? "bg-[#2D5A3D] w-6" : "bg-[#D4C5A9]"
                  )}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full border border-[#D4C5A9] hover:bg-white transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
