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
    $trigger.disabled = tab === selectedTab;

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
  // NOTE: avoids runtime error in tests
  // see: https://github.com/jsdom/jsdom/issues/1695
  window.HTMLElement.prototype.scrollIntoView = function () {};

  it("sets initial `.currentTab` correctlty", () => {
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

  it("checks tab trigger correctly by using `.isTab()` method", () => {
    const { $nav, $content } = createTabs();
    const $intruder = document.createElement("button");
    $intruder.classList.add("tab-nav__trigger");
    $intruder.setAttribute("role", "tab");
    $intruder.textContent = "Intruder";

    document.body.replaceChildren($nav, $content, $intruder);

    const TestTabs = new Tabs({ $nav, $content });

    expect(TestTabs.isTab($intruder)).toBe(false);

    for (const tab of tabNames) {
      const $tab = getByRole($nav, "tab", { name: `${tab.toUpperCase()} tab` });

      expect(TestTabs.isTab($tab)).toBe(true);
    }
  });

  it("updates `.currentTab` after selecting a tab", () => {
    const { $nav, $content } = createTabs();
    document.body.replaceChildren($nav, $content);

    const TestTabs = new Tabs({ $nav, $content });

    for (const tab of tabNames) {
      /** @type {HTMLButtonElement} */
      const $tab = getByRole($nav, "tab", { name: `${tab.toUpperCase()} tab` });

      TestTabs.selectTab($tab);

      expect(TestTabs.currentTab).toBe($tab);
    }
  });

  it("selects correct tab by using `.selectTab()` method", () => {
    const { $nav, $content } = createTabs();
    document.body.replaceChildren($nav, $content);

    const TestTabs = new Tabs({ $nav, $content });

    for (const tab of tabNames) {
      const name = `${tab.toUpperCase()} tab`;
      /** @type {HTMLButtonElement} */
      const $tab = getByRole($nav, "tab", { name });
      /** @type {HTMLButtonElement} */
      const $initialSelectedTab = getByRole($nav, "tab", { selected: true });

      TestTabs.selectTab($tab);

      const $selectedTab = getByRole($nav, "tab", { name, selected: true });

      expect(TestTabs.currentTab).toBe($tab);
      expect($selectedTab).toBe($tab);
      expect($tab.disabled).toBe(true);
      if ($tab !== $initialSelectedTab) {
        expect($initialSelectedTab.getAttribute("aria-selected")).toBe("false");
        expect($initialSelectedTab.disabled).toBe(false);
      }
    }
  });

  it("selects correct content by using `.selectTab()` method", () => {
    const { $nav, $content } = createTabs();
    document.body.replaceChildren($nav, $content);

    const TestTabs = new Tabs({ $nav, $content });

    for (const tab of tabNames) {
      const name = `${tab.toUpperCase()} tab`;
      /** @type {HTMLButtonElement} */
      const $tab = getByRole($nav, "tab", { name });
      const $tabContent = getByRole($content, "tabpanel", { name });
      const $initialTab = getByRole($nav, "tab", { selected: true });
      const $initialTabContent = getByRole($content, "tabpanel", {
        name: /** @type {string} */ ($initialTab.textContent),
      });

      TestTabs.selectTab($tab);

      expect($tabContent.hasAttribute("data-active")).toBe(true);
      if ($tab !== $initialTab)
        expect($initialTabContent.hasAttribute("data-active")).toBe(false);
    }
  });
});
