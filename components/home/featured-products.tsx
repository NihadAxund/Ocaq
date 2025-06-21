'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { products } from '@/lib/data';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedProducts() {
  const { addToCart, user, locale } = useStore();
  const t = useTranslation(locale);
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 4));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getDisplayPrice = (product: any) => {
    if (user?.role === 'distributor' && product.distributorPrice) {
      return {
        price: product.distributorPrice,
        originalPrice: product.price,
        isDistributorPrice: true
      };
    }
    return {
      price: product.price,
      originalPrice: null,
      isDistributorPrice: false
    };
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t.home.featuredProducts}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t.home.featuredProductsSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => {
            const displayPrice = getDisplayPrice(product);
            
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass-effect dark:glass-effect-dark rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        className="glass-effect dark:glass-effect-dark text-white hover:bg-white hover:text-gray-900"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {t.common.addToCart}
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="glass-effect dark:glass-effect-dark border-white text-white hover:bg-white hover:text-gray-900"
                        asChild
                      >
                        <Link href={`/products/${product.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          {t.common.view}
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {displayPrice.isDistributorPrice && (
                      <Badge className="bg-blue-600 text-white">
                        {t.home.distributorPrice}
                      </Badge>
                    )}
                    {product.isDistributorOnly && (
                      <Badge variant="secondary">
                        Distributor Only
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
                    <h3 className="text-lg font-semibold line-clamp-2">
                      {product.name}
                    </h3>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold">
                        {formatPrice(displayPrice.price)}
                      </span>
                      {displayPrice.originalPrice && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          {formatPrice(displayPrice.originalPrice)}
                        </span>
                      )}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {t.common.addToCart}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              {t.home.viewAllProducts}
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}