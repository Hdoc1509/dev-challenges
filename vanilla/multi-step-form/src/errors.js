import { $topicsError, $topicsFieldset, $topicsLegendError } from "./form";

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
  // TODO: improve accessibility of error messages. see:
  // https://cloudfour.com/thinks/progressively-enhanced-form-validation-part-2-layering-in-javascript/#using-a-custom-design-for-validation-error-messages
  $input.classList.add("input--with-error");
  $input.setCustomValidity(message);
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
  $input.setCustomValidity("");
  $error.classList.add("hidden");
};

export const showTopicsError = () => {
  $topicsFieldset.setAttribute("aria-invalid", "true");
  $topicsError.classList.remove("hidden");
  $topicsError.textContent = ERROR.TOPICS.MISSING;
  $topicsLegendError.textContent = ERROR.TOPICS.MISSING;
};
export const removeTopicsError = () => {
  $topicsFieldset.removeAttribute("aria-invalid");
  $topicsError.classList.add("hidden");
  $topicsLegendError.textContent = "";
};
