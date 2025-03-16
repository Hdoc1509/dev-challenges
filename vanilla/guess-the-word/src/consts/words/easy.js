import WORDS_MOCK from "@/mocks/words/easy.json";
import { CUSTOM_WORDS } from "./custom";

export default Object.freeze(
  WORDS_MOCK.concat(CUSTOM_WORDS.filter((word) => word.length <= 6)),
);
