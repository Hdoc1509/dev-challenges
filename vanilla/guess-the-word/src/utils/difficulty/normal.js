import { setMaxTries } from "@/state/tries";
import { setWordsByDifficulty } from "@/state/words";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";
import { DIFFICULTY } from "@/consts/difficulty";

export const NormalDifficulty = Object.freeze({
  async apply() {
    setMaxTries(TRIES.MAX);
    TriesIndicator.generate(TRIES.MAX - 1);
    await setWordsByDifficulty(DIFFICULTY.NORMAL);
  },
});
