import { $hintsContent, $openHintsLabel } from "@/ui/hints";

const ATTRIBUTE = "data-active";

export function handleShowHints() {
  if ($hintsContent.hasAttribute(ATTRIBUTE)) {
    $hintsContent.removeAttribute(ATTRIBUTE);
    $openHintsLabel.textContent = "Show hints";
  } else {
    $hintsContent.setAttribute(ATTRIBUTE, "");
    $openHintsLabel.textContent = "Hide hints";
  }
}
