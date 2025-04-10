/** @typedef Item
 * @property {AbortController} controller
 * @property {string} word
 */

/** @type {WeakMap<HTMLDetailsElement, Item>} */
export const DefinitionItem = new WeakMap();
