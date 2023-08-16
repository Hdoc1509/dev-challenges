# material-icon

Simple component for material design icons in your React app.

## Installation

```bash
npm install @hdoc/material-icon @material-design-icons/font
```

## Usage

Import `@material-design-icons/font` in your entry file (example: src/main.jsx in Vite):

```js
import "@material-design-icons/font";
```

Check [@material-design-icons/font docs](https://www.npmjs.com/package/@material-design-icons/font#usage) for more info.

Then, in your `App.jsx` or another file:

```jsx
import { Icon } from "@hdoc/material-icon";

function App() {
  return (
    <>
      ...
      <Icon name="shopping_cart" size="large" style="oulined" />
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

`style`

Variant of the icon.

Type: `'outlined' | 'round' | 'sharp' | 'two-tone'`

## CSS

The following class names are used for styling with CSS:

| Class                        | Prop                |
| ---------------------------- | ------------------- |
| `.material-icons--primary`   | `color="primary"`   |
| `.material-icons--secondary` | `color="secondary"` |
| `.material-icons--error`     | `color="error"`     |
| `.material-icons--warning`   | `color="warning"`   |
| `.material-icons--info`      | `color="info"`      |
| `.material-icons--success`   | `color="success"`   |
| `.material-icons--small`     | `size="small"`      |
| `.material-icons--medium`    | `size="medium"`     |
| `.material-icons--large`     | `size="large"`      |
| `.material-icons--disabled`  | `disabled=true`     |
| `.material-icons-outlined`   | `style="outlined"`  |
| `.material-icons-round`      | `style="round"`     |
| `.material-icons-sharp`      | `style="sharp"`     |
| `.material-icons-two-tone`   | `style="two-tone"`  |
