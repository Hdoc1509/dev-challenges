import { getAllElementsBySelector, getElementBySelector } from "@lib/dom";

const CLASSES = Object.freeze({
  TRIGGER: "tab-nav__trigger",
  CONTENT: "tab-content__item",
});

const ATTRIBUTES = Object.freeze({
  TAB: Object.freeze({
    SELECTED: "aria-selected",
  }),
  CONTENT: Object.freeze({
    ACTIVE: "data-active",
  }),
});

// TODO: id must end with `_tab`
// aria-controls must end with `_tab-content`
const TAB_VALID_SELECTOR = `.${CLASSES.TRIGGER}[id]:not([id=""])`
  .concat('[aria-controls$="-tab-content"]')
  .concat('[role="tab"]')
  .concat('[aria-selected]:not([aria-selected=""])');

// TODO: add methods to retrieve $tab and $content elements
export class Tabs {
  /** @type {Map<HTMLButtonElement, HTMLDivElement>} */
  #$Content = new Map();
  /** @type {HTMLButtonElement} */
  #$current;

  /** @param {{ $nav: HTMLDivElement, $content: HTMLDivElement }} params */
  constructor({ $nav, $content: $contentContainer }) {
    // TODO: add validation for $nav and $contentContainer

    const $tabs = getAllElementsBySelector(
      `:scope > ${TAB_VALID_SELECTOR}`,
      HTMLButtonElement,
      $nav,
    );

    if ($tabs.length < 2) throw new Error("At least 2 tabs are required");

    let $currentTab;

    for (const $tab of $tabs) {
      const contentId = /** @type {string} */ (
        $tab.getAttribute("aria-controls")
      );
      // TODO: create util createContentSelector({ tabId, contentId })
      const $content = getElementBySelector(
        `:scope #${contentId}.${CLASSES.CONTENT}[role="tabpanel"][aria-labelledby="${$tab.id}"]`,
        HTMLDivElement,
        $contentContainer,
      );

      if ($tab.getAttribute("aria-selected") === "true") $currentTab = $tab;
      this.#$Content.set($tab, $content);
    }

    if ($currentTab == null)
      throw new Error("Expected at least one tab to be selected");

    this.#$current = $currentTab;
  }

  get currentTab() {
    return this.#$current;
  }

  /**
   * @param {EventTarget | HTMLElement | null} $element
   * @returns {$element is HTMLButtonElement}
   */
  isTabLink($element) {
    return (
      $element instanceof HTMLButtonElement && this.#$Content.has($element)
    );
  }

  /** @param {HTMLButtonElement} $targetTab */
  selectTab($targetTab) {
    if (this.#$current === $targetTab) return;

    // TODO: add utils
    // - selectTab({ $tabLink, $content })
    // - deselectTab({ $tabLink, $content })

    const $currentTab = this.#$current;
    const $currentContent = this.#$Content.get($currentTab);
    const $targetContent = this.#$Content.get($targetTab);

    if ($currentContent == null || $targetContent == null) return;

    $currentTab.setAttribute(ATTRIBUTES.TAB.SELECTED, "false");
    $currentTab.disabled = false;
    $currentContent.removeAttribute(ATTRIBUTES.CONTENT.ACTIVE);
    $targetTab.setAttribute(ATTRIBUTES.TAB.SELECTED, "true");
    $targetTab.disabled = true;
    $targetTab.scrollIntoView();
    $targetContent.setAttribute(ATTRIBUTES.CONTENT.ACTIVE, "");

    this.#$current = $targetTab;
  }
}
