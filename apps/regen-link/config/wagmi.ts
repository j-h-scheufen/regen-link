import type { InitSilkOptions } from '@silk-wallet/silk-wallet-sdk';
import { http, type Config, createConfig } from 'wagmi';
import { type Chain, localhost, mainnet } from 'wagmi/chains';

import { getBaseUrl } from '@/config/environment';
import silk from '@/utils/silk.connector';

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const baseUrl = getBaseUrl();

// Get origin safely for both client and server environments
export const getOrigin = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  return baseUrl;
};

export const silkInitOptions: InitSilkOptions = {
  useStaging: true,
  config: {
    styles: { darkMode: true },
    allowedSocials: ['google'],
    authenticationMethods: ['email', 'social'],
  },
  project: {
    name: 'Regen Link',
    // logo: '',
    // origin: getOrigin(),
    // projectId:
    // termsOfServiceUrl: `${baseUrl}/terms-of-service`,
    // privacyPolicyUrl: `${baseUrl}/privacy-policy`,
  },
};

export const getDefaultChain = (): Chain => {
  switch (process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase()) {
    case 'local':
      return localhost;
    default:
      return mainnet;
  }
};

/**
 * Default wagmi configuration
 */
const wagmiConfig: Config = createConfig({
  chains: [mainnet],
  connectors: [silk(silkInitOptions)],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});

export default wagmiConfig;
