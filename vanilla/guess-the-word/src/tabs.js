import { getAllElementsBySelector, getElementBySelector } from "@lib/dom";

const CLASSES = Object.freeze({
  TAB_LINK: "tab-nav__link",
  TAB_CONTENT: "tab-content__item",
});

const ATTRIBUTES = Object.freeze({
  TAB: Object.freeze({
    SELECTED: "aria-selected",
  }),
  CONTENT: Object.freeze({
    ACTIVE: "data-content-active",
  }),
});

const TAB_VALID_SELECTOR = `.${CLASSES.TAB_LINK}[id]:not([id=""])`
  .concat('[aria-controls$="-tab-content"]')
  .concat('[role="tab"]')
  .concat(':where([aria-selected="true"], [aria-selected="false"])');

export class Tabs {
  /** @type {HTMLElement} */
  #$nav;
  /** @type {Map<string, HTMLDivElement>} */
  #$CONTENTS = new Map();
  /** @type {Map<string, HTMLButtonElement>} */
  #$TABS = new Map();
  /** @type {Map<HTMLButtonElement, string>} */
  #TabIds = new Map();
  #currentTab = "";

  /**
   * @param {Object} params
   * @param {HTMLElement} params.$nav
   * @param {HTMLElement} params.$content
   */
  constructor({ $nav, $content: $contentContainer }) {
    this.#$nav = $nav;

    const $tabs = getAllElementsBySelector(
      TAB_VALID_SELECTOR,
      HTMLButtonElement,
      $nav,
    );

    if ($tabs.length < 2) throw new Error("At least 2 tabs are required");

    $tabs.forEach(($tab) => {
      const contentId = /** @type {string} */ (
        $tab.getAttribute("aria-controls")
      );
      // TODO: create util createContentSelector({ tabId, contentId })
      const $content = getElementBySelector(
        `#${contentId}.${CLASSES.TAB_CONTENT}[role="tabpanel"][aria-labelledby="${$tab.id}"]`,
        HTMLDivElement,
        $contentContainer,
      );

      this.#$TABS.set(contentId, $tab);
      this.#$CONTENTS.set(contentId, $content);
      this.#TabIds.set($tab, contentId);
    });

    this.#currentTab = /** @type {string} */ (this.#TabIds.get($tabs[0]));
  }

  /**
   * @param {EventTarget | HTMLElement | null} $element
   * @returns {$element is HTMLButtonElement}
   */
  isTabLink($element) {
    return (
      $element instanceof HTMLButtonElement &&
      this.#$nav.contains($element) &&
      $element.matches(`.${CLASSES.TAB_LINK}`)
    );
  }

  /** @param {HTMLButtonElement} $tabLink */
  selectTab($tabLink) {
    const contentId = this.#TabIds.get($tabLink);

    if (this.#currentTab === contentId || contentId == null) return;

    // TODO: add utils
    // - selectTab({ $tabLink, $content })
    // - deselectTab({ $tabLink, $content })

    const $currentTab = this.#$TABS.get(this.#currentTab);
    const $currentContent = this.#$CONTENTS.get(this.#currentTab);
    const $targetTab = this.#$TABS.get(contentId);
    const $targetContent = this.#$CONTENTS.get(contentId);

    if (
      $currentTab == null ||
      $currentContent == null ||
      $targetTab == null ||
      $targetContent == null
    )
      return;

    $currentTab.setAttribute(ATTRIBUTES.TAB.SELECTED, "false");
    $currentTab.disabled = false;
    $currentContent.removeAttribute(ATTRIBUTES.CONTENT.ACTIVE);
    $targetTab.setAttribute(ATTRIBUTES.TAB.SELECTED, "true");
    $targetTab.disabled = true;
    $targetTab.scrollIntoView();
    $targetContent.setAttribute(ATTRIBUTES.CONTENT.ACTIVE, "");

    this.#currentTab = contentId;
  }
}
