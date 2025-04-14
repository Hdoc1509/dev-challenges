import { paginate } from "./utils/paginate";

const INSERTION_MODE = Object.freeze({
  APPEND: "append",
  PREPEND: "prepend",
});

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pages]: ${message}`);
};

/**
 * @template Item
 * @typedef {Object} RenderItemParams
 * @property {Item} item
 * @property {number} index
 * @property {number} totalItems
 * @property {boolean} [isNew]
 * @property {typeof INSERTION_MODE[keyof typeof INSERTION_MODE]} insertionMode
 */

/**
 * @template Item
 * @callback InsertionMethod
 * @param {Item} item
 * @param {Object} [options]
 * @param {boolean} [options.renderPage] Whether to call `renderPage(page)` before rendering the item
 */

/** @typedef {DocumentFragment | HTMLLIElement} RenderItemResult */

/**
 * @typedef PageEventHandler
 * @property {(totalPages: number) => void} pageadd
 */

/**
 * @typedef PageEvents
 * @property {PageEventHandler["pageadd"][]} pageadd
 * @property {Array<(totalPages: number) => void>} itemsupdate
 */

/** @template Item */
export class Pages {
  #$pagesContainer;
  #$pageTemplate;
  #$pageEmptyTemplate;
  #pages;
  #itemsPerPage;
  #renderItem;
  #clearEmpty;
  #onItemRemoved;
  #onItemMoved;
  #onPageChange;
  /** @type {PageEvents} */
  #events = { pageadd: [], itemsupdate: [] };

  static INSERTION_MODE = INSERTION_MODE;

  /**
   * @param {HTMLDivElement} $pagesContainer
   * @param {Object} extraParams
   * @param {Item[]} [extraParams.items]
   * @param {number} extraParams.itemsPerPage
   * @param {(params: RenderItemParams<Item>) => RenderItemResult} extraParams.renderItem
   * @param {($page: HTMLUListElement) => void} extraParams.clearEmpty
   * @param {($page: HTMLUListElement) => void} [extraParams.onItemRemoved]
   * @param {($page: HTMLUListElement) => void} [extraParams.onItemMoved]
   * @param {($page: HTMLUListElement) => void} [extraParams.onPageChange]
   * @param {HTMLTemplateElement} extraParams.$pageTemplate
   * @param {HTMLTemplateElement} extraParams.$pageEmptyTemplate
   */
  constructor(
    $pagesContainer,
    {
      items,
      itemsPerPage,
      renderItem,
      clearEmpty,
      onItemRemoved,
      onItemMoved,
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
    this.#pages = items == null ? [[]] : paginate(items, itemsPerPage);
    this.#itemsPerPage = itemsPerPage;
    this.#renderItem = renderItem;
    this.#$pageEmptyTemplate = $pageEmptyTemplate;
    this.#clearEmpty = clearEmpty;
    this.#onItemRemoved = onItemRemoved;
    this.#onItemMoved = onItemMoved;
    this.#onPageChange = onPageChange;
  }

  get totalPages() {
    return this.#pages.length;
  }

  /** Update items to be paginated. Triggers `itemsupdate` event.
   * @param {Item[]} items
   * @param {{ renderPage?: number }} [options]
   */
  setItems(items, { renderPage } = {}) {
    for (let page = 1; page <= this.totalPages; page++)
      this.#$page(page)?.remove();

    this.#pages = paginate(items, this.#itemsPerPage);

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

  /**
   * @param {number} page
   * @returns {HTMLUListElement | null}
   */
  #$page(page) {
    return this.#$pagesContainer.querySelector(`.page[data-page="${page}"]`);
  }

  /** @param {number} page */
  renderPage(page) {
    const $currentPage =
      this.#$pagesContainer.querySelector(".page[data-active]");
    let $page = this.#$page(page);

    if ($page == null) {
      console.log("renderPage", page);
      const $template = /** @type {DocumentFragment} */ (
        this.#$pageTemplate.content.cloneNode(true)
      );
      const $newPage = /** @type {HTMLUListElement} */ (
        $template.querySelector("ul")
      );
      const items = this.#pages[page - 1];
      const totalItems = items.length;

      if (totalItems === 0) {
        $newPage.appendChild(this.#$pageEmptyTemplate.content.cloneNode(true));
      } else {
        items.forEach((item, index) =>
          $newPage.appendChild(
            this.#renderItem({
              item,
              index,
              totalItems,
              insertionMode: INSERTION_MODE.APPEND,
            }),
          ),
        );
      }

      $page = $newPage;
      this.#$pagesContainer.appendChild($template);
    }

    $currentPage?.removeAttribute("data-active");
    $page.dataset.active = "";
    $page.dataset.page = page.toString();
    this.#onPageChange?.($page);
  }

  /** @type {InsertionMethod<Item>} */
  append(item, { renderPage = true } = {}) {
    if (renderPage) this.renderPage(this.totalPages);

    const pageIdx = this.totalPages - 1;

    this.#pages[pageIdx].push(item);

    const $lastPage = this.#$page(pageIdx + 1);
    const totalItems = this.#pages[pageIdx].length;

    $lastPage?.appendChild(
      this.#renderItem({
        item,
        index: totalItems - 1,
        totalItems,
        isNew: true,
        insertionMode: INSERTION_MODE.APPEND,
      }),
    );
    this.#reorder({ totalItems, $fromPage: $lastPage, pageIdx });
  }

  /** @type {InsertionMethod<Item>} */
  prepend(item, { renderPage = true } = {}) {
    if (renderPage) this.renderPage(1);

    const pageIdx = 0;

    this.#pages[pageIdx].unshift(item);

    const $firstPage = this.#$page(1);
    const totalItems = this.#pages[pageIdx].length;

    $firstPage?.prepend(
      this.#renderItem({
        item,
        index: 0,
        totalItems,
        isNew: true,
        insertionMode: INSERTION_MODE.PREPEND,
      }),
    );
    this.#reorder({ totalItems, $fromPage: $firstPage, pageIdx });
  }

  /**
   * @param {Object} params
   * @param {number} params.totalItems
   * @param {HTMLUListElement | null} params.$fromPage
   * @param {number} params.pageIdx
   */
  #reorder({ totalItems, $fromPage, pageIdx }) {
    const totalPages = this.#pages.length;

    if (totalPages === 1 && totalItems === 1 && $fromPage != null)
      this.#clearEmpty($fromPage);
    else if (totalItems <= this.#itemsPerPage) return;

    let itemToMove = null;
    let $elementToMove = null;
    let $previousPage = null;

    for (let i = pageIdx; i < totalPages; i++) {
      const $page = this.#$page(i + 1);

      if (itemToMove != null) {
        this.#pages[i].unshift(itemToMove);

        if ($elementToMove != null) {
          if ($page == null) $elementToMove.remove();
          else {
            $page.insertBefore($elementToMove, $page.firstElementChild);
            this.#onItemMoved?.($page);
          }
          if ($previousPage != null) this.#onItemRemoved?.($previousPage);
          $elementToMove = null;
        } else
          $page?.prepend(
            this.#renderItem({
              item: itemToMove,
              index: 0,
              totalItems: this.#pages[i].length,
              insertionMode: INSERTION_MODE.PREPEND,
            }),
          );

        itemToMove = null;
      }

      if (this.#pages[i].length > this.#itemsPerPage) {
        itemToMove = this.#pages[i].pop();

        if ($page != null) {
          $elementToMove = $page.lastElementChild;
          $previousPage = $page;
        }
      }

      if (itemToMove == null) break;
    }

    if (itemToMove == null) return;

    this.#pages.push([itemToMove]);
    // NOTE: this can only happen when first page has more than itemsPerPage items
    if ($elementToMove != null) {
      $elementToMove.remove();
      if ($previousPage != null) this.#onItemRemoved?.($previousPage);
    }
    this.#events.pageadd.forEach((handler) => handler(totalPages + 1));
  }
}
