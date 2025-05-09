'use client';

import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { WagmiProvider } from 'wagmi';

import { i18n } from '@/app/i18n/client';
import { QueryConfig } from '@/config/constants';
import wagmiConfig from '@/config/wagmi';
declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>;
  }
}

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
  const router = useRouter();

  return (
    <I18nextProvider i18n={i18n}>
      <SessionProvider>
        <HeroUIProvider navigate={router.push}>
          <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
            </QueryClientProvider>
          </SnackbarProvider>
        </HeroUIProvider>
      </SessionProvider>
    </I18nextProvider>
  );
}
