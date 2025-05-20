import type { linkTypes } from '@/config/constants';

export type SocialLink = {
  type: (typeof linkTypes)[number];
  url: string;
};

/**
 * User session data is stored in the session cookie.
 */
export type UserSession = {
  id: string;
  walletAddress: string;
  entityId: string | null;
};
