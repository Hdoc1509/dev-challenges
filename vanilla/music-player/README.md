<h1 align="center">Music Player</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/music-player/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/music-player">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges][deploy]](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml)

## Overview

![music-player screenshot](https://github.com/user-attachments/assets/74c496fc-dc78-4fbf-8982-6505ee0ed55f)

This challenge is an excellent opportunity to enhance your JavaScript skills by
creating a simple music player app that tests your data management capabilities
using JavaScript.

## User Stories

- [x] Create a music player app that matches the given design.
- [x] Use HTML to create the basic structure.
- [x] Add image, title, author, progress bar, player button,... according to the
      design.
- [x] Use vanilla JavaScript to add interactivity.
- [x] Users should be able to play and stop the current song.
- [x] Users should be able to go to next and previous songs.
- [x] Users should be able to change play time with the progress bar.
- [x] The page should be responsive on different screen sizes.
- [x] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [BEM](https://getbem.com/)
- [fontsource](https://fontsource.org/)
  - [Inter](https://fontsource.org/fonts/inter)
- [tabler icons](https://tabler-icons.io/)
  - [music](https://tabler.io/icons/icon/music)
  - [player-play filled](https://tabler.io/icons/icon/player-play)
  - [player-pause filled](https://tabler.io/icons/icon/player-pause)
- [svgomg](https://svgomg.net/)

### Extra Features

- Auto play the next song when the current song ends.

### What I learned

- Create a music player with HTML, CSS, and JavaScript.
- HTMLAudioElement API
- Custom styles for `<input type="range">`

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and
[pnpm](https://pnpm.io/installation) installed on your computer. From your
command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run music-player in dev-mode
cd vanilla/music-player/
pnpm run dev --open
```

[deploy]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
