/** @param {any} item */
export function parseStoredItem(item) {
  try {
    return JSON.parse(item);
  } catch {
    return [];
  }
}
