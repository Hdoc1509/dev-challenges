import { getElementBySelector } from "@lib/dom";
import "@/styles/game-card/timer.css";

const $timer = getElementBySelector("#timer.timer", HTMLElement);

const $timerBar = getElementBySelector(".timer__bar", HTMLDivElement, $timer);

const CSS = Object.freeze({
  CLASSES: Object.freeze({
    TIMER: Object.freeze({
      BAR: "timer__bar",
    }),
    // TODO: use [data-active] instead
    TIMER__ACTIVE: "timer--active",
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

export const showTimer = () => $timer.classList.add(CSS.CLASSES.TIMER__ACTIVE);
export const hideTimer = () =>
  $timer.classList.remove(CSS.CLASSES.TIMER__ACTIVE);

export const showTimerBar = () =>
  $timerBar.style.setProperty("display", "block");
/** Aborts the timer bar animation and its associated event listener */
export const hideTimerBar = () =>
  $timerBar.style.setProperty("display", "none");

/**
 * @param {number} duration Timer duration in seconds
 * @param {() => void} onEnd
 * @param {{ controller: AbortController }} options
 */
export const setTimerDuration = (duration, onEnd, { controller }) => {
  $timerBar.style.setProperty(CSS.VARIABLES.TIME_BAR_DURATION, `${duration}s`);
  $timerBar.addEventListener("animationend", onEnd, {
    once: true,
    signal: controller.signal,
  });
};
