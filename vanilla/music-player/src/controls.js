import { getElementById } from "@lib/dom";

export const $playPauseControl = getElementById(
  "control-play-pause",
  HTMLButtonElement,
);

export const $nextControl = getElementById("control-next", HTMLButtonElement);

export const $prevControl = getElementById("control-prev", HTMLButtonElement);
