import { describe, it } from "vitest";

const TABS = /** @type {const} */ ({
  FIRST: "first",
  SECOND: "second",
  THIRD: "third",
});
const tabNames = [TABS.FIRST, TABS.SECOND, TABS.THIRD];
const tabGroup = "test";

/** @param {{ selectedTab?: TABS[keyof TABS] }} options */
const createTabs = ({ selectedTab = TABS.FIRST } = {}) => {
  const $navContainer = document.createElement("div");
  const $contentContainer = document.createElement("div");

  $navContainer.classList.add("tab-nav");
  $navContainer.setAttribute("role", "tablist");
  $contentContainer.classList.add("tab-content");

  for (const tab of tabNames) {
    const $trigger = document.createElement("button");
    const $content = document.createElement("div");
    const triggerId = `${tabGroup}_${tab}-tab`;
    const contentId = `${tabGroup}_${tab}-tab-content`;

    $trigger.classList.add("tab-nav__trigger");
    $trigger.setAttribute("id", triggerId);
    $trigger.setAttribute("aria-controls", contentId);
    $trigger.setAttribute("role", "tab");
    $trigger.setAttribute("aria-selected", `${tab === selectedTab}`);
    $trigger.textContent = `${tab.toUpperCase()} tab`;

    $content.classList.add("tab-content__item");
    $content.setAttribute("id", contentId);
    $content.setAttribute("role", "tabpanel");
    $content.setAttribute("aria-labelledby", triggerId);
    if (tab === selectedTab) $content.setAttribute("data-active", "");
    $content.textContent = `${tab.toUpperCase()} content`;

    $navContainer.append($trigger);
    $contentContainer.append($content);
  }

  return { $nav: $navContainer, $content: $contentContainer };
};

describe("Tabs", () => {
  it.todo("should set `.currentTab` correctlty", () => {});
});
