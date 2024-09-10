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

// use todos that were previously stored without zustand
const previousTodosItem = window.localStorage.getItem(PREVIOUS_STORAGE_KEY);
const defaultTodos = previousTodosItem
  ? (JSON.parse(previousTodosItem) as Todo[])
  : todosMock;

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
