import { discoveredWords } from "@/state/discovered-words";
import { getDifficultiesOfWord } from "./of-word";

/** @param {{ word: string }} params */
export const hasCompletedDifficulties = ({ word }) =>
  getDifficultiesOfWord(word).length === discoveredWords.get(word)?.length;
