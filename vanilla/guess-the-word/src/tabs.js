import { getAllElementsBySelector } from "@lib/dom";

const CLASSES = Object.freeze({
  TAB_LINK: "tab-nav__link",
  TAB_CONTENT: "tab-content__item",
});

const ATTRIBUTES = Object.freeze({
  TAB: Object.freeze({
    ACTIVE: "data-tab-active",
    SELECTED: "aria-selected",
    NAME: "data-tab",
  }),
  CONTENT: Object.freeze({
    ACTIVE: "data-content-active",
  }),
});

export class Tabs {
  /** @type {HTMLElement} */
  #$nav;
  /** @type {Map<string, HTMLDivElement>} */
  #$CONTENTS = new Map();
  /** @type {Map<string, HTMLButtonElement>} */
  #$TABS = new Map();
  #currentTab = "";

  /**
   * @param {Object} params
   * @param {HTMLElement} params.$nav
   * @param {HTMLElement} params.$content
   */
  constructor({ $nav, $content }) {
    this.#$nav = $nav;

    const $tabs = getAllElementsBySelector(
      `.${CLASSES.TAB_LINK}[${ATTRIBUTES.TAB.NAME}]`,
      HTMLButtonElement,
      $nav,
    );
    const $contents = getAllElementsBySelector(
      `.${CLASSES.TAB_CONTENT}[${ATTRIBUTES.TAB.NAME}]`,
      HTMLDivElement,
      $content,
    );
    const tabsQuantity = $tabs.length;

    if (tabsQuantity !== $contents.length)
      throw new Error("Tabs: number of tabs and contents must be equal");

    for (let i = 0; i < tabsQuantity; i++) {
      const $tab = $tabs[i];
      const $content = $contents[i];

      this.#$TABS.set(/** @type {string} */ ($tab.dataset.tab), $tab);
      this.#$CONTENTS.set(/** @type {string} */ ($tab.dataset.tab), $content);
    }

    this.#currentTab = /** @type {string} */ ($tabs[0].dataset.tab);
  }

  /**
   * @param {EventTarget | HTMLElement | null} $element
   * @returns {$element is HTMLButtonElement}
   */
  isTabLink($element) {
    return (
      $element instanceof HTMLButtonElement &&
      this.#$nav.contains($element) &&
      $element.matches(`.${CLASSES.TAB_LINK}`) &&
      $element.hasAttribute(ATTRIBUTES.TAB.NAME)
    );
  }

  /** @param {HTMLButtonElement} $tabLink */
  selectTab($tabLink) {
    const tab = /** @type {string} */ ($tabLink.dataset.tab);

    if (this.#currentTab === tab) return;

    const $currentTab = this.#$TABS.get(this.#currentTab);
    const $currentContent = this.#$CONTENTS.get(this.#currentTab);
    const $targetTab = this.#$TABS.get(tab);
    const $targetContent = this.#$CONTENTS.get(tab);

    $currentTab?.setAttribute(ATTRIBUTES.TAB.SELECTED, "false");
    $currentTab?.removeAttribute(ATTRIBUTES.TAB.ACTIVE);
    $currentContent?.removeAttribute(ATTRIBUTES.CONTENT.ACTIVE);
    $targetTab?.setAttribute(ATTRIBUTES.TAB.SELECTED, "true");
    $targetTab?.setAttribute(ATTRIBUTES.TAB.ACTIVE, "");
    $targetContent?.setAttribute(ATTRIBUTES.CONTENT.ACTIVE, "");

    this.#currentTab = tab;
  }
}
