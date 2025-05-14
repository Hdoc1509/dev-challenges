import { $allHintsList, $correctHintsList } from "./elements";

export const clearHints = () => {
  $allHintsList.replaceChildren();
  $correctHintsList.replaceChildren();
};
