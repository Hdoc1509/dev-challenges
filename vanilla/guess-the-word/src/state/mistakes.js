import { IS_DEV } from "@/config";

export let mistakes = "";

export const hasNoMistakes = () => mistakes === "";

/** @param {string} newMistakes */
export const setMistakes = (newMistakes) => {
  mistakes = newMistakes;
  if (IS_DEV) console.log({ mistakes });
};
export const resetMistakes = () => {
  mistakes = "";
  if (IS_DEV) console.log({ mistakes });
};
