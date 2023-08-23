# @hdoc/react-toggle-theme

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
[data-theme="dark"] { ... }
/* or */
body[data-theme="dark"] { ... }

[data-theme="dark"] .my-class { ... }
/* or */
body[data-theme="dark"] .my-class { ... }
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

## CSS custom properties

The following CSS custom properties are used by `.theme-button` class:

`--hover-light-bg-color`

Background color of the button when `hover` and the theme is `light`.

---

`--active-light-bg-color`

Background color of the button when `click` and the theme is `light`.

---

`--hover-dark-bg-color`

Background color of the button when `hover` and the theme is `dark`.

---

`--active-dark-bg-color`

Background color of the button when `click` and the theme is `dark`.
