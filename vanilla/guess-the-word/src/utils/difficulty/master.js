import { setMaxResets } from "@/state/resets";
import {
  $maxResets,
  $resetsContainer,
  captureResetsIndicators,
  generateResetsIndicators,
  setResetsIndicators,
} from "@/ui/resets";
import { DIFFICULTY, RESETS } from "@/consts";

export function applyMasterDifficulty() {
  setMaxResets(RESETS.MAX.MASTER);
  generateResetsIndicators(RESETS.MAX.MASTER);
  setResetsIndicators(captureResetsIndicators());
  $resetsContainer.setAttribute("data-active", "");
  $maxResets.textContent = `${RESETS.MAX.MASTER}`;
}

/**
 * @param {Object} params
 * @param {import("@/consts").Difficulty} params.difficulty
 */
export const implementsMasterDifficulty = ({ difficulty }) =>
  difficulty === DIFFICULTY.MASTER ||
  difficulty === DIFFICULTY.EXTREME ||
  difficulty === DIFFICULTY.INSANE;
