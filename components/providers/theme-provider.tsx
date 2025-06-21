"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: 'system',
  setTheme: () => {},
});

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'dermabeauty-theme',
}: ThemeProviderProps) {
  // 1) Başlangıçta sadece defaultTheme kullanıyoruz
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const { setTheme: setStoreTheme } = useStore();

  // 2) İlk mount olduğunda localStorage’dan oku
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(storageKey) as Theme | null;
    if (stored) {
      setTheme(stored);
    }
  }, [storageKey]);

  // 3) Tema değiştikçe <html> sınıfını güncelle ve store’a yaz
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    let applied: 'light' | 'dark';
    if (theme === 'system') {
      applied = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } else {
      applied = theme;
    }

    root.classList.add(applied);
    setStoreTheme(applied);
  }, [theme, setStoreTheme]);

  // 4) localStorage’a yazmayı da bu fonksiyonda yapıyoruz
  const handleSetTheme = (newTheme: Theme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }
    setTheme(newTheme);
  };

  return (
    <ThemeProviderContext.Provider
      value={{ theme, setTheme: handleSetTheme }}
    >
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeProviderContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};
