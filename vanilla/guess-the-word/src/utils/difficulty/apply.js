import { DIFFICULTY, WORDS } from "@/consts";
import { NormalDifficulty } from "./normal";
import { setWords } from "@/state/words";
import { $resetsContainer } from "@/ui/resets";
import { applyHardDifficulty } from "./hard";
import { applyMasterDifficulty } from "./master";
import { applyExtremeDifficulty } from "./extreme";
import { InsaneDifficulty } from "./insane";
import { WhyDifficulty } from "./why";

/** @param {import("@/consts").Difficulty} difficulty */
export function applyDifficulty(difficulty) {
  if (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) {
    NormalDifficulty.apply();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.HARD) {
    applyHardDifficulty();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.MASTER) {
    applyHardDifficulty();
    applyMasterDifficulty();
    setWords(WORDS.NORMAL);
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    applyHardDifficulty();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    applyHardDifficulty();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
    WhyDifficulty.apply();
    // TODO: use this for MasterDifficulty.unapply()
    $resetsContainer.removeAttribute("data-active");
  }
}
