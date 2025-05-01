import { getAllElementsBySelector, getElementBySelector } from "@lib/dom";

const CLASSES = Object.freeze({
  LINK: "tab-nav__trigger",
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

const TAB_VALID_SELECTOR = `:scope > .${CLASSES.LINK}[id]:not([id=""])`
  .concat('[aria-controls$="-tab-content"]')
  .concat('[role="tab"]')
  .concat(':where([aria-selected="true"], [aria-selected="false"])');

export class Tabs {
  /** @type {HTMLElement} */
  #$nav;
  /** @type {Map<HTMLButtonElement, HTMLDivElement>} */
  #$Content = new Map();
  /** @type {HTMLButtonElement} */
  #$current;

  /** @param {{ $nav: HTMLDivElement, $content: HTMLDivElement }} params */
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
        `:scope #${contentId}.${CLASSES.CONTENT}[role="tabpanel"][aria-labelledby="${$tab.id}"]`,
        HTMLDivElement,
        $contentContainer,
      );

      this.#$Content.set($tab, $content);
    });

    // TODO: set $current as $selectedTab that has [aria-selected="true"]
    // check if there is only one $selectedTab
    this.#$current = $tabs[0];
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
      $element instanceof HTMLButtonElement &&
      this.#$nav.contains($element) &&
      $element.matches(`.${CLASSES.LINK}`)
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

    if ($currentContent == null || $targetTab == null || $targetContent == null)
      return;

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
