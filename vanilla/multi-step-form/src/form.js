const FORM_ID = "register-form";
const ERROR_MESSAGE_CLASS = "error-message";

const $unsafeForm = document.getElementById(FORM_ID);
if (!($unsafeForm instanceof HTMLFormElement))
  throw new Error(`missing '#${FORM_ID}' element`);
export const $registerForm = $unsafeForm;

const $unsafeNameInput = $registerForm.querySelector("input[name='name']");
const $unsafeNameInputError = $registerForm.querySelector(
  `input[name='name'] + .${ERROR_MESSAGE_CLASS}`,
);
if (!($unsafeNameInput instanceof HTMLInputElement))
  throw new Error(`missing 'name' field in '#${FORM_ID}' element`);
if (!($unsafeNameInputError instanceof HTMLElement))
  throw new Error(
    `missing '.${ERROR_MESSAGE_CLASS}' element for 'name' field in '#${FORM_ID}' element`,
  );
export const $nameInput = $unsafeNameInput;
export const $nameInputError = $unsafeNameInputError;

const $unsafeEmailInput = $registerForm.querySelector("input[name='email']");
const $unsafeEmailInputError = $registerForm.querySelector(
  `input[name='email'] + .${ERROR_MESSAGE_CLASS}`,
);
if (!($unsafeEmailInput instanceof HTMLInputElement))
  throw new Error(`missing 'email' field in '#${FORM_ID}' element`);
if (!($unsafeEmailInputError instanceof HTMLElement))
  throw new Error(
    `missing '.${ERROR_MESSAGE_CLASS}' element for 'email' field in '#${FORM_ID}' element`,
  );
export const $emailInput = $unsafeEmailInput;
export const $emailInputError = $unsafeEmailInputError;

export const TOPIC_CHECKBOX_SELECTOR = "input[type='checkbox'][name='topics']";
/** @type {HTMLInputElement[]} */
export const $topicCheckboxes = Array.from(
  $registerForm.querySelectorAll(TOPIC_CHECKBOX_SELECTOR),
);
const $unsafeTopicsError = $registerForm.querySelector(
  `.topics-step__group + .${ERROR_MESSAGE_CLASS}`,
);
if (!($unsafeTopicsError instanceof HTMLSpanElement))
  throw new Error(
    `missing '.${ERROR_MESSAGE_CLASS}' element for 'topics' field in '#${FORM_ID}' element`,
  );
export const $topicsError = $unsafeTopicsError;
