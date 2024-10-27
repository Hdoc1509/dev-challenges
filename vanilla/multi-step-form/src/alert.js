import { getElementById, getElementBySelector } from "./utils/dom.js";

const ALERT_ID = "alert";

const $alert = getElementById(ALERT_ID, HTMLDivElement);

const $alertText = getElementBySelector(
  ".alert__text",
  HTMLSpanElement,
  $alert,
);

const $alertTimebar = getElementBySelector(
  ".alert__time-bar",
  HTMLDivElement,
  $alert,
);

/**
 * @param {Object} options
 * @param {() => void} [options.onClose]
 */
const closeAlert = ({ onClose } = {}) => {
  $alert.classList.remove("alert--open");
  $alert.classList.add("alert--closing");
  $alert.addEventListener(
    "transitionend",
    () => {
      $alert.classList.remove("alert--closing");
      onClose?.();
    },
    { once: true },
  );
};

const resetAlertAnimation = () => {
  // https://css-tricks.com/restart-css-animation/
  $alertTimebar.classList.remove("alert__time-bar");
  void $alertTimebar.offsetWidth;
  $alertTimebar.classList.add("alert__time-bar");
};

export const resetAlert = () => {
  if ($alert.classList.contains("alert--open"))
    return closeAlert({ onClose: resetAlertAnimation });

  resetAlertAnimation();
};

/**
 * @param {Object} options
 * @param {'success' | 'error'} options.color
 * @param {string} options.text
 */
export const showAlert = ({ color, text }) => {
  $alert.classList.add(`alert--${color}`, "alert--open");
  $alertText.textContent = text;
  $alertTimebar.addEventListener("animationend", () => closeAlert(), {
    once: true,
  });
};
