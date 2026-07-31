"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import {
  User,
  Mail,
  Package,
  MapPin,
  LogOut,
  ShoppingBag,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useOrderStore } from "@/store/order-store";
import { useUserStore } from "@/store/user-store";
import { formatPrice } from "@/lib/utils";

export default function PerfilPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { user, logout } = useUserStore();
  const orders = useOrderStore((s) => s.getUserOrders());

  const activeUser = session?.user || user;

  const handleSignOut = () => {
    logout();
    signOut({ callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[#2D5A3D]" />
      </div>
    );
  }

  if (!activeUser) {
    router.push("/mi-cuenta");
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center overflow-hidden shrink-0">
                {session?.user?.image ? (
                  <img src={session.user.image} alt="" className="w-full h-full object-cover" />
                ) : (
                  <User size={32} className="text-[#2D5A3D]" />
                )}
              </div>
              <div className="text-center sm:text-left flex-1 min-w-0">
                <h1 className="text-xl md:text-2xl font-bold text-[#2D5A3D]">
                  {activeUser?.name || "Usuario"}
                </h1>
                <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <Mail size={14} />
                  {session?.user?.email || user?.email || ""}
                </p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 h-10 px-4 text-sm font-medium text-red-500 border border-red-200 bg-white hover:bg-red-50 transition-colors rounded-lg shrink-0"
              >
                <LogOut size={16} />
                Cerrar sesión
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package size={16} className="text-[#2D5A3D]" />
                Historial de pedidos
              </h2>
              {orders.length === 0 ? (
                <div className="text-center py-6">
                  <ShoppingBag size={24} className="mx-auto text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No tienes pedidos aún</p>
                  <button
                    onClick={() => router.push("/catalogo")}
                    className="mt-3 text-xs font-medium text-[#2D5A3D] hover:underline"
                  >
                    Ir al catálogo
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <button
                      key={order.id}
                      onClick={() => router.push(`/pedido/${order.id}`)}
                      className="w-full flex items-center justify-between p-3 bg-[#F9F7F4] rounded-lg hover:bg-[#F5F0EB] transition-colors text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#2D5A3D] truncate">{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(order.date).toLocaleDateString("es-CO", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-semibold text-[#2D5A3D]">{formatPrice(order.total)}</p>
                        <span className={`text-[10px] font-medium ${
                          order.paymentStatus === "approved"
                            ? "text-[#2D5A3D]"
                            : order.paymentStatus === "pending"
                              ? "text-amber-600"
                              : "text-red-500"
                        }`}>
                          {order.paymentStatus === "approved"
                            ? "Pagado"
                            : order.paymentStatus === "pending"
                              ? "Pendiente"
                              : "Rechazado"}
                        </span>
                      </div>
                    </button>
                  ))}
                  {orders.length > 3 && (
                    <button
                      onClick={() => router.push("/mi-cuenta/pedidos")}
                      className="w-full text-xs font-medium text-[#2D5A3D] hover:underline text-center py-2"
                    >
                      Ver todos los pedidos ({orders.length})
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6">
              <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={16} className="text-[#2D5A3D]" />
                Dirección de envío
              </h2>
              <div className="text-center py-6">
                <MapPin size={24} className="mx-auto text-muted-foreground/30 mb-2" />
                <p className="text-sm text-muted-foreground">No has registrado una dirección</p>
                <button
                  onClick={() => router.push("/mi-cuenta/direcciones")}
                  className="mt-3 text-xs font-medium text-[#2D5A3D] hover:underline"
                >
                  Agregar dirección
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-[#D4C5A9]/20 p-6">
            <h2 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package size={16} className="text-[#2D5A3D]" />
              Estado de los pedidos
            </h2>
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay pedidos para mostrar
              </p>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => {
                  const lastStatus = order.timelineStatuses?.[order.timelineStatuses.length - 1];
                  const statusLabels: Record<string, string> = {
                    recibido: "Pedido recibido",
                    "pago-aprobado": "Pago aprobado",
                    produccion: "En producción",
                    personalizacion: "Personalización",
                    calidad: "Control de calidad",
                    empacado: "Empacado",
                    enviado: "Enviado",
                    entregado: "Entregado",
                  };
                  return (
                    <button
                      key={order.id}
                      onClick={() => router.push(`/pedido/${order.id}`)}
                      className="w-full flex items-center justify-between p-3 bg-[#F9F7F4] rounded-lg hover:bg-[#F5F0EB] transition-colors text-left"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-[#2D5A3D] truncate">{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {lastStatus ? statusLabels[lastStatus] || lastStatus : "Pendiente"}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
