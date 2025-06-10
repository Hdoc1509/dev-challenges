import { setIsShowingCorrectWord } from "@/state/correct-word";
import { setIsAlertInitialized } from "@/state/alert";
import { showCorrectWord } from "@/ui/word";
import { $hints, $hintsContent } from "@/ui/hints/elements";
import { $randomWord, $reset } from "@/ui/actions";
import { CLASSES } from "@/consts/css-classes";

/** @param {Object} params
 * @param {HTMLInputElement} params.$currentField */
export function handleGameOver({ $currentField }) {
  import("@/ui/alert").then(({ GameAlert }) => {
    setIsAlertInitialized(true);
    GameAlert.show({ color: "error", text: "😔 Game Over!" });
  });

  $randomWord.disabled = true;
  setIsShowingCorrectWord(true);
  showCorrectWord().then(() => {
    $randomWord.disabled = false;
    setIsShowingCorrectWord(false);
  });

  $hints.classList.add(CLASSES.HIDDEN);
  $hintsContent.classList.add(CLASSES.HIDDEN);

  $currentField.disabled = true;
  $currentField.readOnly = true;

  $reset.disabled = true;
}
