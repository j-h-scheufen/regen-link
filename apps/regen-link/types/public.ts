import type { linkTypes } from '@/config/constants';

export type SocialLink = {
  type: (typeof linkTypes)[number];
  url: string;
};
