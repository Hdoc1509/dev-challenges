import { WORDS } from "@/consts";

export let words = WORDS.ALL;

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
