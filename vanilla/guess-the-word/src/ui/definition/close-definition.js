import { $definitionPagesContainer } from "./pages";

export function closeOpenedDefinition() {
  const $definition = $definitionPagesContainer.querySelector(
    ".definitions-list.page[data-active] .definition[open]",
  );

  $definition?.removeAttribute("open");
}
