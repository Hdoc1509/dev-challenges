import { $definitionslist } from "./elements";

export const clearNewDefinitionStatus = () => {
  const $definitions = $definitionslist.querySelectorAll(
    ".definition[data-new]",
  );

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
};
