type HTMLElementConstructor = new (...args: unknown[]) => HTMLElement;

/** Get an element by id and check if it's instance of the expected interface */
export function getElementById<T extends HTMLElementConstructor>(
  id: string,
  expectedInterface: T,
  $parent: Document | DocumentFragment = document,
): InstanceType<T> {
  const $element = $parent.getElementById(id);

  if (!($element instanceof expectedInterface))
    throw new Error(`${expectedInterface.name} with "${id}" id not found`);

  return $element as InstanceType<T>;
}

/** Get an element by selector and check if it's instance of the expected
 * interface */
export function getElementBySelector<T extends HTMLElementConstructor>(
  selector: string,
  expectedInterface: T,
  $parent: Document | DocumentFragment | Element = document,
): InstanceType<T> {
  const $element = $parent.querySelector(selector);

  if (!($element instanceof expectedInterface))
    throw new Error(
      `${expectedInterface.name} that matches "${selector}" selector not found`,
    );

  return $element as InstanceType<T>;
}

/** Get all elements by selector and check if they're instances of the expected
 * interface */
export function getAllElementsBySelector<T extends HTMLElementConstructor>(
  selector: string,
  expectedInterface: T,
  $parent: Document | DocumentFragment | Element = document,
): InstanceType<T>[] {
  // TODO: return the $elements, do not transform it to an array
  const $elements = $parent.querySelectorAll(selector);

  if ($elements.length === 0)
    throw new Error(
      `No elements that matches "${selector}" selector were found`,
    );

  const elements: HTMLElement[] = [];

  for (let i = 0; i < $elements.length; i++) {
    const $element = $elements[i];

    // TODO: improve error message
    if (!($element instanceof expectedInterface))
      throw new Error(
        `${expectedInterface.name} at index ${i} doesn't match "${selector}" selector`,
      );

    elements.push($element);
  }

  return elements as InstanceType<T>[];
}
