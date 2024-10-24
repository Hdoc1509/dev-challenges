import { showInputError, removeInputError, ERROR } from "../../errors.js";
import { $emailInput, $emailInputError } from "../../form.js";
import { EMAIL_REGEX } from "../../regex.js";
/** @typedef {import("../../types").ValidationResult} ValidationResult */

const errorOptions = { $input: $emailInput, $error: $emailInputError };

/** @returns {ValidationResult} */
export const validateEmailInput = () => {
  const email = $emailInput.value;

  if (email === "")
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.EMAIL.MISSING }),
    };

  if (email.match(EMAIL_REGEX) == null)
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.EMAIL.INVALID }),
    };

  return {
    success: true,
    removeError: () => removeInputError(errorOptions),
  };
};
