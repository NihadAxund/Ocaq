'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { Sparkles, Scissors, Pill, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export function CategoryGrid() {
  const { locale } = useStore();
  const t = useTranslation(locale);

  const categories = [
    {
      id: 'skin-care',
      name: t.home.skinCare,
      description: t.home.skinCareDesc,
      image: 'https://img.gcimagazine.com/files/base/allured/all/image/2024/02/skincare.65bd01bd80f68.png?auto=format%2Ccompress&q=70&w=700',
      icon: Sparkles,
      href: '/products?category=skin-care'
    },
    {
      id: 'hair-care',
      name: t.home.hairCare,
      description: t.home.hairCareDesc,
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      icon: Scissors,
      href: '/products?category=hair-care'
    },
    {
      id: 'supplements',
      name: t.home.supplements,
      description: t.home.supplementsDesc,
      image: 'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg',
      icon: Pill,
      href: '/products?category=supplements'
    },
    {
      id: 'medical-services',
      name: t.home.medicalServices,
      description: t.home.medicalServicesDesc,
      image: 'https://images.pexels.com/photos/3985299/pexels-photo-3985299.jpeg',
      icon: Stethoscope,
      href: '/products?category=medical-services'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {t.home.shopByCategory}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.home.shopByCategorySubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group"
              >
                <Link
                  href={category.href}
                  className="block relative overflow-hidden rounded-2xl glass-effect dark:glass-effect-dark shadow-sm hover:shadow-lg transition-all duration-300 border"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <div className="flex items-center mb-2">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent className="w-6 h-6 mr-2" />
                        </motion.div>
                        <h3 className="text-xl font-bold">{category.name}</h3>
                      </div>
                      <p className="text-sm opacity-90 mb-4">
                        {category.description}
                      </p>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          size="sm"
                          className="glass-effect dark:glass-effect-dark border border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-200"
                        >
                          {t.home.explore}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}