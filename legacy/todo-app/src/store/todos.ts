import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todos as todosMock } from "../data";
import type { Todo } from "../types";

type State = {
  todos: Todo[];
};

type Action = {
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
  toggleCompleted: (id: number) => void;
  removeCompletedTodos: () => void;
};

const PREVIOUS_STORAGE_KEY = "todos";
const STORAGE_KEY = "todo-app-todos-store";

const defaultTodos = (() => {
  const previousTodosItem = localStorage.getItem(PREVIOUS_STORAGE_KEY);

  if (previousTodosItem != null) {
    localStorage.removeItem(PREVIOUS_STORAGE_KEY);
    return JSON.parse(previousTodosItem) as Todo[];
  }

  return todosMock;
})();

export const useTodosStore = create<State & Action>()(
  persist(
    (set) => ({
      todos: defaultTodos,

      addTodo: (title: string) =>
        set(({ todos }) => ({
          todos: todos.concat({
            id: crypto.getRandomValues(new Uint32Array(1))[0],
            title,
            completed: false,
          }),
        })),

      removeTodo: (id: number) =>
        set(({ todos }) => ({
          todos: todos.filter((todo) => todo.id !== id),
        })),

      toggleCompleted: (id: number) =>
        set(({ todos }) => ({
          todos: todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        })),

      removeCompletedTodos: () =>
        set(({ todos }) => ({
          todos: todos.filter((todo) => !todo.completed),
        })),
    }),
    { name: STORAGE_KEY },
  ),
);
