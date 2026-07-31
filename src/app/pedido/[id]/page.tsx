"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Package,
  MapPin,
  ShoppingBag,
  ArrowLeft,
  ChevronRight,
  Truck,
  Clock,
} from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";
import { ORDER_STATUS_LABELS, ORDER_TIMELINE } from "@/lib/checkout-types";
import type { OrderStatus } from "@/lib/checkout-types";

const statusIcons: Record<string, string> = {
  recibido: "📋",
  "pago-aprobado": "💳",
  produccion: "⚙️",
  personalizacion: "🎨",
  calidad: "✅",
  empacado: "📦",
  enviado: "🚚",
  entregado: "🏠",
};

function PaymentBadge({ status }: { status: string }) {
  if (status === "approved") {
    return <span className="px-3 py-1 text-xs font-semibold bg-[#A8D5BA]/20 text-[#2D5A3D] rounded-full">Pagado</span>;
  }
  if (status === "pending") {
    return <span className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">Pendiente de pago</span>;
  }
  return <span className="px-3 py-1 text-xs font-semibold bg-red-50 text-red-500 rounded-full">Rechazado</span>;
}

export default function PedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = useOrderStore((s) => s.getOrder(id));

  if (!order) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <Package size={48} className="mx-auto text-muted-foreground/20 mb-4" />
          <h1 className="text-xl font-bold text-foreground mb-2">Pedido no encontrado</h1>
          <p className="text-muted-foreground mb-6">No encontramos un pedido con ese código.</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors"
          >
            <ShoppingBag size={16} className="mr-2" />
            Seguir comprando
          </Link>
        </div>
      </div>
    );
  }

  const completedStatuses = order.timelineStatuses || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <Link
          href="/mi-cuenta/pedidos"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Mis pedidos
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
                  Pedido
                </span>
                <h1 className="text-2xl md:text-3xl font-bold text-[#2D5A3D] mt-1">
                  {order.id}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(order.date).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <PaymentBadge status={order.paymentStatus} />
            </div>

            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
                <Package size={16} className="text-[#2D5A3D]" />
                Estado del pedido
              </h3>
              <div className="space-y-0">
                {ORDER_TIMELINE.map((status, i) => {
                  const isCustomOnly = status === "personalizacion";
                  const show = !isCustomOnly || order.hasCustomization;
                  if (!show) return null;

                  const completed = completedStatuses.includes(status);
                  const isFirstCompleted = completedStatuses.length > 0 && status === completedStatuses[completedStatuses.length - 1];
                  const isLast = i === ORDER_TIMELINE.length - 1;
                  const coming = !completed;

                  return (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-300 ${
                            completed
                              ? "bg-[#2D5A3D] border-[#2D5A3D]"
                              : "bg-white border-[#D4C5A9]"
                          }`}
                        >
                          {completed && (
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        {!isLast && (
                          <div
                            className={`w-0.5 h-8 transition-colors duration-300 ${
                              coming ? "bg-[#D4C5A9]/30" : "bg-[#2D5A3D]/30"
                            }`}
                          />
                        )}
                      </div>
                      <div className={`pb-6 ${isLast ? "pb-0" : ""}`}>
                        <p
                          className={`text-sm font-medium transition-colors duration-300 ${
                            completed ? "text-[#2D5A3D]" : "text-muted-foreground"
                          }`}
                        >
                          {ORDER_STATUS_LABELS[status]}
                        </p>
                        {isFirstCompleted && completed && (
                          <p className="text-xs text-[#2D5A3D] mt-0.5">Completado</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Package size={16} className="text-[#2D5A3D]" />
                Productos
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-16 h-20 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-1">
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Talla: {item.size}</span>}
                        <span>Cant: {item.quantity}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#2D5A3D] mt-1">
                        {formatPrice(item.unitPrice * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {order.tracking && (
              <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  <Truck size={16} className="text-[#2D5A3D]" />
                  Envío
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Transportadora</span>
                    <span className="font-medium">{order.tracking.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Número de guía</span>
                    <span className="font-medium">{order.tracking.number}</span>
                  </div>
                  <a
                    href={order.tracking.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-[#2D5A3D] hover:underline"
                  >
                    Rastrear envío <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-4">Cliente</h3>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-foreground">{order.customer.name}</p>
                <p className="text-muted-foreground">{order.customer.email}</p>
                <p className="text-muted-foreground">{order.customer.phone}</p>
              </div>
            </div>

            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[#2D5A3D]" />
                Dirección de envío
              </h3>
              <div className="text-sm space-y-1">
                <p className="text-foreground">{order.shipping.address}</p>
                <p className="text-muted-foreground">{order.shipping.city}</p>
                {order.shipping.observations && (
                  <p className="text-muted-foreground">Obs: {order.shipping.observations}</p>
                )}
              </div>
            </div>

            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                <Clock size={16} className="text-[#2D5A3D]" />
                Pago
              </h3>
              <div className="text-sm">
                <span className="px-3 py-1 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full inline-block">
                  {order.paymentStatus === "approved" ? "Pagado" : order.paymentStatus === "pending" ? "Pendiente de pago" : "Rechazado"}
                </span>
              </div>
            </div>

            <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
              <h3 className="text-sm font-semibold mb-4">Resumen</h3>
              <div className="space-y-2 text-sm">
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
                <div className="flex justify-between text-base font-bold text-[#2D5A3D] pt-2 border-t border-[#D4C5A9]/30">
                  <span>Total</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm"
            >
              <ShoppingBag size={16} />
              Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
