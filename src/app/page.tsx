import { HeroBanner } from "@/components/home/hero-banner";
import { CategoriesSection } from "@/components/home/categories-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BenefitsSection } from "@/components/home/benefits-section";
import { TrackOrderSection } from "@/components/home/track-order-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { InstagramSection } from "@/components/home/instagram-section";

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <CategoriesSection />
      <FeaturedProducts />
      <BenefitsSection />
      <TrackOrderSection />
      <TestimonialsSection />
      <CTASection />
      <InstagramSection />
    </>
  );
}
