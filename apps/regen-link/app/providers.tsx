'use client';

import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';

import { QueryConfig } from '@/config/constants';
import wagmiConfig from '@/config/wagmi';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: QueryConfig.staleTimeDefault,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider>
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <WagmiProvider config={wagmiConfig}>
            <HeroUIProvider>
              <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
              </NextThemesProvider>
            </HeroUIProvider>
          </WagmiProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </SessionProvider>
  );
}
