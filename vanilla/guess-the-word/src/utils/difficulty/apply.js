import { DIFFICULTY, WORDS } from "@/consts";
import { applyNormalDifficulty } from "./normal";
import { setWords } from "@/state/words";
import { $resetsContainer } from "@/ui/resets";
import { applyHardDifficulty } from "./hard";
import { applyMasterDifficulty } from "./master";
import { applyExtremeDifficulty } from "./extreme";
import { applyInsaneDifficulty, unapplyInsaneDifficulty } from "./insane";

/** @param {import("@/consts").Difficulty} difficulty */
export function applyDifficulty(difficulty) {
  if (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) {
    applyNormalDifficulty();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
    unapplyInsaneDifficulty();
  } else if (difficulty === DIFFICULTY.HARD) {
    applyHardDifficulty();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
    unapplyInsaneDifficulty();
  } else if (difficulty === DIFFICULTY.MASTER) {
    applyHardDifficulty();
    applyMasterDifficulty();
    setWords(WORDS.NORMAL);
    unapplyInsaneDifficulty();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    unapplyInsaneDifficulty();
  } else if (difficulty === DIFFICULTY.INSANE) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    applyInsaneDifficulty();
  }
}
