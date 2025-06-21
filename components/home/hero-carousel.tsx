'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { locale } = useStore();
  const t = useTranslation(locale);

  const slides = [
    {
      id: 1,
      image: 'https://img.gcimagazine.com/files/base/allured/all/image/2024/02/skincare.65bd01bd80f68.png?auto=format%2Ccompress&q=70&w=700',
      title: t.home.heroTitle1,
      subtitle: t.home.heroSubtitle1,
      cta: t.home.heroCta1,
      href: '/products?category=skin-care'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      title: t.home.heroTitle2,
      subtitle: t.home.heroSubtitle2,
      cta: t.home.heroCta2,
      href: '/products?category=hair-care'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      title: t.home.heroTitle3,
      subtitle: t.home.heroSubtitle3,
      cta: t.home.heroCta3,
      href: '/products?category=supplements'
    },
    {
      id: 4,
      image: 'https://images.pexels.com/photos/3985299/pexels-photo-3985299.jpeg',
      title: t.home.heroTitle4,
      subtitle: t.home.heroSubtitle4,
      cta: t.home.heroCta4,
      href: '/products?category=medical-services'
    }
  ];

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div 
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden rounded-2xl group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-4">
                <motion.h1 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-2xl mx-auto"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg animate-glow"
                    asChild
                  >
                    <Link href={slides[currentSlide].href}>
                      {slides[currentSlide].cta}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 glass-effect dark:glass-effect-dark rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 glass-effect dark:glass-effect-dark rounded-full p-2 transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </motion.button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}