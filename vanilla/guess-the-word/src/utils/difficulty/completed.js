import { discoveredWords } from "@/state/discovered-words";
import { difficulty } from "@/state/difficulty";
import { DIFFICULTIES_ALL } from "@/consts/difficulty";

/** @param {{ word: string }} params */
export const hasCompletedDifficulty = ({ word }) =>
  discoveredWords.get(word)?.includes(difficulty) ?? false;

/** @param {{ word: string }} params */
export const hasCompletedAllDifficulties = ({ word }) =>
  discoveredWords.get(word) === DIFFICULTIES_ALL;

// TODO: move to `events/handlers/difficulty-completed.js`
export const showCompletedDifficultyMessage = () => {
  // TODO:
  // - create word letters with `congrats` as selected word
  // - hide `info` and `typing` section
  // - show `difficulty-completed` section
  // - indicate that you need to select another difficulty to continue playing
  console.log("TODO: showCompletedDifficultyMessage");
};
