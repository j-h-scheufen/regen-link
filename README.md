# Regen Link Monorepo

A monorepo for the Regen Link project.

- [Regen Link](./apps/regen-link/README.md)

The monorepo is setup with PNPM workspaces, Biome linting/formatting, Husky for git hooks, and commitlint for commit messages.

## Installation

```bash
pnpm install
pnpm build
```

## Notes

The project uses PNPM version 9.x due to a known issue with Corepack in Node.js v23.3.0 related to signature verification. The error occurs because Corepack can't verify the cryptographic signature for PNPM 10.8.1. It was decided to keep PNPM on an older version rather than downgrade Node.js.

