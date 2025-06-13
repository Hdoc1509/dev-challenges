/** @param {any} item */
export function sanitizeStoredItem(item) {
  try {
    return JSON.parse(item);
  } catch {
    return [];
  }
}
