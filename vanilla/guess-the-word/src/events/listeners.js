import { difficulty } from "@/state/difficulty";
import { generateRandomWord } from "./handlers/random-word";
import { handleLetterInput } from "./handlers/letter-input";
import { resetGame } from "./handlers/reset-game";
import { handleDifficultyChange } from "./handlers/difficulty-change";
import { applyDifficulty } from "@/utils/difficulty/apply";
import { isValidLetterField } from "@/utils/letter-fields";
import { $menu, $menuClose, $menuOpen /* , MenuTabs */ } from "@/ui/menu";
// import { generateWordList } from "@/ui/word-list";
import { $randomWord, $reset } from "@/ui/actions";

export function setupEventListeners() {
  applyDifficulty(difficulty);
  generateRandomWord();
  // generateWordList();

  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    else if ($target === $reset) resetGame();
    else if ($target === $menuOpen) $menu.showModal();
    else if ($target === $menuClose) $menu.close();
    // else if (MenuTabs.isTabLink($target)) MenuTabs.selectTab($target);
  });

  // NOTE: should I reset animation of letter input on blur?
  document.addEventListener("input", (e) => {
    const $target = e.target;

    if (isValidLetterField($target)) handleLetterInput($target);
  });

  document.addEventListener("change", (e) => {
    const $target = e.target;

    if (
      $target instanceof HTMLInputElement &&
      $target.matches("#difficulty-form input[type=radio][name=difficulty]")
    )
      return handleDifficultyChange(
        /** @type {import("@/consts").Difficulty} */ ($target.value),
      );
  });
}
