import { $definitionsTab, $menu, MenuTabs } from "@/ui/menu";

export function handleShowDefinition() {
  MenuTabs.selectTab($definitionsTab);
  $menu.showModal();
}
