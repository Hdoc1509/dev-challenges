import { $definitionPagesContainer } from "@/ui/definition/pages";

export function closeOpenedDefinition() {
  $definitionPagesContainer
    .querySelector(
      ":scope > .definitions-list.page[data-active] .definition[open]",
    )
    ?.removeAttribute("open");
}
