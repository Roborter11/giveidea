import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { LanguageProvider } from '@/components/language-provider';

import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['cyrillic', 'latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sut-product-ideas.roborter.chatgpt.site'),
  title: 'Суть — идеи, из которых растут продукты',
  description:
    'Опишите идею и оставьте контакты. Мы изучим заявку и напишем, если сможем помочь.',
  openGraph: {
    title: 'Есть идея? Расскажите.',
    description: 'Суть — идеи, из которых растут продукты.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Есть идея? Расскажите.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Есть идея? Расскажите.',
    description: 'Суть — идеи, из которых растут продукты.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={manrope.variable}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
