import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

export const EasyDifficulty = Object.freeze({
  async apply() {
    setMaxTries(TRIES.MAX);
    TriesIndicator.generate(TRIES.MAX - 1);
    await setWords(DIFFICULTY_GROUP.EASY);
  },
});
