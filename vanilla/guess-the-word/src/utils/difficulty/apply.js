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
    await InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.NORMAL) {
    await NormalDifficulty.apply();
    MasterDifficulty.unapply();
    await InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.HARD) {
    await HardDifficulty.apply();
    MasterDifficulty.unapply();
    await InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.MASTER) {
    await HardDifficulty.apply();
    await MasterDifficulty.apply();
    await InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.EXTREME) {
    await HardDifficulty.apply();
    await MasterDifficulty.apply();
    await ExtremeDifficulty.apply();
    await InsaneDifficulty.unapply();
  } else if (difficulty === DIFFICULTY.INSANE) {
    await HardDifficulty.apply();
    await MasterDifficulty.apply();
    await ExtremeDifficulty.apply();
    await InsaneDifficulty.apply();
  } else if (difficulty === DIFFICULTY.WHY) {
    await HardDifficulty.apply();
    await MasterDifficulty.apply();
    await InsaneDifficulty.apply();
    await WhyDifficulty.apply();
  } else if (difficulty === DIFFICULTY.VOID) {
    await HardDifficulty.apply();
    MasterDifficulty.unapply();
    await InsaneDifficulty.unapply();
    await WhyDifficulty.apply();
    await VoidDifficulty.apply();
  }
}
