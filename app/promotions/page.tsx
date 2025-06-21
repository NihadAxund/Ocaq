'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { promotions } from '@/lib/data';
import { Clock, Copy, Check, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function PromotionsPage() {
  const { locale } = useStore();
  const t = useTranslation(locale);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyPromoCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy promo code:', err);
    }
  };

  const formatTimeLeft = (expiresAt: Date) => {
    const now = new Date().getTime();
    const distance = expiresAt.getTime() - now;

    if (distance <= 0) return 'Expired';

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h left`;
    if (hours > 0) return `${hours}h ${minutes}m left`;
    return `${minutes}m left`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
              {t.nav.promotions}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing deals and exclusive offers on our premium beauty products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promotion, index) => (
              <motion.div
                key={promotion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group glass-effect dark:glass-effect-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={promotion.image}
                    alt={promotion.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-600 text-white text-lg px-3 py-1">
                      -{promotion.discount}%
                    </Badge>
                  </div>

                  {/* Time Left */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center text-white text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{formatTimeLeft(promotion.expiresAt)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{promotion.title}</h3>
                  <p className="text-muted-foreground mb-4">{promotion.description}</p>

                  {/* Promo Code */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-mono font-bold">{promotion.code}</span>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyPromoCode(promotion.code)}
                        className="h-8 w-8 p-0"
                      >
                        {copiedCode === promotion.code ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </motion.div>
                  </div>

                  {copiedCode === promotion.code && (
                    <motion.p 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-sm text-green-600 font-medium mb-4"
                    >
                      {t.home.copied}
                    </motion.p>
                  )}

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      asChild
                    >
                      <Link href="/products">
                        {t.home.shopNow}
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Never Miss a Deal
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about exclusive promotions and new product launches.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                {t.footer.subscribe}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}