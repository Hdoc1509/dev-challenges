import { currentWord } from "@/state/current-word";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionSection } from "@/ui/definition/elements";
import {
  DefinitionPages,
  $definitionPagesContainer,
} from "@/ui/definition/pages";
import { DefinitionPagination } from "@/ui/definition/pagination";

export function handleShowDefinition() {
  // TODO: add DefinitionItem.Element Map to @/state/definition
  // const $details = DefinitionItem.Element.get(word);
  const $details = $definitionPagesContainer.querySelector(
    `.definition[data-word=${currentWord}]`,
  );

  // NOTE: can be null if it's page is not rendered yet
  if (!($details instanceof HTMLDetailsElement)) return;

  const $page = /** @type {HTMLUListElement} */ (
    $details.closest(".definitions-list.page")
  );
  const targetPage = Number($page.dataset.page);

  DefinitionPages.renderPage(targetPage);
  DefinitionPagination.setCurrentPage(targetPage);

  $definitionSection.removeAttribute("data-active");
  $menu.showModal();
  MenuTabs.selectTab($definitionsTab);
  $details.scrollIntoView();
  $details.open = true;
  $details.focus();
}
