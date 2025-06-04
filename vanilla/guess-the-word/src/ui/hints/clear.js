import { clearChildren } from "@/utils/dom";
import { $allHintsList, $correctHintsList } from "./elements";

export const clearHints = () => {
  clearChildren($allHintsList, $correctHintsList);
};
