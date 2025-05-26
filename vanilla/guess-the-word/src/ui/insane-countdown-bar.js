import { getElementById } from "@lib/dom";
import { CountdownBar } from "@/countdown-bar";
import { CLASSES } from "@/consts/css-classes";
import "@/styles/countdown-bar.css";

const $countdownBar = getElementById("insane-countdown", HTMLElement);

export const InsaneCountdownBar = new CountdownBar($countdownBar, {
  onLabel: (duration) => `${duration} seconds available`,
});

export const showInsaneCountdown = () =>
  $countdownBar.classList.remove(CLASSES.HIDDEN);

export const hideInsaneCountdown = () =>
  $countdownBar.classList.add(CLASSES.HIDDEN);
