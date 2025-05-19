import type { Config } from 'drizzle-kit';

import ENV from './config/environment';

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: ENV.databaseUrl,
  },
  verbose: true,
  strict: true,
} satisfies Config;
