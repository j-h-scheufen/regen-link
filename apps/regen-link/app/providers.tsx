'use client';

import { HeroUIProvider } from '@heroui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import { WagmiProvider } from 'wagmi';

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
    <SessionProvider>
      <HeroUIProvider navigate={router.push}>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
