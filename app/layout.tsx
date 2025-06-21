import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RECIN - Premium Skincare, Hair Care & Wellness Products',
  description: 'Discover premium skincare, hair care, supplements, and medical aesthetic services. Trusted by professionals worldwide with clinically proven results.',
  keywords: 'skincare, hair care, beauty products, supplements, medical aesthetics, professional beauty',
  openGraph: {
    title: 'RECIN - Premium Beauty & Wellness',
    description: 'Transform your beauty routine with our clinically proven products and professional services.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          defaultTheme="system"
          storageKey="recin-theme"
          {...metadata}
        >
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}