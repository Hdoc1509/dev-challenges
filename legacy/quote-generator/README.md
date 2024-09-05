<h1 align="center">Random Quote Generator</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-quote-generator.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/8Y3J4ucAMQpSnYTwwWW8">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

<!-- [![Deploy challenges](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg)](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml) -->
**_In development_**

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/1eb8fd1b-7a1f-4d84-8997-e7ba092ac217)

**Challenge**: Create a quote generator app. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see a random quote
- [x] User story: I generate a new random quote
- [x] User story: When I select quote author, I can see a list of quotes from them
- [x] User story: I can see quote genre under the author

### Built With

- [Astro](https://astro.build/)
- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [BEM](https://getbem.com/)
- [zod](https://zod.dev/)
- [@hrc/button](https://hdoc1509.github.io/hrc/packages/button/)
- [@hrc/material-icons](https://hdoc1509.github.io/hrc/packages/material-icons/)
- [@hrc/spinner](https://hdoc1509.github.io/hrc/packages/spinner/)
- [@hrc/toggle-theme](https://hdoc1509.github.io/hrc/packages/toggle-theme/)
- [fontsource](https://fontsource.org/)
- [@material-design-icons/font](https://marella.me/material-design-icons/demo/font/)
- [FavQs API](https://favqs.com/api)

### Extra Features

- Dark mode
- Handling errors and custom error messages
- Custom loader

### What I learned

- Create a random quote generator app
- Retrieve data from an API, handling errors with Zod and custom utils
- Simplify data handling with custom hooks

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run random-quote-generator in dev-mode
cd legacy/random-quote-generator
pnpm run dev
```
