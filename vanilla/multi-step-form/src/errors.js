export const ERROR = {
  NAME: {
    MISSING: "You must enter your name",
    ONLY_LETTERS: "Name must contain only letters",
  },
  EMAIL: {
    INVALID: "Email must be valid",
    MISSING: "You must enter your email",
  },
};

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$input
 * @param {Element} params.$error
 * @param {string} params.message
 */
export const applyInputError = ({ $input, $error, message }) => {
  $input.classList.add("input--with-error");
  $error.classList.remove("hidden");
  $error.textContent = message;
};

/**
 * @param {Object} params
 * @param {HTMLInputElement} params.$input
 * @param {Element} params.$error
 */
export const cleanInputError = ({ $input, $error }) => {
  $input.classList.remove("input--with-error");
  $error.classList.add("hidden");
};
