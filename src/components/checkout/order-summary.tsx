"use client";

import Image from "next/image";
import { ShoppingBag, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCheckoutStore } from "@/store/checkout-store";
import { formatPrice } from "@/lib/utils";

export function OrderSummary() {
  const { items, getTotal } = useCartStore();
  const { shippingCost, discountCode, discountAmount, setDiscountCode, setDiscountAmount } =
    useCheckoutStore();
  const subtotal = getTotal();
  const total = subtotal + shippingCost - discountAmount;

  return (
    <div className="bg-[#F5F0EB]/30 rounded-sm p-6">
      <div className="flex items-center gap-2 mb-5">
        <ShoppingBag size={16} className="text-[#2D5A3D]" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          Resumen del pedido
        </h3>
      </div>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {item.name}
              </p>
              <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground mt-0.5">
                {item.color && <span>Color: {item.color}</span>}
                {item.size && <span>Talla: {item.size}</span>}
              </div>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-muted-foreground">
                  {formatPrice(item.price)} x {item.quantity}
                </span>
                <span className="text-sm font-semibold text-[#2D5A3D]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 text-sm border-t border-[#D4C5A9]/30 pt-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Envío</span>
          <span className="font-medium">
            {shippingCost > 0 ? formatPrice(shippingCost) : "Se confirma por WhatsApp"}
          </span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-[#2D5A3D]">
            <span>Descuento</span>
            <span className="font-medium">-{formatPrice(discountAmount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-[#D4C5A9]/30 my-4 pt-4">
        <div className="flex justify-between">
          <span className="font-semibold text-foreground">Total</span>
          <span className="text-lg font-bold text-[#2D5A3D]">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#D4C5A9]/30">
        <div className="flex items-center gap-2 mb-2">
          <Tag size={14} className="text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground">
            Código de descuento
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            placeholder="Ingresa tu código"
            className="flex-1 h-10 px-3 text-sm border border-[#D4C5A9]/50 rounded-sm bg-white focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
          />
          <button
            onClick={() => {
              if (discountCode.toUpperCase() === "FIFOR10") {
                setDiscountAmount(subtotal * 0.1);
              } else {
                setDiscountAmount(0);
              }
            }}
            className="h-10 px-4 text-xs font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors rounded-sm"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
