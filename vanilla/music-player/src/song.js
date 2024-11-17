import { getElementById, getElementBySelector } from "@lib/dom";

export const $song = getElementById("song", HTMLAudioElement);

$song.volume = 0.25;

export const $songTitle = getElementBySelector(
  ".player-card__title",
  HTMLHeadingElement,
);

export const $songAuthor = getElementBySelector(
  ".player-card__author",
  HTMLParagraphElement,
);

export const $songCover = getElementBySelector(
  ".player-card__cover > img",
  HTMLImageElement,
);

export const $songDuration = getElementBySelector(
  ".player-card__duration",
  HTMLSpanElement,
);

export const $songCurrentTime = getElementBySelector(
  ".player-card__current-time",
  HTMLSpanElement,
);
