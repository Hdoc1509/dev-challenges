import { WORDS } from "@/consts/words";

export let words = WORDS.NORMAL;

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
