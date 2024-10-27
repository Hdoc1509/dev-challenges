/**
 * Get an element by id and check if it's instance of the expected interface.
 * @template {(new (...args: any) => any)} T
 * @param {string} id
 * @param {T} expectedInterface
 * @param {Document|DocumentFragment} [$parent]
 * @returns {T['prototype']}
 */
export function getElementById(id, expectedInterface, $parent = document) {
  const $element = $parent.getElementById(id);

  if (!($element instanceof expectedInterface))
    throw new Error(`${expectedInterface.name} with "${id}" id not found`);

  return $element;
}

/**
 * Get an element by selector and check if it's instance of the expected interface.
 * @template {(new (...args: any) => any)} T
 * @param {string} selector
 * @param {T} expectedInterface
 * @param {Document|DocumentFragment|Element} [$parent]
 * @returns {T['prototype']}
 */
export function getElementBySelector(
  selector,
  expectedInterface,
  $parent = document,
) {
  const $element = $parent.querySelector(selector);

  if (!($element instanceof expectedInterface))
    throw new Error(
      `${expectedInterface.name} that matches "${selector}" selector not found`,
    );

  return $element;
}
