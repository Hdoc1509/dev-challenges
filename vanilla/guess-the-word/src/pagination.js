import { getElementBySelector } from "@lib/dom";

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pagination]: ${message}`);
};

export class Pagination {
  #PagesHandler;
  #$pagePrev;
  #$pageNext;
  #$input;
  #$total;
  currentPage;

  /**
   * @param {HTMLMenuElement} $pagination
   * @param {Object} extraParams
   * @param {import("./pages").Pages<any>} extraParams.pagesHandler
   * @param {boolean} [extraParams.renderCurrent]
   * Whether to call `pagesHandler.renderPage(currentPage)` on initialization
   */
  constructor($pagination, { pagesHandler, renderCurrent = true }) {
    if ($pagination == null) error('"$pagination" argument is required');
    if (!($pagination instanceof HTMLMenuElement))
      error('"$pagination" argument must be an instance of HTMLMenuElement');
    if (!$pagination.classList.contains("pagination"))
      error('"$pagination" argument must have "pagination" class');

    this.#PagesHandler = pagesHandler;
    this.#$pagePrev = getElementBySelector(
      "li.pagination__item > .pagination__trigger[data-page-prev]",
      HTMLButtonElement,
      $pagination,
    );
    this.#$pageNext = getElementBySelector(
      "li.pagination__item > .pagination__trigger[data-page-next]",
      HTMLButtonElement,
      $pagination,
    );
    this.#$input = getElementBySelector(
      "li.pagination__item[aria-current=page] > .pagination__current",
      HTMLInputElement,
      $pagination,
    );
    this.#$total = getElementBySelector(
      "li.pagination__item[aria-current=page] .pagination__total",
      HTMLSpanElement,
      $pagination,
    );

    const inputPage = Number(this.#$input.value);

    if (
      Number.isNaN(inputPage) ||
      inputPage > this.#PagesHandler.totalPages ||
      inputPage < 1
    )
      this.#$input.value = this.#PagesHandler.totalPages.toString();
    this.#$total.textContent = `${this.#PagesHandler.totalPages}`;
    this.currentPage = Number(this.#$input.value);

    if (renderCurrent) this.#PagesHandler.renderPage(this.currentPage);
    this.#checkTriggers();
  }

  #checkTriggers() {
    const pages = this.#PagesHandler.totalPages;

    if (pages === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = true;
      this.#$input.disabled = true;
    } else if (this.currentPage === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = false;
    } else if (this.currentPage === pages) {
      this.#$pagePrev.disabled = false;
      this.#$pageNext.disabled = true;
    } else {
      this.#$pagePrev.disabled = false;
      this.#$pageNext.disabled = false;
    }
  }

  /** @param {number} page */
  #selectPage(page) {
    this.#$input.value = page.toString();
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.#checkTriggers();
      this.#PagesHandler.renderPage(page);
    }
  }

  /** @param {number} page */
  updateCurrentPage(page) {
    this.currentPage = page;
    this.#$input.value = page.toString();
    this.#checkTriggers();
  }

  goNextPage() {
    if (this.currentPage === this.#PagesHandler.totalPages)
      console.warn("No more pages");
    else this.#selectPage(this.currentPage + 1);
  }

  goPrevPage() {
    if (this.currentPage === 1) console.warn("No previous page");
    else this.#selectPage(this.currentPage - 1);
  }

  /**
   * @param {EventTarget | null} $element
   * @returns {$element is HTMLButtonElement}
   */
  isTrigger($element) {
    return $element === this.#$pagePrev || $element === this.#$pageNext;
  }

  /** @param {HTMLButtonElement} $trigger */
  handleTrigger($trigger) {
    if ($trigger === this.#$pagePrev) this.goPrevPage();
    else this.goNextPage();
  }

  /**
   * @param {EventTarget | null} $element
   * @returns {$element is HTMLInputElement}
   */
  isInput($element) {
    return $element === this.#$input;
  }

  /** @param {HTMLInputElement} $input */
  handleInputChange($input) {
    const page = $input.value;
    const isValid = /^-?\d+$/.test(page);

    if (!isValid) $input.value = this.currentPage.toString();
    else {
      const pageNumber = Number(page);
      const pages = this.#PagesHandler.totalPages;

      if (pageNumber < 1) this.#selectPage(1);
      else if (pageNumber > pages) this.#selectPage(pages);
      else this.#selectPage(pageNumber);
    }
    $input.blur();
  }
}
