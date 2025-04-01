import EASY_LENGTH from "@/mocks/difficulties-by-length/easy.json";
import NORMAL_MASTER_LENGTH from "@/mocks/difficulties-by-length/normal-master.json";
import EXTREME_INSANE_LENGTH from "@/mocks/difficulties-by-length/extreme-insane.json";
import { DIFFICULTY } from "@/consts/difficulty";

/**
 * @param {string} word
 * @returns {import("@/consts/difficulty").Difficulty[]}
 */
export function getDifficultiesOfWord(word) {
  const size = word.length;

  if (size <= EASY_LENGTH.max) return [DIFFICULTY.EASY];
  if (size <= NORMAL_MASTER_LENGTH.max)
    return [DIFFICULTY.NORMAL, DIFFICULTY.HARD, DIFFICULTY.MASTER];
  if (size <= EXTREME_INSANE_LENGTH.max)
    return [DIFFICULTY.EXTREME, DIFFICULTY.INSANE];
  return [DIFFICULTY.WHY, DIFFICULTY.VOID];
}
