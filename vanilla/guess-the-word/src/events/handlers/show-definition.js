import { getElementBySelector } from "@lib/dom";
import { currentWord } from "@/state/current-word";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionSection, $definitionslist } from "@/ui/definition/elements";

export function handleShowDefinition() {
  const $details = getElementBySelector(
    `.definition[data-word=${currentWord}]`,
    HTMLDetailsElement,
    $definitionslist,
  );

  $definitionSection.removeAttribute("data-active");
  $menu.showModal();
  MenuTabs.selectTab($definitionsTab);
  $details.open = true;
  $details.focus();
}
