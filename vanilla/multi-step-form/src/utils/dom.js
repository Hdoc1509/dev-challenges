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

/**
 * Get all elements by selector and check if they're instances of the expected interface.
 * @template {(new (...args: any) => any)} T
 * @param {string} selector
 * @param {T} expectedInterface
 * @param {Document|DocumentFragment|Element} [$parent]
 * @returns {T['prototype'][]}
 */
export function getAllElementsBySelector(
  selector,
  expectedInterface,
  $parent = document,
) {
  const $elements = $parent.querySelectorAll(selector);

  if ($elements.length === 0)
    throw new Error(
      `No elements that matches "${selector}" selector were found`,
    );

  const elements = [];

  for (let i = 0; i < $elements.length; i++) {
    const $element = $elements[i];

    if (!($element instanceof expectedInterface))
      throw new Error(
        `${expectedInterface.name} at index ${i} doesn't match "${selector}" selector`,
      );

    elements.push($element);
  }

  return elements;
}
