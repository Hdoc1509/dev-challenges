import { setWordsByDifficulty } from "@/state/words";
import { setMaxResets } from "@/state/resets";
import { DIFFICULTY } from "@/consts/difficulty";
import { RESETS } from "@/consts/resets";

export const VoidDifficulty = Object.freeze({
  async apply() {
    setMaxResets(RESETS.MAX.VOID);
    await setWordsByDifficulty(DIFFICULTY.VOID);
  },
});
