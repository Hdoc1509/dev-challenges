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
 * @param {Object} config
 * @param {import("@/consts/difficulty").Difficulty} config.difficulty
 * @param {boolean} [config.isInitialization] */
export const removeAvailableWord = async (
  word,
  { difficulty, isInitialization = false },
) => {
  const savedWords = AvailableWords.get(difficulty);

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${DIFFICULTY_GROUP[difficulty]}.js`
    );
    const wordsToUse = new Set(mockedWords);

    wordsToUse.delete(word);
    AvailableWords.set(difficulty, wordsToUse);
    if (!isInitialization) words = Array.from(wordsToUse);
  } else {
    const hasBeenRemoved = savedWords.delete(word);

    if (!isInitialization && hasBeenRemoved) words = Array.from(savedWords);
  }
};
