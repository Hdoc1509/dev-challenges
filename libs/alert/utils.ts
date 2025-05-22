import { getElementBySelector } from "@lib/dom";
import { CLASSES } from "./consts";

export function closeAlert($alert: HTMLDivElement, onClose?: () => void) {
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
}

export function resetAnimation($timeBar: HTMLDivElement) {
  // https://css-tricks.com/restart-css-animation/
  $timeBar.classList.remove("alert__time-bar");
  void $timeBar.offsetWidth;
  $timeBar.classList.add("alert__time-bar");
}

type Options = { a11y?: boolean };

export function getAlertElements(
  alertElement: HTMLDivElement,
  options: Options = {},
) {
  const { a11y = false } = options;
  const textSelector = a11y ? `${CLASSES.TEXT}[role="alert"]` : CLASSES.TEXT;

  const $text = getElementBySelector(
    `:scope > .${textSelector}`,
    HTMLSpanElement,
    alertElement,
  );
  const $timerBar = getElementBySelector(
    `:scope > .${CLASSES.TIMER_BAR}`,
    HTMLDivElement,
    alertElement,
  );

  return { $text, $timerBar };
}
