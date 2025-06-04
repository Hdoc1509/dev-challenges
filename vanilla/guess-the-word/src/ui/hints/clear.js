import { $allHintsList, $correctHintsList } from "./elements";

export const clearHints = () => {
  while ($allHintsList.firstChild != null)
    $allHintsList.removeChild($allHintsList.firstChild);
  while ($correctHintsList.firstChild != null)
    $correctHintsList.removeChild($correctHintsList.firstChild);
};
