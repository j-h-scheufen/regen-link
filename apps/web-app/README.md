# Web3 Starter App (Wagmi - NextAuth - Human Wallet - I18N)

A starter app for web3 projects consisting of a NextJS app using
- [WAGMI](https://wagmi.sh/) for web3 hooks
- [NextAuth](https://next-auth.js.org/) for authentication
- [Heroui](https://heroui.com/) for UI components
- [Human Wallet](https://wallet.human.tech/) as embedded wallet (no seed phrase required)
- [React-i18next](https://react.i18next.com/) for for I18N support

## Environment Variables

The following environment variables are used in this project:

- `NEXT_PUBLIC_APP_URL`: The base URL of the application.
- `NEXTAUTH_URL`: The base URL of the NextAuth server.
- `NEXTAUTH_SECRET`: The secret used for NextAuth.js. Generate a new secret using `openssl rand -base64 32`.
  
Ensure these variables are set in your `.env` file or in your deployment environment. You can copy `.env.example` to `.env.local` to get started.

## Installation and Runtime

```bash
pnpm install
pnpm build
pnpm dev
```

## Notes

The project was forked from another app [Regen Link](https://github.com/j-h-scheufen/regen-link) which is why you might find some remnants of it in the codebase, e.g. the logos and favicons in the public folder.