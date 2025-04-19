# regen-link
A registry and map of the global regenerative movement

## Environment Variables

The following environment variables are used in this project:

- `NEXT_PUBLIC_APP_URL`: The base URL of the application. This is required for both development and production environments.
- `NEXTAUTH_SECRET`: (Optional) The secret used for NextAuth.js. This is required if you are using authentication features.

Ensure these variables are set in your `.env` file or in your deployment environment.

## Install Log

The project uses PNPM version 9.x due to a known issue with Corepack in Node.js v23.3.0 related to signature verification. The error occurs because Corepack can't verify the cryptographic signature for PNPM 10.8.1. It was decided to keep PNPM on an older version rather than downgrade Node.js.

