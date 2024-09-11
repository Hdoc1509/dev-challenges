import type { Todo } from "./types";

export const FILTERS = Object.freeze({
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
});
export type Filter = (typeof FILTERS)[keyof typeof FILTERS];

export const FILTER_METHODS: Record<Filter, (todo: Todo) => boolean> = {
  [FILTERS.ALL]: () => true,
  [FILTERS.ACTIVE]: (todo) => !todo.completed,
  [FILTERS.COMPLETED]: (todo) => todo.completed,
};
