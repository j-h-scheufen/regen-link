import type { DefaultSession } from 'next-auth';

import type { UserSession } from './public';

/**
 * Extends core next-auth types with custom attributes to store app-specific information in the user session.
 * See: https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: UserSession & DefaultSession['user'];
  }
}
