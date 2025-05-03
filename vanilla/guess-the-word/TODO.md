# TODO

## Chore

- Update `Typescript` to `5.5` to use [jsdoc `@import`
  tag](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-5.html#the-jsdoc-import-tag)

## Optimization (if needed)

### Styles

- Inline [critical styles](https://web.dev/articles/extract-critical-css):

  ```html
  <style>
    @import url("./src/styles/critical.css");
  </style>
  ```

  **NOTE**: Use non-critical vite plugin

- Defer [non-critical styles](https://web.dev/articles/defer-non-critical-css)

  **NOTE**: Use non-critical vite plugin

- Dynamic [load per media query](https://blog.logrocket.com/eliminate-render-blocking-resources-css-javascript/#deferringnoncriticalcss)

### Fonts

- [Fontsource](https://fontsource.org/docs/getting-started/preload)
- [Preload critical assets](https://web.dev/articles/preload-critical-assets#how_to_implement_relpreload)
