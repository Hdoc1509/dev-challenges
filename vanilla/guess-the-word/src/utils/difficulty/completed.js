import { discoveredWords } from "@/state/discovered-words";
import { difficulty } from "@/state/difficulty";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @param {{ word: string }} params */
export const hasCompletedDifficulty = ({ word }) =>
  discoveredWords.get(word)?.includes(difficulty) ?? false;

/** @param {{ word: string }} params */
export const hasCompletedAllDifficulties = ({ word }) =>
  discoveredWords.get(word) === DIFFICULTIES_ALL;
