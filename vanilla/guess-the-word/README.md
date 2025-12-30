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

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/914fc244-c36f-455a-8bab-332787159a9d"
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
- [x] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/) and [CUBE CSS](https://cube.fyi/)
- [@hrc/input](https://hdoc1509.github.io/hrc/packages/input/) markup and
  styles:
  - [Label](https://hdoc1509.github.io/hrc/api/label/)
  - [Radio](https://hdoc1509.github.io/hrc/components/radio/)
  - [RadioGroup](https://hdoc1509.github.io/hrc/components/radio-group/)
- [@hrc/spinner](https://hdoc1509.github.io/hrc/packages/spinner/) markup and
  styles:
  - [SpinnerBase](https://hdoc1509.github.io/hrc/api/spinner-base/)
  - [RingSpinner](https://hdoc1509.github.io/hrc/components/ring-spinner/)
  - [EllipsisSpinner](https://hdoc1509.github.io/hrc/components/ellipsis-spinner/)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [tabler icons](https://tabler.io/icons)
  - [arrow-badge-left filled](https://tabler.io/icons/icon/arrow-badge-left)
  - [arrow-badge-right filled](https://tabler.io/icons/icon/arrow-badge-right)
  - [book-2](https://tabler.io/icons/icon/book-2)
  - [chart-bar](https://tabler.io/icons/icon/chart-bar)
  - [circle](https://tabler.io/icons/icon/circle)
  - [filter-off](https://tabler.io/icons/icon/filter-off)
  - [menu-deep](https://tabler.io/icons/icon/menu-deep)
  - [point filled](https://tabler.io/icons/icon/point)
  - [progress-help](https://tabler.io/icons/icon/progress-help)
  - [reload](https://tabler.io/icons/icon/reload)
  - [text-grammar](https://tabler.io/icons/icon/text-grammar)
  - [versions](https://tabler.io/icons/icon/versions)
  - [writing-sign](https://tabler.io/icons/icon/writing-sign)
  - [x](https://tabler.io/icons/icon/x)
- [animista](https://animista.net/)
  - [blink](https://animista.net/play/attention/blink): caret for letter inputs
- [colorhexa](https://www.colorhexa.com/)
- [Online Image Compressor](https://imagecompressor.com/) and
  [Squoosh](https://squoosh.app/) for image optimization
- [Words API](https://wordsapi.com/) for mocked words
  - Sample data taken from [Pricing](https://wordsapi.com/#pricing) section

### Editor Tools

- [Kulala Language Server](https://github.com/mistweaverco/kulala-ls)
- [Kulala Formatter](https://github.com/mistweaverco/kulala-fmt)

### Extra Features

- +7400 words to discover
- Insensitive case checking for entered letter
- Change color of used letters
- Border colors for correct and wrong entered letters
- Show correct word when winning or losing
- `Hints` section: see all letters that have been guessed
- `Menu`:
  - `Definitions`, for each discovered word. Includes `Pagination`
  - `Difficulty`, to change difficulty level: `Easy`, `Normal`, `Hard`, `Master`,
    `Extreme`, `Insane`, `Why` and `Void`
  - `Stats`, for discovered words

### What I learned

- Create state management by [using modules][mdn-modules]
- More secure data by using [Map][mdn-map] and [WeakMap][mdn-weakmap] to
  [encapsulate data for HTML elements][mdn-encapsulate-data]
- Custom pagination system
- Custom tabs system
- Custom step-indicator library
- Usage of [AbortController][mdn-abortcontroller] to remove event listeners

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
[mdn-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#imported_values_can_only_be_modified_by_the_exporter
[mdn-map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
[mdn-weakmap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[mdn-encapsulate-data]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#associating_metadata
[mdn-abortcontroller]: https://developer.mozilla.org/en-US/docs/Web/API/AbortController

<!-- markdownlint-disable-file MD033 -->
