import { $hintsContent, $hintsTriggerLabel } from "@/ui/hints";

const ATTRIBUTE = "data-active";

export function handleShowHints() {
  if ($hintsContent.hasAttribute(ATTRIBUTE)) {
    $hintsContent.removeAttribute(ATTRIBUTE);

    $hintsTriggerLabel.textContent = "Show hints";
  } else {
    $hintsContent.setAttribute(ATTRIBUTE, "");

    $hintsTriggerLabel.textContent = "Hide hints";
  }
}
