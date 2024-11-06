import { showInputError, removeInputError, ERROR } from "@/errors.js";
import {
  $nameInput,
  $nameInputError,
  MAX_NAME_LENGTH,
  MIN_NAME_LENGTH,
} from "@/form.js";
import { NAME_REGEX } from "@/regex.js";

const errorOptions = { $input: $nameInput, $error: $nameInputError };

/** @returns {{ success: boolean }} */
export const validateNameInput = () => {
  const name = $nameInput.value;

  if (name === "") {
    showInputError({ ...errorOptions, message: ERROR.NAME.MISSING });
    return { success: false };
  }

  if (name.match(NAME_REGEX) == null) {
    showInputError({ ...errorOptions, message: ERROR.NAME.ONLY_LETTERS });
    return { success: false };
  }

  if (name.trim().length < MIN_NAME_LENGTH) {
    showInputError({ ...errorOptions, message: ERROR.NAME.MIN_LENGTH });
    return { success: false };
  }

  if (name.trim().length > MAX_NAME_LENGTH) {
    showInputError({ ...errorOptions, message: ERROR.NAME.MAX_LENGTH });
    return { success: false };
  }

  removeInputError(errorOptions);
  return { success: true };
};
