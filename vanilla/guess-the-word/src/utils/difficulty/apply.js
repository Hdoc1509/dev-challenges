import { EasyDifficulty } from "./easy";
import { NormalDifficulty } from "./normal";
import { HardDifficulty } from "./hard";
import { MasterDifficulty } from "./master";
import { ExtremeDifficulty } from "./extreme";
import { InsaneDifficulty } from "./insane";
import { WhyDifficulty } from "./why";
import { VoidDifficulty } from "./void";
import { DIFFICULTY } from "@/consts/difficulty";

/** @param {import("@/consts/difficulty").Difficulty} difficulty */
export async function applyDifficulty(difficulty) {
  if (difficulty === DIFFICULTY.EASY) {
    await EasyDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.NORMAL) {
    NormalDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.HARD) {
    HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.MASTER) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    await ExtremeDifficulty.apply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    HardDifficulty.apply();
    MasterDifficulty.apply();
    ExtremeDifficulty.apply();
    InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.apply();
    await WhyDifficulty.apply();
  } else if (difficulty === DIFFICULTY.VOID) {
    HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
    await WhyDifficulty.apply();
    VoidDifficulty.apply();
  }
}
