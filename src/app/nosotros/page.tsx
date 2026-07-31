"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Lightbulb,
  HandshakeIcon,
  Heart,
  Sparkles,
  Star,
  ChevronRight,
} from "lucide-react";

const values = [
  {
    icon: Star,
    title: "Calidad",
    desc: "Seleccionamos materiales y procesos que garantizan prendas resistentes, cómodas y con acabados de excelente nivel.",
  },
  {
    icon: Lightbulb,
    title: "Creatividad",
    desc: "Impulsamos la originalidad ofreciendo opciones que permiten a cada cliente expresar su personalidad.",
  },
  {
    icon: HandshakeIcon,
    title: "Compromiso",
    desc: "Cumplimos con responsabilidad cada pedido, respetando los tiempos de producción y entrega.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    desc: "Construimos relaciones transparentes mediante una atención cercana, pagos seguros y comunicación constante.",
  },
  {
    icon: Sparkles,
    title: "Innovación",
    desc: "Buscamos continuamente nuevas tendencias y tecnologías para mejorar nuestros productos y la experiencia de compra.",
  },
  {
    icon: Heart,
    title: "Pasión",
    desc: "Disfrutamos cada etapa del proceso y ponemos dedicación en cada detalle para ofrecer prendas que superen las expectativas.",
  },
];

const steps = [
  { num: "01", title: "Explora nuestras colecciones", desc: "Descubre camisetas, gorras y accesorios disponibles en nuestro catálogo o visita la sección de personalización para crear una prenda única." },
  { num: "02", title: "Elige tu producto", desc: "Selecciona la prenda que deseas comprar. Si decides personalizarla, podrás elegir color, talla, agregar imágenes, textos o diseños propios." },
  { num: "03", title: "Agrega al carrito", desc: "Revisa tu selección, ajusta cantidades y continúa con una compra rápida, sencilla y segura." },
  { num: "04", title: "Confirma tu pedido", desc: "Completa tus datos de envío y realiza el pago mediante nuestros métodos de pago seguros." },
  { num: "05", title: "Preparamos tu pedido", desc: "Nuestro equipo verifica cada producto. Si es una prenda personalizada, la fabricamos cuidadosamente siguiendo tu diseño antes de enviarla." },
  { num: "06", title: "Recíbelo en tu hogar", desc: "Empacamos tu pedido con cuidado y lo enviamos a cualquier lugar de Colombia para que disfrutes de una excelente experiencia de compra." },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
            alt="FIFOR familia"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              FIFOR
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-3 leading-tight">
              Conoce FIFOR
            </h1>
            <p className="text-base md:text-lg text-white/80 mt-4 leading-relaxed">
              Más que una marca de ropa, somos un espacio donde el estilo, la calidad y la creatividad se unen para ofrecer prendas únicas y una experiencia de compra excepcional.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium bg-[#A8D5BA] text-[#2D5A3D] hover:bg-[#8FC4A5] transition-colors"
              >
                Ver catálogo <ChevronRight size={16} />
              </Link>
              <Link
                href="/personalizar"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Personalizar ahora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
                Sobre nosotros
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2 mb-5">
                Nuestra historia
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  En FIFOR creemos que cada prenda puede contar una historia. Nacimos con el propósito de ofrecer ropa de excelente calidad que combine estilo, comodidad y la posibilidad de personalización, permitiendo que cada cliente exprese su personalidad a través de diseños únicos.
                </p>
                <p>
                  Más que vender prendas, buscamos crear experiencias. Cada camiseta, gorra o accesorio es seleccionado y elaborado con dedicación, utilizando materiales de calidad y procesos cuidadosamente elegidos para garantizar acabados duraderos y un resultado que supere las expectativas.
                </p>
                <p>
                  Nuestro compromiso es acompañar a cada cliente desde la elección de su producto hasta la entrega final, ofreciendo una experiencia de compra sencilla, segura y personalizada.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative aspect-[4/5] bg-[#F5F0EB] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
                alt="Nuestra historia"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-20 md:py-28 bg-[#F5F0EB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-sm p-8 border border-[#F5F0EB]"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-[#A8D5BA] font-medium">
                Propósito
              </span>
              <h3 className="text-2xl font-bold text-[#2D5A3D] mt-2 mb-4">
                Nuestra misión
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Brindar prendas de alta calidad que combinen diseño, innovación y personalización, ofreciendo a cada cliente la oportunidad de encontrar o crear productos únicos que reflejen su estilo y personalidad.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Nos esforzamos por ofrecer una experiencia de compra confiable, con atención personalizada, procesos eficientes y productos elaborados bajo altos estándares de calidad.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white rounded-sm p-8 border border-[#F5F0EB]"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-[#A8D5BA] font-medium">
                    Meta
                  </span>
              <h3 className="text-2xl font-bold text-[#2D5A3D] mt-2 mb-4">
                Nuestra visión
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser una marca reconocida a nivel nacional por la calidad de nuestras prendas y por brindar una experiencia de compra innovadora, destacándonos tanto por nuestras colecciones como por nuestro servicio de personalización.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Aspiramos a crecer de manera sostenible, fortaleciendo la confianza de nuestros clientes mediante la innovación constante, el excelente servicio y el compromiso con cada pedido.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              Nuestra base
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
              Nuestros valores
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group bg-white border border-[#F5F0EB] rounded-sm p-6 hover:border-[#A8D5BA]/40 hover:shadow-sm transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#A8D5BA]/15 flex items-center justify-center mb-4 group-hover:bg-[#A8D5BA]/25 transition-colors">
                  <v.icon size={22} className="text-[#2D5A3D]" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-20 md:py-28 bg-[#F5F0EB]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              Proceso
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
              Cómo trabajamos
            </h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#D4C5A9]/40 -translate-x-1/2" />
            <div className="space-y-10 lg:space-y-0">
              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-6 lg:gap-10 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <span className="text-4xl font-bold text-[#A8D5BA]/30">{s.num}</span>
                    <h3 className="text-lg font-semibold text-foreground mt-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 max-w-md leading-relaxed mx-auto lg:mx-0">
                      {s.desc}
                    </p>
                  </div>
                  <div className="relative z-10">
                    <div className="w-8 h-8 rounded-full bg-[#2D5A3D] border-4 border-[#F5F0EB] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-[#2D5A3D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Tu próxima prenda comienza aquí
            </h2>
            <p className="text-white/70 mt-4 max-w-lg mx-auto leading-relaxed">
              Explora nuestras colecciones o crea un diseño totalmente personalizado. En FIFOR hacemos realidad tus ideas.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium bg-[#A8D5BA] text-[#2D5A3D] hover:bg-[#8FC4A5] transition-colors"
              >
                Ver catálogo <ChevronRight size={16} />
              </Link>
              <Link
                href="/personalizar"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium border border-white/30 text-white hover:bg-white/10 transition-colors"
              >
                Personalizar ahora
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
