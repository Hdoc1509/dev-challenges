import { getElementBySelector } from "@lib/dom";
import { CLASSES } from "@/consts/css-classes";
import "@/styles/game-card/timer.css";

// TODO: move this logic into a separate class
// use it internally in `Alert` class

const $timer = getElementBySelector("#timer.timer", HTMLElement);
const $timerBar = getElementBySelector(
  ":scope .timer__bar",
  HTMLDivElement,
  $timer,
);
const $timerLabel = getElementBySelector(
  ":scope .timer__label",
  HTMLSpanElement,
  $timer,
);

const CSS = Object.freeze({
  CLASSES: Object.freeze({
    TIMER: Object.freeze({
      BAR: "timer__bar",
    }),
  }),
  VARIABLES: Object.freeze({
    TIME_BAR_DURATION: "--timer-bar-duration",
  }),
});

/** @type {AbortController} */
export let timerController;

const resetTimer = () => {
  $timerBar.classList.remove(CSS.CLASSES.TIMER.BAR);
  void $timerBar.offsetWidth;
  $timerBar.classList.add(CSS.CLASSES.TIMER.BAR);
};

export const showTimer = () => $timer.classList.remove(CLASSES.HIDDEN);
export const hideTimer = () => $timer.classList.add(CLASSES.HIDDEN);

let isEnabled = false;

/** Aborts the timer bar animation and prevents its `onEnd` event handler to be
 * called
 * Use `timerController.abort()` to remove `onEnd` event handler */
export const hideTimerBar = () => {
  isEnabled = false;
  $timerBar.removeAttribute("data-active");
};

/** @param {Object} params
 * @param {number} params.duration Timer duration in seconds
 * @param {() => void} params.onEnd
 * @param {AbortController} params.controller Overrides `timerController`
 * @param {(duration: number) => string} [params.onLabel]
 */
export const startTimer = ({ duration, controller, onEnd, onLabel }) => {
  timerController = controller;

  resetTimer();
  $timerBar.style.setProperty(CSS.VARIABLES.TIME_BAR_DURATION, `${duration}s`);
  $timerBar.addEventListener("animationend", onEnd, {
    once: true,
    signal: controller.signal,
  });
  if (!isEnabled) {
    isEnabled = true;
    $timerBar.setAttribute("data-active", "");
  }
  if (typeof onLabel === "function")
    $timerLabel.textContent = onLabel(duration);
};
