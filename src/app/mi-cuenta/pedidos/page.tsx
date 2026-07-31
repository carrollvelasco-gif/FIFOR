"use client";

import Link from "next/link";
import Image from "next/image";
import { Package, ChevronRight } from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { formatPrice } from "@/lib/utils";

const statusBadge: Record<string, { label: string; class: string }> = {
  approved: { label: "Pagado", class: "bg-[#A8D5BA]/20 text-[#2D5A3D]" },
  pending: { label: "Pendiente de pago", class: "bg-amber-100 text-amber-700" },
  rejected: { label: "Rechazado", class: "bg-red-50 text-red-500" },
};

export default function MisPedidosPage() {
  const orders = useOrderStore((s) => s.getUserOrders());

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D5A3D] mb-8">Mis pedidos</h1>

        {orders.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="mx-auto text-muted-foreground/20 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">No tienes pedidos aún</h2>
            <p className="text-muted-foreground mb-6">Cuando realices tu primera compra, aquí podrás ver el estado de tu pedido.</p>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors"
            >
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/pedido/${order.id}`}
                className="block bg-[#F5F0EB]/30 rounded-sm p-4 md:p-6 hover:bg-[#F5F0EB]/50 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-20 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden">
                    <Image
                      src={order.items[0]?.image || "/placeholder.svg"}
                      alt={order.items[0]?.name || "Producto"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                          Pedido
                        </p>
                        <p className="text-sm font-semibold text-[#2D5A3D]">{order.id}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded-full ${statusBadge[order.paymentStatus]?.class || ""}`}>
                          {statusBadge[order.paymentStatus]?.label || order.paymentStatus}
                        </span>
                        <ChevronRight size={16} className="text-muted-foreground group-hover:text-[#2D5A3D] transition-colors shrink-0" />
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-muted-foreground">
                      <span>{new Date(order.date).toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}</span>
                      <span>•</span>
                      <span>{order.items.length} producto{order.items.length !== 1 ? "s" : ""}</span>
                    </div>
                    <p className="text-sm font-bold text-[#2D5A3D] mt-2">{formatPrice(order.total)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
