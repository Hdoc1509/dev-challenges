import EASY_LENGTH from "@/mocks/difficulties-by-length/easy.json";
import NORMAL_MASTER_LENGTH from "@/mocks/difficulties-by-length/normal-master.json";
import EXTREME_INSANE_LENGTH from "@/mocks/difficulties-by-length/extreme-insane.json";

/**
 * @param {string} word
 * @returns {import("@/consts/difficulty").Difficulty[]}
 */
export function getDifficultiesOfWord(word) {
  const size = word.length;

  if (size <= EASY_LENGTH.max) return ["easy"];
  if (size <= NORMAL_MASTER_LENGTH.max) return ["normal", "hard", "master"];
  if (size <= EXTREME_INSANE_LENGTH.max) return ["extreme", "insane"];
  return ["why", "void"];
}
