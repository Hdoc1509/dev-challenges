<h1 align="center">Windbnb</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-windbnb.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/3JFYedSOZqAxYuOCNmYD">
      Challenge
    </a>
  </h3>
</div>

## Overview

![screenshot](screenshots/windbnb.png)

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
- [zod](https://zod.dev/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [clsx](https://github.com/lukeed/clsx#readme)
- [BEM](https://getbem.com/)
- [@hrc/button](https://www.npmjs.com/package/@hrc/button)
- [@hrc/material-icons](https://www.npmjs.com/package/@hrc/material-icons)
- [@hrc/toggle-theme](https://www.npmjs.com/package/@hrc/toggle-theme)

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
