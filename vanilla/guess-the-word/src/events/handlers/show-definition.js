import { getElementBySelector } from "@lib/dom";
import { currentWord } from "@/state/current-word";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionSection } from "@/ui/definition/elements";
import { $definitionPagesContainer } from "@/ui/definition/pages";
import { DefinitionPagination } from "@/ui/definition/pagination";

export function handleShowDefinition() {
  DefinitionPagination.setCurrentPage(1);

  // TODO: add DefinitionItem.Element Map to @/state/definition
  // const $details = DefinitionItem.Element.get(word);
  const $details = getElementBySelector(
    `.definitions-list.page[data-active] .definition[data-word=${currentWord}]`,
    HTMLDetailsElement,
    $definitionPagesContainer,
  );

  $definitionSection.removeAttribute("data-active");
  $menu.showModal();
  MenuTabs.selectTab($definitionsTab);
  $details.scrollIntoView();
  $details.open = true;
  $details.focus();
}
