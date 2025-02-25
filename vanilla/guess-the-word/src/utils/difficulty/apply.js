import { DIFFICULTY, WORDS } from "@/consts";
import { NormalDifficulty } from "./normal";
import { setWords } from "@/state/words";
import { $resetsContainer } from "@/ui/resets";
import { HardDifficulty } from "./hard";
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
    HardDifficulty.apply();
    setWords(WORDS.NORMAL);
    $resetsContainer.removeAttribute("data-active");
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.MASTER) {
    HardDifficulty.apply();
    applyMasterDifficulty();
    setWords(WORDS.NORMAL);
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    HardDifficulty.apply();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    HardDifficulty.apply();
    applyMasterDifficulty();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    HardDifficulty.apply();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
    WhyDifficulty.apply();
    // TODO: use this for MasterDifficulty.unapply()
    $resetsContainer.removeAttribute("data-active");
  }
}
