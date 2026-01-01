# TODO

## Vite

### Use `build.rollupOptions.output.manualChunks` instead of `splitVendorChunkPlugin()`

Create custom `vite-config` package that exports this option. By default, it
will split into `index-<hash>.(js|css)` and `vendor-<hash>.(js|css)`. i.e.:

```js
{
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {}
      }
    }
  }
}
```

Affected files:

- `legacy/country-quiz/vite.config.ts`
- `legacy/windbnb/vite.config.ts`
- `_templates/app/react/vite.config.ts.hygen`
