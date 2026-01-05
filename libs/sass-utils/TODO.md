# TODO

## font/sizes

- export `css` variables as `scss` variables. allows to use only needed sizes

  - add `SassDoc` comments to show equivalent `px` values:

  ```scss
  /// 10px
  $fs-000: 0.625rem;
  ```

- `@use` these `scss` variables in `static` and `fluid` variants. requires
  transforming them from `.css` to `.scss`
