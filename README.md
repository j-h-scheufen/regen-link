# Web3 Starter App Monorepo

A monorepo template for web3 projects, currently consisting of a single NextJS app:

- [Web App](./apps/web-app/README.md)

## Installation and Runtime

```bash
pnpm install
pnpm build
pnpm dev
```

## Notes

The project uses PNPM version 9.x due to a known issue with Corepack in Node.js v23.3.0 related to signature verification. The error occurs because Corepack can't verify the cryptographic signature for PNPM 10.8.1. It was decided to keep PNPM on an older version rather than downgrade Node.js.

