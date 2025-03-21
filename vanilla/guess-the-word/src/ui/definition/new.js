export const clearNewDefinitionStatus = () => {
  // TODO: use $definitionslist.querySelectorAll() instead
  const $definitions = document.querySelectorAll(".definition[data-new]");

  $definitions.forEach(($definition) => {
    $definition.removeAttribute("data-new");
    $definition.querySelector(".definition__badge")?.remove();
  });
};
