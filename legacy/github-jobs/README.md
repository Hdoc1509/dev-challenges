<h1 align="center">Github Jobs</h1>

<div align="center">
  <h3>
    <a href="https://hdoc-github-jobs.netlify.app">
      Solution
    </a>
    <span> | </span>
    <a href="https://legacy.devchallenges.io/challenges/TtUjDt19eIHxNQ4n5jps">
      Challenge
    </a>
  </h3>
</div>

## Deploy Status

[![Netlify Status](https://api.netlify.com/api/v1/badges/fe2ac7fd-1ac6-40a7-9f1f-d0a686ad42b2/deploy-status)](https://app.netlify.com/sites/hdoc-github-jobs/deploys)

## Overview

![screenshot](https://github.com/Hdoc1509/dev-challenges/assets/72316111/0867cd5e-2883-4af0-b9a4-e4557bd69d0c)

Challenge: Create a job search using an API. Use Front-end libraries like React or Vue. Don’t look at the existing solution. Fulfill user stories below:

- [x] User story: I can see a list of jobs in a city by default
- [x] User story: I can search for jobs with a given keyword
- [x] User story: I can search for jobs with a city name, zip code, or other location
- [x] User story: I can select one option from at least 4 pre-defined options
- [x] User story: I can search for a full-time job only
- [x] User story: I can see a list of jobs with their logo, company name, location, and posted time.
- [x] User story: When I select a job, I can see job descriptions and how to apply like the given design.
- [x] User story: When I am on the job details page, I can go back to the search page
- [x] User story (optional): I can see a list of jobs in the closest city from my location by default
- [x] User story (optional): I can see jobs on different pages, 5 items on each page

  **NOTE: The used API for jobs returns up to 10 items per page**

### Built With

- [Astro](https://astro.build/)
- [React](https://reactjs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)
- [BEM](https://getbem.com/)
- [zod](https://zod.dev/)
- [zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [@hrc/button](https://hdoc1509.github.io/hrc/packages/button/)
- [@hrc/input](https://hdoc1509.github.io/hrc/packages/input/)
- [@hrc/material-icons](https://hdoc1509.github.io/hrc/packages/material-icons/)
- [@hrc/spinner](https://hdoc1509.github.io/hrc/packages/spinner/)
- [@hrc/toggle-theme](https://hdoc1509.github.io/hrc/packages/toggle-theme/)
- [react-paginate](https://github.com/AdeleD/react-paginate)
- [react-router](https://reactrouter.com/en/main)
- [fontsource](https://fontsource.org/)
- [@material-design-icons/font](https://marella.me/material-design-icons/demo/font/)
- [SerpApi Goggle Jobs API](https://serpapi.com/google-jobs-api)
- [Weather API](https://www.weatherapi.com/)

### Extra features

- Dark mode
- Loading and Error states
- Counter for remaining free searches

### What I learned

- Use `react-router` to navigate between pages
- Handle pagination
- Handle errors and its data as a tuple. It reduces the usage of
  try-catch/then-catch

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation) installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install all workspace dependencies
cd dev-challenges && pnpm install

# Run github-jobs in dev-mode
cd legacy/github-jobs
pnpm run dev
```
