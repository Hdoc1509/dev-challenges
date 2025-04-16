import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";

export const HardDifficulty = Object.freeze({
  async apply() {
    setWords(await import("@/consts/words/normal").then((mod) => mod.default));
    setMaxTries(TRIES.MAX_HARD);
    TriesIndicator.generate(TRIES.MAX_HARD - 1);
  },
});
