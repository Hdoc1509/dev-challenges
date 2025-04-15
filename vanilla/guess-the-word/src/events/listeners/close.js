import { removeAllNewBadges } from "../handlers/remove-new-badges";
import { closeOpenedDefinition } from "../handlers/close-definition";
import { $menu } from "@/ui/menu";

export function setupCloseListeners() {
  $menu.addEventListener("close", () => {
    removeAllNewBadges();
    closeOpenedDefinition();
  });
}
