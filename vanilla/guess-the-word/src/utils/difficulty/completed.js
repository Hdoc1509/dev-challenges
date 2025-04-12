import { discoveredWords } from "@/state/discovered-words";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @param {{ word: string }} params */
export const hasCompletedAllDifficulties = ({ word }) =>
  discoveredWords.get(word) === DIFFICULTIES_ALL;
