import { difficulty } from "@/state/difficulty";
import { discoveredWords } from "@/state/discovered-words";
import { generateRandomWord } from "./handlers/random-word";
import { handleShowDefinition } from "./handlers/show-definition";
import { handleLetterInput } from "./handlers/letter-input";
import { resetGame } from "./handlers/reset-game";
import { handleDifficultyChange } from "./handlers/difficulty-change";
import { handleShowHints } from "./handlers/show-hints";
import { applyDifficulty } from "@/utils/difficulty/apply";
import { isValidLetterField } from "@/utils/letter-fields";
import { $menu, $menuClose, $menuOpen, MenuTabs } from "@/ui/menu";
// import { generateWordList } from "@/ui/word-list";
import {
  $showDefinition,
  clearNewDefinitionStatus,
  renderDefinitionsCount,
  renderSavedDefinitions,
} from "@/ui/definition";
import { $hintsTrigger, HintsTabs } from "@/ui/hints";
import { $randomWord, $reset } from "@/ui/actions";

export async function setupEventListeners() {
  await applyDifficulty(difficulty);
  generateRandomWord();
  renderSavedDefinitions(Array.from(discoveredWords));
  renderDefinitionsCount(discoveredWords.size);
  // generateWordList();

  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    else if ($target === $reset) resetGame();
    else if ($target === $menuOpen) $menu.showModal();
    else if ($target === $menuClose) $menu.close();
    else if ($target === $showDefinition) handleShowDefinition();
    else if ($target === $hintsTrigger) handleShowHints();
    else if (MenuTabs.isTabLink($target)) MenuTabs.selectTab($target);
    else if (HintsTabs.isTabLink($target)) HintsTabs.selectTab($target);
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
        /** @type {import("@/consts/difficulty").Difficulty} */ ($target.value),
      );
  });

  $menu.addEventListener("close", () => {
    clearNewDefinitionStatus();
  });
}
