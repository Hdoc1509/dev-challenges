import { $typing } from "./elements";
import { CLASSES } from "@/consts/css-classes";

/** @type {($target: EventTarget | null) => $target is HTMLInputElement} */
export const isValidLetterField = ($target) =>
  $target instanceof HTMLInputElement &&
  $typing.contains($target) &&
  $target.matches(`.${CLASSES.TYPING.LETTER} > input`);

/** @type {($target: EventTarget | null) => $target is HTMLSpanElement} */
export const isValidTypingLetter = ($target) =>
  $target instanceof HTMLSpanElement &&
  $typing.contains($target) &&
  $target.matches(`.${CLASSES.TYPING.LETTER}`);
