<h1 align="center">QR Code Generator</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/qr-code-generator/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/qa-code-generator">
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
    alt="qr-code-generator screenshot"
    style="aspect-ratio: 16 / 9"
  />
</p>

This challenge provides an excellent opportunity to practice your JavaScript
skills by creating a simple QR code generator application that requires the use
of an external library.

## User Stories

- [ ] Create a QR code generator app that matches the given design.
- [ ] Use HTML to create the basic structure.
- [ ] Add inputs, buttons,.. according to the design.
- [ ] Use vanilla JavaScript to add interactivity.
- [ ] Users can enter a URL.
- [ ] User can see a QR quote after selecting the QR code button.
- [ ] User can download QR quote image by selecting download button.
- [ ] User can copy Quote to the clipboard by selecting Share button.
- [ ] The page should be responsive on different screen sizes.
- [ ] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [fontsource](https://fontsource.org/) fonts:
  - _List of fonts used in the project_

### Extra Features

_WIP_

### What I learned

_WIP_

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
pnpm install --filter "@hdoc/dev-challenges" --filter qr-code-generator...

# Run qr-code-generator in dev-mode
cd apps/qr-code-generator/
pnpm run dev --open
```

[deploy-status]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
[deploy-url]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml
