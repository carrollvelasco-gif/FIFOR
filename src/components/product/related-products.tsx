import { ProductCard } from "@/components/product/product-card";
import { getRelatedProducts } from "@/lib/products-data";

interface RelatedProductsProps {
  categoryId: string;
  currentSlug: string;
}

export function RelatedProducts({
  categoryId,
  currentSlug,
}: RelatedProductsProps) {
  const related = getRelatedProducts(categoryId, currentSlug, 4);

  if (related.length === 0) return null;

  return (
    <section className="py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2D5A3D] mb-8">
          También te puede gustar
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {related.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
