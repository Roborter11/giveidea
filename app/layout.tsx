import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';

import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['cyrillic', 'latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sut-product-ideas.roborter.chatgpt.site'),
  title: 'Суть — превращаем идеи в продукты',
  description:
    'Опишите реальную проблему. Мы проверим гипотезу и соберём SaaS или B2B-продукт.',
  openGraph: {
    title: 'Не храните идею в заметках.',
    description:
      'Суть — продуктовая лаборатория. Передайте нам проблему, которую стоит решить.',
    type: 'website',
    locale: 'ru_RU',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Не храните идею в заметках.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Не храните идею в заметках.',
    description: 'Суть — продуктовая лаборатория.',
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
      <body className={`${manrope.variable} ${plexMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
