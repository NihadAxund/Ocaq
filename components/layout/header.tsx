'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { useStore } from '@/lib/store';
import { useTranslation } from '@/lib/i18n';
import { Menu, ShoppingCart, User, Heart } from 'lucide-react';
import { CartSidebar } from '@/components/cart/cart-sidebar';
import { motion } from 'framer-motion';

export function Header() {
  const { cart, user, isCartOpen, setIsCartOpen, isMobileMenuOpen, setIsMobileMenuOpen, locale } = useStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const t = useTranslation(locale);
  
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { name: t.nav.company, href: '/company' },
    { name: t.nav.products, href: '/products' },
    { name: t.nav.promotions, href: '/promotions' },
    { name: t.nav.business, href: '/business' },
    { name: t.nav.contact, href: '/contact' }
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full glass-effect dark:glass-effect-dark border-b backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <Heart className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold gradient-text">RECIN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="text-foreground/80 hover:text-primary font-medium transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="hidden sm:flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>{user ? user.name : t.nav.login}</span>
              </Button>
              
              {isUserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-0 mt-2 w-48 glass-effect dark:glass-effect-dark rounded-md shadow-lg py-1 z-50"
                >
                  {user ? (
                    <>
                      <Link href="/account" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                        {t.nav.account}
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                        {t.nav.orders}
                      </Link>
                      {user.role === 'distributor' && (
                        <Link href="/distributor" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                          {t.nav.distributor}
                        </Link>
                      )}
                      <button className="block w-full text-left px-4 py-2 text-sm hover:bg-accent transition-colors">
                        {t.nav.logout}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                        {t.nav.login}
                      </Link>
                      <Link href="/register" className="block px-4 py-2 text-sm hover:bg-accent transition-colors">
                        {t.nav.register}
                      </Link>
                      <Link href="/distributor-apply" className="block px-4 py-2 text-sm text-primary hover:bg-accent transition-colors font-medium">
                        {t.nav.becomeDistributor}
                      </Link>
                    </>
                  )}
                </motion.div>
              )}
            </div>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs flex items-center justify-center animate-pulse">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] glass-effect dark:glass-effect-dark">
                <nav className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <Link href="/account" className="block py-2 hover:text-primary transition-colors">
                          {t.nav.account}
                        </Link>
                        <Link href="/orders" className="block py-2 hover:text-primary transition-colors">
                          {t.nav.orders}
                        </Link>
                        {user.role === 'distributor' && (
                          <Link href="/distributor" className="block py-2 hover:text-primary transition-colors">
                            {t.nav.distributor}
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Link href="/login" className="block py-2 hover:text-primary transition-colors">
                          {t.nav.login}
                        </Link>
                        <Link href="/register" className="block py-2 hover:text-primary transition-colors">
                          {t.nav.register}
                        </Link>
                        <Link href="/distributor-apply" className="block py-2 text-primary font-medium">
                          {t.nav.becomeDistributor}
                        </Link>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar />
    </motion.header>
  );
}