import { DIFFICULTY, DIFFICULTY_GROUP } from "@/consts/difficulty";

/** @type {Map<import("@/consts/difficulty").Difficulty, Set<string> | null>} */
export const AvailableWords = new Map([
  [DIFFICULTY.EASY, null],
  [DIFFICULTY.NORMAL, null],
  [DIFFICULTY.HARD, null],
  [DIFFICULTY.MASTER, null],
  [DIFFICULTY.EXTREME, null],
  [DIFFICULTY.INSANE, null],
  [DIFFICULTY.WHY, null],
  [DIFFICULTY.VOID, null],
]);

/** Available words for current difficulty
 * @type {readonly string[]} */
export let words = [];

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export const setWordsByDifficulty = async (difficulty) => {
  const savedWords = AvailableWords.get(difficulty);

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${DIFFICULTY_GROUP[difficulty]}.js`
    );

    AvailableWords.set(difficulty, new Set(mockedWords));
    words = mockedWords;
  } else words = Array.from(savedWords);
};

/** @param {string} word
 * @param {{ difficulty: import("@/consts/difficulty").Difficulty }} extraParams */
// PERF: avoid updating `words` state if not needed, i.e when initializing app
export const removeAvailableWord = async (word, { difficulty }) => {
  const savedWords = AvailableWords.get(difficulty);

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${DIFFICULTY_GROUP[difficulty]}.js`
    );
    const wordsToUse = new Set(mockedWords);

    wordsToUse.delete(word);
    AvailableWords.set(difficulty, wordsToUse);
    words = Array.from(wordsToUse);
  } else {
    const hasBeenRemoved = savedWords.delete(word);

    if (hasBeenRemoved) words = Array.from(savedWords);
  }
};
