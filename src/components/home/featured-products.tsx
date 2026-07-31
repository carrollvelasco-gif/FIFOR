import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/product/product-card";
import { getFeaturedProducts } from "@/lib/products-data";

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 md:py-24 bg-[#F5F0EB]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-[#A8D5BA] font-medium">
              Productos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D5A3D] mt-2">
              Destacados de la semana
            </h2>
            <p className="mt-2 text-muted-foreground max-w-md">
              Los favoritos de nuestros clientes, seleccionados para ti
            </p>
          </div>
          <Link
            href="/catalogo"
            className="group/button inline-flex shrink-0 items-center justify-center rounded-lg border bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 h-9 gap-1.5 px-2.5 border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 border-[#2D5A3D] text-[#2D5A3D] hover:bg-[#2D5A3D] hover:text-white rounded-none h-11"
          >
            Ver todos <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
