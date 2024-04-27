<h1 align="center">Input Component</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-input-component.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/TSqutYM4c5WtluM7QzGp">
      Challenge
    </a>
  </h3>
</div>

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/0690045c-df76-4a8c-9e8d-7f69dcf63360)

**Challenge**: Create a reusable input with all the states in the design and a page displaying all the states. You can work on the same project with other design system challenges. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see error state
- [x] User story: I can choose to disable input
- [x] User story: I can choose to have helper text
- [x] User story: I can choose to have an icon on the left or right (Use Google Icon and at least 5 variants)
- [x] User story: I can have different input sizes
- [x] User story: I can have different colors
- [x] User story: I can choose to have input take the width of the parent
- [x] User story: I can have multiline input like a textarea
- [x] User story: When I hover or focus, I can see visual indicators
- [x] User story: I can still access all input attributes
- [x] User story (optional): Show input in a similar way like the design or use [Storybook](https://storybook.js.org/). Otherwise, showing the input in multiple states is enough

### Built With

- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [clsx](https://github.com/lukeed/clsx#readme)
- [BEM](https://getbem.com/)
- [@hdoc/react-material-icons](https://www.npmjs.com/package/@hdoc/react-material-icons)
- [@hdoc/react-toggle-theme](https://www.npmjs.com/package/@hdoc/react-toggle-theme)

### What I learned

In this challenge I learned:

- Create a reusable and extensible input component
- Use Typescript discriminated unions for more restrictive types

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run input-component in dev-mode
cd apps/input-component
pnpm run dev --open
```
