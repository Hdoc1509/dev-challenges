const FORM_ID = "register-form";
const ERROR_MESSAGE_CLASS = "error-message";

const $unsafeForm = document.getElementById(FORM_ID);
if (!($unsafeForm instanceof HTMLFormElement))
  throw new Error(`missing '#${FORM_ID}' element`);

const $unsafeNameInput = $unsafeForm.querySelector("input[name='name']");
const $unsafeNameInputError = $unsafeForm.querySelector(
  `input[name='name'] + .${ERROR_MESSAGE_CLASS}`,
);
if (!($unsafeNameInput instanceof HTMLInputElement))
  throw new Error(`missing 'name' field in '#${FORM_ID}' element`);
if (!($unsafeNameInputError instanceof HTMLElement))
  throw new Error(
    `missing '.${ERROR_MESSAGE_CLASS}' element for 'name' field in '#${FORM_ID}' element`,
  );

const $unsafeEmailInput = $unsafeForm.querySelector("input[name='email']");
const $unsafeEmailInputError = $unsafeForm.querySelector(
  `input[name='email'] + .${ERROR_MESSAGE_CLASS}`,
);
if (!($unsafeEmailInput instanceof HTMLInputElement))
  throw new Error(`missing 'email' field in '#${FORM_ID}' element`);
if (!($unsafeEmailInputError instanceof HTMLElement))
  throw new Error(
    `missing '.${ERROR_MESSAGE_CLASS}' element for 'email' field in '#${FORM_ID}' element`,
  );

export const $registerForm = $unsafeForm;
export const $nameInput = $unsafeNameInput;
export const $nameInputError = $unsafeNameInputError;
export const $emailInput = $unsafeEmailInput;
export const $emailInputError = $unsafeEmailInputError;