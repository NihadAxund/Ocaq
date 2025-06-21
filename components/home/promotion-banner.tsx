'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { Clock, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function PromotionBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [copied, setCopied] = useState(false);
  const { locale } = useStore();
  const t = useTranslation(locale);

  const promoCode = 'SUMMER25';
  const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  const copyPromoCode = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy promo code:', err);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-effect dark:glass-effect-dark rounded-2xl p-8 md:p-12 text-center shadow-2xl"
        >
          <Badge className="mb-4 text-sm font-medium bg-white/20 text-white border-white/30">
            {t.home.limitedOffer}
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.home.summerSale}
          </h2>
          
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t.home.summerSaleDesc}
          </p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <Clock className="w-6 h-6 text-white" />
            <div className="flex space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div 
                  key={unit} 
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="bg-black/30 backdrop-blur-sm text-white rounded-lg px-3 py-2 min-w-[60px]">
                    <div className="text-2xl font-bold">
                      {value.toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="text-sm text-white/70 mt-1 capitalize">
                    {t.home[unit as keyof typeof t.home]}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center glass-effect dark:glass-effect-dark rounded-lg px-4 py-2">
              <span className="text-lg font-mono font-bold text-white">
                {promoCode}
              </span>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={copyPromoCode}
                  className="ml-2 h-8 w-8 p-0 text-white hover:bg-white/20"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </motion.div>
            </div>
            {copied && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm text-green-400 font-medium"
              >
                {t.home.copied}
              </motion.span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90" asChild>
                <Link href="/products?category=skin-care">
                  {t.home.shopNow}
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/promotions">
                  {t.home.viewPromotions}
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}