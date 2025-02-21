import { WORDS } from "@/consts";

export let words = WORDS.NORMAL;

/** @param {readonly string[]} newWords */
export const setWords = (newWords) => (words = newWords);
