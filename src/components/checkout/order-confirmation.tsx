"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Package,
  MapPin,
  ShoppingBag,
  MessageCircle,
  Send,
} from "lucide-react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export function OrderConfirmation() {
  const { order } = useCheckoutStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  if (!order) return null;

  const productsList = order.items
    .map((item) => {
      const lines = ["\u2022 " + item.name];
      if (item.size) lines.push("  Talla: " + item.size);
      lines.push("  Cantidad: " + item.quantity);
      lines.push("  Precio: " + formatPrice(item.unitPrice * item.quantity));
      return lines.join("\n");
    })
    .join("\n\n");

  const whatsappMessage = [
    "\uD83D\uDC4B \u00A1Hola, FIFOR!",
    "",
    "Acabo de realizar un pedido desde su p\u00E1gina web y deseo confirmar mi compra.",
    "",
    "\uD83E\uDDFE Pedido: #" + order.id,
    "",
    "\uD83D\uDCE6 Resumen del pedido",
    "",
    productsList,
    "",
    "\uD83D\uDCB0 Total a pagar: " + formatPrice(order.total),
    "",
    "\uD83D\uDC64 Cliente: " + order.customer.name,
    "\uD83D\uDCE7 Correo: " + order.customer.email,
    "\uD83D\uDCDE Tel\u00E9fono: " + order.customer.phone,
    "\uD83D\uDCCD Ciudad: " + order.shipping.city,
    "",
    "Quedo atento(a) a las instrucciones para realizar el pago.",
    "",
    "\u00A1Muchas gracias!",
  ].join("\n");

  const whatsappUrl = "https://wa.me/" + SITE_CONFIG.whatsapp + "?text=" + encodeURIComponent(whatsappMessage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle size={40} className="text-[#2D5A3D]" />
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-bold text-[#2D5A3D] mb-2">
          ¡Pedido registrado!
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Tu pedido fue registrado correctamente. Te hemos redirigido a WhatsApp
          para finalizar el pago.
        </p>
      </div>

      <div className="bg-[#F5F0EB]/30 rounded-sm p-6 text-left space-y-5 mb-8">
        <div className="flex flex-wrap justify-between gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Número de pedido</span>
            <p className="font-semibold text-foreground mt-0.5">{order.id}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Fecha</span>
            <p className="font-semibold text-foreground mt-0.5">
              {new Date(order.date).toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="border-t border-[#D4C5A9]/30 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <Package size={14} className="text-[#A8D5BA]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Productos
            </span>
          </div>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="relative w-14 h-14 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden">
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
                    {item.size && ` | Talla: ${item.size}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(item.unitPrice)} x {item.quantity}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[#2D5A3D] shrink-0">
                  {formatPrice(item.unitPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-[#D4C5A9]/30 pt-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={14} className="text-[#A8D5BA]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dirección de envío
            </span>
          </div>
          <p className="text-sm text-foreground">{order.shipping.address}</p>
          <p className="text-sm text-muted-foreground">{order.shipping.city}</p>
          {order.shipping.observations && (
            <p className="text-sm text-muted-foreground">
              Obs: {order.shipping.observations}
            </p>
          )}
        </div>

        <div className="border-t border-[#D4C5A9]/30 pt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Envío</span>
            <span>{formatPrice(order.shippingCost)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-sm mb-1 text-[#2D5A3D]">
              <span>Descuento</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
          )}
          <div className="flex justify-between text-base font-bold text-[#2D5A3D] mt-2 pt-2 border-t border-[#D4C5A9]/30">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="border-t border-[#D4C5A9]/30 pt-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Estado del pedido
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-amber-100 text-amber-700 rounded-full">
              Pendiente de pago
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/pedido/${order.id}`}
            className="flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium border border-[#D4C5A9] bg-white hover:bg-[#F5F0EB]/50 transition-colors rounded-sm flex-1"
          >
            <Package size={16} />
            Ver seguimiento del pedido
          </Link>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm flex-1"
          >
            <ShoppingBag size={16} />
            Seguir comprando
          </Link>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors rounded-sm"
        >
          <MessageCircle size={18} />
          Hablar por WhatsApp
        </a>

        {order.hasCustomization && (
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hola.%20Ya%20realic%C3%A9%20el%20pedido%20${order.id}.%20Quiero%20enviar%20el%20dise%C3%B1o%20para%20personalizar%20mis%20productos.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium border border-[#D4C5A9] bg-white hover:bg-[#F5F0EB]/50 transition-colors rounded-sm text-foreground"
          >
            <Send size={16} className="text-[#2D5A3D]" />
            Enviar diseño por WhatsApp
          </a>
        )}
      </div>
    </motion.div>
  );
}
