import { generateRandomWord } from "./handlers/random-word";
import { handleLetterInput } from "./handlers/letter-input";
import { resetGame } from "./handlers/reset-game";
import { handleDifficultyChange } from "./handlers/difficulty-change";
import { $menu, $menuClose, $menuOpen /* , MenuTabs */ } from "@/ui/menu";
// import { generateWordList } from "@/ui/word-list";
import { $randomWord, $reset } from "@/ui/actions";
import { CLASSES } from "@/consts";

export function setupEventListeners() {
  generateRandomWord();
  // generateWordList();

  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    if ($target === $reset) resetGame();

    if ($target === $menuOpen) $menu.showModal();
    if ($target === $menuClose) $menu.close();

    // if (MenuTabs.isTabLink($target)) MenuTabs.selectTab($target);
  });

  // NOTE: should I reset animation of letter input on blur?
  document.addEventListener("input", (e) => {
    const $target = e.target;

    if (
      $target instanceof HTMLInputElement &&
      $target.matches(`.${CLASSES.TYPING.LETTER.CURRENT} > input`)
    )
      handleLetterInput($target);
  });

  document.addEventListener("change", (e) => {
    const $target = e.target;

    if (
      $target instanceof HTMLInputElement &&
      $target.matches("#difficulty-form input[type=radio][name=difficulty]")
    )
      return handleDifficultyChange($target.value);
  });
}
