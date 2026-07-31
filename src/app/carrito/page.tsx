"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

function isCustomItem(item: { slug: string; productId: string }) {
  return item.slug === "personalizada" || item.productId.startsWith("custom-");
}

export default function CarritoPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const total = getTotal();

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex items-center gap-3 mb-10">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-[#2D5A3D] transition-colors"
          >
            <ArrowLeft size={16} />
            Volver
          </Link>
          <span className="text-muted-foreground/30">|</span>
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              Tu carrito
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-1">
              Carrito de compras
            </h1>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <ShoppingBag size={64} className="text-muted-foreground/20 mb-6" />
            <h2 className="text-xl font-semibold text-[#2D5A3D] mb-2">
              Tu carrito está vacío
            </h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
              Parece que aún no has agregado productos. Explora nuestro catálogo y encuentra lo que buscas.
            </p>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center h-12 px-8 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2 space-y-4">
              <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-3 text-xs uppercase tracking-wider text-muted-foreground font-medium bg-[#F5F0EB]/50 rounded-sm">
                <div className="col-span-6">Producto</div>
                <div className="col-span-2 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {items.map((item) => {
                const custom = isCustomItem(item);
                const itemHref = custom
                  ? `/personalizar?restore=${item.id}`
                  : `/producto/${item.slug}`;

                return (
                  <div
                    key={item.id}
                    className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 bg-white border border-[#F5F0EB] rounded-sm hover:bg-[#F5F0EB]/30 hover:border-[#A8D5BA]/60 transition-all duration-300"
                  >
                    <div className="md:col-span-6 flex gap-4 items-center">
                      <Link
                        href={itemHref}
                        className="relative w-20 h-24 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          href={itemHref}
                          className="text-sm font-semibold text-foreground hover:text-[#2D5A3D] transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                          {item.size && (
                            <span className="inline-flex items-center gap-1">
                              <span className="text-[#A8D5BA]">●</span>
                              Talla: {item.size}
                            </span>
                          )}
                          {item.color && (
                            <span className="inline-flex items-center gap-1">
                              <span className="text-[#A8D5BA]">●</span>
                              Color: {item.color}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors mt-2 md:hidden"
                        >
                          <Trash2 size={13} />
                          Eliminar
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 text-center">
                      <span className="text-sm text-muted-foreground md:text-foreground">
                        {formatPrice(item.price)}
                      </span>
                    </div>

                    <div className="md:col-span-2 flex justify-center">
                      <div className="flex items-center gap-2 border border-[#F5F0EB] rounded-sm px-1">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity - 1);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#2D5A3D] transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            updateQuantity(item.id, item.quantity + 1);
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:text-[#2D5A3D] transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                      <span className="text-sm font-semibold text-[#2D5A3D]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeItem(item.id);
                        }}
                        className="hidden md:flex items-center justify-center w-8 h-8 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-sm transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-[#F5F0EB]/50 rounded-sm p-6 sticky top-32">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-5">
                  Resumen del pedido
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="text-xs text-muted-foreground">Se calcula en el checkout</span>
                  </div>
                </div>

                <div className="border-t border-[#D4C5A9]/30 my-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-lg font-bold text-[#2D5A3D]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors mt-5"
                >
                  Finalizar compra
                </Link>

                <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center mt-4">
                  <ShoppingBag size={14} className="text-[#A8D5BA]" />
                  Envíos a toda Colombia
                </div>

                <Link
                  href="/catalogo"
                  className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-[#2D5A3D] transition-colors mt-3"
                >
                  <ArrowLeft size={12} />
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
