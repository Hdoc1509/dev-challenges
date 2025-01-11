<!-- markdownlint-disable MD033 -->
<h1 align="center">Random Quote</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/random-quote/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/random-quote">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges][deploy-status]][deploy-url]

## Overview

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/98d5c5c1-fe70-42e3-922d-cb4f1c5b80f2"
    alt="random-quote screenshot"
    style="aspect-ratio: 146 / 247"
  />
</p>

This challenge is an excellent opportunity to gain practical experience in
utilizing external APIs within your application. The task involves creating a
straightforward application for generating random quotes, which will necessitate
the use of an external API.

## User Stories

- [x] Create a random quote app that matches the given design.
- [x] Use HTML to create the basic structure.
- [x] Add author name, quote, tag,.. according to the design.
- [x] Use vanilla JavaScript to add interactivity.
- [x] Users can see a random quote when they first visit the page.
- [x] Users can see a random quote after they select the random button.
- [x] Users can copy the quote to the clipboard.
- [x] The page should be responsive on different screen sizes.
- [x] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [zod](https://zod.dev/)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [tabler icons](https://tabler.io/icons)
  - [quote](https://tabler.io/icons/icon/quote)
- [svgomg](https://svgomg.net/)
- [PaperQuotes API (Free Quota)](https://paperquotes.com/)
- [quicktype](https://app.quicktype.io/)
- [Online Image Compressor](https://imagecompressor.com/) and [Aspect Ratio
  Calculator](https://aspectratiocalculator.com) for screenshot

### Extra Features

- Alert when quote copied to clipboard
- Error handling
  - Fetch API
  - Clipboard API

### What I learned

- Create a random quote app with HTML, CSS, and JavaScript.
- Handle errors or `Clipboard API`

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and
[pnpm](https://pnpm.io/installation) installed on your computer. From your
command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all required dependencies
cd dev-challenges
pnpm install --filter "@hdoc/dev-challenges" --filter random-quote...

# Run random-quote in dev-mode
cd apps/random-quote/
pnpm run dev --open
```

[deploy-status]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
[deploy-url]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml
