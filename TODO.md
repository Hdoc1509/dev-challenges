# TODO

## All apps

- try to remove `typescript` from `devDependencies`. ensure all projects are
  using the same version of `typescript`. See [Running scripts in workspaces](https://pnpm.io/9.x/cli/run#details)

## Vanilla

- ensure all apps are type-checked before building

## Legacy

- update `tsconfig.*.json` files to match [create-vite@8.2.0][create-vite@8.2.0]
- update `eslint` to `v9` and config files to match [create-vite@8.2.0][create-vite@8.2.0]
- migrate content-only apps to `astro`. pre-render content to static HTML.
- update projects using `astro` to use `astro@v5`
  - `@astrojs/upgrade` requires an explicit version in `package.json` instead
    of `catalog:` protocol

[create-vite@8.2.0]: https://github.com/vitejs/vite/tree/create-vite%408.2.0/packages/create-vite/template-react-ts
