"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Package, Search, ArrowRight } from "lucide-react";
import { useOrderStore } from "@/store/order-store";

export function TrackOrderSection() {
  const router = useRouter();
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");
  const getOrder = useOrderStore((s) => s.getOrder);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmed = orderId.trim();
    if (!trimmed) {
      setError("Ingresa el número de tu pedido");
      return;
    }

    const order = getOrder(trimmed);
    if (!order) {
      setError("No encontramos un pedido con ese código. Verifica e intenta de nuevo.");
      return;
    }

    router.push(`/pedido/${trimmed}`);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F5F0EB]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              ¿YA COMPRASTE?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D5A3D] mt-3 mb-4">
              Rastrea tu pedido
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Ingresa el código de tu pedido y descubre al instante en qué etapa se
              encuentra, desde la producción hasta la entrega.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-1">
                <input
                  type="text"
                  value={orderId}
                  onChange={(e) => { setOrderId(e.target.value); setError(""); }}
                  placeholder="Ej: FIFOR-ABC123-XYZ"
                  className="w-full h-12 px-4 text-sm border border-[#D4C5A9] rounded-sm focus:outline-none focus:ring-1 focus:ring-[#A8D5BA] focus:border-[#A8D5BA] bg-white transition-colors"
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500 mt-1"
                  >
                    {error}
                  </motion.p>
                )}
              </div>
              <button
                type="submit"
                className="h-12 px-6 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm flex items-center justify-center gap-2 shrink-0"
              >
                <Search size={16} />
                Rastrear
              </button>
            </form>

            <p className="text-xs text-muted-foreground mt-3">
              El código lo encuentras en el correo de confirmación de tu compra.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[4/3]">
              <div className="absolute inset-0 bg-[#A8D5BA]/20 rounded-sm -rotate-3" />
              <div className="absolute inset-0 bg-white border border-[#D4C5A9]/30 rounded-sm p-8 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mb-4">
                  <Package size={24} className="text-[#2D5A3D]" />
                </div>
                <div className="space-y-2 w-full max-w-[200px]">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2D5A3D]" />
                    <span className="text-xs text-muted-foreground">Pedido recibido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2D5A3D]" />
                    <span className="text-xs text-muted-foreground">Pago aprobado</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#A8D5BA]" />
                    <span className="text-xs text-muted-foreground">En producción</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-3 h-3 rounded-full bg-[#D4C5A9]" />
                    <span className="text-xs text-muted-foreground">Control de calidad</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-40">
                    <div className="w-3 h-3 rounded-full bg-[#D4C5A9]" />
                    <span className="text-xs text-muted-foreground">Enviado</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-[#2D5A3D] font-medium">
                  <ArrowRight size={12} />
                  <span>Tu pedido está en producción</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
