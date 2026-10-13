# Project Guide

## Purpose and stack

This repository is a Russian-language course landing page built with Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and ESLint. Use npm and Node.js 18.17 or newer.

## Code map

- `src/app`: App Router entry points, root layout, and global styles.
- `src/components/sections`: page sections for the landing page.
- `src/components/ui`: reusable UI primitives.
- `src/components/layout`: shared page shell and layout components.
- `src/lib`: content data and small utilities.
- `src/styles/tokens.css`: shared visual tokens.
- `public`: static assets.

## Working rules

- First inspect the relevant files and `git status`; preserve unrelated user changes.
- Keep changes focused on the requested task. Do not perform incidental refactors or remove unrelated code.
- Ask only when an ambiguity creates meaningful product, technical, or data-loss risk. Otherwise state and use a reasonable assumption.
- Follow the existing TypeScript style: strict types, no unnecessary `any`, double quotes, semicolons, and explicit component prop types.
- Use the `@/*` alias for internal imports.
- Place new landing-page sections in `src/components/sections`; reusable primitives belong in `src/components/ui`.
- Keep course copy and section data in `src/lib/course-content.ts` when practical. Keep global site metadata in `src/lib/site-config.ts` and `src/app/layout.tsx`.
- Prefer Tailwind utilities and existing tokens in `src/styles/tokens.css`; preserve the established visual language.
- Do not add production dependencies without explicit user confirmation.

## Verification

After code changes, run the relevant checks:

```bash
npm run lint
npm run typecheck
npm run build
```

For UI changes, also run `npm run dev` and check the page at `http://localhost:3000` on desktop and mobile widths. Verify anchor links, visible copy, and that no layout artifacts appear.

If `npm run typecheck` reports missing `.next/types` files, generate fresh Next.js artifacts with `npm run dev` or `npm run build`, then retry the typecheck.

Before handing work off, review `git diff` and `git status`; report the changed files and any checks that could not be run.
