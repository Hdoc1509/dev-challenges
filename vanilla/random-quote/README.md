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

<!-- TODO: Update screenshot once project has completed -->

![random-quote screenshot][screenshot-url]

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
- [ ] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [BEM](https://getbem.com/)
- [zod](https://zod.dev/)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [svgomg](https://svgomg.net/)
- [PaperQuotes API (Free Quota)](https://paperquotes.com/)
- [quicktype](https://app.quicktype.io/)

### Extra Features

- Alert when quote copied to clipboard
- Error handling

### What I learned

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
[screenshot-url]: https://user-images.githubusercontent.com/16707738/92399059-5716eb00-f132-11ea-8b14-bcacdc8ec97b.png
