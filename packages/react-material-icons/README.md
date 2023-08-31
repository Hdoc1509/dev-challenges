# @hdoc/react-material-icons

Simple component for material design icons in your React app.

## Installation

```bash
npm install @hdoc/react-material-icons @material-design-icons/font
```

## Usage

Import `@material-design-icons/font` in your entry file (example: src/main.jsx in Vite):

```js
import "@material-design-icons/font";
```

Check [@material-design-icons/font docs](https://www.npmjs.com/package/@material-design-icons/font#usage) for more info.

Then, in your `App.jsx` or another file:

```jsx
import { Icon } from "@hdoc/react-material-icons";

function App() {
  return (
    <>
      ...
      <Icon name="shopping_cart" size="large" variant="oulined" />
    </>
  );
}
```

## Props

`name`

The name of the icon.

Type: `string`

---

`color`

The color of the icon.

Type: `'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`

---

`className`

Additional class names for extending styles.

Type: `string`

---

`disabled`

Whether the icon is disabled.

Type: `boolean`

---

`size`

Font size for the icon.

Type: `'small' | 'medium' | 'large'`

---

`variant`

Variant of the icon.

Type: `'outlined' | 'round' | 'sharp' | 'two-tone'`

## CSS

The following class names are used for styling with CSS:

| Class                             | Prop                 |
| --------------------------------- | -------------------- |
| `.material-icons--primary` (\*)   | `color="primary"`    |
| `.material-icons--secondary` (\*) | `color="secondary"`  |
| `.material-icons--error`          | `color="error"`      |
| `.material-icons--warning`        | `color="warning"`    |
| `.material-icons--info`           | `color="info"`       |
| `.material-icons--success`        | `color="success"`    |
| `.material-icons--small`          | `size="small"`       |
| `.material-icons--medium`         | `size="medium"`      |
| `.material-icons--large`          | `size="large"`       |
| `.material-icons--disabled`       | `disabled=true`      |
| `.material-icons-outlined`        | `variant="outlined"` |
| `.material-icons-round`           | `variant="round"`    |
| `.material-icons-sharp`           | `variant="sharp"`    |
| `.material-icons-two-tone`        | `variant="two-tone"` |

**(\*): Class names those has no built-in styles.**

## Customization

You can customize the color of the icon by using the following CSS custom properties:

```css
.any-parent-of-icon-component {
  --icon-color: black; /* default color */
  --icon-color-error: red;
  --icon-color-warning: orange;
  --icon-color-info: blue;
  --icon-color-success: green;
  --icon-color-disabled: gray;
}
```
