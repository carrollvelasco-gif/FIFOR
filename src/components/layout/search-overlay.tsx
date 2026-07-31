"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { products } from "@/lib/products-data";
import { formatPrice } from "@/lib/utils";

export function SearchOverlay() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.category.slug.toLowerCase().includes(q) ||
          p.colors.some((c) => c.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSelect = () => {
    closeSearch();
    setQuery("");
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-[60]"
            onClick={closeSearch}
          />
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ type: "spring", damping: 35, stiffness: 350 }}
            className="fixed top-0 left-0 right-0 bg-white z-[70] shadow-xl"
          >
            <div className="max-w-3xl mx-auto px-4 pt-6 pb-4">
              <div className="relative">
                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="w-full h-14 pl-12 pr-12 text-lg border-0 border-b-2 border-[#A8D5BA] bg-transparent focus:outline-none focus:border-[#2D5A3D] transition-colors placeholder:text-muted-foreground/40"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                )}
                <button
                  onClick={closeSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {query && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 max-h-[60vh] overflow-y-auto -mx-4 px-4"
                >
                  {results.length === 0 ? (
                    <div className="text-center py-12">
                      <Search size={40} className="mx-auto text-muted-foreground/20 mb-3" />
                      <p className="text-muted-foreground text-sm">
                        No encontramos productos para tu búsqueda.
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        Intenta con otros términos
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1 pb-4">
                      <p className="text-xs text-muted-foreground/60 px-2 py-2">
                        {results.length} resultado{results.length !== 1 ? "s" : ""}
                      </p>
                      {results.map((product) => (
                        <Link
                          key={product.id}
                          href={`/producto/${product.slug}`}
                          onClick={handleSelect}
                          className="flex items-center gap-4 p-2 rounded-sm hover:bg-[#F5F0EB]/70 transition-colors group"
                        >
                          <div className="relative w-14 h-16 shrink-0 bg-[#F5F0EB] rounded-sm overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-[#2D5A3D] transition-colors line-clamp-1">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {product.category.name}
                            </p>
                          </div>
                          <span className="text-sm font-semibold text-[#2D5A3D] shrink-0">
                            {formatPrice(product.price)}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
