import { applyInputError, ERROR } from "./errors";
import {
  $emailInput,
  $emailInputError,
  $nameInput,
  $nameInputError,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from "./form";
import { EMAIL_REGEX, NAME_REGEX } from "./regex";

/** @typedef {{ success: true }} ValidationResultSuccess */
/** @typedef {{ success: false, showError: () => void }} ValidationResultError */
/** @typedef {ValidationResultSuccess | ValidationResultError} ValidationResult */

/** @returns {ValidationResult} */
export const validateNameInput = () => {
  const name = $nameInput.value;

  if (name === "")
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $nameInput,
          $error: $nameInputError,
          message: ERROR.NAME.MISSING,
        }),
    };

  if (name.match(NAME_REGEX) == null)
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $nameInput,
          $error: $nameInputError,
          message: ERROR.NAME.ONLY_LETTERS,
        }),
    };

  if (name.trim().length < MIN_NAME_LENGTH)
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $nameInput,
          $error: $nameInputError,
          message: ERROR.NAME.MIN_LENGTH,
        }),
    };

  if (name.trim().length > MAX_NAME_LENGTH)
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $nameInput,
          $error: $nameInputError,
          message: ERROR.NAME.MAX_LENGTH,
        }),
    };

  return { success: true };
};

/** @returns {ValidationResult} */
export const validateEmailInput = () => {
  const email = $emailInput.value;

  if (email === "")
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $emailInput,
          $error: $emailInputError,
          message: ERROR.EMAIL.MISSING,
        }),
    };

  if (email.match(EMAIL_REGEX) == null)
    return {
      success: false,
      showError: () =>
        applyInputError({
          $input: $emailInput,
          $error: $emailInputError,
          message: ERROR.EMAIL.INVALID,
        }),
    };

  return { success: true };
};