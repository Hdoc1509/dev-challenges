import WORDS_EXTREME from "@/mocks/words/extreme.json";
import WORDS_WHY from "@/mocks/words/why.json";
import { CUSTOM_DEFINITIONS } from "./definitions";

const CUSTOM_WORDS = Object.keys(CUSTOM_DEFINITIONS);

// TODO: can I use Set() as property value?
// or have `.array` and `.set` sub-properties?
export const WORDS = Object.freeze({
  EXTREME: Object.freeze(
    WORDS_EXTREME.concat(CUSTOM_WORDS.filter((word) => word.length >= 10)),
  ),
  WHY: Object.freeze(WORDS_WHY),
});
