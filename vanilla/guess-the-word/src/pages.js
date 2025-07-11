import { paginate } from "./utils/paginate";

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pages]: ${message}`);
};

/**
 * @template Item
 * @callback InsertionMethod
 * @param {Item} item
 * @param {Object} [options]
 * @param {boolean} [options.renderPage] Whether to call `renderPage(page)` before rendering the item
 */

/**
 * @typedef PageEventHandler
 * @property {(totalPages: number) => void} pageadd
 */

/**
 * @typedef PageEvents
 * @property {PageEventHandler["pageadd"][]} pageadd
 * @property {Array<(totalPages: number) => void>} itemsupdate
 */

/** Must return an `HTMLLIElement` or a `DocumentFragment` whose only child is
 * an `HTMLLIElement`
 * @template Item
 * @callback ItemRenderer
 * @param {Item} item
 * @param {Object} [metadata]
 * @param {boolean} [metadata.isNew]
 * It's `true` when added by `append(item)` or `prepend(item)`
 * @return {DocumentFragment | HTMLLIElement} */

/** @template Item */
export class Pages {
  /** @type {Map<number, HTMLUListElement>} */
  #Pages = new Map();
  #$pagesContainer;
  #$pageTemplate;
  #$pageEmptyTemplate;
  #paginatedItems;
  #itemsPerPage;
  #renderItem;
  #clearEmpty;
  #onItemRemoved;
  #onPageChange;
  /** @type {PageEvents} */
  #events = { pageadd: [], itemsupdate: [] };

  /**
   * @param {HTMLDivElement} $pagesContainer
   * @param {Object} config
   * @param {Item[]} [config.items]
   * @param {number} config.itemsPerPage
   * @param {ItemRenderer<Item>} config.renderItem
   * Must return an `HTMLLIElement` or a `DocumentFragment` whose first child is
   * an `HTMLLIElement`
   * @param {($page: HTMLUListElement) => void} config.clearEmpty
   * @param {(removedItem: Item) => void} [config.onItemRemoved]
   * Triggered when an element of an item is removed from a page
   * @param {($page: HTMLUListElement) => void} [config.onPageChange]
   * @param {HTMLTemplateElement} config.$pageTemplate
   * @param {HTMLTemplateElement} config.$pageEmptyTemplate
   */
  constructor(
    $pagesContainer,
    {
      items,
      itemsPerPage,
      renderItem,
      clearEmpty,
      onItemRemoved,
      onPageChange,
      $pageTemplate,
      $pageEmptyTemplate,
    },
  ) {
    // TODO: move validations to separate function
    if ($pagesContainer == null)
      error('"$pagesContainer" argument is required');
    if (!($pagesContainer instanceof HTMLDivElement))
      error('"$pagesContainer" argument must be an instance of HTMLDivElement');

    const $pageClone = /** @type {DocumentFragment} */ (
      $pageTemplate.content.cloneNode(true)
    ).querySelector("ul");

    if ($pageClone == null)
      error('"$pageTemplate" argument must have an "ul" element');
    else if (!$pageClone.classList.contains("page"))
      error('"ul" element in "$pageTemplate" argument must have "page" class');

    this.#$pagesContainer = $pagesContainer;
    this.#$pageTemplate = $pageTemplate;
    this.#paginatedItems = items == null ? [[]] : paginate(items, itemsPerPage);
    this.#itemsPerPage = itemsPerPage;
    this.#renderItem = renderItem;
    this.#$pageEmptyTemplate = $pageEmptyTemplate;
    this.#clearEmpty = clearEmpty;
    this.#onItemRemoved = onItemRemoved;
    this.#onPageChange = onPageChange;
  }

  get totalPages() {
    return this.#paginatedItems.length;
  }

  /** Update items to be paginated. Triggers `itemsupdate` event.
   * @param {Item[]} items
   * @param {{ renderPage?: number }} [options]
   */
  setItems(items, { renderPage } = {}) {
    this.#Pages.forEach(($page) => $page.remove());
    this.#Pages.clear();

    this.#paginatedItems = paginate(items, this.#itemsPerPage);

    const totalPages = this.totalPages;

    this.#events.itemsupdate.forEach((handler) => handler(totalPages));
    if (renderPage) this.renderPage(renderPage);
  }

  /**
   * @template {keyof PageEvents} Event
   * @param {Event} event
   * @param {PageEvents[Event][number]} handler
   */
  addEventListener(event, handler) {
    this.#events[event].push(handler);
  }

  /** @param {number} page */
  #$page(page) {
    return this.#Pages.get(page);
  }

  /** @param {HTMLUListElement} $page */
  numberOfPage($page) {
    return Array.from(this.#Pages).find(
      ([, $pageElement]) => $pageElement === $page,
    )?.[0];
  }

  /** @param {number} page */
  renderPage(page) {
    const $currentPage = this.#$pagesContainer.querySelector(
      ":scope > .page[data-active]",
    );
    let $page = this.#$page(page);

    if ($page == null) {
      console.log("renderPage", page);
      const $template = /** @type {DocumentFragment} */ (
        this.#$pageTemplate.content.cloneNode(true)
      );
      const $newPage = /** @type {HTMLUListElement} */ (
        $template.querySelector("ul")
      );
      const items = this.#paginatedItems[page - 1];

      if (items.length === 0) {
        $newPage.appendChild(this.#$pageEmptyTemplate.content.cloneNode(true));
      } else {
        items.forEach((item) => $newPage.appendChild(this.#renderItem(item)));
      }

      $page = $newPage;
      this.#$pagesContainer.appendChild($template);
    }

    $currentPage?.removeAttribute("data-active");
    $page.dataset.active = "";
    this.#Pages.set(page, $page);
    this.#onPageChange?.($page);
  }

  /** @type {InsertionMethod<Item>} */
  append(item, { renderPage = true } = {}) {
    if (renderPage) this.renderPage(this.totalPages);

    const pageIdx = this.totalPages - 1;

    this.#paginatedItems[pageIdx].push(item);

    const $lastPage = this.#$page(pageIdx + 1);
    const totalItems = this.#paginatedItems[pageIdx].length;

    $lastPage?.appendChild(this.#renderItem(item, { isNew: true }));
    this.#reorder({ totalItems, $fromPage: $lastPage, pageIdx });
  }

  /** @type {InsertionMethod<Item>} */
  prepend(item, { renderPage = true } = {}) {
    if (renderPage) this.renderPage(1);

    const pageIdx = 0;

    this.#paginatedItems[pageIdx].unshift(item);

    const $firstPage = this.#$page(1);
    const totalItems = this.#paginatedItems[pageIdx].length;

    $firstPage?.prepend(this.#renderItem(item, { isNew: true }));
    this.#reorder({ totalItems, $fromPage: $firstPage, pageIdx });
  }

  /**
   * @param {Object} params
   * @param {number} params.totalItems
   * @param {HTMLUListElement} [params.$fromPage]
   * @param {number} params.pageIdx
   */
  #reorder({ totalItems, $fromPage, pageIdx }) {
    const totalPages = this.#paginatedItems.length;

    if (totalPages === 1 && totalItems === 1 && $fromPage != null)
      this.#clearEmpty($fromPage);
    else if (totalItems <= this.#itemsPerPage) return;

    let itemToMove = null;
    let $elementToMove = null;

    for (let i = pageIdx; i < totalPages; i++) {
      const $page = this.#$page(i + 1);

      if (itemToMove != null) {
        this.#paginatedItems[i].unshift(itemToMove);

        if ($elementToMove != null) {
          if ($page == null) {
            this.#onItemRemoved?.(itemToMove);
            $elementToMove.remove();
          } else {
            $page.insertBefore($elementToMove, $page.firstElementChild);
          }
          $elementToMove = null;
        } else {
          $page?.prepend(this.#renderItem(itemToMove));
        }

        itemToMove = null;
      }

      if (this.#paginatedItems[i].length > this.#itemsPerPage) {
        itemToMove = this.#paginatedItems[i].pop();

        if ($page != null) $elementToMove = $page.lastElementChild;
      }

      if (itemToMove == null) break;
    }

    if (itemToMove == null) return;

    this.#paginatedItems.push([itemToMove]);
    if ($elementToMove != null) {
      this.#onItemRemoved?.(itemToMove);
      $elementToMove.remove();
    }
    this.#events.pageadd.forEach((handler) => handler(totalPages + 1));
  }
}
