import { getElementBySelector } from "@lib/dom";

/** @param {string} message */
const error = (message) => {
  throw new Error(`[Pagination]: ${message}`);
};

export class Pagination {
  #$pagePrev;
  #$pageNext;
  #$input;
  #pages;
  #current;

  /**
   * @param {HTMLMenuElement} $pagination
   * @param {Object} extraParams
   * @param {number} extraParams.initialPages
   */
  constructor($pagination, { initialPages }) {
    if ($pagination == null) error('"$pagination" argument is required');
    if (!($pagination instanceof HTMLMenuElement))
      error('"$pagination" argument must be an instance of HTMLMenuElement');
    if (!$pagination.classList.contains("pagination"))
      error('"$pagination" argument must have "pagination" class');

    this.#$pagePrev = getElementBySelector(
      "li.pagination__item > .pagination__trigger[data-page-prev]",
      HTMLButtonElement,
    );
    this.#$pageNext = getElementBySelector(
      "li.pagination__item > .pagination__trigger[data-page-next]",
      HTMLButtonElement,
    );
    this.#$input = getElementBySelector(
      "li.pagination__item[aria-current=page] > .pagination__current",
      HTMLInputElement,
      $pagination,
    );
    this.#current = Number(this.#$input.value);
    this.#pages = initialPages;

    this.#checkTriggers();
  }

  #checkTriggers() {
    if (this.#pages === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = true;
      this.#$input.disabled = true;
    } else if (this.#current === 1) {
      this.#$pagePrev.disabled = true;
      this.#$pageNext.disabled = false;
    } else if (this.#current === this.#pages) {
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
    if (this.#current !== page) {
      this.#current = page;
      this.#checkTriggers();
    }
  }

  goNextPage() {
    if (this.#current === this.#pages) console.warn("No more pages");
    else this.#selectPage(this.#current + 1);
  }

  goPrevPage() {
    if (this.#current === 1) console.warn("No previous page");
    else this.#selectPage(this.#current - 1);
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

    if (!isValid) $input.value = this.#current.toString();
    else {
      const pageNumber = Number(page);

      if (pageNumber < 1) this.#selectPage(1);
      else if (pageNumber > this.#pages) this.#selectPage(this.#pages);
      else this.#selectPage(pageNumber);
    }
    $input.blur();
  }
}
