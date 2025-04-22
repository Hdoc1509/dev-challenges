import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { DIFFICULTY } from "@/consts/difficulty";
import { RESETS } from "@/consts/resets";

export const VoidDifficulty = Object.freeze({
  apply() {
    setWordsByDifficulty(DIFFICULTY.VOID);
    setMaxResets(RESETS.MAX.VOID);
  },
});
