import { Pages } from "@/pages";
import { getElementById } from "@lib/dom";
import { createDefinition } from "./render/create-definition";
import { $menuTabContent } from "../menu";
import { DEFINITIONS_PER_PAGE } from "@/consts/definitions";

export const $definitionPagesContainer = getElementById(
  "definition-pages-container",
  HTMLDivElement,
);

/** @type {Pages<string>} */
export const DefinitionPages = new Pages($definitionPagesContainer, {
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

    $definition.appendChild(document.createElement("hr"));
    return $definition;
  },
  clearEmpty: ($page) => $page.querySelector(".not-yet")?.remove(),
  onItemMoved: ($page) =>
    $page.insertBefore(document.createElement("hr"), $page.children[1]),
  onItemRemoved: ($page) => {
    const $lastElement = $page.lastElementChild;

    if ($lastElement instanceof HTMLHRElement) $lastElement.remove();
  },
  onPageChange: () => $menuTabContent.scrollTo(0, 0),
  $pageTemplate: getElementById(
    "definition-page-template",
    HTMLTemplateElement,
  ),
  $pageEmptyTemplate: getElementById(
    "definition-page-empty-template",
    HTMLTemplateElement,
  ),
});
