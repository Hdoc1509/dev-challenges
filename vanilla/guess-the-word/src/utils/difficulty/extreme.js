import { setWords } from "@/state/words";

export const ExtremeDifficulty = Object.freeze({
  apply: async () =>
    setWords(await import("@/consts/words/extreme").then((mod) => mod.default)),
});
