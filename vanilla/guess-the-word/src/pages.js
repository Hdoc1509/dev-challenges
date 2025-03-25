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

/** @typedef {DocumentFragment | HTMLLIElement} RenderItemResult */

/** @template Item */
export class Pages {
  #$pagesContainer;
  #$pageTemplate;
  #$pageEmptyTemplate;
  #$total;
  #pages;
  #itemsPerPage;
  #renderItem;
  #clearEmpty;
  #onItemRemoved;
  #onPageChange;
  #current = 0;

  static INSERTION_MODE = INSERTION_MODE;

  /**
   * @param {HTMLDivElement} $pagesContainer
   * @param {Object} extraParams
   * @param {Item[]} extraParams.items
   * @param {number} extraParams.itemsPerPage
   * @param {(params: RenderItemParams<Item>) => RenderItemResult} extraParams.renderItem
   * @param {($page: HTMLUListElement) => void} extraParams.clearEmpty
   * @param {($page: HTMLUListElement) => void} [extraParams.onItemRemoved]
   * @param {($page: HTMLUListElement) => void} [extraParams.onPageChange]
   * @param {HTMLTemplateElement} extraParams.$pageTemplate
   * @param {HTMLTemplateElement} extraParams.$pageEmptyTemplate
   * @param {HTMLElement} extraParams.$total
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
      $total,
    },
  ) {
    // TODO: move validations to separate function
    if ($pagesContainer == null)
      error('"$pagesContainer" argument is required');
    if (!($pagesContainer instanceof HTMLDivElement))
      error('"$pagesContainer" argument must be an instance of HTMLDivElement');

    const $templateClone = /** @type {DocumentFragment} */ (
      $pageTemplate.content.cloneNode(true)
    ).querySelector("ul");

    if ($templateClone == null)
      error('"$pageTemplate" argument must have an "ul" element');
    else if (!$templateClone.classList.contains("page"))
      error('"ul" element in "$pageTemplate" argument must have "page" class');

    this.#$pagesContainer = $pagesContainer;
    this.#$pageTemplate = $pageTemplate;
    this.#$total = $total;
    this.#pages = paginate(items, itemsPerPage);
    this.#itemsPerPage = itemsPerPage;
    this.#renderItem = renderItem;
    this.#$pageEmptyTemplate = $pageEmptyTemplate;
    this.#clearEmpty = clearEmpty;
    this.#onItemRemoved = onItemRemoved;
    this.#onPageChange = onPageChange;

    $total.textContent = `${this.#pages.length}`;
  }

  get pages() {
    return this.#pages.length;
  }

  /** @param {number} page */
  renderPage(page) {
    const $currentPage = /** @type {HTMLUListElement | null} */ (
      this.#$currentPage
    );
    /** @type {HTMLUListElement | null} */
    let $page = this.#$pagesContainer.querySelector(
      `.page[data-page="${page}"]`,
    );

    if ($page == null) {
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

    this.#current = page;
    $currentPage?.removeAttribute("data-active");
    $page.dataset.active = "";
    $page.dataset.page = page.toString();
    this.#onPageChange?.($page);
  }

  /** @param {Item} item */
  append(item) {
    const $currentPage = /** @type {HTMLUListElement} */ (this.#$currentPage);
    const pageIdx = this.#current - 1;

    this.#pages[pageIdx].push(item);

    const totalItems = this.#pages[pageIdx].length;
    const isNew = true;

    $currentPage.appendChild(
      this.#renderItem({
        item,
        index: totalItems - 1,
        totalItems,
        isNew,
        insertionMode: INSERTION_MODE.APPEND,
      }),
    );
    this.#reorder({ totalItems, $fromPage: $currentPage, pageIdx });
  }

  get #$currentPage() {
    return this.#$pagesContainer.querySelector(".page[data-active]");
  }

  /** @param {Item} item */
  prepend(item) {
    const $page = /** @type {HTMLUListElement} */ (
      this.#$pagesContainer.querySelector(".page[data-page='1']")
    );
    const pageIdx = 0;

    this.#pages[pageIdx].unshift(item);

    const totalItems = this.#pages[pageIdx].length;
    const isNew = true;

    $page.prepend(
      this.#renderItem({
        item,
        index: 0,
        totalItems,
        isNew,
        insertionMode: INSERTION_MODE.PREPEND,
      }),
    );
    this.#reorder({ totalItems, $fromPage: $page, pageIdx });
  }

  /** @param {{ totalItems: number, $fromPage: HTMLUListElement, pageIdx: number }} params */
  #reorder({ totalItems, $fromPage, pageIdx }) {
    if (totalItems === 1) this.#clearEmpty($fromPage);
    else if (totalItems <= this.#itemsPerPage) return;

    const totalPages = this.#pages.length;
    let itemToMove = null;
    let $elementToMove = null;

    for (let i = pageIdx; i < totalPages; i++) {
      const $page = this.#$pagesContainer.querySelector(
        `.page[data-page="${i + 1}"]`,
      );

      if (itemToMove != null) {
        this.#pages[i].unshift(itemToMove);
        itemToMove = null;

        if ($elementToMove != null) {
          if ($page == null) {
            $elementToMove.remove();
            this.#onItemRemoved?.($fromPage);
          } else $page.insertBefore($elementToMove, $page.firstElementChild);
          $elementToMove = null;
        }
      }

      if (this.#pages[i].length > this.#itemsPerPage) {
        itemToMove = this.#pages[i].pop();

        if ($page != null) $elementToMove = $page.lastElementChild;
      }

      if (itemToMove == null) break;
    }

    if (itemToMove == null) return;

    this.#pages[pageIdx].push(itemToMove);
    this.#$total.textContent = `${totalPages + 1}`;
  }
}
