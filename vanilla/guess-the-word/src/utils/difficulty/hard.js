import { setWordsByDifficulty } from "@/state/words";
import { setMaxTries } from "@/state/tries";
import { setMaxResets } from "@/state/resets";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";
import { RESETS } from "@/consts/resets";
import { DIFFICULTY } from "@/consts/difficulty";

export const HardDifficulty = Object.freeze({
  async apply() {
    setMaxTries(TRIES.MAX_HARD);
    setMaxResets(RESETS.MAX.DEFAULT);
    TriesIndicator.generate(TRIES.MAX_HARD - 1);
    await setWordsByDifficulty(DIFFICULTY.NORMAL);
  },
});
