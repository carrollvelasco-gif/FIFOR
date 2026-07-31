"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, HeartHandshake } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Envío gratis",
    description: "Desde $999 en compras nacionales",
  },
  {
    icon: ShieldCheck,
    title: "Pago seguro",
    description: "Datos protegidos con encriptación SSL",
  },
  {
    icon: HeartHandshake,
    title: "Atención personalizada",
    description: "Estamos aquí para ayudarte",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 bg-white border-y border-[#D4C5A9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#F5F0EB] group-hover:bg-[#A8D5BA]/20 transition-colors mb-4">
                <benefit.icon className="w-6 h-6 text-[#2D5A3D]" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">
                {benefit.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
