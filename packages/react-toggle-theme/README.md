# @hdoc/react-toggle-theme

<p align="center">
  <a href="https://www.npmjs.com/package/@hdoc/react-toggle-theme">
    <img alt="npm" src="https://img.shields.io/npm/v/%40hdoc%2Freact-toggle-theme">
  </a>
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/%40hdoc%2Freact-toggle-theme">
  <img alt="npm" src="https://img.shields.io/npm/dm/%40hdoc%2Freact-toggle-theme">
</p>

Simple button component for toggle between `light` and `dark` theme in your React app.

## Installation

```bash
npm install @hdoc/react-toggle-theme
```

## Usage

First, import `load-theme.js` in your `index.html`:

```html
<script
  type="module"
  src="/path/to/@hdoc/react-toggle-theme/dist/load-theme.js"
></script>
```

Then, in your `App.jsx` or another file:

```jsx
import { ThemeButton } from "@hdoc/react-toggle-theme";

function App() {
  return (
    <>
      ...
      <ThemeButton
        lightElement={<span>Light</span>}
        darkElement={<span>Dark</span>}
        fullRounded
      />
    </>
  );
}
```

Finally, you will need to add your styles manually:

```css
/* For light theme: */
[data-theme="light"] { ... }
[data-theme="light"] .my-class { ... }

/* For dark theme: */
[data-theme="dark"] { ... }
[data-theme="dark"] .my-class { ... }
```

## Props

`lightElement`

Element to render when the theme is `light`.

Type: `ReactNode`

---

`darkElement`

Element to render when the theme is `dark`.

Type: `ReactNode`

---

`fullRounded`

Whether to render the button with rounded corners as a circle.

Type: `boolean`

## CSS classes

`theme-button`

Default class name

---

`theme-button--full-rounded`

Styles the button as a circle when `fullRounded=true`

## Customization

You can customize the background color of the button with the following CSS custom properties:

```css
.theme-button {
  --button-bg: #fff;
  --button-bg-hover: #eee;
  --button-bg-active: #ddd;
}

/* The same custom properties applies for dark theme. */
[data-theme="dark"] .theme-button {
  --button-bg: #333;
  --button-bg-hover: #444;
  --button-bg-active: #555;
}
```
