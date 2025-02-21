import { getElementBySelector } from "@lib/dom";

const $timer = getElementBySelector("#timer.timer", HTMLElement);

const $timerBar = getElementBySelector(".timer__bar", HTMLDivElement, $timer);

const CSS = Object.freeze({
  CLASSES: Object.freeze({
    TIMER: Object.freeze({
      BAR: "timer__bar",
    }),
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

/** @param {number} duration Timer duration in seconds */
export const setTimerDuration = (duration) =>
  $timerBar.style.setProperty(CSS.VARIABLES.TIME_BAR_DURATION, `${duration}s`);
