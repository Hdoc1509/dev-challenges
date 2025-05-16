import { capitalize } from "../src/utils/string";
import { TOTAL_WORDS } from "../src/consts/words/total";
import {
  DIFFICULTY,
  DIFFICULTY_GROUP,
  DIFFICULTY_OPTION,
} from "../src/consts/difficulty";
import { STATS_CATEGORY_TOTAL } from "../src/consts/stats";

const DIFFICULTIES = Object.values(DIFFICULTY);

export const EJS_CONFIG = {
  data: {
    capitalize,
    DIFFICULTIES,
    DIFFICULTY,
    DIFFICULTY_GROUP,
    DIFFICULTY_OPTION,
    STATS_CATEGORIES: [STATS_CATEGORY_TOTAL, ...DIFFICULTIES],
    STATS_CATEGORY_TOTAL,
    TOTAL_WORDS,
  },
};
