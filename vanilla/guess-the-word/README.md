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

- [x] Create a guess the word game that matches the given design.
- [x] Use HTML to create the basic structure.
- [x] Use Vanilla JavaScript to add interactivity.
- [x] Users can see a random scrambled word when the page is first loaded or after
      users click the random button.
- [x] Users can enter one letter at a time. After each attempt, the input should
      automatically focus on the next input if it exists.
- [x] Users can see the number of wrong answers (tries) and which answers are
      wrong (mistakes).
- [x] Users can regenerate a new scrambled word by selecting the random button.
- [x] Users can reset all inputs, mistakes, and tries by selecting the reset button.
- [x] When the number of tries or mistakes reaches 6, the game should be reset.
- [x] When the user completes the game, it should show a '🎉 Success' alert.
- [x] The page should be responsive on different screen sizes.
- [ ] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [tabler icons](https://tabler.io/icons)
  - [book-2](https://tabler.io/icons/icon/book-2)
  - [edit](https://tabler.io/icons/icon/edit)
  - [list-letters](https://tabler.io/icons/icon/list-letters)
  - [menu-deep](https://tabler.io/icons/icon/menu-deep)
  - [trash](https://tabler.io/icons/icon/trash)
  - [versions](https://tabler.io/icons/icon/versions)
  - [writing-sign](https://tabler.io/icons/icon/writing-sign)
  - [x](https://tabler.io/icons/icon/x)
- [colorhexa](https://www.colorhexa.com/)
- [Online Image Compressor](https://imagecompressor.com/)
- [Words API](https://wordsapi.com/) for mocked words
  - Sample data taken from [Pricing](https://wordsapi.com/#pricing) section

### Extra Features

- Case insensitive check for entered letter
- Difficulty levels: easy, normal, hard, master, extreme, insane and why
- Change color of used letters
- Add border colors to correct and wrong entered letters
- Show correct word when winning or losing

### What I learned

- Create state management by using modules
  <!-- markdownlint-disable-next-line MD034 -->
  - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter

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
cd vanilla/guess-the-word/
pnpm run dev --open
```

[deploy-status]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
[deploy-url]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml
