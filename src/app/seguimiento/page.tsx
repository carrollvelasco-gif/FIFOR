"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Search,
  Truck,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS, ORDER_TIMELINE } from "@/lib/checkout-types";
import type { OrderData, OrderStatus } from "@/lib/checkout-types";

const TIMELINE_ORDER: OrderStatus[] = [
  "recibido",
  "pago-aprobado",
  "produccion",
  "personalizacion",
  "calidad",
  "empacado",
  "enviado",
  "entregado",
];

function Timeline({ order }: { order: OrderData }) {
  const completed = order.timelineStatuses || [];
  const lastCompleted = completed[completed.length - 1];

  return (
    <div className="relative">
      {TIMELINE_ORDER.map((status, i) => {
        const isCustom = status === "personalizacion";
        if (isCustom && !order.hasCustomization) return null;

        const isCompleted = completed.includes(status);
        const isCurrent = status === lastCompleted;
        const isLast = i === TIMELINE_ORDER.length - 1;

        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07, duration: 0.35 }}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? [1, 1.2, 1] : 1,
                  borderColor: isCompleted ? "#2D5A3D" : "#D4C5A9",
                  backgroundColor: isCompleted ? "#2D5A3D" : "white",
                }}
                transition={{ duration: 0.3 }}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isCompleted ? "bg-[#2D5A3D] border-[#2D5A3D]" : "bg-white border-[#D4C5A9]"
                } ${isCurrent ? "ring-4 ring-[#A8D5BA]/30" : ""}`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={14} className="text-white" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-[#D4C5A9]" />
                )}
              </motion.div>
              {!isLast && (
                <div
                  className={`w-0.5 h-8 ${
                    completed.includes(TIMELINE_ORDER[i + 1]) ? "bg-[#2D5A3D]/40" : "bg-[#D4C5A9]/30"
                  }`}
                />
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <p
                className={`text-sm font-medium ${
                  isCompleted ? "text-[#2D5A3D]" : "text-muted-foreground/60"
                }`}
              >
                {ORDER_STATUS_LABELS[status]}
              </p>
              {isCurrent && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#A8D5BA] font-medium mt-0.5"
                >
                  Estado actual
                </motion.p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function OrderResultCard({ order }: { order: OrderData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto space-y-5"
    >
      <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-[#A8D5BA] font-medium">
              Pedido
            </p>
            <h2 className="text-xl md:text-2xl font-bold text-[#2D5A3D] mt-1">{order.id}</h2>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1.5">
              <Calendar size={14} />
              {new Date(order.date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <span className={`px-4 py-1.5 text-xs font-semibold rounded-full ${
            order.paymentStatus === "approved"
              ? "bg-[#A8D5BA]/20 text-[#2D5A3D]"
              : order.paymentStatus === "pending"
                ? "bg-amber-100 text-amber-700"
                : "bg-red-50 text-red-500"
          }`}>
            {order.paymentStatus === "approved" ? "Pago confirmado" : order.paymentStatus === "pending" ? "Pendiente de pago" : "Rechazado"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#F9F7F4] rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Estado actual</p>
            <p className="text-sm font-semibold text-[#2D5A3D]">
              {ORDER_STATUS_LABELS[order.timelineStatuses[order.timelineStatuses.length - 1]]}
            </p>
          </div>
          <div className="bg-[#F9F7F4] rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Última actualización</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Clock size={14} className="text-muted-foreground" />
              {new Date(order.date).toLocaleDateString("es-CO", {
                hour: "2-digit",
                minute: "2-digit",
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
          <div className="bg-[#F9F7F4] rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Tiempo estimado de entrega</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Truck size={14} className="text-muted-foreground" />
              3-5 días hábiles
            </p>
          </div>
          <div className="bg-[#F9F7F4] rounded-lg p-4">
            <p className="text-xs text-muted-foreground mb-1">Estado del pago</p>
            <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Clock size={14} className="text-muted-foreground" />
              {order.paymentStatus === "approved" ? "Pagado" : order.paymentStatus === "pending" ? "Pendiente de pago" : "Rechazado"}
            </p>
          </div>
        </div>

        <div className="bg-[#F9F7F4] rounded-xl p-6 md:p-8">
          <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
            <Package size={16} className="text-[#2D5A3D]" />
            Seguimiento del pedido
          </h3>
          <Timeline order={order} />
        </div>
      </div>

      {order.tracking && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6 md:p-8">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Truck size={16} className="text-[#2D5A3D]" />
            Información de envío
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Transportadora</p>
              <p className="text-sm font-semibold">{order.tracking.carrier}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Número de guía</p>
              <p className="text-sm font-semibold">{order.tracking.number}</p>
            </div>
          </div>
          <a
            href={order.tracking.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#2D5A3D] hover:underline"
          >
            <MapPin size={14} />
            Rastrear envío en la transportadora
          </a>
        </div>
      )}

      {order.items.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6 md:p-8">
          <h3 className="text-sm font-semibold text-foreground mb-4">Productos</h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-14 h-16 shrink-0 bg-[#F5F0EB] rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.color && `Color: ${item.color}`}
                    {item.color && item.size && " | "}
                    {item.size && `Talla: ${item.size}`}
                    {` | Cant: ${item.quantity}`}
                  </p>
                  <p className="text-sm font-semibold text-[#2D5A3D] mt-0.5">
                    {formatPrice(item.unitPrice * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#D4C5A9]/20 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Envío</span>
              <span>{formatPrice(order.shippingCost)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#2D5A3D]">
                <span>Descuento</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-[#2D5A3D] pt-2 border-t border-[#D4C5A9]/20">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function EmptyIllustration() {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6">
        <div className="absolute inset-0 bg-[#A8D5BA]/10 rounded-full" />
        <div className="absolute inset-4 bg-[#A8D5BA]/10 rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Package size={48} className="mx-auto text-[#A8D5BA]/40" />
            <Truck size={28} className="mx-auto text-[#A8D5BA]/30 -mt-2" />
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center max-w-xs leading-relaxed">
        Ingresa tu número de pedido o correo electrónico para ver el estado actualizado de tu compra.
      </p>
    </div>
  );
}

export default function SeguimientoPage() {
  const [searchType, setSearchType] = useState<"order" | "email">("order");
  const [orderInput, setOrderInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [searched, setSearched] = useState(false);
  const getOrder = useOrderStore((s) => s.getOrder);
  const getAllOrders = useOrderStore((s) => s.orders);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setSearched(false);

    if (searchType === "order") {
      const trimmed = orderInput.trim();
      if (!trimmed) {
        setError("Ingresa el número de tu pedido");
        return;
      }
      const found = getOrder(trimmed);
      if (!found) {
        setError("No encontramos un pedido con ese código. Verifica e intenta de nuevo.");
        setSearched(true);
        return;
      }
      setOrder(found);
    } else {
      const trimmed = emailInput.trim().toLowerCase();
      if (!trimmed) {
        setError("Ingresa tu correo electrónico");
        return;
      }
      const found = getAllOrders.find(
        (o) => o.customer.email.toLowerCase() === trimmed
      );
      if (!found) {
        setError("No encontramos pedidos asociados a ese correo.");
        setSearched(true);
        return;
      }
      setOrder(found);
    }
  };

  const resetSearch = () => {
    setOrder(null);
    setSearched(false);
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-5">
            <Package size={28} className="text-[#2D5A3D]" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mb-3">
            ¿Dónde está mi pedido?
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
            Consulta el estado de tu compra en tiempo real ingresando tu número de pedido o el correo electrónico utilizado en la compra.
          </p>
        </motion.div>

        {!order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6 md:p-8">
              <div className="flex bg-[#F9F7F4] rounded-lg p-1 mb-6">
                <button
                  onClick={() => { setSearchType("order"); setError(""); }}
                  className={`flex-1 h-10 text-sm font-medium rounded-md transition-all ${
                    searchType === "order"
                      ? "bg-white text-[#2D5A3D] shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Número de pedido
                </button>
                <button
                  onClick={() => { setSearchType("email"); setError(""); }}
                  className={`flex-1 h-10 text-sm font-medium rounded-md transition-all ${
                    searchType === "email"
                      ? "bg-white text-[#2D5A3D] shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Correo electrónico
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {searchType === "order" ? (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Número de pedido
                    </label>
                    <input
                      type="text"
                      value={orderInput}
                      onChange={(e) => { setOrderInput(e.target.value); setError(""); }}
                      placeholder="Ej: FIFOR-ABC123-XYZ"
                      className="w-full h-12 px-4 text-sm border border-[#D4C5A9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]/40 focus:border-[#A8D5BA] bg-white transition-colors"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                      Correo electrónico
                    </label>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => { setEmailInput(e.target.value); setError(""); }}
                      placeholder="tucorreo@ejemplo.com"
                      className="w-full h-12 px-4 text-sm border border-[#D4C5A9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A8D5BA]/40 focus:border-[#A8D5BA] bg-white transition-colors"
                    />
                  </div>
                )}

                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                )}

                <button
                  type="submit"
                  className="w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-lg flex items-center justify-center gap-2"
                >
                  <Search size={16} />
                  Consultar pedido
                </button>
              </form>

              <EmptyIllustration />
            </div>

            <p className="text-xs text-muted-foreground text-center mt-4">
              El código de pedido lo recibiste en el correo de confirmación después de tu compra.
            </p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {order && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="max-w-3xl mx-auto mb-6">
                <button
                  onClick={resetSearch}
                  className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
                >
                  ← Nueva consulta
                </button>
              </div>
              <OrderResultCard order={order} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
