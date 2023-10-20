import type { Todo } from "./types";

export type Filter = 'all' | 'active' | 'completed';

export const FILTERS: Record<Filter, (todo: Todo) => boolean> = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
};
