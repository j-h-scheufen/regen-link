import { fontInter } from '@/config/fonts';
import clsx from 'clsx';
import type { Metadata } from 'next';

import { Providers } from '@/app/providers';
import { sharedMetadata, viewport } from '@/config/metadata';
import './globals.css';

export const metadata: Metadata = sharedMetadata;
export { viewport };

// NEXTJS provides these params to pages (layouts do NOT receive searchParams!), but no official interface exists, yet.
// https://github.com/vercel/next.js/discussions/46131
export type NextPageProps<ParamType = string> = {
  params: { locale: ParamType };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx('min-h-screen bg-background font-sans antialiased', fontInter.variable)}
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
