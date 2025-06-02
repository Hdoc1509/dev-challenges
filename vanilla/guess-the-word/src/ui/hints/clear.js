import { $allHintsList, $correctHintsList } from "./elements";

export const clearHints = () => {
  // TODO: use a while loop
  $allHintsList.replaceChildren();
  $correctHintsList.replaceChildren();
};
