import { drizzle } from 'drizzle-orm/postgres-js';
import { type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import ENV from '../config/environment';
import * as schema from './schema';

// Disable prefetch as it is not supported for "Transaction" pool mode
// The below setup is based on: https://github.com/orgs/supabase/discussions/21789
// due to CONNECT_TIMEOUT issues with Supabase.
export const client = postgres(ENV.databaseUrl, { prepare: false });

const drizzleClient = drizzle(client, {
  schema,
  logger: false, // Disable logging in production
});

declare global {
  // biome-ignore lint/style/noVar: <explanation>
  var database: PostgresJsDatabase<typeof schema> | undefined;
}

export const db = global.database || drizzleClient;

// Ensure a single instance during hot reloading in non-production environments
if (process.env.NODE_ENV !== 'production') {
  global.database = db;
}
