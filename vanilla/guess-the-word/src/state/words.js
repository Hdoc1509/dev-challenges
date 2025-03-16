import { WORDS_NORMAL } from "@/consts/words/normal";

export let words = WORDS_NORMAL;

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
