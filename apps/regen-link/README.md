# Regen Link Web App

A web3 registry for the global Regen ecosystem to collect information about projects, organizations, and individuals.
It features an user-friendly embedded wallet for authentication to facilitate the onboarding process of Regens into the web3 world.

The app is built with:
- [WAGMI](https://wagmi.sh/) for web3 hooks
- [NextAuth](https://next-auth.js.org/) for authentication
- [Heroui](https://heroui.com/) for UI components
- [Human Wallet](https://wallet.human.tech/) as embedded wallet (no seed phrase required)
- [React-i18next](https://react.i18next.com/) for for I18N support

Localization cannot be chosen by the user, but is automatically detected either via a cookie or the `Accept-Language` header.
This means the app will always show a non-localized URL while the user's browser language determines which language is served.

## Installation and Runtime

Copy the `.env.example` file to `.env.local` and fill in the required values.

```bash
cp .env.example .env.local
```

### Set Environment Variables

The following environment variables are used in this project:

- `NEXT_PUBLIC_APP_URL`: The base URL of the application.
- `NEXTAUTH_URL`: The base URL of the NextAuth server.
- `NEXTAUTH_SECRET`: The secret used for NextAuth.js. Generate a new secret using `openssl rand -base64 32`.
  
Ensure these variables are set in your `.env` file or in your deployment environment.

### Start the development server

```bash
pnpm install
pnpm build
pnpm dev
```

Open the app in your browser at `http://localhost:3000` (or whatever you set ENV variables to).

## Notes

The project was forked from another app [Regen Link](https://github.com/j-h-scheufen/regen-link) which is why you might find some remnants of it in the codebase, e.g. the logos and favicons in the public folder.

Note: At the point of writing this, the Human Wallet v2 is not finally released and the configuration (in `wagmit.ts`) points to the staging environment.

```json
InitSilkOptions = {
  useStaging: true
}
```