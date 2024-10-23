import { $topicsError } from "./form";

export const ERROR = {
  NAME: {
    MAX_LENGTH: "Name must be at most 15 characters",
    MIN_LENGTH: "Name must be at least 5 characters",
    MISSING: "You must enter your name",
    ONLY_LETTERS: "Name must contain only letters",
  },
  EMAIL: {
    INVALID: "Email must be valid",
    MISSING: "You must enter your email",
  },
  TOPICS: {
    MISSING: "You must select at least one topic",
  },
};

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$input
 * @param {Element} params.$error
 * @param {string} params.message
 */
export const showInputError = ({ $input, $error, message }) => {
  $input.classList.add("input--with-error");
  $error.classList.remove("hidden");
  $error.textContent = message;
};

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$input
 * @param {Element} params.$error
 */
export const removeInputError = ({ $input, $error }) => {
  $input.classList.remove("input--with-error");
  $error.classList.add("hidden");
};

export const showTopicsError = () => {
  $topicsError.classList.remove("hidden");
  $topicsError.textContent = ERROR.TOPICS.MISSING;
};
export const removeTopicsError = () => {
  $topicsError.classList.add("hidden");
};
