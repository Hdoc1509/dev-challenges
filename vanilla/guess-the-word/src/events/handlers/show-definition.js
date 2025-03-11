import { getElementBySelector } from "@lib/dom";
import { currentWord } from "@/state/current-word";
import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";
import { $definitionslist } from "@/ui/definition";

export function handleShowDefinition() {
  const $details = getElementBySelector(
    `.definition[data-word=${currentWord}] > details`,
    HTMLDetailsElement,
    $definitionslist,
  );

  $menu.showModal();
  MenuTabs.selectTab($definitionsTab);
  $details.open = true;
}
