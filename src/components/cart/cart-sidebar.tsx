"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { formatPrice } from "@/lib/utils";

function isCustomItem(item: { slug: string; productId: string }) {
  return item.slug === "personalizada" || item.productId.startsWith("custom-");
}

export function CartSidebar() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const { isCartOpen, closeCart } = useUIStore();
  const total = getTotal();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-50"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} />
                <span className="font-semibold text-lg">Carrito</span>
                <span className="text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? "producto" : "productos"})
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1 hover:text-muted-foreground transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground/40 mb-4" />
                  <p className="text-muted-foreground font-medium">Tu carrito está vacío</p>
                  <p className="text-sm text-muted-foreground/60 mt-1">
                    Agrega productos para comenzar
                  </p>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 mt-4"
                    onClick={closeCart}
                  >
                    Ver catálogo
                  </Link>
                </div>
              ) : (
                items.map((item) => {
                  const custom = isCustomItem(item);
                  const itemHref = custom
                    ? `/personalizar?restore=${item.id}`
                    : `/producto/${item.slug}`;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group flex gap-4 p-3 bg-[#F5F0EB]/50 rounded-sm border border-transparent hover:bg-[#F5F0EB] hover:border-[#A8D5BA]/60 transition-all duration-300"
                    >
                      <Link
                        href={itemHref}
                        onClick={closeCart}
                        className="relative w-20 h-20 shrink-0 bg-[#F5F0EB] rounded-md overflow-hidden"
                      >
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={itemHref}
                          onClick={closeCart}
                          className="text-sm font-medium hover:text-[#2D5A3D] transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.size && <span>Talla: {item.size} </span>}
                          {item.color && <span>Color: {item.color}</span>}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity - 1);
                              }}
                              className="p-0.5 hover:text-[#2D5A3D] transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                updateQuantity(item.id, item.quantity + 1);
                              }}
                              className="p-0.5 hover:text-[#2D5A3D] transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeItem(item.id);
                          }}
                          className="text-xs text-muted-foreground hover:text-destructive mt-1 transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Envío calculado en el checkout
                </p>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full h-12 text-sm font-medium bg-[#2D5A3D] text-white hover:bg-[#1E3D29] transition-colors"
                >
                  Ir al checkout
                </Link>
                <Link
                  href="/carrito"
                  onClick={closeCart}
                  className="flex items-center justify-center w-full h-12 text-sm font-medium border border-[#D4C5A9] bg-background hover:bg-muted transition-colors"
                >
                  Ver carrito completo
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
