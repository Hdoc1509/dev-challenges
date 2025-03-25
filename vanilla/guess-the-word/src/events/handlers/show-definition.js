import { getElementBySelector } from "@lib/dom";
import { currentWord } from "@/state/current-word";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionSection } from "@/ui/definition/elements";
import { $definitionPagesContainer } from "@/ui/definition/pages";

export function handleShowDefinition() {
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
