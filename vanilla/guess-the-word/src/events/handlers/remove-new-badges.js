import { $definitionPagesContainer } from "@/ui/definition/pages";

// TODO: only remove new badge once a definition has been shown successfully
// - handle this at handleDefinitionOpen()
// - remove this handler
export function removeAllNewBadges() {
  const $definitions = $definitionPagesContainer.querySelectorAll(
    ":scope > .definitions-list.page[data-active] .definition[data-new]",
  );

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
}
