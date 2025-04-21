import { setMaxTries } from "@/state/tries";
import { setWords } from "@/state/words";
import { TriesIndicator } from "@/ui/tries";
import { TRIES } from "@/consts/tries";
import { DIFFICULTY_GROUP } from "@/consts/difficulty";

export const HardDifficulty = Object.freeze({
  async apply() {
    setMaxTries(TRIES.MAX_HARD);
    TriesIndicator.generate(TRIES.MAX_HARD - 1);
    await setWords(DIFFICULTY_GROUP.NORMAL);
  },
});
