import clsx from 'clsx';
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { fontFigtree, fontInter, fontSora } from '@/config/fonts';
import { sharedMetadata, viewport } from '@/config/metadata';
import { fallbackLng, isSupportedLanguage } from '../i18n/settings';
import './globals.css';

export const metadata: Metadata = sharedMetadata;
export { viewport };

// NEXTJS provides these params to pages (layouts do NOT receive searchParams!), but no official interface exists, yet.
// https://github.com/vercel/next.js/discussions/46131
export type NextPageProps<ParamType = string> = {
  params: { locale: ParamType };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function RootLayout({
  params,
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
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
          <div className="relative flex min-h-screen flex-col items-center">
            <main className="flex-grow max-w-[800px]">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
