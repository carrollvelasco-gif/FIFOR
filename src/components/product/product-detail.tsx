"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { formatPrice, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { generateId } from "@/lib/utils";
import { toast } from "sonner";
import type { ProductData } from "@/lib/products-data";

interface ProductDetailProps {
  product: ProductData;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (product.sizes.length > 1 && !selectedSize) {
      toast.error("Selecciona una talla", {
        description: "Debes elegir una talla antes de agregar al carrito",
      });
      return;
    }
    addItem({
      id: generateId(),
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0] || "/placeholder.svg",
      price: product.price,
      quantity,
      size: selectedSize || product.sizes[0] || "Única",
      color: product.colors[0] || "",
    });
    toast.success("Agregado al carrito", {
      description: `${product.name} x${quantity}`,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <p className="text-xs tracking-wider uppercase text-muted-foreground mb-2">
          {product.category.name}
        </p>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2D5A3D] leading-tight">
          {product.name}
        </h1>
      </div>

      <div className="flex items-baseline gap-3">
        <span className="text-2xl md:text-3xl font-bold text-[#2D5A3D]">
          {formatPrice(product.price)}
        </span>
        {product.compareAtPrice && (
          <span className="text-lg text-muted-foreground line-through">
            {formatPrice(product.compareAtPrice)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "inline-block w-2 h-2 rounded-full",
            isOutOfStock ? "bg-red-500" : "bg-green-500"
          )}
        />
        <span
          className={cn(
            "text-sm font-medium",
            isOutOfStock ? "text-red-500" : "text-green-600"
          )}
        >
          {isOutOfStock ? "Agotado" : "Disponible"}
        </span>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {product.description}
      </p>

      {product.material && (
        <p className="text-xs text-muted-foreground">
          <span className="font-medium">Material:</span> {product.material}
        </p>
      )}

      {product.sizes.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">Talla</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-10 min-w-[3rem] px-3 text-sm font-medium rounded-sm border transition-all",
                  selectedSize === size
                    ? "bg-[#2D5A3D] text-white border-[#2D5A3D]"
                    : "bg-white text-foreground border-border hover:border-[#2D5A3D]"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <p className="text-sm font-semibold text-foreground">Cantidad</p>
        <div className="inline-flex items-center border border-border rounded-sm">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors"
            aria-label="Reducir cantidad"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-border">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center hover:bg-[#F5F0EB] transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full h-14 flex items-center justify-center gap-2 text-base font-medium rounded-none transition-all",
          isOutOfStock
            ? "bg-muted text-muted-foreground cursor-not-allowed"
            : "bg-[#2D5A3D] text-white hover:bg-[#1E3D29]"
        )}
      >
        <ShoppingBag size={20} />
        {isOutOfStock ? "Agotado" : "Agregar al carrito"}
      </button>

      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Truck size={16} className="text-[#A8D5BA]" />
          <span>Envíos a toda Colombia</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck size={16} className="text-[#A8D5BA]" />
          <span>Pago seguro</span>
        </div>
      </div>
    </motion.div>
  );
}
