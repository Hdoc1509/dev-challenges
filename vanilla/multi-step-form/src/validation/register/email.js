import { showInputError, removeInputError, ERROR } from "@/errors.js";
import { $emailInput, $emailInputError } from "@/form.js";
import { EMAIL_REGEX } from "@/regex.js";

const errorOptions = { $input: $emailInput, $error: $emailInputError };

/** @returns {{ success: boolean }} */
export const validateEmailInput = () => {
  const email = $emailInput.value;

  if (email === "") {
    showInputError({ ...errorOptions, message: ERROR.EMAIL.MISSING });
    return { success: false };
  }

  if (email.match(EMAIL_REGEX) == null) {
    showInputError({ ...errorOptions, message: ERROR.EMAIL.INVALID });
    return { success: false };
  }

  removeInputError(errorOptions);
  return { success: true };
};
