import clsx from 'clsx';
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { fontFigtree, fontInter, fontSora } from '@/config/fonts';
import { sharedMetadata, viewport } from '@/config/metadata';
import { ALL_LOCALES, fallbackLng, isSupportedLanguage } from '../i18n/settings';
import './globals.css';

export const metadata: Metadata = sharedMetadata;
export { viewport };

// NEXTJS provides these params to pages (layouts do NOT receive searchParams!), but no official interface exists, yet.
// https://github.com/vercel/next.js/discussions/46131
export type NextPageProps<ParamType = string> = {
  params: { locale: ParamType };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return ALL_LOCALES.map((lng) => ({ lng }));
}

export default function RootLayout({
  params: { locale },
  children,
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  const lang = isSupportedLanguage(locale) ? locale : fallbackLng;

  return (
    <html lang={lang}>
      <body
        className={clsx(
          'dark min-h-screen antialiased bg-gradient',
          fontSora.variable,
          fontInter.variable,
          fontFigtree.variable,
          'font-sans'
        )}
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
