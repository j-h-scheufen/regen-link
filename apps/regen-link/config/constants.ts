export const linkTypes = ['twitter', 'facebook', 'instagram', 'linkedin'] as const;

export const validFileExtensions = { image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'] } as const;

export const linkBaseUrls = [
  {
    type: 'twitter',
    baseUrls: ['twitter.com', 'twitter.co', 'x.com', 'twitterinc.com'],
  },
  {
    type: 'facebook',
    baseUrls: ['facebook.com', 'facebook.co', 'facebook.net', 'fb.com', 'fb.me'],
  },
  {
    type: 'instagram',
    baseUrls: ['instagram.com', 'ig.me'],
  },
  {
    type: 'linkedin',
    baseUrls: ['linkedin.com', 'linkedin.cn'],
  },
];

export const PATHS = {
  login: '/auth/login',
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
};

export const QUERY_DEFAULT_PAGE_SIZE = 25;

export const QueryConfig = {
  staleTimeDefault: 1000 * 60 * 15, // 15 minutes
};

export const MAX_IMAGE_UPLOAD_SIZE_MB = 4.5; // 4.5 MB is the current limit for Vercel serverless functions! https://vercel.com/docs/concepts/limits/overview#serverless-function-payload-size-limit
