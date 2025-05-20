import type { AuthOptions, RequestInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { SiweMessage } from 'siwe';

import ENV from '@/config/environment';
import { getUserSessionData, insertUser } from '@/db/utils';
import { PATHS } from './constants';

const nextAuthUrl =
  process.env.NEXTAUTH_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null);

const providers = [
  CredentialsProvider({
    name: 'Ethereum',
    credentials: {
      message: {
        label: 'Message',
        type: 'text',
        placeholder: '0x0',
      },
      signature: {
        label: 'Signature',
        type: 'text',
        placeholder: '0x0',
      },
    },

    // Note: 'req' is not used atm, but the nonce should come from its headers. See problem and workaround below
    // biome-ignore lint/correctness/noUnusedVariables: current workaround in place
    async authorize(credentials, req: RequestInternal['headers']) {
      if (!credentials) {
        return null;
      }
      try {
        const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

        if (!nextAuthUrl) {
          return null;
        }

        const nextAuthHost = new URL(nextAuthUrl).host;

        // NOTE: The below code is a workaround to get the nonce directly from the cookie instead of the header
        // See: https://stackoverflow.com/questions/77074980/next-js-13-nextauth-sign-in-with-ethereum-csrf-token-mismatch-between-clien
        // nonce: await getCsrfToken({ req: { headers: req as NextRequest & NextApiRequest } }),

        // Get CSRF token from cookie using the new async approach
        const csrfToken = (await cookies()).get('next-auth.csrf-token');
        const nonce = csrfToken?.value.split('|')[0];
        const verificationParams = {
          signature: credentials?.signature || '',
          domain: nextAuthHost,
          nonce,
        };
        const result = await siwe.verify(verificationParams);

        if (result.success) {
          let userSession = await getUserSessionData(siwe.address);

          if (!userSession) {
            // Users are automatically created when they sign in, because all we need is their wallet address
            const newUser = await insertUser({
              walletAddress: siwe.address,
            });
            userSession = {
              id: newUser.id,
              walletAddress: newUser.walletAddress,
              entityId: null,
            };
          }
          return userSession;
        }

        return null;
      } catch (error) {
        console.error('Error authorizing user:', error);
        return null;
      }
    },
  }),
];

export const nextAuthOptions: AuthOptions = {
  providers,
  pages: { signIn: PATHS.login },
  session: {
    strategy: 'jwt',
  },
  secret: ENV.nextAuthSecret,
  callbacks: {
    // see also /types/next-auth.d.ts
    async jwt({ token, user }) {
      if (user) return { ...token, user };
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },
};
