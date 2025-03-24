import { Pages } from "@/pages";
import { getElementById, getElementBySelector } from "@lib/dom";
import { discoveredWords } from "@/state/discovered-words";
import { DEFINITIONS_PER_PAGE } from "@/consts/definitions";

const $pagesContainer = getElementById(
  "definition-pages-container",
  HTMLDivElement,
);

export const DefinitionPages = new Pages($pagesContainer, {
  items: Array.from(discoveredWords),
  itemsPerPage: DEFINITIONS_PER_PAGE,
  renderItem({ item, index, totalItems }) {
    const $item = document.createElement("li");

    $item.textContent = item;
    if (index === totalItems - 1) $item.classList.add("last");

    return $item;
  },
  clearEmpty: ($page) => $page.querySelector(".not-yet")?.remove(),
  $pageTemplate: getElementById(
    "definition-page-template",
    HTMLTemplateElement,
  ),
  $pageEmptyTemplate: getElementById(
    "definition-page-empty-template",
    HTMLTemplateElement,
  ),
  $total: getElementBySelector(
    "#definition-pagination .pagination__total",
    HTMLSpanElement,
  ),
});
