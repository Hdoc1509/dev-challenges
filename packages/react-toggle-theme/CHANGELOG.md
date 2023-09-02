# @hdoc/react-toggle-theme

## 2.0.1

### Patch Changes

- 9a1a8da: Add badges to README

## 2.0.0

### Major Changes

- 3aadcf5: Changed custom properties for customize background color

  #### Removed properties

  - `--hover-light-bg-color`
  - `--active-light-bg-color`
  - `--hover-dark-bg-color`
  - `--active-dark-bg-color`

  #### Added properties

  - `--button-bg`

  #### Migrating

  1. Rename `--hover-light-bg-color` by `--button-bg-hover`
  2. Rename `--active-light-bg-color` by `--button-bg-active`
  3. For change background color on dark mode you can use the folloing:

  ```css
  [data-theme="dark"] .theme-button {
    --button-bg: #1e1e1e;
    --button-bg-hover: #3e3e3e;
    --button-bg-active: #8e8e8e;
  }
  ```

## 1.0.1

### Patch Changes

- f81f5c7: Add missing LICENSE file

## 1.0.0

### Major Changes

- Initial release of all external packages.
