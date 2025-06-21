import { HeroCarousel } from '@/components/home/hero-carousel';
import { FeaturedProducts } from '@/components/home/featured-products';
import { CategoryGrid } from '@/components/home/category-grid';
import { PromotionBanner } from '@/components/home/promotion-banner';

export default function HomePage() {
  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroCarousel />
      </div>
      
      <FeaturedProducts />
      <CategoryGrid />
      <PromotionBanner />
    </main>
  );
}