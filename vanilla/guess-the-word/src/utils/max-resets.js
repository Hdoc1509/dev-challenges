import { DIFFICULTY } from "@/consts";

/**
 * @param {Object} params
 * @param {import("@/consts").Difficulty} params.difficulty
 */
export const implementsMaxResets = ({ difficulty }) =>
  difficulty === DIFFICULTY.MASTER ||
  difficulty === DIFFICULTY.EXTREME ||
  difficulty === DIFFICULTY.INSANE ||
  difficulty === DIFFICULTY.WHY;
