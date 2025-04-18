<!-- markdownlint-disable MD033 -->
<h1 align="center">Todo App</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/legacy/todo-app/">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/hH6PbOHBdPm6otzw2De5">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg)](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml)

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/e05c90cb-a4c8-4fdf-9fae-8e7dbd84d58f)

**Challenge**: Create a todo app following given designs. Use Front-end libraries
like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can add a new task
- [x] User story: I can complete a task
- [x] User story: I can toggle between All, Active and Completed
- [x] User story: I can remove one or all tasks under the Completed tab
- [x] User story (optional): Store the data in local storage that when I refresh
      the page I can still see my progress

### Built With

- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [clsx](https://github.com/lukeed/clsx)
- [BEM](https://getbem.com/)
- [@hrc/button](https://hdoc1509.github.io/hrc/packages/button/)
- [@hrc/input](https://hdoc1509.github.io/hrc/packages/input/)
- [@hrc/material-icons](https://hdoc1509.github.io/hrc/packages/material-icons/)
- [@hrc/toggle-theme](https://hdoc1509.github.io/hrc/packages/toggle-theme/)
- [fontsource](https://fontsource.org/)
- [@material-design-icons/font](https://marella.me/material-design-icons/demo/font/)

### What I learned

- Create a minimal todo app
- Save and load data from local storage
- Create pseudo navigation with `React.useState()`

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation)
installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run todo-app in dev-mode
cd apps/todo-app
pnpm run dev --open
```
