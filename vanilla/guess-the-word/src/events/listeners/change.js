import { handleDifficultyChange } from "../handlers/difficulty-change";
import { DefinitionPagination } from "@/ui/definition/pagination";

export function setupChangeListeners() {
  document.addEventListener("change", (e) => {
    const $target = e.target;

    if (
      $target instanceof HTMLInputElement &&
      $target.matches("#difficulty-form input[type=radio][name=difficulty]")
    )
      handleDifficultyChange(
        /** @type {import("@/consts/difficulty").Difficulty} */ ($target.value),
      );
    else if (DefinitionPagination.isInput($target))
      DefinitionPagination.handleInputChange($target);
  });
}
