/** @param {HTMLElement[]} $elements */
export const clearChildren = (...$elements) => {
  for (const $element of $elements)
    while ($element.firstChild != null)
      $element.removeChild($element.firstChild);
};
