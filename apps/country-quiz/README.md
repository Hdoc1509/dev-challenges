<h1 align="center">Country Quiz</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-country-quiz.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/Bu3G2irnaXmfwQ8sZkw8">
      Challenge
    </a>
  </h3>
</div>

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/75381dba-c873-419d-90b1-bbd9755447b5)

**Challenge**: Create a country quiz app using an API. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see at least 2 types of questions: a city is the capital of.. or a flag belong to country..
- [x] User story: I can see select an answer
- [x] User story: I can see if my answer is correct or incorrect
- [x] User story: When I answer correctly, I can move on to the next question
- [x] User story: When I answer incorrectly, I can see my results and try again
- [x] User story: I can try again

### Built With

- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [clsx](https://github.com/lukeed/clsx#readme)
- [BEM](https://getbem.com/)
- [zod](https://zod.dev/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [@hrc/button](https://www.npmjs.com/package/@hrc/button)
- [@hrc/material-icons](https://www.npmjs.com/package/@hrc/material-icons)
- [@hrc/spinner](https://www.npmjs.com/package/@hrc/spinner)
- [@hrc/toggle-theme](https://www.npmjs.com/package/@hrc/toggle-theme)

### Extra Features

- Custom loading spinner
- Custom messages for show results
- Show counter of questions
- Added 1 question category

### What I learned

- Create a quiz app using an API.
- Use zod `.transform()` to parse data from API.
- Create a utility for generate questions by different categories.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run country-quiz in dev-mode
cd apps/country-quiz
pnpm run dev --open
```
