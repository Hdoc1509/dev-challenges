import { getElementById, getElementBySelector } from "@lib/dom";

const $alert = getElementById("alert", HTMLDivElement);

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

type CloseOptions = { onClose?: () => void };
const closeAlert = ({ onClose }: CloseOptions = {}) => {
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

const resetAnimation = () => {
  // https://css-tricks.com/restart-css-animation/
  $alertTimebar.classList.remove("alert__time-bar");
  void $alertTimebar.offsetWidth;
  $alertTimebar.classList.add("alert__time-bar");
};

export const resetAlert = () => {
  if ($alert.classList.contains("alert--open"))
    return closeAlert({ onClose: resetAnimation });

  resetAnimation();
};

type ShowOptions = { color: "success" | "error"; text: string };
export const showAlert = ({ color, text }: ShowOptions) => {
  $alert.classList.add(`alert--${color}`, "alert--open");
  $alertText.textContent = text;
  $alertTimebar.addEventListener("animationend", () => closeAlert(), {
    once: true,
  });
};