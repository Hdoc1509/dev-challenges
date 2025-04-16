import { CLASSES } from "./consts";

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
