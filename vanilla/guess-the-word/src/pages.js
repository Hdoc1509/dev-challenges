import { getElementBySelector } from "@lib/dom";
import { paginate } from "./utils/paginate";

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pages]: ${message}`);
};

/** @template Item */
export class Pages {
  #$pagesContainer;
  #$pageTemplate;
  #pages;
  #itemsPerPage;
  #renderItem;
  #renderEmpty;
  #clearEmpty;
  #current;

  /** @param {number} page */
  #renderPage(page) {
    /** @type {HTMLUListElement | null} */
    const $currentPage =
      this.#$pagesContainer.querySelector(".page[data-active]");
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
      const totalItems = this.#pages.length;

      if (totalItems === 0) {
        $newPage.appendChild(this.#renderEmpty());
      } else {
        items.forEach((item, index) =>
          $newPage.appendChild(this.#renderItem({ item, index, totalItems })),
        );
      }

      $page = $newPage;
    }

    $currentPage?.removeAttribute("data-active");
    $page.dataset.active = "";

    if (!this.#$pagesContainer.contains($page)) {
      $page.dataset.page = page.toString();
      this.#$pagesContainer.appendChild($page);
    }
  }

  /**
   * @param {HTMLDivElement} $pagesContainer
   * @param {Object} extraParams
   * @param {Item[]} extraParams.items
   * @param {number} extraParams.itemsPerPage
   * @param {({ item, index, totalItems}: { item: Item, index: number, totalItems: number}) => DocumentFragment | HTMLLIElement} extraParams.renderItem
   * @param {() => DocumentFragment | HTMLElement} extraParams.renderEmpty
   * @param {($page: HTMLUListElement) => void} extraParams.clearEmpty
   * @param {HTMLTemplateElement} extraParams.$pageTemplate
   */
  constructor(
    $pagesContainer,
    { items, itemsPerPage, renderItem, renderEmpty, clearEmpty, $pageTemplate },
  ) {
    if ($pagesContainer == null)
      error('"$pagesContainer" argument is required');
    if (!($pagesContainer instanceof HTMLDivElement))
      error('"$pagesContainer" argument must be an instance of HTMLDivElement');
    if (!$pagesContainer.classList.contains("pages"))
      error('"$pagesContainer" argument must have "pages" class');

    const $templateClone = /** @type {DocumentFragment} */ (
      $pageTemplate.content.cloneNode(true)
    ).querySelector("ul");

    if ($templateClone == null)
      error('"$pageTemplate" argument must have an "ul" element');
    else if (!$templateClone.classList.contains("page"))
      error('"ul" element in "$pageTemplate" argument must have "page" class');

    this.#$pagesContainer = $pagesContainer;
    this.#$pageTemplate = $pageTemplate;
    this.#pages = paginate(items, itemsPerPage);
    this.#itemsPerPage = itemsPerPage;
    this.#renderItem = renderItem;
    this.#renderEmpty = renderEmpty;
    this.#clearEmpty = clearEmpty;
    this.#current = 1;
    this.#renderPage(1);
  }

  /** @param {Item} item */
  append(item) {
    const $currentPage = getElementBySelector(
      ".page[data-active]",
      HTMLUListElement,
      this.#$pagesContainer,
    );
    const pageIdx = this.#current - 1;

    this.#pages[pageIdx].push(item);

    const totalItems = this.#pages[pageIdx].length;

    $currentPage.appendChild(
      this.#renderItem({ item, index: totalItems - 1, totalItems }),
    );

    // NOTE: logic below can be also used for `prepend()` method

    if (totalItems === 0) this.#clearEmpty($currentPage);
    else if (totalItems <= this.#itemsPerPage) return;

    const totalPages = this.#pages.length;
    let itemToMove = null;
    let $elementToMove = null;

    for (let i = pageIdx; i < totalPages; i++) {
      const $page = this.#$pagesContainer.querySelector(
        `.page[data-page=${i + 1}]`,
      );

      if (itemToMove != null) {
        this.#pages[i].unshift(itemToMove);
        itemToMove = null;

        if ($elementToMove != null) {
          $page?.insertBefore($elementToMove, $page.firstElementChild);
          $elementToMove = null;
        }
      }

      if (this.#pages[i].length > this.#itemsPerPage) {
        itemToMove = this.#pages[i].pop();

        if ($page != null) $elementToMove = $page.lastElementChild;
      }

      if (itemToMove == null) break;
    }
  }

  goNext() {
    if (!(this.#current < this.#pages.length)) return { canGoNext: false };

    this.#current++;
    this.#renderPage(this.#current);

    return { canGoNext: this.#current < this.#pages.length };
  }

  goPrev() {
    if (this.#current === 1) return { canGoPrev: false };

    this.#current--;
    this.#renderPage(this.#current);

    return { canGoPrev: this.#current > 1 };
  }
}
