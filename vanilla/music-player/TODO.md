# TODO

## Fixes

- Improve visibility of hovered/focused buttons

- Update play time progress bar when song changes, in `handleSongChange()`:

  ```js
  $playProgress.max = `${duration}`;
  ```

## Vite

- Update to Vite 7 to use initial `src` attribute in `<audio>` tag.
  - reference: https://v6.vite.dev/guide/features.html#html
  - this will remove the need for setting the `src` attribute in `main.js`
