import type { Metadata } from 'next';
import { Geist, Lora } from 'next/font/google';

import './globals.css';

const geist = Geist({
  variable: '--font-geist',
  subsets: ['cyrillic', 'latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['cyrillic', 'latin'],
  style: ['italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://sut-product-ideas.lush-boar-6095.chatgpt.site',
  ),
  title: 'Суть — идеи, из которых растут продукты',
  description:
    'Поделитесь идеей или проблемой — мы изучим её и соберём команду для запуска SaaS или B2B-продукта.',
  openGraph: {
    title: 'Есть проблема? Сделаем продукт.',
    description:
      'Суть — студия цифровых продуктов. Расскажите о проблеме или идее, которую стоит превратить в сервис.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Есть проблема? Сделаем продукт.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Есть проблема? Сделаем продукт.',
    description: 'Суть — студия цифровых продуктов.',
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
      <body className={`${geist.variable} ${lora.variable}`}>{children}</body>
    </html>
  );
}
