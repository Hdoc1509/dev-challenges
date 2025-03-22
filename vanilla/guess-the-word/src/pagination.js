import { getElementBySelector } from "@lib/dom";

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pagination]: ${message}`);
};

export class Pagination {
  #onPageChange;
  #$pagePrev;
  #$pageNext;
  #$input;
  #$total;
  #pages;
  #current;

  /**
   * @param {HTMLMenuElement} $pagination
   * @param {Object} extraParams
   * @param {number} extraParams.initialPages
   * @param {(newPage: number) => void} extraParams.onPageChange
   */
  constructor($pagination, { initialPages, onPageChange }) {
    if ($pagination == null) error('"$pagination" argument is required');
    if (!($pagination instanceof HTMLMenuElement))
      error('"$pagination" argument must be an instance of HTMLMenuElement');
    if (!$pagination.classList.contains("pagination"))
      error('"$pagination" argument must have "pagination" class');

    this.#$pagePrev = getElementBySelector(
      ".pagination__item > .pagination__trigger[data-page-prev]",
      HTMLButtonElement,
    );
    this.#$pageNext = getElementBySelector(
      ".pagination__item > .pagination__trigger[data-page-next]",
      HTMLButtonElement,
    );
    this.#$input = getElementBySelector(
      ".pagination__item > .pagination__current",
      HTMLInputElement,
      $pagination,
    );
    this.#$total = getElementBySelector(
      ".pagination__item .pagination__total",
      HTMLSpanElement,
      $pagination,
    );
    this.#current = Number(this.#$input.value);
    this.#pages = initialPages;
    this.#onPageChange = onPageChange;

    this.#$total.textContent = initialPages.toString();
  }

  goNextPage() {
    if (this.#current === this.#pages) return console.warn("No more pages");

    // TODO: handle disabled state for $pageNext and $pagePrev
    this.#current++;
    this.#$input.value = this.#current.toString();
    this.#onPageChange(this.#current);
  }

  goPrevPage() {
    if (this.#current === 1) return console.warn("No previous page");

    // TODO: handle disabled state for $pageNext and $pagePrev
    this.#current--;
    this.#$input.value = this.#current.toString();
    this.#onPageChange(this.#current);
  }

  /** @param {number} newPages */
  setPages(newPages) {
    this.#pages = newPages;
    this.#$total.textContent = newPages.toString();
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
    const isValid = /^\d+$/.test(page);

    if (!isValid) {
      $input.value = this.#current.toString();
      $input.blur();
      return;
    }

    const pageNumber = Number(page);

    if (pageNumber < 1) {
      $input.value = "1";
      if (this.#current !== 1) {
        this.#current = 1;
        this.#onPageChange(1);
      }
      $input.blur();
      return;
    }

    if (pageNumber > this.#pages) {
      $input.value = this.#pages.toString();
      if (this.#current !== this.#pages) {
        this.#current = this.#pages;
        this.#onPageChange(this.#pages);
      }
      $input.blur();
      return;
    }

    this.#current = pageNumber;
    this.#onPageChange(this.#current);
    $input.blur();
  }
}
