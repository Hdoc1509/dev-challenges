import { $hintsContent, $hintsTriggerLabel } from "@/ui/hints";
import { CLASSES } from "@/consts/css-classes";

export function handleToggleHints() {
  if (!$hintsContent.classList.contains(CLASSES.HIDDEN)) {
    $hintsContent.classList.add(CLASSES.HIDDEN);
    $hintsTriggerLabel.textContent = "Show hints";
  } else {
    $hintsContent.classList.remove(CLASSES.HIDDEN);
    $hintsTriggerLabel.textContent = "Hide hints";
  }
}
