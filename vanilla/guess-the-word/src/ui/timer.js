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

export const resetTimer = () => {
  $timerBar.classList.remove(CSS.CLASSES.TIMER.BAR);
  void $timerBar.offsetWidth;
  $timerBar.classList.add(CSS.CLASSES.TIMER.BAR);
};

export const showTimer = () => $timer.classList.remove(CLASSES.HIDDEN);
export const hideTimer = () => $timer.classList.add(CLASSES.HIDDEN);

export const showTimerBar = () =>
  $timerBar.style.setProperty("display", "block");
/** Aborts the timer bar animation and its associated event listener */
export const hideTimerBar = () =>
  $timerBar.style.setProperty("display", "none");

/** @param {Object} params
 * @param {number} params.duration Timer duration in seconds
 * @param {() => void} params.onEnd
 * @param {AbortController} params.controller
 * @param {(duration: number) => string} [params.onLabel]
 */
export const setTimerDuration = ({ duration, onEnd, controller, onLabel }) => {
  if (typeof onLabel === "function")
    $timerLabel.textContent = onLabel(duration);
  $timerBar.style.setProperty(CSS.VARIABLES.TIME_BAR_DURATION, `${duration}s`);
  $timerBar.addEventListener("animationend", onEnd, {
    once: true,
    signal: controller.signal,
  });
};
