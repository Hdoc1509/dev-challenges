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
  #current;

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
      ":scope > li.pagination__item > .pagination__trigger[data-page-prev]",
      HTMLButtonElement,
      $pagination,
    );
    this.#$pageNext = getElementBySelector(
      ":scope > li.pagination__item > .pagination__trigger[data-page-next]",
      HTMLButtonElement,
      $pagination,
    );
    this.#$input = getElementBySelector(
      ":scope > li.pagination__item[aria-current=page] > .pagination__current",
      HTMLInputElement,
      $pagination,
    );
    this.#$total = getElementBySelector(
      ":scope > li.pagination__item[aria-current=page] .pagination__total",
      HTMLSpanElement,
      $pagination,
    );

    const inputPage = Number(this.#$input.value);
    const totalPages = this.#PagesHandler.totalPages;

    if (Number.isNaN(inputPage) || inputPage > totalPages || inputPage < 1)
      this.#$input.value = `${totalPages}`;
    this.#current = Number(this.#$input.value);
    if (renderCurrent) this.#PagesHandler.renderPage(this.#current);
    this.#setTotalPages(totalPages);

    this.#PagesHandler.addEventListener("pageadd", (totalPages) => {
      this.#setTotalPages(totalPages);
    });
    this.#PagesHandler.addEventListener("itemsupdate", (totalPages) => {
      this.#setTotalPages(totalPages);
    });
  }

  /** @param {number} totalPages */
  #setTotalPages(totalPages) {
    this.#checkTriggers();
    this.#$input.max = `${totalPages}`;
    this.#$input.setAttribute(
      "aria-label",
      `Page ${this.#current} of ${totalPages}`,
    );
    this.#$total.textContent = `${totalPages}`;
  }

  #checkTriggers() {
    const pages = this.#PagesHandler.totalPages;

    if (pages === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = true;
      this.#$input.disabled = true;
    } else if (this.#current === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = false;
      this.#$input.disabled = false;
    } else if (this.#current === pages) {
      this.#$pagePrev.disabled = false;
      this.#$pageNext.disabled = true;
      this.#$input.disabled = false;
    } else {
      this.#$pagePrev.disabled = false;
      this.#$pageNext.disabled = false;
      this.#$input.disabled = false;
    }
  }

  get currentPage() {
    return this.#current;
  }

  /** Update current page and call `pagesHandler.renderPage(page)`
   * @param {number} page */
  selectPage(page) {
    this.#$input.value = `${page}`;
    if (this.#current !== page) {
      this.#current = page;
      this.#checkTriggers();
      this.#PagesHandler.renderPage(page);
    }
  }

  #goNextPage() {
    if (this.#current === this.#PagesHandler.totalPages)
      this.#$pageNext.disabled = true;
    else this.selectPage(this.#current + 1);
  }

  #goPrevPage() {
    if (this.#current === 1) this.#$pagePrev.disabled = true;
    else this.selectPage(this.#current - 1);
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
    if ($trigger === this.#$pagePrev) this.#goPrevPage();
    else this.#goNextPage();
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

    if (!isValid) $input.value = `${this.#current}`;
    else {
      const pageNumber = Number(page);
      const pages = this.#PagesHandler.totalPages;

      if (pageNumber < 1) this.selectPage(1);
      else if (pageNumber > pages) this.selectPage(pages);
      else this.selectPage(pageNumber);
    }
    $input.blur();
  }
}
