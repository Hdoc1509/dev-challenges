import { setWords } from "@/state/words";

export const WhyDifficulty = Object.freeze({
  async apply() {
    setWords(await import("@/consts/words/why").then((mod) => mod.default));
  },
});
