import { getDifficultiesOfWord } from "@/utils/difficulty/of-word";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";
/** @typedef {import("@/consts/difficulty").DifficultyGroup} DifficultyGroup */

/** @type {Map<DifficultyGroup, Set<string> | null>} */
// NOTE: delete from this map once a word has completed all of its difficulties
const AvailableWords = new Map([
  [DIFFICULTY_GROUP.EASY, null],
  [DIFFICULTY_GROUP.NORMAL, null],
  [DIFFICULTY_GROUP.EXTREME, null],
  [DIFFICULTY_GROUP.WHY, null],
]);

/** @type {readonly string[]} */
export let words = [];

/** @param {DifficultyGroup} difficultyGroup */
export const setWords = async (difficultyGroup) => {
  const savedWords = AvailableWords.get(difficultyGroup);

  if (savedWords == null) {
    const { default: mockedWords } = await import(
      `../consts/words/by-difficulty/${difficultyGroup}.js`
    );

    AvailableWords.set(difficultyGroup, new Set(mockedWords));
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
    savedWords.delete(word);
    words = Array.from(savedWords);
  }
};
