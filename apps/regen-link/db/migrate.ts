import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { client, db } from '.';

async function main() {
  try {
    console.log('Starting DB migration...');

    await migrate(db, {
      migrationsFolder: './db/migrations',
    });

    console.log('DB migration completed successfully');
  } catch (error) {
    console.error('DB migration failed:', error);
    process.exit(1);
  } finally {
    // Always close the connection or the script will hang
    await client.end();
  }
}

// Run migration
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
