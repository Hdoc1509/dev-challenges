import { showInputError, removeInputError, ERROR } from "../../errors.js";
import {
  $nameInput,
  $nameInputError,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from "../../form.js";
import { NAME_REGEX } from "../../regex.js";
/** @typedef {import("../../types").ValidationResult} ValidationResult */

const errorOptions = { $input: $nameInput, $error: $nameInputError };

/** @returns {ValidationResult} */
export const validateNameInput = () => {
  const name = $nameInput.value;

  if (name === "")
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.NAME.MISSING }),
    };

  if (name.match(NAME_REGEX) == null)
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.NAME.ONLY_LETTERS }),
    };

  if (name.trim().length < MIN_NAME_LENGTH)
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.NAME.MIN_LENGTH }),
    };

  if (name.trim().length > MAX_NAME_LENGTH)
    return {
      success: false,
      showError: () =>
        showInputError({ ...errorOptions, message: ERROR.NAME.MAX_LENGTH }),
    };

  return {
    success: true,
    removeError: () => removeInputError(errorOptions),
  };
};
