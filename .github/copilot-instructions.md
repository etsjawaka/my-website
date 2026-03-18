Purpose

This file gives concise, repo-specific guidance for AI coding agents working on this SvelteKit + Vite project.

- Quick start

- Install dependencies: `npm install`
- Run dev server: `npm run dev` (Vite + SvelteKit)
- Build production: `npm run build`
- Preview build: `npm run preview`
- Type/quality checks: `npm run check` (runs `svelte-check`)
- Lint: `npm run lint` (Prettier + ESLint)
- Format: `npm run format` (Prettier)

- High-level architecture

- Framework: SvelteKit (Svelte) + Vite. See `svelte.config.js` and `vite.config.ts`.
- TypeScript: project `tsconfig.json` extends the generated `.svelte-kit/tsconfig.json` — avoid editing the generated config directly.
- Adapter: `@sveltejs/adapter-auto` is used by default in `svelte.config.js`.

- Routing and pages

- File-based routing under `src/routes/`. Examples: [src/routes/+page.svelte](../src/routes/+page.svelte) and [src/routes/products/+page.svelte](../src/routes/products/+page.svelte).
- Layout: application-level wrapper in [src/routes/+layout.svelte](../src/routes/+layout.svelte) imports assets via the `$lib` alias (example: `$lib/assets/favicon.svg`) and uses the render children pattern in this repo (`let { children } = $props();` and `{@render children()}`). Keep changes compatible with that pattern.

- Assets and static files

- Place reusable JS/TS helpers or re-exported modules in `src/lib/` and import with the `$lib` alias.
- Static, public assets referenced by root paths (e.g., `/products/hook.jpg`) should be placed in `static/` so they serve from `/` in the built app. The products page uses this pattern.

- Code and style conventions (project-specific)

- Formatting: `prettier` + `prettier-plugin-svelte` are configured; run `npm run format` before large edits.
- Linting: `eslint` with svelte plugin. Run `npm run lint` to catch style/format issues.
- Type checking: `svelte-check` is available via `npm run check` and integrates with the generated tsconfig.
- Svelte usage: component scripts may be plain JS or TS; layout uses `lang="ts"`. Match the file's existing language tag when editing.

- Editing guidance for AI agents (doable, specific actions)

- When adding a route, create a new folder under `src/routes/` and add `+page.svelte`. Keep layout rendering patterns intact.
- For images referenced as `/...`, put files in `static/`. For bundling or importing SVGs, use `$lib/assets` and import directly in Svelte (`import icon from '$lib/assets/icon.svg'`).
- For TypeScript edits, do not modify `.svelte-kit/` generated config; prefer local overrides in `tsconfig.json` if needed.
- When updating dependencies or build config, adjust `package.json` scripts and `svelte.config.js` carefully — this repo expects `vite` scripts in `package.json`.

- Important files to reference

- `package.json` — scripts and devDependencies (dev commands: `dev`, `build`, `preview`, `check`, `lint`, `format`). See [package.json](../package.json).
- `svelte.config.js` — adapter and kit configuration. See [svelte.config.js](../svelte.config.js).
- `vite.config.ts` — Vite + Svelte plugin. See [vite.config.ts](../vite.config.ts).
- `tsconfig.json` — extends `.svelte-kit/tsconfig.json`. See [tsconfig.json](../tsconfig.json).

- When to ask the user

- Ask before changing build/runtime adapter (adapter-auto) or the TypeScript generated config.
- Ask before adding server-side routes or API endpoints — this repo currently contains only client route examples.

If anything is missing or you'd like the guide to emphasize other parts of the codebase, tell me which areas to expand.
