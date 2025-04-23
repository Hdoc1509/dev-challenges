import { setWordsByDifficulty } from "@/state/words";
import { setMaxTries } from "@/state/tries";
import { setMaxResets } from "@/state/resets";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";
import { DIFFICULTY } from "@/consts/difficulty";
import { RESETS } from "@/consts/resets";

export const EasyDifficulty = Object.freeze({
  async apply() {
    setMaxTries(TRIES.MAX);
    setMaxResets(RESETS.MAX.DEFAULT);
    TriesIndicator.generate(TRIES.MAX - 1);
    await setWordsByDifficulty(DIFFICULTY.EASY);
  },
});
