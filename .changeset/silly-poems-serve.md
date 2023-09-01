---
"@hdoc/react-toggle-theme": major
---

#### Changed custom properties for customize background color

The following css custom properties where removed:

- `--hover-light-bg-color`
- `--active-light-bg-color`
- `--hover-dark-bg-color`
- `--active-dark-bg-color`

The following css custom properties where added:

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
