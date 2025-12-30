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

<p align="center">
  <img
    src="https://github.com/user-attachments/assets/7f666ecf-2059-4501-983a-1ef11e8f20b6"
    alt="qr-code-generator screenshot"
    style="aspect-ratio: 16 / 9"
  />
</p>

This challenge provides an excellent opportunity to practice your JavaScript
skills by creating a simple QR code generator application that requires the use
of an external library.

## User Stories

- [x] Create a QR code generator app that matches the given design.
- [x] Use HTML to create the basic structure.
- [x] Add inputs, buttons,.. according to the design.
- [x] Use vanilla JavaScript to add interactivity.
- [x] Users can enter a URL.
- [x] User can see a QR quote after selecting the QR code button.
- [x] User can download QR quote image by selecting download button.
- [x] User can copy Quote to the clipboard by selecting Share button.
- [x] The page should be responsive on different screen sizes.
- [x] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [html2canvas](https://html2canvas.hertzen.com/)
- [qrcodejs](https://github.com/llyys/qrcodejs)
- [fontsource](https://fontsource.org/) fonts:
  - [Outfit](https://fontsource.org/fonts/outfit)
- [tabler icons](https://tabler.io/icons)
  - [qrcode](https://tabler.io/icons/icon/qrcode)
- [Boxy SVG](https://boxy-svg.com/) to create `Share` and `Download` icons
  before using them from [QR code generator repo](https://github.com/devchallenges-io/qr-code-generator)
- [svgomg](https://svgomg.net/) for optimization of svg assets and inline svg

### Extra Features

- Redirect to home page if `url` is not provided
- Error handling for `Clipboard API`
- Alert when QR quote copied to clipboard

### What I learned

- Create a QR code generator app with HTML, CSS, and JavaScript.
- Download an image from canvas

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation)
installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all required dependencies
cd dev-challenges
pnpm install --filter "@hdoc/dev-challenges" --filter qr-code-generator...

# Run qr-code-generator in dev-mode
cd vanilla/qr-code-generator/
pnpm run dev --open
```

[deploy-status]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
[deploy-url]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml

<!-- markdownlint-disable-file MD033 -->
