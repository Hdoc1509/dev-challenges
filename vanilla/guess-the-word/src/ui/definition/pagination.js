import { getElementById } from "@lib/dom";
import { Pagination } from "@/pagination";

const $pagination = getElementById("definition-pagination", HTMLMenuElement);

export const DefinitionPagination = new Pagination($pagination, {
  pages: 1,
  onPageChange: (newPage) => console.log({ newPage }),
});
