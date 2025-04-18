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
    await NormalDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.HARD) {
    await HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.MASTER) {
    await HardDifficulty.apply();
    MasterDifficulty.apply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    await HardDifficulty.apply();
    MasterDifficulty.apply();
    await ExtremeDifficulty.apply();
    InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    await HardDifficulty.apply();
    MasterDifficulty.apply();
    await ExtremeDifficulty.apply();
    InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    await HardDifficulty.apply();
    MasterDifficulty.apply();
    InsaneDifficulty.apply();
    await WhyDifficulty.apply();
  } else if (difficulty === DIFFICULTY.VOID) {
    await HardDifficulty.apply();
    MasterDifficulty.unapply();
    InsaneDifficulty.unapply();
    await WhyDifficulty.apply();
    VoidDifficulty.apply();
  }
}
