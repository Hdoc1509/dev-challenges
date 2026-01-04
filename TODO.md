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

  `pnpm` version is set in `packageManager` of root `package.json` and
  `node` version is set in root `.nvmrc`.

- update `tsconfig.*.json` files to match [create-vite@8.2.0][create-vite@8.2.0]
- update `eslint` to `v9` and config files to match [create-vite@8.2.0][create-vite@8.2.0]
- update `vite` to `v7`:
  - update `@vitejs/plugin-react` to support `vite@v7`
  - update `astro` and related packages to support `vite@v7`
- migrate content-only apps to `astro`. pre-render content to static HTML.

[create-vite@8.2.0]: https://github.com/vitejs/vite/tree/create-vite%408.2.0/packages/create-vite/template-react-ts
