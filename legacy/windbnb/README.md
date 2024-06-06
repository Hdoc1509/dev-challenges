<h1 align="center">Windbnb</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/legacy/windbnb/">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/3JFYedSOZqAxYuOCNmYD">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg)](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml)

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/f210689f-25ba-4266-9664-dcba6d19f243)

**Challenge**: Create a small version of Airbnb - Windbnb with given data. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see a list of properties
- [x] User story: I can see the property card with a name, rating, apartment type, and super host
- [x] User story: I can open the filter drawer
- [x] User story: I can filter properties by location and number of guests
- [x] User story: I can see the number of filtered items
- [x] User story: I can see pages following given designs

### Built With

- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [BEM](https://getbem.com/)
- [clsx](https://github.com/lukeed/clsx#readme)
- [zod](https://zod.dev/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [@hrc/button](https://hdoc1509.github.io/hrc/packages/button/)
- [@hrc/material-icons](https://hdoc1509.github.io/hrc/packages/material-icons/)
- [@hrc/spinner](https://hdoc1509.github.io/hrc/packages/spinner/)
- [@hrc/toggle-theme](https://hdoc1509.github.io/hrc/packages/toggle-theme/)
- [@hrc/type-utils](https://hdoc1509.github.io/hrc/packages/type-utils/)
- [fontsource](https://fontsource.org/)
- [@material-design-icons/font](https://marella.me/material-design-icons/demo/font/)

## Extra Features

- Dark mode

### What I learned

- Display data following a given design
- Filter data by different criteria
- Share data and functions between components with `zustand`
- Validate received data with `zod` schemas

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run windbnb in dev-mode
cd apps/windbnb
pnpm run dev --open
```
