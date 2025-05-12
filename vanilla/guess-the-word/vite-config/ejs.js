import { capitalize } from "../src/utils/string";
import { TOTAL_WORDS } from "../src/consts/words/total";
import { DIFFICULTY, DIFFICULTY_GROUP } from "../src/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "../src/consts/stats";

export const EJS_CONFIG = {
  data: {
    capitalize,
    DIFFICULTY,
    DIFFICULTY_GROUP,
    STATS_CATEGORIES: [STATS_CATEGORY_TOTAL, ...Object.values(DIFFICULTY)],
    STATS_CATEGORY_TOTAL,
    TOTAL_WORDS,
  },
};
