<h1 align="center">Weather App</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-weather-app.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/mM1UIenRhK808W8qmLWv">
      Challenge
    </a>
  </h3>
</div>

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/fdadff8d-c42a-41ac-ad47-c1d9cb6efdbe)

**Challenge**: Create a weather app using an API. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see city weather as default, preferably my current location
- [x] User story: I can search for city
- [x] User story: I can see weather of today and the next 5 days
- [x] User story: I can see the date and location of the weather
- [x] User story: I can see according to image for each type of weather
- [x] User story: I can see the min and max degree each day
- [x] User story: I can see wind status and wind direction
- [x] User story: I can see humidity percentage
- [x] User story: I can see a visibility indicator
- [x] User story: I can see the air pressure number
- [x] User story(optional): I can request my current location weather
- [x] User story(optional): I can convert temperature in Celcius to Fahrenheit and vice versa

### Built With

- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Sass](https://sass-lang.com/)
- [BEM](https://getbem.com/)
- [clsx](https://github.com/lukeed/clsx#readme)
- [zod](https://zod.dev)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [@hrc/button](https://hdoc1509.github.io/hrc/packages/button/)
- [@hrc/input](https://hdoc1509.github.io/hrc/packages/input/)
- [@hrc/material-icons](https://hdoc1509.github.io/hrc/packages/material-icons/)
- [@hrc/spinner](https://hdoc1509.github.io/hrc/packages/spinner/)
- [react-loading-skeleton](https://www.npmjs.com/package/react-loading-skeleton)
- [fontsource](https://fontsource.org/)
- [@material-design-icons/font](https://marella.me/material-design-icons/demo/font/)

### Extra Features

- Loading spinner for Search Drawer
- Skeleton loaders
- More icons
- Error handling for Geolocation API

### What I learned

- Retrieve current location with Geolocation API
- Geolocation API can only be used in a secure context (HTTPS)
- Compound components for a better code structure

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run weather-app in dev-mode
cd apps/weather-app
pnpm run dev --open
```
