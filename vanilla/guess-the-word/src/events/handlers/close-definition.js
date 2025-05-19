import { $definitionPagesContainer } from "@/ui/definition/pages";

// TODO: rename file to definition-close.js
export function closeOpenedDefinition() {
  // TODO: use :scope selector
  $definitionPagesContainer
    .querySelector(".definitions-list.page[data-active] .definition[open]")
    ?.removeAttribute("open");
}
