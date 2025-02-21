import { DIFFICULTY, WORDS } from "@/consts";
import { applyNormalDifficulty } from "./normal";
import { setWords } from "@/state/words";
import { $resetsContainer } from "@/ui/resets";
import { applyHardDifficulty } from "./hard";
import { applyMasterDifficulty } from "./master";
import { applyExtremeDifficulty } from "./extreme";

/** @param {import("@/consts").Difficulty} difficulty */
export function applyDifficulty(difficulty) {
  if (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) {
    applyNormalDifficulty();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.HARD) {
    applyHardDifficulty();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
  } else if (difficulty === DIFFICULTY.MASTER) {
    applyHardDifficulty();
    applyMasterDifficulty();
    setWords(WORDS.NORMAL);
  } else if (difficulty === DIFFICULTY.EXTREME) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
  }
}
