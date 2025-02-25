import { DIFFICULTY, WORDS } from "@/consts";
import { NormalDifficulty } from "./normal";
import { setWords } from "@/state/words";
import { HardDifficulty } from "./hard";
import { MasterDifficulty } from "./master";
import { applyExtremeDifficulty } from "./extreme";
import { InsaneDifficulty } from "./insane";
import { WhyDifficulty } from "./why";

/** @param {import("@/consts").Difficulty} difficulty */
export function applyDifficulty(difficulty) {
  if (difficulty === DIFFICULTY.EASY || difficulty === DIFFICULTY.NORMAL) {
    NormalDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
    setWords(WORDS.NORMAL);
  } else if (difficulty === DIFFICULTY.HARD) {
    HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
    setWords(WORDS.NORMAL);
  } else if (difficulty === DIFFICULTY.MASTER) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    setWords(WORDS.NORMAL);
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    applyExtremeDifficulty();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    HardDifficulty.apply();
    MasterDifficulty.unapply();
    applyExtremeDifficulty();
    InsaneDifficulty.apply();
    WhyDifficulty.apply();
  }
}
