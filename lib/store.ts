import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, User, Product } from '@/types';
import { Locale } from '@/lib/i18n';

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Products state
  products: Product[];
  setProducts: (products: Product[]) => void;
  
  // UI state
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  
  // Theme state
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  
  // Language state
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart state
      cart: [],
      addToCart: (product, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
      },
      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.product.id !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => {
        const { cart, user } = get();
        return cart.reduce((total, item) => {
          const price = user?.role === 'distributor' && item.product.distributorPrice
            ? item.product.distributorPrice
            : item.product.price;
          return total + (price * item.quantity);
        }, 0);
      },
      
      // User state
      user: null,
      setUser: (user) => set({ user }),
      
      // Products state
      products: [],
      setProducts: (products) => set({ products }),
      
      // UI state
      isCartOpen: false,
      setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
      isMobileMenuOpen: false,
      setIsMobileMenuOpen: (isOpen) => set({ isMobileMenuOpen: isOpen }),
      
      // Theme state
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // Language state
      locale: 'en',
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'dermabeauty-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        theme: state.theme,
        locale: state.locale,
      }),
    }
  )
);