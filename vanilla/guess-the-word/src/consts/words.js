import WORDS_WHY from "@/mocks/words/why.json";

// TODO: can I use Set() as property value?
// or have `.array` and `.set` sub-properties?
export const WORDS = Object.freeze({
  WHY: Object.freeze(WORDS_WHY),
});
