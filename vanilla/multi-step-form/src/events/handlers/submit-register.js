import { $restartButton, $submitRegisterButton } from "@/buttons";

const $alert = document.querySelector("#alert");
if (!($alert instanceof HTMLDivElement))
  throw new Error("'#alert' element not found");
const $alertText = document.querySelector(".alert__text");
if (!($alertText instanceof HTMLSpanElement))
  throw new Error("'.alert__text' element not found");
const $unsafeAlertTimebar = document.querySelector(".alert__time-bar");
if (!($unsafeAlertTimebar instanceof HTMLDivElement))
  throw new Error("'.alert__time-bar' element not found");
export const $alertTimebar = $unsafeAlertTimebar;

/** @param {string} time */
const parseTime = (time) =>
  time.includes("ms")
    ? Number(time.replace("ms", ""))
    : Number(time.replace("s", "")) * 1000;

/** @type {number | null} */
let animationDuration = null;
/** @type {number | null} */
let movementDelay = null;

/**
 * @param {Object} options
 * @param {'success' | 'error'} options.color
 * @param {string} options.text
 */
const showAlert = ({ color, text }) => {
  // computed styles are intially empty on dev server
  if (animationDuration === null || movementDelay === null) {
    const animationDurationRaw = getComputedStyle($alert).getPropertyValue(
      "--alert-time-bar-duration",
    );
    const movementDelayRaw = getComputedStyle($alert).getPropertyValue(
      "--_movement-duration",
    );

    animationDuration = parseTime(animationDurationRaw);
    movementDelay = parseTime(movementDelayRaw);
  }

  $alert.classList.add(`alert--${color}`, "alert--open");
  $alertText.textContent = text;

  setTimeout(() => {
    $alert.classList.remove("alert--open");
    $alert.classList.add("alert--closing");

    setTimeout(
      () => $alert.classList.remove("alert--closing"),
      /** @type {number} */ (movementDelay),
    );
  }, animationDuration + movementDelay);
};

export const handleSubmitRegister = () => {
  $submitRegisterButton.disabled = true;
  $submitRegisterButton.classList.add("hidden");
  $restartButton.disabled = false;
  $restartButton.classList.remove("hidden");
  showAlert({ color: "success", text: "✅ Success" });
};
