# Regen Link Web App

A web3 registry for the global Regen ecosystem to collect information about projects, organizations, and individuals.
It features an user-friendly embedded wallet for authentication to facilitate the onboarding process of Regens into the web3 world.

The app is built with:
- [WAGMI](https://wagmi.sh/) for web3 hooks
- [NextAuth](https://next-auth.js.org/) for authentication
- [Heroui](https://heroui.com/) for UI components
- [Human Wallet](https://wallet.human.tech/) as embedded wallet (no seed phrase required)
- [React-i18next](https://react.i18next.com/) for for I18N support
- [Drizzle](https://orm.drizzle.team/) for database communication

## Installation and Configuration

### Prerequisites

1. **Install dependencies**

```bash
pnpm install
```

2. **Copy the `.env.example` file to `.env.local`**

```bash
cp .env.example .env.local
```

3. **Configure environment variables**

The following environment variables are used in this project:

- `NEXT_PUBLIC_APP_URL`: The base URL of the application.
- `NEXTAUTH_URL`: The base URL of the NextAuth server.
- `NEXTAUTH_SECRET`: The secret used for NextAuth.js. Generate a new secret using `openssl rand -base64 32`.
- `DATABASE_URL`: The connection string for a postgres database.
  
Ensure these variables are set in your `.env` file or in your deployment environment.

For certain commands, like the DB setup, you need these variable available in your shell. The easiest is to export them from the `.env.local` file like this:

```bash
export $(grep -v '^#' .env.local | xargs)
```

### Setup the database

```bash
# Generate the migration files based on your schema
pnpm db:generate

# Apply the migrations to your database
pnpm db:migrate
```

This is the same workflow when making changes to the schema after the initial setup.

If your database has no schema, yet, or you're in development mode, you can skip the migration and create the tables directly. Be careful with this command as it will alter existing tables, if necessary, without a migration to revert it.

```bash
npx drizzle-kit push:pg
```

## Development

```bash
pnpm build
pnpm dev
```
Open the app in your browser at `http://localhost:3000` (or whatever you set your ENV variables to).

## Notes 

- Localization cannot be chosen by the user, but is automatically detected either via a cookie or the `Accept-Language` header.
This means the app will always show a non-localized URL while the user's browser language determines which language is served.

