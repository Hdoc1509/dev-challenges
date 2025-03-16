import WORDS_MOCK from "@/mocks/words/normal.json";
import { CUSTOM_WORDS } from "./custom";

export const WORDS_NORMAL = Object.freeze(
  WORDS_MOCK.concat(
    CUSTOM_WORDS.filter((word) => word.length >= 7 && word.length <= 9),
  ),
);
