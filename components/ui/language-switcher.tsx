'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/lib/store';
import { Locale, locales } from '@/lib/i18n';
import { Languages } from 'lucide-react';

const languageNames = {
  en: 'English',
  az: 'Azərbaycan',
  ru: 'Русский',
};

const languageFlags = {
  en: '🇺🇸',
  az: '🇦🇿',
  ru: '🇷🇺',
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline">
            {languageFlags[locale]} {languageNames[locale]}
          </span>
          <span className="sm:hidden">
            {languageFlags[locale]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLocale(lang)}
            className={locale === lang ? 'bg-accent' : ''}
          >
            <span className="mr-2">{languageFlags[lang]}</span>
            {languageNames[lang]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}