/**
 * @template Item
 * @param {Item[]} items
 * @param {number} itemsPerPage
 * @returns {Array<Item[]>}
 */
export const paginate = (items, itemsPerPage) => {
  const pagesQuantity = Math.ceil(items.length / itemsPerPage);
  const pages = [];

  for (let i = 0; i <= pagesQuantity; i++) {
    const offset = i * itemsPerPage;
    pages.push(items.slice(offset, offset + itemsPerPage));
  }

  return pages;
};
