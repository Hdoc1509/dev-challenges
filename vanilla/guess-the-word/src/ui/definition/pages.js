import { Pages } from "@/pages";
import { getElementById, getElementBySelector } from "@lib/dom";
import { discoveredWords } from "@/state/discovered-words";
import { createDefinition } from "./create";
import { DEFINITIONS_PER_PAGE } from "@/consts/definitions";

export const $definitionPagesContainer = getElementById(
  "definition-pages-container",
  HTMLDivElement,
);

export const DefinitionPages = new Pages($definitionPagesContainer, {
  items: Array.from(discoveredWords),
  itemsPerPage: DEFINITIONS_PER_PAGE,
  renderItem({ item, index, totalItems, isNew, insertionMode }) {
    const $definition = createDefinition(item, { isNew });
    const isLast = index === totalItems - 1;

    if (
      isNew &&
      totalItems > 1 &&
      insertionMode === Pages.INSERTION_MODE.APPEND
    )
      $definition.prepend(document.createElement("hr"));
    if (isLast) return $definition;

    const $fragment = document.createDocumentFragment();
    const $separator = document.createElement("hr");

    $fragment.append($definition, $separator);
    return $fragment;
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
