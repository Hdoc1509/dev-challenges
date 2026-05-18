# TODO

## Cleaning up workspace

- remove devDependencies of workspace root from `pnpm-workspace.yaml`. declare
  them in root `package.json` instead.

## Vanilla

- ensure all apps are type-checked before building

## Legacy

- update `tsconfig.*.json` files to match [create-vite@8.2.0][create-vite@8.2.0]
- update `eslint` to `v9` and config files to match [create-vite@8.2.0][create-vite@8.2.0]
- migrate content-only apps to `astro`. pre-render content to static HTML.

[create-vite@8.2.0]: https://github.com/vitejs/vite/tree/create-vite%408.2.0/packages/create-vite/template-react-ts
