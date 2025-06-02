import { describe, expect, it } from "vitest";
import { getByRole } from "@testing-library/dom";
import { Tabs } from "./tabs";

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
  it("should set initial `.currentTab` correctlty", () => {
    for (const tab of tabNames) {
      const { $nav, $content } = createTabs({ selectedTab: tab });
      document.body.replaceChildren($nav, $content);

      const $selectedTab = getByRole($nav, "tab", {
        name: `${tab.toUpperCase()} tab`,
      });
      const TestTabs = new Tabs({ $nav, $content });

      expect(TestTabs.currentTab).toBe($selectedTab);
    }
  });

  it.todo("should check tab trigger correctly", () => {});

  it.todo("should select tab correctly", () => {});

  it.todo("should update `.currentTab` after selecting a tab", () => {});
});
