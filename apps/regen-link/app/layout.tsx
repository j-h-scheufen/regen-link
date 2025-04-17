import { fontInter } from '@/config/fonts';
import clsx from 'clsx';
import type { Metadata } from 'next';
import './globals.css';
import { sharedMetadata, viewport } from './metadata';
import { Providers } from './providers';

export const metadata: Metadata = sharedMetadata;
export { viewport };

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
