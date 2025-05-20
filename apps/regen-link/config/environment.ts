// apps/regen-link/config/environment.ts

type ConfigType = {
  appUrl: string;
  databaseUrl: string;
  nextAuthSecret: string;
};

const isServer = typeof window === 'undefined';

export const getBaseUrl = () => {
  let baseUrl = undefined;
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    baseUrl = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  } else if (process.env.NEXT_PUBLIC_APP_URL) {
    baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  }
  if (!baseUrl) throw new Error('No base URL found');
  return baseUrl;
};

const ENV: ConfigType = {
  appUrl: required(process.env.NEXT_PUBLIC_APP_URL, 'NEXT_PUBLIC_APP_URL'),
  databaseUrl: isServer ? required(process.env.DATABASE_URL, 'DATABASE_URL') : '',
  nextAuthSecret: isServer ? required(process.env.NEXTAUTH_SECRET, 'NEXTAUTH_SECRET') : '',
};

function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value;
}

export default ENV;
