import { currentWord } from "@/state/current-word";
import { DefinitionElement } from "@/state/definition";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionSection } from "@/ui/definition/elements";
import { DefinitionPages } from "@/ui/definition/pages";
import { DefinitionPagination } from "@/ui/definition/pagination";
import { CLASSES } from "@/consts/css-classes";

export function handleShowDefinition() {
  const $details = DefinitionElement.get(currentWord);

  if (!($details instanceof HTMLDetailsElement)) return;

  const $page = /** @type {HTMLUListElement} */ (
    $details.closest(".definitions-list.page")
  );
  const targetPage = DefinitionPages.numberOfPage($page);

  if (targetPage == null) return;

  DefinitionPagination.selectPage(targetPage);

  $definitionSection.classList.add(CLASSES.HIDDEN);
  $menu.showModal();
  MenuTabs.selectTab($definitionsTab);
  $details.scrollIntoView();
  $details.open = true;
  $details.focus();
}
