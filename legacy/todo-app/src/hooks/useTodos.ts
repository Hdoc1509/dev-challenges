import { useTodosStore } from "../store/todos";

export const useTodos = () => {
  const todos = useTodosStore((s) => s.todos);
  const addTodo = useTodosStore((s) => s.addTodo);
  const toggleCompleted = useTodosStore((s) => s.toggleCompleted);
  const removeTodo = useTodosStore((s) => s.removeTodo);
  const removeCompletedTodos = useTodosStore((s) => s.removeCompletedTodos);

  return {
    todos,
    addTodo,
    toggleCompleted,
    removeTodo,
    removeCompletedTodos,
  };
};
