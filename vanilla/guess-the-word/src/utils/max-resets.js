import { DIFFICULTY } from "@/consts/difficulty";

/**
 * @param {Object} params
 * @param {import("@/consts/difficulty").Difficulty} params.difficulty
 */
export const implementsMaxResets = ({ difficulty }) =>
  difficulty === DIFFICULTY.MASTER ||
  difficulty === DIFFICULTY.EXTREME ||
  difficulty === DIFFICULTY.INSANE ||
  difficulty === DIFFICULTY.WHY ||
  difficulty === DIFFICULTY.VOID;
