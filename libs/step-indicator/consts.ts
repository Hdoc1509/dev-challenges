export const STEP = Object.freeze({
  DEFAULT: 0,
  FIRST: 1,
  MIN: 2,
});

export const CLASSES = Object.freeze({
  INDICATOR: "step-indicator",
  STEP: "step-indicator__step",
});

export const ATTRIBUTES = Object.freeze({
  STEP: {
    COMPLETED: "data-completed",
    INITIAL: "data-initial",
  },
});

export const MESSAGE = Object.freeze({
  CONTAINER: Object.freeze({
    MISSING: 'Missing "$container" argument',
    INVALID_HTML_ELEMENT: '"$container" argument should be an HTMLDivElement',
    INDICATOR_CLASS: `"$container" argument is missing "${CLASSES.INDICATOR}" class`,
  }),
  STEP: Object.freeze({
    MIN: "At least two steps are required",
    ONLY_TWO: "There are only two steps",
    NO_NEXT: "There is no next step",
  }),
});
