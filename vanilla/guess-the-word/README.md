<!-- markdownlint-disable MD033 -->
<h1 align="center">Guess The Word Game</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/guess-the-word/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/guess-the-word">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges][deploy-status]][deploy-url]

## Overview

<!-- TODO: Update screenshot and its aspect ratio once project has completed -->

<p align="center">
  <img
    src="https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png"
    alt="guess-the-word screenshot"
    style="aspect-ratio: 16 / 9"
  />
</p>

This challenge is great to advance your JavaScript skills. The challenge is to
create a small game that tests your data management and DOM manipulation with JavaScript.

## User Stories

- [ ] Create a guess the word game that matches the given design.
- [x] Use HTML to create the basic structure.
- [ ] Use Vanilla JavaScript to add interactivity.
- [ ] Users can see a random scrambled word when the page is first loaded or after
      users click the random button.
- [ ] Users can enter one letter at a time. After each attempt, the input should
      automatically focus on the next input if it exists.
- [ ] Users can see the number of wrong answers (tries) and which answers are
      wrong (mistakes).
- [ ] Users can regenerate a new scrambled word by selecting the random button.
- [ ] Users can reset all inputs, mistakes, and tries by selecting the reset button.
- [ ] When the number of tries or mistakes reaches 6, the game should be reset.
- [ ] When the user completes the game, it should show a '🎉 Success' alert.
- [ ] The page should be responsive on different screen sizes.
- [ ] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [Online Image Compressor](https://imagecompressor.com/)

### Extra Features

<!-- markdownlint-disable-next-line MD036 -->
_WIP_

### What I learned

<!-- markdownlint-disable-next-line MD036 -->
_WIP_

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation)
installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all required dependencies
cd dev-challenges
pnpm install --filter "@hdoc/dev-challenges" --filter guess-the-word...

# Run guess-the-word in dev-mode
cd apps/guess-the-word/
pnpm run dev --open
```

[deploy-status]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
[deploy-url]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml