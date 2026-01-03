# TODO

## Vanilla

- ensure all apps are type-checked before building

## Legacy

- remove `engines` field from `package.json` files. affected apps:

  - `button-component`
  - `input-component`
  - `country-quiz`
  - `todo-app`
  - `windbnb`

  `pnpm` version is set in `packageManager` or root `package.json` and
  `node` version is set in root `.nvmrc`.

## Vite

### Update to `v7`

### Legacy

- update `@vitejs/plugin-react` to support `vite@v7`
- update `astro` and related packages to support `vite@v7`
