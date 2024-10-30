import {
  getAllElementsBySelector,
  getElementById,
  getElementBySelector,
} from "./utils/dom.js";

const FORM_ID = "register-form";
const ERROR_MESSAGE_CLASS = "error-message";

export const $registerForm = getElementById(FORM_ID, HTMLFormElement);

export const $nameInput = getElementBySelector(
  "input[name='name']",
  HTMLInputElement,
  $registerForm,
);
export const $nameInputError = getElementBySelector(
  `input[name='name'] + .${ERROR_MESSAGE_CLASS}`,
  HTMLSpanElement,
  $registerForm,
);
export const MIN_NAME_LENGTH = 5;
export const MAX_NAME_LENGTH = 15;

export const $emailInput = getElementBySelector(
  "input[name='email']",
  HTMLInputElement,
  $registerForm,
);
export const $emailInputError = getElementBySelector(
  `input[name='email'] + .${ERROR_MESSAGE_CLASS}`,
  HTMLSpanElement,
  $registerForm,
);

export const TOPIC_CHECKBOX_NAME = "topics";
export const TOPIC_CHECKBOX_SELECTOR = `input[type='checkbox'][name='${TOPIC_CHECKBOX_NAME}']`;
export const $topicCheckboxes = getAllElementsBySelector(
  TOPIC_CHECKBOX_SELECTOR,
  HTMLInputElement,
  $registerForm,
);
export const $topicsFieldset = getElementBySelector(
  ".topics-step",
  HTMLFieldSetElement,
  $registerForm,
);
export const $topicsError = getElementBySelector(
  `.topics-step__group + .${ERROR_MESSAGE_CLASS}`,
  HTMLSpanElement,
  $registerForm,
);
export const $topicsLegendError = getElementById(
  "topics-legend-error",
  HTMLSpanElement,
);
