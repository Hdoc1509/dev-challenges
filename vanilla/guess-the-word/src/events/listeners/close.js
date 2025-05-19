import { closeOpenedDefinition } from "../handlers/definition-close";
import { $menu } from "@/ui/menu";

export function setupCloseListeners() {
  $menu.addEventListener("close", () => {
    closeOpenedDefinition();
  });
}
