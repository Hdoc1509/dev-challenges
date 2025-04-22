import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { DIFFICULTY, DIFFICULTY_GROUP } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").Difficulty} Difficulty */

/** @type {Map<Difficulty, Set<string> | null>} */
const AvailableWords = new Map([
  [DIFFICULTY.EASY, null],
  [DIFFICULTY.NORMAL, null],
  [DIFFICULTY.HARD, null],
  [DIFFICULTY.MASTER, null],
  [DIFFICULTY.EXTREME, null],
  [DIFFICULTY.INSANE, null],
  [DIFFICULTY.WHY, null],
  [DIFFICULTY.VOID, null],
]);

/** @type {readonly string[]} */
export let words = [];

/** @param {Difficulty} difficulty */
export const setWordsByDifficulty = async (difficulty) => {
  const savedWords = AvailableWords.get(difficulty);
  const difficultyGroup = DIFFICULTY_GROUP[difficulty];

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${difficultyGroup}.js`
    );

    AvailableWords.set(difficulty, new Set(mockedWords));
    words = mockedWords;
  } else words = Array.from(savedWords);
};

/** @param {string} word */
export const removeAvailableWord = async (word) => {
  const difficultyGroup = /** @type {DifficultyGroup} */ (
    getDifficultiesOfWord(word)[0]
  );
  const savedWords = AvailableWords.get(difficultyGroup);

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${difficultyGroup}.js`
    );
    const wordsToUse = new Set(mockedWords);

    wordsToUse.delete(word);
    AvailableWords.set(difficultyGroup, wordsToUse);
    words = Array.from(wordsToUse);
  } else {
    const hasBeenRemoved = savedWords.delete(word);

    if (hasBeenRemoved) words = Array.from(savedWords);
  }
};
