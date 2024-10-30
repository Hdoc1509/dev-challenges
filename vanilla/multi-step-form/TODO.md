- [ ] create a library for stepper slider

  - need a `.steps-container`
  - need `.step` elements
  - use `.step--current` class to apply styles to current step
  - need a `.steps-trigger` element
  - need a way to register a list of steps and its handlers
  - handler should update classes and `--_stepper-counter` css variable

  references:

  - https://vite.dev/guide/build#library-mode
  - https://vite.dev/config/build-options#build-lib
  - https://getbootstrap.com/docs/5.3/getting-started/javascript

  **NOTE**: publish as `es` and `umd` modules like
