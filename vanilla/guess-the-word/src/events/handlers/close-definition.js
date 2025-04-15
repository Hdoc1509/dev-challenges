import { $definitionPagesContainer } from "@/ui/definition/pages";

export function closeOpenedDefinition() {
  $definitionPagesContainer
    .querySelector(".definitions-list.page[data-active] .definition[open]")
    ?.removeAttribute("open");
}
