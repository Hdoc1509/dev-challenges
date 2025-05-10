import WORDS_TOTAL_MOCK from "../../mocks/words-total.json";
import WORDS_EASY_TOTAL from "../../mocks/words/easy-total.json";
import WORDS_NORMAL_TOTAL from "../../mocks/words/normal-total.json";
import WORDS_EXTREME_TOTAL from "../../mocks/words/extreme-total.json";
import WORDS_WHY_TOTAL from "../../mocks/words/why-total.json";
import { DIFFICULTY } from "../difficulty";

// NOTE: relative imports are needed for vite.config.js to work

/** @type {Record<"ALL" | import("../difficulty").DifficultyGroup, number>} */
export const TOTAL_WORDS = {
  ALL: WORDS_TOTAL_MOCK,
  [DIFFICULTY.EASY]: WORDS_EASY_TOTAL,
  [DIFFICULTY.NORMAL]: WORDS_NORMAL_TOTAL,
  [DIFFICULTY.EXTREME]: WORDS_EXTREME_TOTAL,
  [DIFFICULTY.WHY]: WORDS_WHY_TOTAL,
};
