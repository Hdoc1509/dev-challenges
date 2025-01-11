<!-- markdownlint-disable MD033 -->
<h1 align="center">Multi-step Register Form</h1>

<div align="center">
  <h3>
    <a href="https://hdoc1509.github.io/dev-challenges/multi-step-form/">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenge/multi-step-register-form">
      Challenge
    </a>
  </h3>
</div>

## Deploy status

[![Deploy challenges][deploy]](https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml)

## Overview

![multi-step-form screenshot](https://github.com/user-attachments/assets/746617e3-521a-477d-906e-db12fa699ddf)

This challenge offers a great opportunity to enhance your JavaScript skills by
creating a 3-step registration form with distinct sections, allowing you to test
and improve your JavaScript proficiency.

## User Stories

- [x] Create a multi-step registration page that matches the given design.
- [x] Use HTML to create the basic structure.
- [x] Add form, inputs, buttons, stepper,... according to the design.
- [x] Add validations to the inputs: name and email input should be required and
      email input should only accept email format.
- [x] Use Vanilla JavaScript to add interactivity.
- [x] Users should not be able to continue to the next step if inputs are empty
      or the topic is not selected.
- [x] Users can continue to the next step if inputs are filled or topic is
      selected.
- [x] Users should know which step they are at.
- [x] When users click confirm, they should see an alert with '✅ Success'
      message.
- [x] The page should be responsive on different screen sizes.
- [x] Deploy the solution and submit Repository URL and Demo URL.

### Built With

- [Vite](https://vitejs.dev/)
- [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)
- [BEM](https://getbem.com/)
- [fontsource](https://fontsource.org/) fonts:
  - [Inter](https://fontsource.org/fonts/inter)

### Extra Features

- More validations for name input.
  - Should be at least 5 characters.
  - Should be at most 15 characters.
  - Should only contain letters.
- Restart event.

### What I learned

- Create a stepper slider with CSS and JavaScript.
  - Movement transition between steps.
- Create an alert with CSS and JavaScript.
  - Movement transition
  - Time bar

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/download/) and [pnpm](https://pnpm.io/installation)
installed on your computer. From your command line:

```bash
# Clone this repository
git clone https://github.com/Hdoc1509/dev-challenges

# install workspace dependencies
cd dev-challenges && pnpm install

# Run multi-step-form in dev-mode
cd vanilla/multi-step-form
pnpm run dev --open
```

[deploy]: https://github.com/Hdoc1509/dev-challenges/actions/workflows/deploy.yml/badge.svg
