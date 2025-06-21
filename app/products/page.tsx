'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { products } from '@/lib/data';
import { Product } from '@/types';
import { Search, Filter, Star, ShoppingCart, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductsPage() {
  const { addToCart, user, locale } = useStore();
  const t = useTranslation(locale);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('popularity');
  const [showDistributorOnly, setShowDistributorOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', 'skin-care', 'hair-care', 'supplements', 'medical-services'];
  const brands = ['all', ...Array.from(new Set(products.map(p => p.brand)))];

  useEffect(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesBrand = selectedBrand === 'all' || product.brand === selectedBrand;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesDistributor = !showDistributorOnly || product.isDistributorOnly;

      return matchesSearch && matchesCategory && matchesBrand && matchesPrice && matchesDistributor;
    });

    // Sort products
    switch (sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // popularity - keep original order
        break;
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy, showDistributorOnly]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const getDisplayPrice = (product: Product) => {
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
              {t.products.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.products.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="glass-effect dark:glass-effect-dark rounded-2xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">{t.products.filters}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedBrand('all');
                    setPriceRange([0, 500]);
                    setShowDistributorOnly(false);
                  }}
                >
                  {t.products.clearFilters}
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder={t.common.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">{t.common.category}</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="skin-care">{t.home.skinCare}</SelectItem>
                    <SelectItem value="hair-care">{t.home.hairCare}</SelectItem>
                    <SelectItem value="supplements">{t.home.supplements}</SelectItem>
                    <SelectItem value="medical-services">{t.home.medicalServices}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">{t.common.brand}</label>
                <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  {t.products.priceRange}: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mt-2"
                />
              </div>

              {/* Distributor Only */}
              {user?.role === 'distributor' && (
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={showDistributorOnly}
                      onCheckedChange={setShowDistributorOnly}
                    />
                    <label className="text-sm font-medium">{t.products.distributorOnly}</label>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {t.products.filters}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">{t.products.popularity}</SelectItem>
                    <SelectItem value="priceAsc">{t.products.priceAsc}</SelectItem>
                    <SelectItem value="priceDesc">{t.products.priceDesc}</SelectItem>
                    <SelectItem value="rating">{t.products.rating}</SelectItem>
                    <SelectItem value="newest">{t.products.newest}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-lg text-muted-foreground">{t.products.noProducts}</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => {
                  const displayPrice = getDisplayPrice(product);
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
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
                                {t.products.quickView}
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="glass-effect dark:glass-effect-dark border-white text-white hover:bg-white hover:text-gray-900"
                            >
                              <Heart className="w-4 h-4" />
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}