import { $definitionPagesContainer } from "@/ui/definition/pages";

export function removeAllNewBadges() {
  const $definitions = $definitionPagesContainer.querySelectorAll(
    ":scope > .definitions-list.page[data-active] .definition[data-new]",
  );

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
}
