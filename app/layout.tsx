import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

import { LanguageProvider } from '@/components/language-provider';
import { defaultLocale, messages, openGraphLocales } from '@/lib/i18n';

import './globals.css';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['cyrillic', 'latin'],
});

const defaultMessages = messages[defaultLocale];
const socialTitle = `${defaultMessages.common.brand} — ${defaultMessages.home.headline}`;

export const metadata: Metadata = {
  icons: { icon: { url: '/favicon.svg', type: 'image/svg+xml' } },
  metadataBase: new URL('https://sut-product-ideas.roborter.chatgpt.site'),
  title: defaultMessages.meta.homeTitle,
  description: defaultMessages.meta.homeDescription,
  openGraph: {
    title: socialTitle,
    description: defaultMessages.meta.homeDescription,
    type: 'website',
    locale: openGraphLocales[defaultLocale],
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'giveidea — Есть идея? Расскажите.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: socialTitle,
    description: defaultMessages.meta.homeDescription,
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body className={manrope.variable}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
