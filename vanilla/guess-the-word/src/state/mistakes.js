export let mistakes = "";

export const hasNoMistakes = () => mistakes === "";

/** @param {string} newMistakes */
export const setMistakes = (newMistakes) => (mistakes = newMistakes);
export const resetMistakes = () => (mistakes = "");
