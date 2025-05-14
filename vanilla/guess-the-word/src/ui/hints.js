import { $allHintsList, $correctHintsList } from "./hints/elements";

// TODO: split into multiple files
// - ./hints/clear.js

export const clearHints = () => {
  $allHintsList.replaceChildren();
  $correctHintsList.replaceChildren();
};
