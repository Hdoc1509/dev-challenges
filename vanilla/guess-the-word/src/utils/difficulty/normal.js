import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";

export const NormalDifficulty = Object.freeze({
  async apply() {
    setWords(await import("@/consts/words/normal").then((mod) => mod.default));
    setMaxTries(TRIES.MAX);
    TriesIndicator.generate(TRIES.MAX - 1);
  },
});
