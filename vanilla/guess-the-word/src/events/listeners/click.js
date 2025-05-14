import { generateRandomWord } from "../handlers/random-word";
import { resetGame } from "../handlers/reset-game";
import { handleShowDefinition } from "../handlers/show-definition";
import { handleToggleHints } from "../handlers/toggle-hints";
import { DefinitionPages } from "@/ui/definition/pages";
import { DefinitionPagination } from "@/ui/definition/pagination";
import {
  MenuTabs,
  $menu,
  $menuOpen,
  $menuClose,
  $difficultyTab,
  $definitionsTab,
  $statsTab,
} from "@/ui/menu";
import { HintsTabs, $hintsTrigger } from "@/ui/hints/elements";
import { $showDifficulties } from "@/ui/completed";
import { $randomWord, $reset } from "@/ui/actions";
import { $showDefinition } from "@/ui/definition/elements";

export function setupClickListeners() {
  document.addEventListener("click", (e) => {
    const $target = e.target;

    if ($target === $randomWord) generateRandomWord();
    else if ($target === $reset) resetGame();
    else if ($target === $menuOpen) {
      if (MenuTabs.currentTab === $definitionsTab)
        DefinitionPages.renderPage(DefinitionPagination.currentPage);

      $menu.showModal();
    } else if ($target === $menuClose) $menu.close();
    else if ($target === $showDefinition) handleShowDefinition();
    else if ($target === $hintsTrigger) handleToggleHints();
    else if ($target === $showDifficulties) {
      $menu.showModal();
      MenuTabs.selectTab($difficultyTab);
    } else if (MenuTabs.isTabLink($target)) {
      if ($target === $definitionsTab)
        DefinitionPages.renderPage(DefinitionPagination.currentPage);
      else if ($target === $statsTab)
        import("@/ui/stats/initial-stats").then(({ renderInitialStats }) =>
          renderInitialStats(),
        );

      MenuTabs.selectTab($target);
    } else if (HintsTabs.isTabLink($target)) HintsTabs.selectTab($target);
    else if (DefinitionPagination.isTrigger($target))
      DefinitionPagination.handleTrigger($target);
  });
}
