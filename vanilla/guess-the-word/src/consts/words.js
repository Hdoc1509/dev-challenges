import WORDS_EASY from "@/mocks/words/easy.json";
import WORDS_NORMAL from "@/mocks/words/normal.json";
import WORDS_EXTREME from "@/mocks/words/extreme.json";
import WORDS_WHY from "@/mocks/words/why.json";
import { CUSTOM_DEFINITIONS } from "./definitions";

const CUSTOM_WORDS = ["challenge", ...Object.keys(CUSTOM_DEFINITIONS)];

// TODO: can I use Set() as property value?
// or have `.array` and `.set` sub-properties?
export const WORDS = Object.freeze({
  EASY: Object.freeze(
    WORDS_EASY.concat(CUSTOM_WORDS.filter((word) => word.length <= 6)),
  ),
  NORMAL: Object.freeze(
    WORDS_NORMAL.concat(
      CUSTOM_WORDS.filter((word) => word.length >= 7 && word.length <= 9),
    ),
  ),
  EXTREME: Object.freeze(
    WORDS_EXTREME.concat(CUSTOM_WORDS.filter((word) => word.length >= 10)),
  ),
  WHY: Object.freeze(WORDS_WHY),
});
