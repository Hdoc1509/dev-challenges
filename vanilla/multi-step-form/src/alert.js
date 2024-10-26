const $alert = document.querySelector("#alert");
if (!($alert instanceof HTMLDivElement))
  throw new Error("'#alert' element not found");

const $alertText = document.querySelector(".alert__text");
if (!($alertText instanceof HTMLSpanElement))
  throw new Error("'.alert__text' element not found");

const $alertTimebar = document.querySelector(".alert__time-bar");
if (!($alertTimebar instanceof HTMLDivElement))
  throw new Error("'.alert__time-bar' element not found");

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
