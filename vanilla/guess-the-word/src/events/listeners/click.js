import { generateRandomWord } from "../handlers/random-word";
import { resetGame } from "../handlers/reset-game";
import { handleShowDefinition } from "../handlers/show-definition";
import { handleShowHints } from "../handlers/show-hints";
import { DefinitionPages } from "@/ui/definition/pages";
import { DefinitionPagination } from "@/ui/definition/pagination";
import { MenuTabs, $menu, $menuOpen, $menuClose } from "@/ui/menu";
import { HintsTabs, $hintsTrigger } from "@/ui/hints";
import { $randomWord, $reset } from "@/ui/actions";
import { $showDefinition } from "@/ui/definition/elements";

export function setupClickListeners() {
  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    else if ($target === $reset) resetGame();
    else if ($target === $menuOpen) {
      DefinitionPages.renderPage(DefinitionPagination.currentPage);
      $menu.showModal();
    } else if ($target === $menuClose) $menu.close();
    else if ($target === $showDefinition) handleShowDefinition();
    else if ($target === $hintsTrigger) handleShowHints();
    else if (MenuTabs.isTabLink($target)) MenuTabs.selectTab($target);
    else if (HintsTabs.isTabLink($target)) HintsTabs.selectTab($target);
    else if (DefinitionPagination.isTrigger($target))
      DefinitionPagination.handleTrigger($target);
  });
}
