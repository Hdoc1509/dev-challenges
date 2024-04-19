import { useLocalStorage } from "./useLocalStorage";
import { todos as defaultTodos } from "../data";

export const useTodos = () => {
  const [todos, setTodos] = useLocalStorage("todos", defaultTodos);

  const addTodo = (title: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.getRandomValues(new Uint32Array(1))[0],
        title,
        completed: false,
      },
    ]);
  };
  const toggleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };
  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const removeCompletedTodos = () =>
    setTodos(todos.filter((todo) => !todo.completed));

  return {
    todos,
    addTodo,
    toggleCompleted,
    removeTodo,
    removeCompletedTodos,
  };
};
