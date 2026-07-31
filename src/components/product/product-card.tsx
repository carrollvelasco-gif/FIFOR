"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    compareAtPrice?: number | null;
    images: string[];
    category?: { name: string } | null;
  };
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
    >
      <Link href={`/producto/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] bg-[#F5F0EB] rounded-sm overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <button
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
            }}
            aria-label="Agregar a favoritos"
          >
            <Heart size={16} className="text-[#2D5A3D]" />
          </button>
          {product.compareAtPrice && (
            <span className="absolute top-3 left-3 bg-[#2D5A3D] text-white text-[10px] font-bold px-2 py-1 tracking-wider">
              -{Math.round((1 - product.price / product.compareAtPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="mt-3 space-y-1">
          {product.category && (
            <p className="text-[10px] tracking-wider uppercase text-muted-foreground">
              {product.category.name}
            </p>
          )}
          <h3 className="text-sm font-medium text-foreground group-hover:text-[#2D5A3D] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[#2D5A3D]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
